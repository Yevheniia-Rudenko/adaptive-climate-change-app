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

export default function FourthExerciseDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Slider state
  const [carbonPriceVal, setCarbonPriceVal] = useState(0);
  const [carbonPriceText, setCarbonPriceText] = useState('status quo');

  // Display states
  const [tempC, setTempC] = useState(3.2);
  const [tempF, setTempF] = useState(5.7);
  const [selectedGraphId, setSelectedGraphId] = useState('86');

  const modelRef = useRef<any>(null);
  const modelContextRef = useRef<any>(null);
  const graphViewRef = useRef<any>(null);
  const coreConfigRef = useRef<any>(null);

  // Input refs
  const carbonPriceInputRef = useRef<any>(null);

  const str = (key: string) => {
    return (enStrings as any)[key] || key;
  };

  const getSliderText = (value: number) => {
    // Carbon Price (ID 39) usually goes from 0 to something high (e.g. $250/ton)
    if (value > 50) return 'very high price';
    if (value > 10) return 'medium price';
    if (value > 0) return 'low price';
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
    if (graphViewRef.current) updateGraphData(graphViewRef.current);
    updateTemperatureDisplay();
  };

  const loadGraph = (graphId: string) => {
    if (!coreConfigRef.current) return;
    let graphSpec = coreConfigRef.current.graphs.get(graphId);

    const canvas = document.getElementById('exercise4-graph-canvas') as HTMLCanvasElement;
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

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value); // 0-100 slider position
    setCarbonPriceVal(val);

    if (carbonPriceInputRef.current) {
      const min = carbonPriceInputRef.current.min !== undefined ? carbonPriceInputRef.current.min : 0;
      const max = carbonPriceInputRef.current.max !== undefined ? carbonPriceInputRef.current.max : 100; // Likely closer to 250 or 1000 for carbon price?

      const modelVal = min + (val / 100) * (max - min);

      carbonPriceInputRef.current.set(modelVal);
      setCarbonPriceText(getSliderText(modelVal));
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

        // Load Input: Carbon Price (39)
        carbonPriceInputRef.current = modelContextRef.current.getInputForId('39');

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
      <h2 className="text-xl px-4 pt-4 mb-4 font-bold text-gray-800 dark:text-gray-200">En-Roads Dashboard: Carbon Price</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="md:col-span-2 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600">
          <select
            value={selectedGraphId}
            onChange={(e) => setSelectedGraphId(e.target.value)}
            className="mb-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 text-sm rounded-lg block w-full p-2.5 font-bold"
          >
            {GRAPHS.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}
          </select>
          <div className="relative w-full h-[300px]">
            <canvas id="exercise4-graph-canvas" className="w-full h-full" />
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 flex flex-col items-center justify-center text-center">
          <div className="text-5xl md:text-6xl font-black text-red-500 mb-2">+{tempC.toFixed(1)}°C</div>
          <div className="text-xl md:text-2xl font-bold text-red-400 mb-6">+{tempF.toFixed(1)}°F</div>
          <div className="text-gray-500 text-sm font-bold uppercase">Temperature<br />Increase by 2100</div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between font-bold text-gray-700 dark:text-gray-200">
            <label>Carbon Price ($)</label>
            <span className="text-xs font-mono text-gray-500">{carbonPriceText}</span>
          </div>
          <input type="range" min="0" max="100" value={carbonPriceVal} onChange={handleSliderChange} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-red-500" />
        </div>
      </div>
    </div>
  );
}
