import { useEffect, useRef, useState, ChangeEvent } from 'react';
import { createAsyncModel, getDefaultConfig, createDefaultOutputs } from '@climateinteractive/en-roads-core';
import enStrings from '@climateinteractive/en-roads-core/strings/en';
import { GraphView } from '@climateinteractive/sim-ui-graph';
import '../styles/enroads-dashboard.css';

type GraphConfig = {
  id: string;
  label: string;
  canvasId: string;
};

// Subsection 5 graphs: combined CO₂ Emissions and Removals, plus CO₂ Concentration
const GRAPH_CONFIGS = [
  { id: '57', label: 'CO₂ Emissions and Removals', canvasId: 'module2-removals-graph-emissions-removals' },
  { id: '88', label: 'CO₂ Concentration', canvasId: 'module2-removals-graph-concentration' },
] as const satisfies ReadonlyArray<GraphConfig>;

const CARBON_PRICE_INPUT_ID = '39';
const CARBON_PRICE_FINAL_INPUT_ID = '42';
const NATURE_REMOVALS_INPUT_ID = '417';
const TECHNOLOGICAL_REMOVALS_INPUT_ID = '67';
const TECHNOLOGICAL_REMOVALS_MODE_SWITCH_ID = '208';
const NATURE_REMOVALS_MODE_SWITCH_ID = '418';

