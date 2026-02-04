import { useEffect, useRef, useState, ChangeEvent } from 'react';
import { createAsyncModel, getDefaultConfig, createDefaultOutputs } from '@climateinteractive/en-roads-core';
import enStrings from '@climateinteractive/en-roads-core/strings/en';
import { GraphView } from '@climateinteractive/sim-ui-graph';
import '../styles/enroads-dashboard.css';

// Graph definitions with correct En-ROADS IDs
const GRAPHS = [
  { id: '86', label: 'Global Temperature by 2100', varId: '_temperature_relative_to_1850_1900' },
  { id: '90', label: 'Sea Level Rise', varId: '_slr_from_2000_in_meters' },
  { id: '275', label: 'Deaths from Extreme Heat', varId: '_excess_deaths_from_extreme_heat_per_100k_people' },
  { id: '279', label: 'Species Loss - Extinction', varId: '_percent_endemic_species_at_high_risk_of_extinction' },
  { id: '183', label: 'Crop Yield', varId: '_crop_yield_per_hectare_kg_per_year_per_ha' },
  { id: '112', label: 'Air Pollution', varId: '_pm2_5_emissions_from_energy_mt_per_year' }
];

export default function FourthExerciseDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carbon Price Slider state
  const [carbonPriceVal, setCarbonPriceVal] = useState(0); // 0-100 range for slider
  const [carbonPriceText, setCarbonPriceText] = useState('$0 / ton CO2');

  // Display states
  const [tempC, setTempC] = useState(3.3); // Baseline approx
  const [tempF, setTempF] = useState(5.9);
  const [selectedGraphId, setSelectedGraphId] = useState('86');

  const modelRef = useRef<any>(null);
  const modelContextRef = useRef<any>(null);
  const graphViewRef = useRef<any>(null);
  const coreConfigRef = useRef<any>(null);

  // Input ref for Carbon Price (ID 48 usually, check if fails)
  const carbonPriceInputRef = useRef<any>(null);

  const str = (key: string) => {
    return (enStrings as any)[key] || key;
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
          datasetSpec.color = '#EF4444'; // Red for Current Scenario
          datasetSpec.lineWidth = 4;
        } else if (datasetSpec.externalSourceName === 'baseline') {
          datasetSpec.color = '#000000'; // Black for Baseline
          datasetSpec.lineWidth = 4;
        }
      }
      graphView.updateData(true);
    } catch (e) { console.error(e); }
  };

  const updateTemperatureDisplay = () => {
    if (!modelContextRef.current) return;

    let tempSeries = modelContextRef.current.getSeriesForVar('_temperature_change_from_1850');
    if (!tempSeries || !tempSeries.points) {
      tempSeries = modelContextRef.current.getSeriesForVar('_temperature_relative_to_1850_1900');
    }

    if (tempSeries && tempSeries.points && tempSeries.points.length > 0) {
      const tempCelsius = tempSeries.getValueAtTime(2100);
      setTempC(tempCelsius);
      setTempF(tempCelsius * 9 / 5);
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
      // Map 0-100 slider to Carbon Price range (e.g., $0 to $250/ton seems reasonable for En-Roads max)
      // Default max often around $100-$250. Let's assume $250 as a generic 'high' carbon price.
      const min = carbonPriceInputRef.current.min !== undefined ? carbonPriceInputRef.current.min : 0;
      const max = carbonPriceInputRef.current.max !== undefined ? carbonPriceInputRef.current.max : 250;

      const modelVal = min + (val / 100) * (max - min);

      console.log(`Ex4 Slider Change: ${val}% -> $${modelVal}`);

      carbonPriceInputRef.current.set(modelVal);
      setCarbonPriceText(`$${Math.round(modelVal)} / ton CO2`);
    } else {
      console.warn("Ex4 Warning: Slider moved but input ref is missing");
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

        // Carbon Price Input ID: 48
        carbonPriceInputRef.current = modelContextRef.current.getInputForId('48');
        console.log("Ex4: Carbon Price Input (ID 48):", carbonPriceInputRef.current);

        if (!carbonPriceInputRef.current) {
          console.error("Ex4 Error: Carbon Price input (ID 48) NOT found.");
        } else {
          console.log("Ex4: Carbon Price Input Min/Max:", carbonPriceInputRef.current.min, carbonPriceInputRef.current.max);
        }

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
      <h2 className="text-xl px-4 pt-4 mb-4 font-bold text-gray-800 dark:text-gray-200">Make a Model: Carbon Price</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
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

        <div className="bg-white dark:bg-gray-800 p-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 flex flex-col items-center justify-center text-center">
          <div className="text-4xl md:text-5xl font-black text-red-500 mb-1">+{tempC.toFixed(1)}°C</div>
          <div className="text-lg md:text-xl font-bold text-red-400 mb-3">+{tempF.toFixed(1)}°F</div>
          <div className="text-gray-500 text-xs font-bold uppercase">Global Temperature<br />by 2100</div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
        <div className="space-y-2">
          <div className="flex justify-between font-bold text-gray-700 dark:text-gray-200">
            <label>Carbon Price</label>
            <span className="text-xs font-mono text-gray-500">{carbonPriceText}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={carbonPriceVal}
            onChange={handleSliderChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
          />
        </div>
      </div>

    </div>
  );
}
