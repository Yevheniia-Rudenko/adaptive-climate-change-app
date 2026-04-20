import { useEffect, useRef, useState, ChangeEvent } from 'react';
import { createAsyncModel, getDefaultConfig, createDefaultOutputs } from '@climateinteractive/en-roads-core';
import enStrings from '@climateinteractive/en-roads-core/strings/en';
import deStrings from '@climateinteractive/en-roads-core/strings/de';
import esStrings from '@climateinteractive/en-roads-core/strings/es';
import { GraphView } from '@climateinteractive/sim-ui-graph';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/enroads-dashboard.css';

// Two fixed graphs for Module 2 — Temperature is shown via the side card only
const GRAPH_CONFIGS = [
  { id: '104', labelKey: 'graph_104_title', canvasId: 'module2-graph-emissions' },
  { id: '88', labelKey: 'graph_88_title', canvasId: 'module2-graph-concentration' },
];

export default function Module2ExerciseDashboard() {
  const { language, t } = useLanguage();
  const tx = t.data.modules.module2.components.exercise;
  
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Carbon Price slider state
  const [carbonPriceVal, setCarbonPriceVal] = useState(0);
  const [sliderText, setSliderText] = useState(tx.statusQuo);
  const [carbonPriceDefaultPct, setCarbonPriceDefaultPct] = useState<number | null>(null);

  // Temperature display
  const [tempC, setTempC] = useState(3.3);
  const [tempF, setTempF] = useState(5.9);

  const modelRef = useRef<any>(null);
  const modelContextRef = useRef<any>(null);
  const coreConfigRef = useRef<any>(null);

  // One GraphView ref per graph
  const graphViewRefs = useRef<Record<string, any>>({});

  // Carbon Price input refs (En-ROADS uses both initial + final targets)
  const carbonPriceInputRef = useRef<any>(null);
  const carbonPriceFinalRef = useRef<any>(null);

  const getEnRoadsStrings = () => {
    switch (language) {
      case 'de': return deStrings;
      case 'es': return esStrings;
      default: return enStrings;
    }
  };

  const str = (key: string) => {
    if (key === 'graph_104_title') return language === 'de' ? 'CO2-Nettoemissionen' : language === 'es' ? 'Emisiones netas de CO2' : language === 'tr' ? 'CO₂ net emisyonları' : 'CO₂ Net Emissions';
    if (key === 'graph_88_title') return language === 'de' ? 'CO2-Konzentration' : language === 'es' ? 'Concentración de CO2' : language === 'tr' ? 'CO₂ konsantrasyonu' : 'CO₂ Concentration';
    return (getEnRoadsStrings() as any)[key] || key;
  };

  const getSliderText = (modelVal: number, max: number) => {
    const pct = max > 0 ? modelVal / max : 0;
    if (pct <= 0) return tx.statusQuo;
    if (pct < 0.15) return tx.low;
    if (pct < 0.4) return tx.medium;
    if (pct < 0.7) return tx.high;
    return tx.veryHigh;
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
      formatYAxisTooltipValue: (value: number) => value.toFixed(2),
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

      const newPoints = series?.points || [];
      datasetViewModel.points = [...newPoints];

      // Hide scatter/point datasets (single data points that show as stray dots)
      if (newPoints.length <= 2) {
        datasetViewModel.visible = false;
        continue;
      }

      // Color coding
      // En-ROADS graph datasets can vary by external source name, so force
      // baseline/ref to black and all other scenario lines to the requested blue.
      if (datasetSpec.externalSourceName === 'baseline' || datasetSpec.externalSourceName === 'Ref') {
        datasetSpec.color = '#000000'; // Baseline
      } else {
        datasetSpec.color = '#53B1E8'; // Current scenario
      }
      datasetSpec.lineWidth = 4;
    }

    graphView.updateData(true);
  };

  const updateTemperatureDisplay = () => {
    if (!modelContextRef.current) return;
    let tempSeries = modelContextRef.current.getSeriesForVar('_temperature_change_from_1850');
    if (!tempSeries || !tempSeries.points) {
      tempSeries = modelContextRef.current.getSeriesForVar('_temperature_relative_to_1850_1900');
    }
    if (tempSeries?.points?.length > 0) {
      const tempCelsius = tempSeries.getValueAtTime(2100);
      setTempC(tempCelsius);
      setTempF(tempCelsius * 9 / 5);
    }
  };

  const updateAllGraphs = () => {
    for (const key of Object.keys(graphViewRefs.current)) {
      if (graphViewRefs.current[key]) updateGraphData(graphViewRefs.current[key]);
    }
    updateTemperatureDisplay();
  };

  const loadGraph = (canvasId: string, graphId: string, height = 280) => {
    if (!coreConfigRef.current) return;
    const graphSpec = coreConfigRef.current.graphs.get(graphId);

    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = '100%';
    canvas.style.height = `${height}px`;

    try {
      const viewModel = createGraphViewModel(graphSpec);
      const isDark = document.documentElement.classList.contains('dark');
      const style = {
        font: { family: 'system-ui, -apple-system, sans-serif', style: 'normal', color: isDark ? '#e2e8f0' : '#1f2937' },
        xAxis: { tickMaxCount: 6 },
        yAxis: { tickMaxCount: 6 },
        getAxisLabelFontSize: () => 14,
        getTickLabelFontSize: () => 12,
        getDefaultLineWidth: () => 4,
        plotBackgroundColor: isDark ? '#1e293b' : '#ffffff'
      };
      const gv = new GraphView(canvas, viewModel, { style, responsive: true, animations: true }, true);
      graphViewRefs.current[canvasId] = gv;
      updateGraphData(gv);
    } catch (e) {
      console.error('Error loading graph', canvasId, e);
    }
  };

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCarbonPriceVal(val);

    if (carbonPriceInputRef.current && modelRef.current) {
      // Map 0-100 slider to $0-$250/ton CO₂
      const modelVal = (val / 100) * 250;

      // En-ROADS sets both initial AND final carbon tax targets together
      carbonPriceInputRef.current.set(modelVal);
      if (carbonPriceFinalRef.current) {
        carbonPriceFinalRef.current.set(modelVal);
      }

      setSliderText(val === 0 ? tx.statusQuo : getSliderText(modelVal, 250));
      setTimeout(() => updateAllGraphs(), 100);
    }
  };

  useEffect(() => {
    const initApp = async () => {
      try {
        setIsLoading(true);
        coreConfigRef.current = getDefaultConfig();
        modelRef.current = await createAsyncModel();
        modelContextRef.current = modelRef.current.addContext();
        createDefaultOutputs();

        // Find Carbon Price inputs — En-ROADS uses both initial and final targets
        // ID 39 = _carbon_tax_initial_target, ID 42 = _carbon_tax_final_target
        carbonPriceInputRef.current = modelContextRef.current.getInputForId('39');
        carbonPriceFinalRef.current = modelContextRef.current.getInputForId('42');

        if (carbonPriceInputRef.current) {
          const current = carbonPriceInputRef.current.get?.() ?? 0;
          const pos = Math.max(0, Math.min(100, (current / 250) * 100));
          setCarbonPriceVal(pos);
          setCarbonPriceDefaultPct(pos);
          setSliderText(pos === 0 ? tx.statusQuo : getSliderText(current, 250));
        }

        modelContextRef.current.onOutputsChanged = () => updateAllGraphs();

        setTimeout(() => {
          for (const cfg of GRAPH_CONFIGS) {
            loadGraph(cfg.canvasId, cfg.id, 250);
          }
          updateTemperatureDisplay();
        }, 200);

        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError(tx.failedToLoad);
        setIsLoading(false);
      }
    };

    if (!modelRef.current) initApp();
  }, []);

  useEffect(() => {
    if (isLoading || !coreConfigRef.current) return;

    const previousBodyOverflow = document.body.style.overflow;
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    }

    const timer = window.setTimeout(() => {
      for (const cfg of GRAPH_CONFIGS) {
        loadGraph(cfg.canvasId, cfg.id, isExpanded ? 300 : 250);
      }
      updateTemperatureDisplay();
    }, 120);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [isExpanded, isLoading]);

  if (isLoading) {
    return (
      <div className="enroads-loading">
        <div className="loading-spinner"></div>
        <p>{tx.loadingModel}</p>
      </div>
    );
  }

  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div
      className={isExpanded
        ? 'fixed inset-0 z-50 bg-white p-4 md:p-6 overflow-y-auto font-sora'
        : 'bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 font-sora mb-24'}
    >
      <div className={isExpanded ? 'w-full h-full' : ''}>
        {isExpanded ? (
          <div className="relative px-4 pt-4 mb-4">
            <h2 className="text-2xl font-extrabold text-gray-800 dark:text-gray-200 text-center">
              {tx.title}
            </h2>
            <button
              type="button"
              onClick={() => setIsExpanded((v) => !v)}
              className="absolute right-4 top-4 px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg border hover:opacity-90"
              style={{ backgroundColor: '#53B1E8', borderColor: '#53B1E8', color: '#ffffff' }}
            >
              {tx.closeFullscreen}
            </button>
          </div>
        ) : (
          <div className="flex items-start justify-between gap-3 px-4 pt-4 mb-4">
            <h2 className="text-2xl font-extrabold text-gray-800 dark:text-gray-200">
              {tx.title}
            </h2>
            <button
              type="button"
              onClick={() => setIsExpanded((v) => !v)}
              className="px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg border hover:opacity-90"
              style={{ backgroundColor: '#53B1E8', borderColor: '#53B1E8', color: '#ffffff' }}
            >
              {tx.openFullscreen}
            </button>
          </div>
        )}

        {isExpanded ? (
          <div className="overflow-x-auto mb-4">
            <div className="flex items-stretch gap-4 min-w-[1320px]">
              {GRAPH_CONFIGS.map((cfg) => (
                <div
                  key={cfg.canvasId}
                  className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 flex-1 min-w-0"
                >
                  <h3 className="text-xl font-extrabold text-gray-700 dark:text-gray-200 mb-2">{str(cfg.labelKey)}</h3>
                  <div className="relative w-full">
                    <canvas id={cfg.canvasId} className="w-full h-full" />
                  </div>
                  <div className="flex justify-center gap-3 mt-3">
                    <span className="px-3 py-1 text-xs font-bold uppercase text-white bg-black rounded" style={{ backgroundColor: '#000000' }}>{tx.baseline}</span>
                    <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#53B1E8' }}>{tx.currentScenario}</span>
                  </div>
                </div>
              ))}

              <div className="shrink-0 w-fit">
                <div
                  className="px-6 pb-4 text-center inline-flex flex-col items-center w-fit h-fit"
                  style={{ transform: 'translateY(110px)' }}
                >
                  <div
                    style={{
                      color: '#14a9df',
                      fontSize: 'clamp(3rem, 3vw, 3rem)',
                      fontWeight: 800,
                      lineHeight: 1.5,
                    }}
                  >
                    +{tempC.toFixed(1)}°C
                  </div>
                  <div className="mx-auto my-4 h-[2px] w-[72%] bg-black" />
                  <div
                    style={{
                      color: '#14a9df',
                      fontSize: 'clamp(1.5rem, 1.5vw, 1.5rem)',
                      fontWeight: 800,
                      lineHeight: 1,
                    }}
                  >
                    +{tempF.toFixed(1)}°F
                  </div>
                  <div
                    className="mt-5 whitespace-pre-line leading-tight text-gray-900 dark:text-gray-100"
                    style={{
                      fontSize: 'clamp(1.5rem, 1.5vw, 1.5rem)',
                      fontWeight: 800,
                    }}
                  >
                    {tx.temperatureTitle}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Temperature card */}
            <div className="flex justify-center mb-4">
              <div className="bg-white dark:bg-gray-800 px-6 py-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 text-center inline-flex flex-col items-center w-fit mx-auto">
                <div
                  style={{
                    color: '#14a9df',
                    fontSize: 'clamp(3rem, 3vw, 3rem)',
                    fontWeight: 800,
                    lineHeight: 1.5,
                  }}
                >
                  +{tempC.toFixed(1)}°C
                </div>
                <div className="mx-auto my-4 h-[2px] w-[72%] bg-black" />
                <div
                  style={{
                    color: '#14a9df',
                    fontSize: 'clamp(1.5rem, 1.5vw, 1.5rem)',
                    fontWeight: 800,
                    lineHeight: 1,
                  }}
                >
                  +{tempF.toFixed(1)}°F
                </div>
                <div
                  className="mt-3 whitespace-pre-line leading-tight text-gray-900 dark:text-gray-100"
                  style={{
                    fontSize: 'clamp(1.5rem, 1.5vw, 1.5rem)',
                    fontWeight: 800,
                  }}
                >
                  {tx.temperatureTitle}
                </div>
              </div>
            </div>

            {/* CO₂ Net Emissions + CO₂ Concentration side by side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {GRAPH_CONFIGS.map((cfg) => (
                <div
                  key={cfg.canvasId}
                  className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600"
                >
                  <h3 className="text-xl font-extrabold text-gray-700 dark:text-gray-200 mb-2">{str(cfg.labelKey)}</h3>
                  <div className="relative w-full">
                    <canvas id={cfg.canvasId} className="w-full h-full" />
                  </div>
                  {/* Legend badges */}
                  <div className="flex justify-center gap-3 mt-3">
                    <span className="px-3 py-1 text-xs font-bold uppercase text-white bg-black rounded" style={{ backgroundColor: '#000000' }}>{tx.baseline}</span>
                    <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#53B1E8' }}>{tx.currentScenario}</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Carbon Price slider */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 space-y-2">
          <div className="flex justify-between font-bold text-gray-700 dark:text-gray-200">
            <label>{tx.carbonPrice}</label>
            <span className="text-xs font-mono text-gray-500">{sliderText}</span>
          </div>
          <div className="enroads-range-wrap">
            {carbonPriceDefaultPct !== null && (
              <div className="enroads-range-tick" style={{ ['--tick-frac' as any]: String(carbonPriceDefaultPct / 100) }} />
            )}
            <input
              type="range"
              min="0"
              max="100"
              value={carbonPriceVal}
              onChange={handleSliderChange}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-green-500"
              style={{
                background: getRangeHighlightBackground(carbonPriceVal, carbonPriceDefaultPct, '#53B1E8')
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
