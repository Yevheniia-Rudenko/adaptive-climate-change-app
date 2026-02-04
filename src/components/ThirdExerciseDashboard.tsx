import { useEffect, useRef, useState, ChangeEvent } from 'react';
import { createAsyncModel, getDefaultConfig, createDefaultOutputs } from '@climateinteractive/en-roads-core';
import enStrings from '@climateinteractive/en-roads-core/strings/en';
import { GraphView } from '@climateinteractive/sim-ui-graph';
import '../styles/enroads-dashboard.css';

// Graph definitions
const GRAPHS = [
  { id: '86', label: 'Global Temperature', varId: '_temperature_relative_to_1850_1900' },
  { id: '90', label: 'Sea Level Rise', varId: '_slr_from_2000_in_meters' },
  { id: '169', label: 'Deforestation', varId: '_deforestation_in_mha_per_per_year' }
];

export default function ThirdExerciseDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Slider states
  const [coalVal, setCoalVal] = useState(0);
  const [oilVal, setOilVal] = useState(0);
  const [gasVal, setGasVal] = useState(0);

  const [coalText, setCoalText] = useState('status quo');
  const [oilText, setOilText] = useState('status quo');
  const [gasText, setGasText] = useState('status quo');

  // Display states
  const [tempC, setTempC] = useState(3.2);
  const [tempF, setTempF] = useState(5.7);
  const [selectedGraphId, setSelectedGraphId] = useState('86');

  const modelRef = useRef<any>(null);
  const modelContextRef = useRef<any>(null);
  const graphViewRef = useRef<any>(null);
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
          datasetSpec.color = '#EF4444';
          datasetSpec.lineWidth = 4;
        } else if (datasetSpec.externalSourceName === 'baseline') {
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
      console.log(`Ex3 Temp Update: ${tempCelsius.toFixed(4)} C`);
      setTempC(tempCelsius);
      setTempF(tempCelsius * 9 / 5);
    } else {
      // Fallback: approximate from emissions
      const emissionsSeries = modelContextRef.current.getSeriesForVar('_co2_equivalent_net_emissions');
      if (emissionsSeries && emissionsSeries.points && emissionsSeries.points.length > 0) {
        const emissions2100 = emissionsSeries.getValueAtTime(2100);
        const tempCelsius = 1.5 + (emissions2100 / 69.6) * 1.8;
        console.log(`Ex3 Temp Fallback (Emissions): ${tempCelsius.toFixed(4)} C`);
        setTempC(tempCelsius);
        setTempF(tempCelsius * 9 / 5);
      }
    }
  };

  const updateDashboard = () => {
    if (graphViewRef.current) updateGraphData(graphViewRef.current);
    updateTemperatureDisplay();
  };

  const loadGraph = (graphId: string) => {
    if (!coreConfigRef.current) return;
    let graphSpec = coreConfigRef.current.graphs.get(graphId);

    const canvas = document.getElementById('exercise3-graph-canvas') as HTMLCanvasElement;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = 300 * dpr;
    canvas.style.width = '100%';
    canvas.style.height = '300px';

    try {
      const viewModel = createGraphViewModel(graphSpec);
      const style = {
        font: { family: 'system-ui, sans-serif', size: 12, color: '#333' },
        xAxis: { tickMaxCount: 6 },
        yAxis: { tickMaxCount: 6 },
        getDefaultLineWidth: () => 4
      };
      graphViewRef.current = new GraphView(canvas, viewModel, { style }, true);
      updateGraphData(graphViewRef.current);
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
          loadGraph(selectedGraphId);
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
    if (!isLoading && coreConfigRef.current) loadGraph(selectedGraphId);
  }, [selectedGraphId]);

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading Model...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 font-sora">
      <h2 className="text-xl px-4 pt-4 mb-4 font-bold text-gray-800 dark:text-gray-200">En-Roads Dashboard: Fossil Fuel Taxes</h2>

      <div className="grid grid-cols-4 gap-4 mb-4">
        <div className="col-span-3 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600">
          <select
            value={selectedGraphId}
            onChange={(e) => setSelectedGraphId(e.target.value)}
            className="mb-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 text-sm rounded-lg block w-full p-2.5 font-bold"
          >
            {GRAPHS.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}
          </select>
          <div className="relative w-full h-[300px]">
            <canvas id="exercise3-graph-canvas" className="w-full h-full" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 flex flex-col items-center justify-center text-center">
          <div className="text-4xl md:text-5xl font-black text-red-500 mb-1">+{tempC.toFixed(1)}°C</div>
          <div className="text-lg md:text-xl font-bold text-red-400 mb-3">+{tempF.toFixed(1)}°F</div>
          <div className="text-gray-500 text-xs font-bold uppercase">Global Temperature<br />by 2100</div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between font-bold text-gray-700 dark:text-gray-200">
            <label>Tax on Coal</label>
            <span className="text-xs font-mono text-gray-500">{coalText}</span>
          </div>
          <input type="range" min="0" max="100" value={coalVal} onChange={(e) => handleSliderChange('coal', e)} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between font-bold text-gray-700 dark:text-gray-200">
            <label>Tax on Oil</label>
            <span className="text-xs font-mono text-gray-500">{oilText}</span>
          </div>
          <input type="range" min="0" max="100" value={oilVal} onChange={(e) => handleSliderChange('oil', e)} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between font-bold text-gray-700 dark:text-gray-200">
            <label>Tax on Gas</label>
            <span className="text-xs font-mono text-gray-500">{gasText}</span>
          </div>
          <input type="range" min="0" max="100" value={gasVal} onChange={(e) => handleSliderChange('gas', e)} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500" />
        </div>
      </div>

    </div>
  );
}
