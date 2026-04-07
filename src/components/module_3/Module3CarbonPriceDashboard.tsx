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

  const [carbonPricePos, setCarbonPricePos] = useState(0);
  const [carbonPriceValue, setCarbonPriceValue] = useState(0);

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
      const series = modelContextRef.current.getSeriesForVar(
        datasetSpec.varId,
        datasetSpec.externalSourceName
      );

      datasetViewModel.points = [...(series?.points || [])];

      if (!datasetSpec.externalSourceName) {
        datasetSpec.color = '#3B82F6';
        datasetSpec.lineWidth = 4;
      } else if (datasetSpec.externalSourceName === 'baseline') {
        datasetSpec.color = '#000000';
        datasetSpec.lineWidth = 4;
      }
    }

    graphView.updateData(true);
  };

  const updateAllGraphs = () => {
    if (airGraphViewRef.current) updateGraphData(airGraphViewRef.current);
    if (priceGraphViewRef.current) updateGraphData(priceGraphViewRef.current);
  };

  const initGraph = (canvas: HTMLCanvasElement, graphId: string) => {
    if (!coreConfigRef.current) return null;
    const graphSpec = coreConfigRef.current.graphs.get(graphId);
    if (!graphSpec) return null;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.style.width = rect.width + 'px';
    canvas.style.height = '260px';
    canvas.width = rect.width * dpr;
    canvas.height = 260 * dpr;

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

          setCarbonPricePos(Math.max(0, Math.min(100, pos)));
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

    return () => { };
  }, []);

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading Model...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 font-sora">

      <div className="grid grid-cols-1 gap-4 mb-4">
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600">
          <div className="flex justify-between items-center mb-2">
            <div className="font-bold text-gray-800 dark:text-gray-200">Air Pollution</div>
          </div>
          <div className="relative w-full h-[260px]">
            <canvas ref={airCanvasRef} className="w-full h-full" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600">
          <div className="flex justify-between items-center mb-2">
            <div className="font-bold text-gray-800 dark:text-gray-200">Average Price of Energy to Consumers</div>
          </div>
          <div className="relative w-full h-[260px]">
            <canvas ref={priceCanvasRef} className="w-full h-full" />
          </div>
        </div>

        <div className="flex gap-4 justify-center text-xs font-semibold uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <div className="w-6 h-1 bg-black"></div>
            <span className="text-gray-600 dark:text-gray-400">Baseline</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-1 bg-blue-500"></div>
            <span className="text-gray-600 dark:text-gray-400">Current Scenario</span>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 space-y-4">
        <div className="flex justify-between items-center">
          <label className="font-bold text-gray-700 dark:text-gray-200">Carbon Price</label>
          <span className="text-sm font-mono text-gray-500">{getCarbonPriceRangeLabel(carbonPriceValue)}</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={carbonPricePos}
          onChange={handleCarbonPriceChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-500"
        />
      </div>
    </div>
  );
}
