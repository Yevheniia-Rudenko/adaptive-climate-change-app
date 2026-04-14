import { useEffect, useRef, useState, ChangeEvent } from 'react';
import { createAsyncModel, getDefaultConfig, createDefaultOutputs } from '@climateinteractive/en-roads-core';
import enStrings from '@climateinteractive/en-roads-core/strings/en';
import { GraphView } from '@climateinteractive/sim-ui-graph';
import '../styles/enroads-dashboard.css';

const MAIN_GRAPH = { id: '62', label: 'CO2 Emissions', varId: '_co2_equivalent_net_emissions', canvasId: 'module1-renewables-graph-emissions' };

const SECONDARY_GRAPHS = [
  { id: '90', label: 'Sea Level Rise', varId: '_slr_from_2000_in_meters' },
  { id: '275', label: 'Deaths from Extreme Heat', varId: '_excess_deaths_from_extreme_heat_per_100k_people' },
  { id: '279', label: 'Species Loss - Extinction', varId: '_percent_endemic_species_at_high_risk_of_extinction' },
  { id: '183', label: 'Crop Yield', varId: '_crop_yield_per_hectare_kg_per_year_per_ha' },
  { id: '112', label: 'Air Pollution', varId: '_pm2_5_emissions_from_energy_mt_per_year' }
];

const SECONDARY_GRAPH_CANVAS_ID = 'module1-renewables-graph-secondary';
const ALL_GRAPH_DEFS = [MAIN_GRAPH, ...SECONDARY_GRAPHS];

