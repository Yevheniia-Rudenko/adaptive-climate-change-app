import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { createAsyncModel, createDefaultOutputs, getDefaultConfig } from '@climateinteractive/en-roads-core';
import enStrings from '@climateinteractive/en-roads-core/strings/en';
import { GraphView } from '@climateinteractive/sim-ui-graph';
import '../../styles/enroads-dashboard.css';

const AIR_POLLUTION_GRAPH_ID = '112';
const AVG_ENERGY_PRICE_GRAPH_ID = '78';
const CARBON_PRICE_INPUT_ID = '39';

export default function Module3CarbonPriceDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const [carbonPricePos, setCarbonPricePos] = useState(0);
  const [carbonPriceValue, setCarbonPriceValue] = useState(0);
  const [carbonPriceDefaultPos, setCarbonPriceDefaultPos] = useState<number | null>(null);

  // Temperature display refs — updated via direct DOM writes to avoid canvas resets
  const tempCRef = useRef<HTMLSpanElement>(null);
  const tempFRef = useRef<HTMLSpanElement>(null);

  const airCanvasRef = useRef<HTMLCanvasElement>(null);
  const priceCanvasRef = useRef<HTMLCanvasElement>(null);

  const airGraphViewRef = useRef<any>(null);
  const priceGraphViewRef = useRef<any>(null);

  const modelRef = useRef<any>(null);
  const modelContextRef = useRef<any>(null);
  const coreConfigRef = useRef<any>(null);

  const carbonPriceInputRef = useRef<any>(null);

  const str = (key: string) => (enStrings as any)[key] || key;

  const getCarbonPriceRangeLabel = (value: number) => {
    const spec = carbonPriceInputRef.current?.spec;
    const rangeLabelKeys: string[] = spec?.rangeLabelKeys ?? [
      'input_range__status_quo',
      'input_range__low',
      'input_range__medium',
      'input_range__high',
      'input_range__very_high'
    ];
    const rangeDividers: number[] = spec?.rangeDividers ?? [6, 20, 60, 100];

    let idx = rangeDividers.findIndex((d) => value < d);
    if (idx === -1) idx = rangeLabelKeys.length - 1;
    return str(rangeLabelKeys[idx] ?? 'input_range__status_quo');
  };

  const getRangeHighlightBackground = (currentPct: number, defaultPct: number | null, color: string) => {
    const track = '#e5e7eb';
    const clampedCurrent = Math.max(0, Math.min(100, currentPct));
    if (defaultPct === null) {
      return `linear-gradient(to right, ${color} 0%, ${color} ${clampedCurrent}%, ${track} ${clampedCurrent}%, ${track} 100%)`;
    }

    const clampedDefault = Math.max(0, Math.min(100, defaultPct));
    const a = Math.min(clampedCurrent, clampedDefault);
    const b = Math.max(clampedCurrent, clampedDefault);
    return `linear-gradient(to right, ${track} 0%, ${track} ${a}%, ${color} ${a}%, ${color} ${b}%, ${track} ${b}%, ${track} 100%)`;
  };

  const createGraphViewModel = (graphSpec: any) => {
    const datasetViewModels = graphSpec.datasets.map((datasetSpec: any) => ({
      spec: datasetSpec,
      visible: true,
      points: []
    }));

    return {
      spec: graphSpec,
      getDatasets: () => datasetViewModels,
      getStringForKey: (key: string) => str(key),
      formatYAxisTickValue: (value: number) => value.toFixed(1),
      formatYAxisTooltipValue: (value: number) => value.toFixed(2)
    };
  };

  const updateGraphData = (graphView: any) => {
    if (!graphView || !modelContextRef.current) return;

    const graphViewModel = graphView.viewModel;
    for (const datasetViewModel of graphViewModel.getDatasets()) {
      const datasetSpec = datasetViewModel.spec;
      let series = modelContextRef.current.getSeriesForVar(
        datasetSpec.varId,
        datasetSpec.externalSourceName
      );

      // Try both 'baseline' and 'Ref' for baseline datasets
      if ((!series || !series.points?.length) && datasetSpec.externalSourceName === 'baseline') {
        series = modelContextRef.current.getSeriesForVar(datasetSpec.varId, 'Ref');
      } else if ((!series || !series.points?.length) && datasetSpec.externalSourceName === 'Ref') {
        series = modelContextRef.current.getSeriesForVar(datasetSpec.varId, 'baseline');
      }

      datasetViewModel.points = [...(series?.points || [])];

      if (!datasetSpec.externalSourceName) {
        datasetSpec.color = '#53B1E8';
        datasetSpec.lineWidth = 4;
      } else if (datasetSpec.externalSourceName === 'baseline' || datasetSpec.externalSourceName === 'Ref') {
        datasetSpec.color = '#000000';
        datasetSpec.lineWidth = 4;
      }
    }

    graphView.updateData(true);
  };

  const updateTemperatureDisplay = () => {
    if (!modelContextRef.current) return;
    let tempSeries = modelContextRef.current.getSeriesForVar('_temperature_change_from_1850');
    if (!tempSeries?.points?.length) {
      tempSeries = modelContextRef.current.getSeriesForVar('_temperature_relative_to_1850_1900');
    }
    if (tempSeries?.points?.length) {
      const tempCelsius = tempSeries.getValueAtTime(2100);
      const tempFahrenheit = tempCelsius * 9 / 5;
      if (tempCRef.current) tempCRef.current.textContent = `+${tempCelsius.toFixed(1)}°C`;
      if (tempFRef.current) tempFRef.current.textContent = `+${tempFahrenheit.toFixed(1)}°F`;
    }
  };

  const updateAllGraphs = () => {
    if (airGraphViewRef.current) updateGraphData(airGraphViewRef.current);
    if (priceGraphViewRef.current) updateGraphData(priceGraphViewRef.current);
    updateTemperatureDisplay();
  };

  // Responsive graph height — matches getGraphHeight used in other dashboards
  const getGraphHeight = (containerWidth: number) => {
    const h = containerWidth * 0.55;
    return Math.max(200, Math.min(300, Math.round(h)));
  };

  const initGraph = (canvas: HTMLCanvasElement, graphId: string) => {
    if (!coreConfigRef.current) return null;
    const graphSpec = coreConfigRef.current.graphs.get(graphId);
    if (!graphSpec) return null;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const w = rect.width || 640;
    const height = getGraphHeight(w);

    canvas.style.width = '100%';
    canvas.style.height = `${height}px`;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(height * dpr);

    const viewModel = createGraphViewModel(graphSpec);
    const isDark = document.documentElement.classList.contains('dark');
    const style = {
      font: {
        family: 'system-ui, -apple-system, sans-serif',
        style: 'normal',
        color: isDark ? '#e2e8f0' : '#1f2937'
      },
      xAxis: { tickMaxCount: 6 },
      yAxis: { tickMaxCount: 6 },
      getAxisLabelFontSize: () => 14,
      getTickLabelFontSize: () => 12,
      getDefaultLineWidth: () => 4,
      plotBackgroundColor: isDark ? '#1e293b' : '#ffffff'
    };

    const options = { style, responsive: true, animations: true };
    const graphView = new GraphView(canvas, viewModel, options, true);
    updateGraphData(graphView);
    return graphView;
  };

  const setCarbonPriceFromPos = (pos: number) => {
    if (!carbonPriceInputRef.current) return;

    const min = carbonPriceInputRef.current.min ?? 0;
    const max = carbonPriceInputRef.current.max ?? 250;
    const value = min + (pos / 100) * (max - min);

    carbonPriceInputRef.current.set(value);
    setCarbonPriceValue(value);
  };

  const handleCarbonPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const pos = parseFloat(e.target.value);
    setCarbonPricePos(pos);
    setCarbonPriceFromPos(pos);
  };

  useEffect(() => {
    const initApp = async () => {
      try {
        setIsLoading(true);
        coreConfigRef.current = getDefaultConfig();
        modelRef.current = await createAsyncModel();
        modelContextRef.current = modelRef.current.addContext();
        createDefaultOutputs();

        carbonPriceInputRef.current = modelContextRef.current.getInputForId(CARBON_PRICE_INPUT_ID);
        if (carbonPriceInputRef.current) {
          const current = carbonPriceInputRef.current.get();
          const min = carbonPriceInputRef.current.min ?? 0;
          const max = carbonPriceInputRef.current.max ?? 250;
          const denom = max - min;
          const pos = denom === 0 ? 0 : ((current - min) / denom) * 100;

          const clampedPos = Math.max(0, Math.min(100, pos));
          setCarbonPricePos(clampedPos);
          setCarbonPriceDefaultPos(clampedPos);
          setCarbonPriceValue(current);
        }

        modelContextRef.current.onOutputsChanged = () => {
          updateAllGraphs();
        };

        setTimeout(() => {
          if (airCanvasRef.current) {
            airGraphViewRef.current = initGraph(airCanvasRef.current, AIR_POLLUTION_GRAPH_ID);
          }
          if (priceCanvasRef.current) {
            priceGraphViewRef.current = initGraph(priceCanvasRef.current, AVG_ENERGY_PRICE_GRAPH_ID);
          }
          updateAllGraphs();
        }, 150);

        setIsLoading(false);
      } catch {
        setError('Failed to load En-ROADS model.');
        setIsLoading(false);
      }
    };

    initApp();

    return () => {
      modelRef.current = null;
      modelContextRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (isLoading || !coreConfigRef.current) return;

    const previousBodyOverflow = document.body.style.overflow;
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    }

    const timer = window.setTimeout(() => {
      if (airCanvasRef.current) {
        airGraphViewRef.current = initGraph(airCanvasRef.current, AIR_POLLUTION_GRAPH_ID);
      }
      if (priceCanvasRef.current) {
        priceGraphViewRef.current = initGraph(priceCanvasRef.current, AVG_ENERGY_PRICE_GRAPH_ID);
      }
      updateAllGraphs();
    }, 120);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [isExpanded, isLoading]);

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading Model...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  // ─── Shared JSX pieces ────────────────────────────────────────────────────

  /** Temperature card — same design as every other En-ROADS dashboard */
  const TemperatureCard = (
    <div className="flex justify-center mb-4">
      <div className="bg-white dark:bg-gray-800 px-6 py-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 text-center inline-flex flex-col items-center w-fit mx-auto">
        <span
          ref={tempCRef}
          style={{ color: '#14a9df', fontSize: 'clamp(3rem, 3vw, 3rem)', fontWeight: 800, lineHeight: 1.5 }}
        >
          +3.2°C
        </span>
        <div className="mx-auto my-4 h-[2px] w-[72%] bg-black" />
        <span
          ref={tempFRef}
          style={{ color: '#14a9df', fontSize: 'clamp(1.5rem, 1.5vw, 1.5rem)', fontWeight: 800, lineHeight: 1 }}
        >
          +5.7°F
        </span>
        <div
          className="mt-3 leading-tight text-gray-900 dark:text-gray-100"
          style={{ fontSize: 'clamp(1.5rem, 1.5vw, 1.5rem)', fontWeight: 800 }}
        >
          Temperature<br />Increase by<br />2100
        </div>
      </div>
    </div>
  );

  /** Legend badges */
  const Legend = (
    <div className="flex justify-center gap-3 mt-3">
      <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#000000' }}>BASELINE</span>
      <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#53B1E8' }}>CURRENT SCENARIO</span>
    </div>
  );

  return (
    <div
      className={isExpanded
        ? 'fixed inset-0 z-50 bg-white p-4 md:p-6 overflow-y-auto font-sora'
        : 'bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 font-sora mb-24'}
    >
      <div className={isExpanded ? 'w-full h-full' : ''}>
        {/* ── Header ── */}
        {isExpanded ? (
          <div className="relative px-4 pt-4 mb-4">
            <h2 className="text-2xl font-extrabold text-gray-800 dark:text-gray-200 text-center">
              Make a Model: Carbon Price
            </h2>
            <button
              type="button"
              onClick={() => setIsExpanded((v) => !v)}
              className="absolute right-4 top-4 px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg border hover:opacity-90"
              style={{ backgroundColor: '#53B1E8', borderColor: '#53B1E8', color: '#ffffff' }}
            >
              Close Full Screen
            </button>
          </div>
        ) : (
          <div className="flex items-start justify-between gap-3 px-4 pt-4 mb-4">
            <h2 className="text-2xl font-extrabold text-gray-800 dark:text-gray-200">
              Make a Model: Carbon Price
            </h2>
            <button
              type="button"
              onClick={() => setIsExpanded((v) => !v)}
              className="px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg border hover:opacity-90"
              style={{ backgroundColor: '#53B1E8', borderColor: '#53B1E8', color: '#ffffff' }}
            >
              Open Full Screen
            </button>
          </div>
        )}

        {/* ── Temperature card (always visible, refs update via DOM) ── */}
        {TemperatureCard}

        {/* ── Graph grid ── */}
        {isExpanded ? (
          <div className="overflow-x-auto mb-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 min-w-[980px]">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600">
                <h3 className="text-xl font-extrabold text-gray-700 dark:text-gray-200 mb-2">Air Pollution</h3>
                <div className="relative w-full">
                  <canvas ref={airCanvasRef} className="w-full h-full" />
                </div>
                {Legend}
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600">
                <h3 className="text-xl font-extrabold text-gray-700 dark:text-gray-200 mb-2">Average Price of Energy to Consumers</h3>
                <div className="relative w-full">
                  <canvas ref={priceCanvasRef} className="w-full h-full" />
                </div>
                {Legend}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600">
              <h3 className="text-xl font-extrabold text-gray-700 dark:text-gray-200 mb-2">Air Pollution</h3>
              <div className="relative w-full">
                <canvas ref={airCanvasRef} className="w-full h-full" />
              </div>
              {Legend}
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600">
              <h3 className="text-xl font-extrabold text-gray-700 dark:text-gray-200 mb-2">Average Price of Energy to Consumers</h3>
              <div className="relative w-full">
                <canvas ref={priceCanvasRef} className="w-full h-full" />
              </div>
              {Legend}
            </div>
          </div>
        )}

        {/* ── Carbon Price slider ── */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 space-y-2">
          <div className="flex justify-between font-bold text-gray-700 dark:text-gray-200">
            <label>Carbon Price</label>
            <span className="text-xs font-mono text-gray-500">{getCarbonPriceRangeLabel(carbonPriceValue)}</span>
          </div>
          <div className="enroads-range-wrap">
            {carbonPriceDefaultPos !== null && (
              <div className="enroads-range-tick" style={{ ['--tick-frac' as any]: String(carbonPriceDefaultPos / 100) }} />
            )}
            <input
              type="range"
              min="0"
              max="100"
              value={carbonPricePos}
              onChange={handleCarbonPriceChange}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-green-500"
              style={{
                background: getRangeHighlightBackground(carbonPricePos, carbonPriceDefaultPos, '#53B1E8')
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