export default function Module2RemovalsDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Slider states
  const [carbonPriceVal, setCarbonPriceVal] = useState(0);
  const [carbonPriceText, setCarbonPriceText] = useState('$0 / ton CO₂');
  const [carbonPriceDefaultPct, setCarbonPriceDefaultPct] = useState<number | null>(null);
  const [natureVal, setNatureVal] = useState(0);
  const [natureText, setNatureText] = useState('status quo');
  const [natureDefaultPct, setNatureDefaultPct] = useState<number | null>(null);
  const [techVal, setTechVal] = useState(0);
  const [techText, setTechText] = useState('status quo');
  const [techDefaultPct, setTechDefaultPct] = useState<number | null>(null);

  // Temperature display
  const [tempC, setTempC] = useState(3.3);
  const [tempF, setTempF] = useState(5.9);

  const modelRef = useRef<any>(null);
  const modelContextRef = useRef<any>(null);
  const coreConfigRef = useRef<any>(null);

  // One GraphView ref per graph
  const graphViewRefs = useRef<Record<string, any>>({});

  // Input refs
  const carbonPriceInputRef = useRef<any>(null);
  const carbonPriceFinalRef = useRef<any>(null);
  const natureInputRef = useRef<any>(null); // Afforestation / nature-based removal
  const techInputRef = useRef<any>(null); // Technological removal (DACCS, etc.)
  const techModeSwitchRef = useRef<any>(null);
  const natureModeSwitchRef = useRef<any>(null);

  const str = (key: string) => (enStrings as any)[key] || key;

  const getInputRangeLabel = (input: any, value: number) => {
    const rangeLabelKeys: string[] = input?.spec?.rangeLabelKeys ?? [
      'input_range__status_quo',
      'input_range__low',
      'input_range__medium',
      'input_range__high',
      'input_range__very_high'
    ];
    const rangeDividers: number[] = input?.spec?.rangeDividers ?? [6, 20, 60, 100];

    let idx = rangeDividers.findIndex((d) => value < d);
    if (idx === -1) idx = rangeLabelKeys.length - 1;
    return str(rangeLabelKeys[idx] ?? 'input_range__status_quo');
  };

  const toSliderPos = (value: number, min: number, max: number) => {
    const denom = max - min;
    if (denom === 0) return 0;
    return Math.max(0, Math.min(100, ((value - min) / denom) * 100));
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
      points: [],
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
    try {
      if (!graphView || !modelContextRef.current) return;
      const graphViewModel = graphView.viewModel;
      const graphId = graphViewModel?.spec?.id;
      for (const datasetViewModel of graphViewModel.getDatasets()) {
        const datasetSpec = datasetViewModel.spec;
        const series = modelContextRef.current.getSeriesForVar(
          datasetSpec.varId,
          datasetSpec.externalSourceName
        );
        datasetViewModel.points = [...(series?.points || [])];

        // Graph 57 is a two-line composition graph from SDK (emissions/removals).
        // Keep semantic colors that match En-ROADS.
        if (graphId === '57') {
          if (datasetSpec.varId === '_co2_gross_emissions') {
            datasetSpec.color = '#cc3b09';
            datasetSpec.lineWidth = 4;
          } else if (datasetSpec.varId === '_net_uptake_and_net_sequestration') {
            datasetSpec.color = '#0063b0';
            datasetSpec.lineWidth = 4;
          }
          continue;
        }

        // Other graphs in this subsection use baseline/current scenario coloring.
        if (!datasetSpec.externalSourceName) {
          datasetSpec.color = '#00b6f1';
          datasetSpec.lineWidth = 4;
        } else if (datasetSpec.externalSourceName === 'baseline' || datasetSpec.externalSourceName === 'Ref') {
          datasetSpec.color = '#000000';
          datasetSpec.lineWidth = 4;
        }
      }
      graphView.updateData(true);
    } catch (e) {
      console.error(e);
    }
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

  const loadGraph = (canvasId: string, graphId: string, height = 250) => {
    if (!coreConfigRef.current) return;
    const graphSpec = coreConfigRef.current.graphs.get(graphId);
    if (!graphSpec) return;

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
        font: { family: 'system-ui, sans-serif', size: 12, color: isDark ? '#e2e8f0' : '#333' },
        xAxis: { tickMaxCount: 6 },
        yAxis: { tickMaxCount: 6 },
        getDefaultLineWidth: () => 4,
        plotBackgroundColor: isDark ? '#1e293b' : '#ffffff'
      };
      const gv = new GraphView(canvas, viewModel, { style }, true);
      graphViewRefs.current[canvasId] = gv;
      updateGraphData(gv);
    } catch (e) {
      console.error('Error loading graph', canvasId, e);
    }
  };

  // Slider handlers
  const handleCarbonPriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCarbonPriceVal(val);
    if (carbonPriceInputRef.current && modelRef.current) {
      const min = carbonPriceInputRef.current.min ?? 0;
      const max = carbonPriceInputRef.current.max ?? 250;
      const modelVal = min + (val / 100) * (max - min);
      carbonPriceInputRef.current.set(modelVal);
      if (carbonPriceFinalRef.current) {
        carbonPriceFinalRef.current.set(modelVal);
      }
      setCarbonPriceText(getInputRangeLabel(carbonPriceInputRef.current, modelVal));
      setTimeout(() => updateAllGraphs(), 100);
    }
  };

  const handleNatureChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setNatureVal(val);
    if (natureInputRef.current && modelRef.current) {
      const min = natureInputRef.current.min ?? 0;
      const max = natureInputRef.current.max ?? 100;
      const modelVal = min + (val / 100) * (max - min);
      natureInputRef.current.set(modelVal);
      setNatureText(getInputRangeLabel(natureInputRef.current, modelVal));
      setTimeout(() => updateAllGraphs(), 100);
    }
  };

  const handleTechChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setTechVal(val);
    if (techInputRef.current && modelRef.current) {
      const min = techInputRef.current.min ?? 0;
      const max = techInputRef.current.max ?? 100;
      const modelVal = min + (val / 100) * (max - min);
      techInputRef.current.set(modelVal);
      setTechText(getInputRangeLabel(techInputRef.current, modelVal));
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

        // Use exact En-ROADS slider IDs so behavior/labels match the reference UI.
        carbonPriceInputRef.current = modelContextRef.current.getInputForId(CARBON_PRICE_INPUT_ID);
        carbonPriceFinalRef.current = modelContextRef.current.getInputForId(CARBON_PRICE_FINAL_INPUT_ID);
        natureInputRef.current = modelContextRef.current.getInputForId(NATURE_REMOVALS_INPUT_ID);
        techInputRef.current = modelContextRef.current.getInputForId(TECHNOLOGICAL_REMOVALS_INPUT_ID);
        techModeSwitchRef.current = modelContextRef.current.getInputForId(TECHNOLOGICAL_REMOVALS_MODE_SWITCH_ID);
        natureModeSwitchRef.current = modelContextRef.current.getInputForId(NATURE_REMOVALS_MODE_SWITCH_ID);

        // Ensure aggregate sliders are active (same mode users expect in En-ROADS top-level sliders).
        // 208 offValue=1 enables slider 67; 418 offValue=0 enables slider 417.
        if (techModeSwitchRef.current?.set) techModeSwitchRef.current.set(1);
        if (natureModeSwitchRef.current?.set) natureModeSwitchRef.current.set(0);

        // Fallback: dump all inputs to help debug
        if (!carbonPriceInputRef.current || !natureInputRef.current || !techInputRef.current) {
          console.log('Module2Removals: Dumping all inputs for debugging...');
          for (let i = 0; i < 200; i++) {
            const input = modelContextRef.current.getInputForId(String(i));
            if (input?.varId) {
              console.log(`  ID ${i}: ${input.varId}`);
            }
          }
        }

        // Initialize slider positions and labels from model defaults (status quo).
        if (carbonPriceInputRef.current) {
          const current = carbonPriceInputRef.current.get();
          const min = carbonPriceInputRef.current.min ?? 0;
          const max = carbonPriceInputRef.current.max ?? 250;
          const pos = toSliderPos(current, min, max);
          setCarbonPriceVal(pos);
          setCarbonPriceDefaultPct(pos);
          setCarbonPriceText(getInputRangeLabel(carbonPriceInputRef.current, current));
        }

        if (natureInputRef.current) {
          const current = natureInputRef.current.get();
          const min = natureInputRef.current.min ?? 0;
          const max = natureInputRef.current.max ?? 100;
          const pos = toSliderPos(current, min, max);
          setNatureVal(pos);
          setNatureDefaultPct(pos);
          setNatureText(getInputRangeLabel(natureInputRef.current, current));
        }

        if (techInputRef.current) {
          const current = techInputRef.current.get();
          const min = techInputRef.current.min ?? 0;
          const max = techInputRef.current.max ?? 100;
          const pos = toSliderPos(current, min, max);
          setTechVal(pos);
          setTechDefaultPct(pos);
          setTechText(getInputRangeLabel(techInputRef.current, current));
        }

        modelContextRef.current.onOutputsChanged = () => updateAllGraphs();

        setTimeout(() => {
          for (const cfg of GRAPH_CONFIGS) {
            loadGraph(cfg.canvasId, cfg.id);
          }
          updateTemperatureDisplay();
        }, 200);

        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load En-ROADS model.');
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

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading Model...</div>;
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
              ⚙️ Make a Model: Carbon Price + CO₂ Removals
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
              ⚙️ Make a Model: Carbon Price + CO₂ Removals
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

        {isExpanded ? (
          <div className="overflow-x-auto mb-4">
            <div className="flex items-stretch gap-4 min-w-[1320px]">
              {GRAPH_CONFIGS.map((cfg) => (
                <div
                  key={cfg.canvasId}
                  className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 flex-1 min-w-0"
                >
                  <h3 className="text-xl font-extrabold text-gray-700 dark:text-gray-200 mb-2">{cfg.label}</h3>
                  <div className="relative w-full">
                    <canvas id={cfg.canvasId} className="w-full h-full" />
                  </div>
                  <div className="flex justify-center gap-3 mt-3">
                    {cfg.id === '57' ? (
                      <>
                        <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#cc3b09' }}>CO₂ EMISSIONS</span>
                        <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#0063b0' }}>CO₂ REMOVALS</span>
                      </>
                    ) : (
                      <>
                        <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#000000' }}>BASELINE</span>
                        <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#00b6f1' }}>CURRENT SCENARIO</span>
                      </>
                    )}
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
                    className="mt-5 leading-tight text-gray-900 dark:text-gray-100"
                    style={{
                      fontSize: 'clamp(1.5rem, 1.5vw, 1.5rem)',
                      fontWeight: 800,
                    }}
                  >
                    Temperature
                    <br />
                    Increase by
                    <br />
                    2100
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Temperature display */}
            <div className="flex justify-center mb-4">
              <div className="bg-white dark:bg-gray-800 px-8 py-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 text-center w-full max-w-[430px] mx-auto">
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
                  className="mt-3 leading-tight text-gray-900 dark:text-gray-100"
                  style={{
                    fontSize: 'clamp(1.5rem, 1.5vw, 1.5rem)',
                    fontWeight: 800,
                  }}
                >
                  Temperature
                  <br />
                  Increase by
                  <br />
                  2100
                </div>
              </div>
            </div>

            {/* Graphs */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {GRAPH_CONFIGS.map((cfg) => (
                <div
                  key={cfg.canvasId}
                  className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600"
                >
                  <h3 className="text-xl font-extrabold text-gray-700 dark:text-gray-200 mb-2">{cfg.label}</h3>
                  <div className="relative w-full">
                    <canvas id={cfg.canvasId} className="w-full h-full" />
                  </div>
                  <div className="flex justify-center gap-3 mt-3">
                    {cfg.id === '57' ? (
                      <>
                        <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#cc3b09' }}>CO₂ EMISSIONS</span>
                        <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#0063b0' }}>CO₂ REMOVALS</span>
                      </>
                    ) : (
                      <>
                        <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#000000' }}>BASELINE</span>
                        <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#00b6f1' }}>CURRENT SCENARIO</span>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Sliders */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 space-y-6">
          {/* Carbon Price */}
          <div className="space-y-2">
            <div className="flex justify-between font-bold text-gray-700 dark:text-gray-200">
              <label>Carbon Price</label>
              <span className="text-xs font-mono text-gray-500">{carbonPriceText}</span>
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
                onChange={handleCarbonPriceChange}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: getRangeHighlightBackground(carbonPriceVal, carbonPriceDefaultPct, '#3B82F6')
                }}
              />
            </div>
          </div>

          {/* Nature-based Removals */}
          <div className="space-y-2">
            <div className="flex justify-between font-bold text-gray-700 dark:text-gray-200">
              <label>Nature-Based Removals</label>
              <span className="text-xs font-mono text-gray-500">{natureText}</span>
            </div>
            <div className="enroads-range-wrap">
              {natureDefaultPct !== null && (
                <div className="enroads-range-tick" style={{ ['--tick-frac' as any]: String(natureDefaultPct / 100) }} />
              )}
              <input
                type="range"
                min="0"
                max="100"
                value={natureVal}
                onChange={handleNatureChange}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: getRangeHighlightBackground(natureVal, natureDefaultPct, '#3B82F6')
                }}
              />
            </div>
          </div>

          {/* Technological Removals */}
          <div className="space-y-2">
            <div className="flex justify-between font-bold text-gray-700 dark:text-gray-200">
              <label>Technological Removals</label>
              <span className="text-xs font-mono text-gray-500">{techText}</span>
            </div>
            <div className="enroads-range-wrap">
              {techDefaultPct !== null && (
                <div className="enroads-range-tick" style={{ ['--tick-frac' as any]: String(techDefaultPct / 100) }} />
              )}
              <input
                type="range"
                min="0"
                max="100"
                value={techVal}
                onChange={handleTechChange}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: getRangeHighlightBackground(techVal, techDefaultPct, '#3B82F6')
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
