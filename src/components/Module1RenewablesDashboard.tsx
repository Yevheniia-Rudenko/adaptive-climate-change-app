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

  const [tempC, setTempC] = useState(3.3);
  const [tempF, setTempF] = useState(5.9);

  const modelRef = useRef<any>(null);
  const modelContextRef = useRef<any>(null);
  const graphViewRefs = useRef<Record<string, any>>({});
  const coreConfigRef = useRef<any>(null);
  const renewablesInputRef = useRef<any>(null);

  const str = (key: string) => (enStrings as any)[key] || key;

  const getSliderText = (value: number) => {
    if (value <= -0.01) return 'subsidized';
    if (value >= 0.01) return 'taxed';
    return 'status quo';
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
    const fromConfig = coreConfigRef.current?.graphs?.get(graphId);
    if (fromConfig) return fromConfig;

    const graphDef = ALL_GRAPH_DEFS.find((g) => g.id === graphId);
    if (!graphDef) return null;

    return {
      id: graphId,
      title: graphDef.label,
      kind: 'line',
      datasets: [
        { varId: graphDef.varId, externalSourceName: 'baseline', label: 'Baseline' },
        { varId: graphDef.varId, label: 'Current' }
      ]
    };
  };

  const updateGraphData = (graphView: any) => {
    try {
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

        // Hide scatter/marker datasets (single dots such as the red point)
        // so main line graphs remain clean and match Module 2 style.
        if (newPoints.length <= 2) {
          datasetViewModel.visible = false;
          continue;
        }
        datasetViewModel.visible = true;

        if (!datasetSpec.externalSourceName) {
          datasetSpec.color = '#53B1E8';
          datasetSpec.lineWidth = 4;
        } else if (datasetSpec.externalSourceName === 'baseline' || datasetSpec.externalSourceName === 'Ref') {
          datasetSpec.color = '#000000';
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

    let tempSeries = modelContextRef.current.getSeriesForVar('_temperature_change_from_1850');
    if (!tempSeries || !tempSeries.points) {
      tempSeries = modelContextRef.current.getSeriesForVar('_temperature_relative_to_1850_1900');
    }

    if (tempSeries?.points?.length > 0) {
      const tempCelsius = tempSeries.getValueAtTime(2100);
      setTempC(tempCelsius);
      setTempF(tempCelsius * 9 / 5);
      return;
    }

    const emissionsSeries = modelContextRef.current.getSeriesForVar('_co2_equivalent_net_emissions');
    if (emissionsSeries?.points?.length > 0) {
      const emissions2100 = emissionsSeries.getValueAtTime(2100);
      const tempCelsius = 1.5 + (emissions2100 / 69.6) * 1.8;
      setTempC(tempCelsius);
      setTempF(tempCelsius * 9 / 5);
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

      const graphView = new GraphView(canvas, viewModel, { style, responsive: true, animations: true }, true);
      graphViewRefs.current[canvasId] = graphView;
      updateGraphData(graphView);
    } catch (e) {
      console.error('Error initializing graph view:', e);
    }
  };

  const handleRenewablesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const sliderPos = parseFloat(e.target.value);
    setRenewablesVal(sliderPos);

    if (renewablesInputRef.current) {
      const min = renewablesInputRef.current.min !== undefined ? renewablesInputRef.current.min : -0.08;
      const val = (sliderPos / 100) * min;
      renewablesInputRef.current.set(val);
      setRenewablesText(getSliderText(val));
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
          const current = renewablesInputRef.current.get();
          const min = renewablesInputRef.current.min !== undefined ? renewablesInputRef.current.min : -0.08;
          if (min < 0) {
            const calculatedPos = (current / min) * 100;
            setRenewablesVal(Math.max(0, Math.min(100, calculatedPos)));
          } else {
            setRenewablesVal(0);
          }
          setRenewablesText(getSliderText(current));
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

  useEffect(() => {
    if (isLoading || !coreConfigRef.current) return;

    const previousBodyOverflow = document.body.style.overflow;
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
    }

    const timer = window.setTimeout(() => {
      loadGraph(MAIN_GRAPH.canvasId, MAIN_GRAPH.id, isExpanded ? 300 : 250);
      loadGraph(SECONDARY_GRAPH_CANVAS_ID, selectedSecondaryGraphId, isExpanded ? 300 : 250);
      updateTemperatureDisplay();
    }, 120);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [isExpanded, isLoading, selectedSecondaryGraphId]);

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
                <div className="relative w-full h-[300px]">
                  <canvas id={MAIN_GRAPH.canvasId} className="w-full h-full" />
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
                <div className="relative w-full h-[300px]">
                  <canvas id={SECONDARY_GRAPH_CANVAS_ID} className="w-full h-full" />
                </div>
                <div className="flex justify-center gap-3 mt-3">
                  <span className="px-3 py-1 text-xs font-bold uppercase text-white bg-black rounded" style={{ backgroundColor: '#000000' }}>BASELINE</span>
                  <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#53B1E8' }}>CURRENT SCENARIO</span>
                </div>
              </div>

              <div className="shrink-0 w-fit">
                <div className="px-6 pb-4 text-center inline-flex flex-col items-center w-fit h-fit" style={{ transform: 'translateY(110px)' }}>
                  <div style={{ color: '#14a9df', fontSize: 'clamp(3rem, 3vw, 3rem)', fontWeight: 800, lineHeight: 1.5 }}>
                    +{tempC.toFixed(1)}°C
                  </div>
                  <div className="mx-auto my-4 h-[2px] w-[72%] bg-black" />
                  <div style={{ color: '#14a9df', fontSize: 'clamp(1.5rem, 1.5vw, 1.5rem)', fontWeight: 800, lineHeight: 1 }}>
                    +{tempF.toFixed(1)}°F
                  </div>
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
                <div style={{ color: '#14a9df', fontSize: 'clamp(3rem, 3vw, 3rem)', fontWeight: 800, lineHeight: 1.5 }}>+{tempC.toFixed(1)}°C</div>
                <div className="mx-auto my-4 h-[2px] w-[72%] bg-black" />
                <div style={{ color: '#14a9df', fontSize: 'clamp(1.5rem, 1.5vw, 1.5rem)', fontWeight: 800, lineHeight: 1 }}>+{tempF.toFixed(1)}°F</div>
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
                <div className="relative w-full h-[250px]">
                  <canvas id={MAIN_GRAPH.canvasId} className="w-full h-full" />
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
                <div className="relative w-full h-[250px]">
                  <canvas id={SECONDARY_GRAPH_CANVAS_ID} className="w-full h-full" />
                </div>
                <div className="flex justify-center gap-3 mt-3">
                  <span className="px-3 py-1 text-xs font-bold uppercase text-white bg-black rounded" style={{ backgroundColor: '#000000' }}>BASELINE</span>
                  <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#53B1E8' }}>CURRENT SCENARIO</span>
                </div>
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
            min="0"
            max="100"
            value={renewablesVal}
            onChange={handleRenewablesChange}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-green-500"
            style={{
              background: `linear-gradient(to right, #53B1E8 0%, #53B1E8 ${renewablesVal}%, #e5e7eb ${renewablesVal}%, #e5e7eb 100%)`
            }}
          />
        </div>
      </div>
    </div>
  );
}
