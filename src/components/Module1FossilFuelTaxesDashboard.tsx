import { useEffect, useRef, useState, ChangeEvent } from 'react';
import { createAsyncModel, getDefaultConfig, createDefaultOutputs } from '@climateinteractive/en-roads-core';
import enStrings from '@climateinteractive/en-roads-core/strings/en';
import { GraphView } from '@climateinteractive/sim-ui-graph';
import '../styles/enroads-dashboard.css';

// Graph definitions
const GRAPHS = [
  { id: '86', label: 'Global Temperature', canvasId: 'module1-graph-temperature' },
  { id: '90', label: 'Sea Level Rise', canvasId: 'module1-graph-sea-level' },
  { id: '169', label: 'Deforestation', canvasId: 'module1-graph-deforestation' }
];

export default function Module1FossilFuelTaxesDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // Slider states
  const [coalVal, setCoalVal] = useState(0);
  const [oilVal, setOilVal] = useState(0);
  const [gasVal, setGasVal] = useState(0);

  const [coalText, setCoalText] = useState('status quo');
  const [oilText, setOilText] = useState('status quo');
  const [gasText, setGasText] = useState('status quo');

  const [tempC, setTempC] = useState(3.3);
  const [tempF, setTempF] = useState(5.9);

  const modelRef = useRef<any>(null);
  const modelContextRef = useRef<any>(null);
  const graphViewRefs = useRef<Record<string, any>>({});
  const coreConfigRef = useRef<any>(null);

  // Input refs for Coal (1), Oil (7), Gas (10)
  const coalInputRef = useRef<any>(null);
  const oilInputRef = useRef<any>(null);
  const gasInputRef = useRef<any>(null);

  const str = (key: string) => {
    return (enStrings as any)[key] || key;
  };

  const getSliderText = (value: number) => {
    // Determine text based on value range (approximate En-Roads logic)
    // Taxes are positive values here? Let's check ranges.
    // Coal Tax (ID 1): 0 to 100 $/ton usually.
    if (value > 10) return 'taxed';
    if (value > 0) return 'lightly taxed';
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
      formatYAxisTickValue: (value: number) => value.toFixed(1),
      formatYAxisTooltipValue: (value: number) => value.toFixed(2)
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

        if (!datasetSpec.externalSourceName) {
          datasetSpec.color = '#53B1E8'; // Current scenario (match Module 2)
          datasetSpec.lineWidth = 4;
        } else if (datasetSpec.externalSourceName === 'baseline' || datasetSpec.externalSourceName === 'Ref') {
          datasetSpec.color = '#000000';
          datasetSpec.lineWidth = 4;
        }
      }
      graphView.updateData(true);
    } catch (e) { console.error(e); }
  };

  const updateTemperatureDisplay = () => {
    if (!modelContextRef.current) return;

    // Try getting the variable that is confirmed to be in outputs
    let tempSeries = modelContextRef.current.getSeriesForVar('_temperature_change_from_1850');

    // If not found, try the specific relative one
    if (!tempSeries || !tempSeries.points) {
      tempSeries = modelContextRef.current.getSeriesForVar('_temperature_relative_to_1850_1900');
    }

    if (tempSeries && tempSeries.points && tempSeries.points.length > 0) {
      const tempCelsius = tempSeries.getValueAtTime(2100);
      setTempC(tempCelsius);
      setTempF(tempCelsius * 9 / 5);
    } else {
      // Fallback: approximate from emissions
      const emissionsSeries = modelContextRef.current.getSeriesForVar('_co2_equivalent_net_emissions');
      if (emissionsSeries && emissionsSeries.points && emissionsSeries.points.length > 0) {
        const emissions2100 = emissionsSeries.getValueAtTime(2100);
        const tempCelsius = 1.5 + (emissions2100 / 69.6) * 1.8;
        setTempC(tempCelsius);
        setTempF(tempCelsius * 9 / 5);
      }
    }
  };

  const updateDashboard = () => {
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
    } catch (e) { console.error('Error loading graph', e); }
  };

  const handleSliderChange = (type: 'coal' | 'oil' | 'gas', e: ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value); // 0-100 slider position
    // Map 0-100 to tax range.
    // Coal (1): 0 to 100 $/ton? Default max is often high.
    // Oil (7): 0 to 100 $/barrel?
    // Gas (10): 0 to 10 $/Mcf?

    // We need to map slider 0-100 to Input Min/Max.
    let inputRef;
    let setText;
    let setVal;

    if (type === 'coal') { inputRef = coalInputRef; setText = setCoalText; setVal = setCoalVal; }
    else if (type === 'oil') { inputRef = oilInputRef; setText = setOilText; setVal = setOilVal; }
    else { inputRef = gasInputRef; setText = setGasText; setVal = setGasVal; }

    setVal(val);

    if (inputRef.current) {
      const min = inputRef.current.min !== undefined ? inputRef.current.min : 0;
      const max = inputRef.current.max !== undefined ? inputRef.current.max : 100;
      // Tax logic: 0 is status quo (min), 100 is max tax.
      const modelVal = min + (val / 100) * (max - min);

      console.log(`Ex3 Slider ${type} -> Raw: ${val}, Model: ${modelVal} (Min: ${min}, Max: ${max})`);
      inputRef.current.set(modelVal);
      setText(getSliderText(modelVal));
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

        // Load Inputs: Coal(1), Oil(7), Gas(10)
        coalInputRef.current = modelContextRef.current.getInputForId('1');
        oilInputRef.current = modelContextRef.current.getInputForId('7');
        gasInputRef.current = modelContextRef.current.getInputForId('10');

        modelContextRef.current.onOutputsChanged = () => updateDashboard();

        setTimeout(() => {
          for (const graph of GRAPHS) {
            loadGraph(graph.canvasId, graph.id, 250);
          }
          setTimeout(() => updateDashboard(), 50);
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
      for (const graph of GRAPHS) {
        loadGraph(graph.canvasId, graph.id, isExpanded ? 300 : 250);
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
              En-ROADS Dashboard: Fossil Fuel Taxes
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
              En-ROADS Dashboard: Fossil Fuel Taxes
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
            <div className="flex items-stretch gap-4 min-w-[1820px]">
              {GRAPHS.map((graph) => (
                <div
                  key={graph.id}
                  className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 flex-1 min-w-0"
                >
                  <h3 className="text-xl font-extrabold text-gray-700 dark:text-gray-200 mb-2">{graph.label}</h3>
                  <div className="relative w-full h-[300px]">
                    <canvas id={graph.canvasId} className="w-full h-full" />
                  </div>
                  <div className="flex justify-center gap-3 mt-3">
                    <span className="px-3 py-1 text-xs font-bold uppercase text-white bg-black rounded" style={{ backgroundColor: '#000000' }}>BASELINE</span>
                    <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#53B1E8' }}>CURRENT SCENARIO</span>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {GRAPHS.map((graph) => (
                <div
                  key={graph.id}
                  className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600"
                >
                  <h3 className="text-xl font-extrabold text-gray-700 dark:text-gray-200 mb-2">{graph.label}</h3>
                  <div className="relative w-full h-[250px]">
                    <canvas id={graph.canvasId} className="w-full h-full" />
                  </div>
                  <div className="flex justify-center gap-3 mt-3">
                    <span className="px-3 py-1 text-xs font-bold uppercase text-white bg-black rounded" style={{ backgroundColor: '#000000' }}>BASELINE</span>
                    <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#53B1E8' }}>CURRENT SCENARIO</span>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between font-bold text-gray-700 dark:text-gray-200">
            <label>Tax on Coal</label>
            <span className="text-xs font-mono text-gray-500">{coalText}</span>
          </div>
          <input type="range" min="0" max="100" value={coalVal} onChange={(e) => handleSliderChange('coal', e)}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            style={{ background: `linear-gradient(to right, #53B1E8 0%, #53B1E8 ${coalVal}%, #e5e7eb ${coalVal}%, #e5e7eb 100%)` }}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between font-bold text-gray-700 dark:text-gray-200">
            <label>Tax on Oil</label>
            <span className="text-xs font-mono text-gray-500">{oilText}</span>
          </div>
          <input type="range" min="0" max="100" value={oilVal} onChange={(e) => handleSliderChange('oil', e)}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            style={{ background: `linear-gradient(to right, #53B1E8 0%, #53B1E8 ${oilVal}%, #e5e7eb ${oilVal}%, #e5e7eb 100%)` }}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between font-bold text-gray-700 dark:text-gray-200">
            <label>Tax on Gas</label>
            <span className="text-xs font-mono text-gray-500">{gasText}</span>
          </div>
          <input type="range" min="0" max="100" value={gasVal} onChange={(e) => handleSliderChange('gas', e)}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            style={{ background: `linear-gradient(to right, #53B1E8 0%, #53B1E8 ${gasVal}%, #e5e7eb ${gasVal}%, #e5e7eb 100%)` }}
          />
        </div>
        </div>
      </div>
    </div>
  );
}