export default function Module1RenewablesDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedSecondaryGraphId, setSelectedSecondaryGraphId] = useState('90');

  const [renewablesVal, setRenewablesVal] = useState(0);
  const [renewablesText, setRenewablesText] = useState('status quo');

  // Use refs + direct DOM updates for temperature to avoid React re-renders
  // that reset the canvas on every model output change (the root cause of hover flicker).
  const tempCRef = useRef<HTMLSpanElement[]>([]);
  const tempFRef = useRef<HTMLSpanElement[]>([]);

  const modelRef = useRef<any>(null);
  const modelContextRef = useRef<any>(null);
  const graphViewRefs = useRef<Record<string, any>>({});
  const coreConfigRef = useRef<any>(null);
  const renewablesInputRef = useRef<any>(null);

  const str = (key: string) => (enStrings as any)[key] || key;

  // Slider position: -50 (left, highly discouraged / tax) → 0 (status quo) → 100 (right, highly encouraged / subsidy)
  const getSliderText = (sliderPos: number) => {
    if (sliderPos <= -25)  return 'Highly discouraged';
    if (sliderPos <= -1)   return 'Discouraged';
    if (sliderPos <= 30)   return 'Status quo';
    if (sliderPos <= 65)   return 'More encouraged';
    return 'Highly encouraged';
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
      formatYAxisTickValue: (value: number) => {
        const stringValue = value.toFixed(1);
        const title = graphSpec.title || '';
        if (graphSpec.kind === 'h-bar' || title.includes('Percent') || title.includes('Species')) {
          return `${stringValue}%`;
        }
        return stringValue;
      },
      formatYAxisTooltipValue: (value: number) => value.toFixed(2)
    };
  };

  const getGraphSpec = (graphId: string) => {
    const graphDef = ALL_GRAPH_DEFS.find((g) => g.id === graphId);
    const fromConfig = coreConfigRef.current?.graphs?.get(graphId);

    if (fromConfig) {
      if (graphId === '279') {
        // Explicitly assign En-ROADS species palette so chart lines and legend badges
        // always use the same hex values regardless of config color format.
        const MARINE = '#3385C6';
        const LAND   = '#843C0C';
        const curr = (fromConfig.datasets || []).filter((d: any) => !d.externalSourceName);
        const base = (fromConfig.datasets || []).filter(
          (d: any) => d.externalSourceName === 'Ref' || d.externalSourceName === 'baseline'
        );
        return {
          ...fromConfig,
          datasets: [
            ...base.slice(0, 2).map((d: any, i: number) => ({ ...d, color: [MARINE, LAND][i] })),
            ...curr.slice(0, 2).map((d: any, i: number) => ({ ...d, color: [MARINE, LAND][i] }))
          ]
        };
      }

      // For all other graphs, filter to 2 datasets (baseline + current).
      // Without this, raw config datasets with unknown externalSourceName values
      // return empty series → hidden by the ≤2-point guard → blank chart.
      const baselineDataset = fromConfig.datasets?.find(
        (d: any) => d.externalSourceName === 'Ref' || d.externalSourceName === 'baseline'
      );
      const currentDataset = fromConfig.datasets?.find((d: any) => !d.externalSourceName);

      if (baselineDataset && currentDataset) {
        return {
          ...fromConfig,
          datasets: [
            { ...baselineDataset, label: 'Baseline', color: '#000000', lineStyle: baselineDataset.lineStyle || 'thinline' },
            { ...currentDataset, label: 'Current', color: '#53B1E8', lineStyle: currentDataset.lineStyle || 'line' }
          ]
        };
      }

      if (graphDef) {
        return {
          ...fromConfig,
          datasets: [
            { varId: graphDef.varId, externalSourceName: 'Ref', label: 'Baseline', color: '#000000', lineStyle: 'thinline' },
            { varId: graphDef.varId, label: 'Current', color: '#53B1E8', lineStyle: 'line' }
          ]
        };
      }
    }

    if (!graphDef) return null;

    return {
      id: graphId,
      title: graphDef.label,
      kind: 'line',
      datasets: [
        { varId: graphDef.varId, externalSourceName: 'Ref', label: 'Baseline', color: '#000000', lineStyle: 'thinline' },
        { varId: graphDef.varId, label: 'Current', color: '#53B1E8', lineStyle: 'line' }
      ]
    };
  };

  const updateGraphData = (graphView: any) => {
    try {
      if (!graphView || !modelContextRef.current) return;

      const graphViewModel = graphView.viewModel;
      for (const datasetViewModel of graphViewModel.getDatasets()) {
        const datasetSpec = datasetViewModel.spec;
        let series = modelContextRef.current.getSeriesForVar(
          datasetSpec.varId,
          datasetSpec.externalSourceName
        );

        // En-ROADS uses both 'baseline' and 'Ref' depending on graph/source.
        // Try the alternative so the baseline line always appears.
        if ((!series || !series.points || series.points.length === 0) && datasetSpec.externalSourceName === 'baseline') {
          series = modelContextRef.current.getSeriesForVar(datasetSpec.varId, 'Ref');
        } else if ((!series || !series.points || series.points.length === 0) && datasetSpec.externalSourceName === 'Ref') {
          series = modelContextRef.current.getSeriesForVar(datasetSpec.varId, 'baseline');
        }

        const newPoints = series?.points || [];
        datasetViewModel.points = [...newPoints];

        // Hide scatter/marker datasets (single dots) but keep full time-series.
        if (newPoints.length <= 2) {
          datasetViewModel.visible = false;
          continue;
        }
        datasetViewModel.visible = true;

        // Only apply default colors when the config hasn't already set one.
        // This preserves En-ROADS colors for multi-line graphs like Species Loss
        // (marine blue vs land brown) instead of painting everything the same blue.
        if (!datasetSpec.externalSourceName) {
          if (!datasetSpec.color) datasetSpec.color = '#53B1E8';
          datasetSpec.lineWidth = 4;
        } else if (datasetSpec.externalSourceName === 'baseline' || datasetSpec.externalSourceName === 'Ref') {
          if (!datasetSpec.color) datasetSpec.color = '#000000';
          datasetSpec.lineWidth = 4;
        }
      }

      graphView.updateData(true);
    } catch (e) {
      console.error('Error in updateGraphData:', e);
    }
  };

  const updateTemperatureDisplay = () => {
    if (!modelContextRef.current) return;

    const setAllTemps = (tempCelsius: number) => {
      const cText = `+${tempCelsius.toFixed(1)}°C`;
      const fText = `+${(tempCelsius * 9 / 5).toFixed(1)}°F`;
      for (const el of tempCRef.current) if (el) el.textContent = cText;
      for (const el of tempFRef.current) if (el) el.textContent = fText;
    };

    let tempSeries = modelContextRef.current.getSeriesForVar('_temperature_change_from_1850');
    if (!tempSeries || !tempSeries.points) {
      tempSeries = modelContextRef.current.getSeriesForVar('_temperature_relative_to_1850_1900');
    }

    if (tempSeries?.points?.length > 0) {
      setAllTemps(tempSeries.getValueAtTime(2100));
      return;
    }

    const emissionsSeries = modelContextRef.current.getSeriesForVar('_co2_equivalent_net_emissions');
    if (emissionsSeries?.points?.length > 0) {
      const emissions2100 = emissionsSeries.getValueAtTime(2100);
      setAllTemps(1.5 + (emissions2100 / 69.6) * 1.8);
    }
  };

  const updateDashboard = () => {
    for (const key of Object.keys(graphViewRefs.current)) {
      if (graphViewRefs.current[key]) updateGraphData(graphViewRefs.current[key]);
    }
    updateTemperatureDisplay();
  };

  const loadGraph = (canvasId: string, graphId: string, height = 250) => {
    const graphSpec = getGraphSpec(graphId);
    if (!graphSpec) return;

    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(height * dpr);
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

      // animations: false prevents GraphView from firing continuous canvas events
      // during hover (which previously triggered onOutputsChanged → setState → re-render → flicker).
      const graphView = new GraphView(canvas, viewModel, { style, responsive: true, animations: false }, true);
      graphViewRefs.current[canvasId] = graphView;
      updateGraphData(graphView);
    } catch (e) {
      console.error('Error initializing graph view:', e);
    }
  };

  const handleRenewablesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const sliderPos = parseFloat(e.target.value);
    setRenewablesVal(sliderPos);
    setRenewablesText(getSliderText(sliderPos));

    if (renewablesInputRef.current) {
      // Piecewise mapping — slider 0 = model 0 (status quo) exactly.
      // LEFT side [-50, 0] → tax/discourage → [0, modelMax]
      // RIGHT side [0, 100] → subsidy/encourage → [0, modelMin (negative)]
      const modelMin = renewablesInputRef.current.min !== undefined ? renewablesInputRef.current.min : -0.08;
      const modelMax = renewablesInputRef.current.max !== undefined ? renewablesInputRef.current.max : 0.08;
      const modelVal = sliderPos <= 0
        ? (-sliderPos / 50) * modelMax   // sliderPos=-50 → modelMax (taxed), 0 → 0
        : (sliderPos / 100) * modelMin;  // sliderPos=100 → modelMin (subsidised), 0 → 0
      renewablesInputRef.current.set(modelVal);
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

        renewablesInputRef.current = modelContextRef.current.getInputForId('16');

        if (renewablesInputRef.current) {
          // Model starts at status quo (0) → slider position 0
          setRenewablesVal(0);
          setRenewablesText(getSliderText(0));
        }

        modelContextRef.current.onOutputsChanged = () => updateDashboard();

        setTimeout(() => {
          loadGraph(MAIN_GRAPH.canvasId, MAIN_GRAPH.id, 250);
          loadGraph(SECONDARY_GRAPH_CANVAS_ID, selectedSecondaryGraphId, 250);
          updateDashboard();
        }, 150);

        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to load En-ROADS model.');
        setIsLoading(false);
      }
    };

    if (!modelRef.current) initApp();
  }, []);

  // Reload BOTH graphs only when layout changes (expand/collapse) or on first load.
  // Re-initialising the main CO2 graph on every dropdown change caused it to flash.
  useEffect(() => {
    if (isLoading || !coreConfigRef.current) return;

    const previousBodyOverflow = document.body.style.overflow;
    if (isExpanded) document.body.style.overflow = 'hidden';

    const timer = window.setTimeout(() => {
      loadGraph(MAIN_GRAPH.canvasId, MAIN_GRAPH.id, isExpanded ? 300 : 250);
      loadGraph(SECONDARY_GRAPH_CANVAS_ID, selectedSecondaryGraphId, isExpanded ? 300 : 250);
      updateTemperatureDisplay();
    }, 120);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [isExpanded, isLoading]); // ← selectedSecondaryGraphId intentionally removed

  // Reload ONLY the secondary graph when the dropdown selection changes.
  useEffect(() => {
    if (isLoading || !coreConfigRef.current) return;
    const timer = window.setTimeout(() => {
      loadGraph(SECONDARY_GRAPH_CANVAS_ID, selectedSecondaryGraphId, isExpanded ? 300 : 250);
    }, 120);
    return () => window.clearTimeout(timer);
  }, [selectedSecondaryGraphId, isLoading]);

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading Model...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div
      className={isExpanded
        ? 'fixed inset-0 z-50 bg-white p-4 md:p-6 overflow-y-auto font-sora'
        : 'bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 font-sora mb-24'}
    >
      <div className={isExpanded ? 'w-full h-full' : ''}>
        <div className="px-4 mb-4 text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
          <p>
            In this model, explore the impact of renewables on global temperature (remember our goal of 1.5°C!) and other impacts, which you can select in the graph dropdown.
          </p>
          <p>You can choose:</p>
          <ul className="space-y-2" style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}>
            <li>
              <strong>Status Quo:</strong> Maintain the current levels of use of renewable energy. This is where the slider starts.
            </li>
            <li>
              <strong>Encourage:</strong> Support building and use of solar panels, geothermal, and wind turbines through government subsidies that allow investment in renewable energy and lower costs for consumers.
            </li>
            <li>
              <strong>Discourage:</strong> Through taxes raising costs of renewable energy investment and use, through public policy, or communications.
            </li>
          </ul>
        </div>

        {isExpanded ? (
          <div className="relative px-4 pt-4 mb-4">
            <h2 className="text-2xl font-extrabold text-gray-800 dark:text-gray-200 text-center">En-Roads Dashboard: Renewables</h2>
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
            <h2 className="text-2xl font-extrabold text-gray-800 dark:text-gray-200">En-Roads Dashboard: Renewables</h2>
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
            <div className="flex items-stretch gap-4 min-w-[1800px]">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 flex-1 min-w-0">
                <h3 className="text-xl font-extrabold text-gray-700 dark:text-gray-200 mb-2">CO2 Emissions</h3>
                <div className="relative w-full">
                  <canvas id={MAIN_GRAPH.canvasId} className="w-full h-full" style={{ display: 'block', pointerEvents: 'none' }} />
                </div>
                <div className="flex justify-center gap-3 mt-3">
                  <span className="px-3 py-1 text-xs font-bold uppercase text-white bg-black rounded" style={{ backgroundColor: '#000000' }}>BASELINE</span>
                  <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#53B1E8' }}>CURRENT SCENARIO</span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 flex-1 min-w-0">
                <div className="flex justify-start items-center mb-2">
                  <select
                    value={selectedSecondaryGraphId}
                    onChange={(e) => setSelectedSecondaryGraphId(e.target.value)}
                    className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg block p-2.5 font-bold"
                  >
                    {SECONDARY_GRAPHS.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}
                  </select>
                </div>
                <div className="relative w-full">
                  <canvas id={SECONDARY_GRAPH_CANVAS_ID} className="w-full h-full" style={{ display: 'block', pointerEvents: 'none' }} />
                </div>
                                {selectedSecondaryGraphId === '279' ? (
                  <div className="mt-3 text-center">
                    <div className="flex justify-center gap-3 mb-1">
                      <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#3385C6' }}>MARINE SPECIES</span>
                      <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#843C0C' }}>LAND SPECIES</span>
                    </div>
                    <p className="text-xs text-gray-500 italic">Dashed lines represent Baseline</p>
                  </div>
                ) : (
                  <div className="flex justify-center gap-3 mt-3">
                    <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#000000' }}>BASELINE</span>
                    <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#53B1E8' }}>CURRENT SCENARIO</span>
                  </div>
                )}
              </div>

              <div className="shrink-0 w-fit">
                <div className="px-6 pb-4 text-center inline-flex flex-col items-center w-fit h-fit" style={{ transform: 'translateY(110px)' }}>
                  <span
                    ref={(el) => { if (el) tempCRef.current[0] = el; }}
                    style={{ color: '#14a9df', fontSize: 'clamp(3rem, 3vw, 3rem)', fontWeight: 800, lineHeight: 1.5 }}
                  >
                    +3.3°C
                  </span>
                  <div className="mx-auto my-4 h-[2px] w-[72%] bg-black" />
                  <span
                    ref={(el) => { if (el) tempFRef.current[0] = el; }}
                    style={{ color: '#14a9df', fontSize: 'clamp(1.5rem, 1.5vw, 1.5rem)', fontWeight: 800, lineHeight: 1 }}
                  >
                    +5.9°F
                  </span>
                  <div className="mt-5 leading-tight text-gray-900 dark:text-gray-100" style={{ fontSize: 'clamp(1.5rem, 1.5vw, 1.5rem)', fontWeight: 800 }}>
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
            <div className="flex justify-center mb-4">
              <div className="bg-white dark:bg-gray-800 px-6 py-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 text-center inline-flex flex-col items-center w-fit mx-auto">
                <span
                  ref={(el) => { if (el) tempCRef.current[1] = el; }}
                  style={{ color: '#14a9df', fontSize: 'clamp(3rem, 3vw, 3rem)', fontWeight: 800, lineHeight: 1.5 }}
                >+3.3°C</span>
                <div className="mx-auto my-4 h-[2px] w-[72%] bg-black" />
                <span
                  ref={(el) => { if (el) tempFRef.current[1] = el; }}
                  style={{ color: '#14a9df', fontSize: 'clamp(1.5rem, 1.5vw, 1.5rem)', fontWeight: 800, lineHeight: 1 }}
                >+5.9°F</span>
                <div className="mt-3 leading-tight text-gray-900 dark:text-gray-100" style={{ fontSize: 'clamp(1.5rem, 1.5vw, 1.5rem)', fontWeight: 800 }}>
                  Temperature
                  <br />
                  Increase by
                  <br />
                  2100
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600">
                <h3 className="text-xl font-extrabold text-gray-700 dark:text-gray-200 mb-2">CO2 Emissions</h3>
                <div className="relative w-full">
                  <canvas id={MAIN_GRAPH.canvasId} className="w-full h-full" style={{ display: 'block', pointerEvents: 'none' }} />
                </div>
                <div className="flex justify-center gap-3 mt-3">
                  <span className="px-3 py-1 text-xs font-bold uppercase text-white bg-black rounded" style={{ backgroundColor: '#000000' }}>BASELINE</span>
                  <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#53B1E8' }}>CURRENT SCENARIO</span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600">
                <div className="flex justify-start items-center mb-2">
                  <select
                    value={selectedSecondaryGraphId}
                    onChange={(e) => setSelectedSecondaryGraphId(e.target.value)}
                    className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg block p-2.5 font-bold"
                  >
                    {SECONDARY_GRAPHS.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}
                  </select>
                </div>
                <div className="relative w-full">
                  <canvas id={SECONDARY_GRAPH_CANVAS_ID} className="w-full h-full" style={{ display: 'block', pointerEvents: 'none' }} />
                </div>
                                {selectedSecondaryGraphId === '279' ? (
                  <div className="mt-3 text-center">
                    <div className="flex justify-center gap-3 mb-1">
                      <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#3385C6' }}>MARINE SPECIES</span>
                      <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#843C0C' }}>LAND SPECIES</span>
                    </div>
                    <p className="text-xs text-gray-500 italic">Dashed lines represent Baseline</p>
                  </div>
                ) : (
                  <div className="flex justify-center gap-3 mt-3">
                    <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#000000' }}>BASELINE</span>
                    <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#53B1E8' }}>CURRENT SCENARIO</span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 space-y-2">
          <div className="flex justify-between font-bold text-gray-700 dark:text-gray-200">
            <label>Renewables</label>
            <span className="text-xs font-mono text-gray-500">{renewablesText}</span>
          </div>
          <input
            type="range"
            min="-50"
            max="100"
            step="1"
            value={renewablesVal}
            onChange={handleRenewablesChange}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            style={{
              // status quo (value=0) sits at 33.33% from left: (0+50)/150*100
              background: `linear-gradient(to right, #53B1E8 0%, #53B1E8 ${((renewablesVal + 50) / 150) * 100}%, #e5e7eb ${((renewablesVal + 50) / 150) * 100}%, #e5e7eb 100%)`
            }}
          />
        </div>
      </div>
    </div>
  );
}
