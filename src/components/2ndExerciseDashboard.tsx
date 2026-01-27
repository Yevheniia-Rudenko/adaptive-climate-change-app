import { useEffect, useRef, useState, ChangeEvent } from 'react';
import { createAsyncModel, getDefaultConfig, createDefaultOutputs } from '@climateinteractive/en-roads-core';
import enStrings from '@climateinteractive/en-roads-core/strings/en';
import { GraphView } from '@climateinteractive/sim-ui-graph';
import '../styles/enroads-dashboard.css';

// Graph definitions
const GRAPHS = [
  { id: '86', label: 'Global Temperature', varId: '_temperature_relative_to_1850_1900' },
  { id: '62', label: 'CO2 Emissions', varId: '_co2_equivalent_net_emissions' },
  { id: '90', label: 'Sea Level Rise', varId: '_slr_from_2000_in_meters' },
  { id: '169', label: 'Deforestation', varId: '_deforestation_in_mha_per_year' },
  { id: '275', label: 'Deaths from Extreme Heat', varId: '_excess_deaths_from_extreme_heat_per_100k_people' }
];

export default function SecondExerciseDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Slider states
  const [renewablesVal, setRenewablesVal] = useState(0); // 0-100 range for slider UI
  const [renewablesText, setRenewablesText] = useState('status quo');

  // Display states
  const [tempC, setTempC] = useState(3.2);
  const [tempF, setTempF] = useState(5.7);
  const [selectedGraphId, setSelectedGraphId] = useState('86'); // Default to Global Temperature

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modelRef = useRef<any>(null);
  const modelContextRef = useRef<any>(null);
  const graphViewRef = useRef<any>(null);
  const coreConfigRef = useRef<any>(null);

  // Input refs
  const renewablesInputRef = useRef<any>(null); // ID 16 (Renewables Subsidy/Tax)

  // Helper function to get localized string
  const str = (key: string) => {
    return (enStrings as any)[key] || key;
  };

  // Generalized slider status text
  const getSliderText = (value: number) => {
    // ID 16: Negative is subsidy (cheaper), Positive is tax (more expensive)
    if (value <= -0.01) return 'subsidized';
    if (value >= 0.01) return 'taxed';
    return 'status quo';
  };

  const createGraphViewModel = (graphSpec: any) => {
    // Create a default spec if we are using a custom graph ID (like 1 or 2 for simple vars)
    // or try to find it in core config.
    // But '1' and '2' might not be valid graph IDs in En-Roads config.
    // We might need to construct a simple graph spec if it doesn't exist.
    // For now, let's try to look up generic graphs or construct them.

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
          datasetSpec.color = '#3B82F6'; // Current scenario blue
          datasetSpec.lineWidth = 4;
        } else if (datasetSpec.externalSourceName === 'baseline') {
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

    // Try getting the variable that is confirmed to be in outputs
    let tempSeries = modelContextRef.current.getSeriesForVar('_temperature_change_from_1850');

    // If not found, try the specific relative one
    if (!tempSeries || !tempSeries.points) {
      tempSeries = modelContextRef.current.getSeriesForVar('_temperature_relative_to_1850_1900');
    }

    if (tempSeries && tempSeries.points && tempSeries.points.length > 0) {
      const tempCelsius = tempSeries.getValueAtTime(2100);
      console.log(`Temp Update (Main Var): ${tempCelsius.toFixed(4)} C`);
      const tempFahrenheit = tempCelsius * 9 / 5;
      setTempC(tempCelsius);
      setTempF(tempFahrenheit);
    } else {
      // Fallback: approximate from emissions
      const emissionsSeries = modelContextRef.current.getSeriesForVar('_co2_equivalent_net_emissions');
      if (emissionsSeries && emissionsSeries.points && emissionsSeries.points.length > 0) {
        const emissions2100 = emissionsSeries.getValueAtTime(2100);
        const tempCelsius = 1.5 + (emissions2100 / 69.6) * 1.8;
        const tempFahrenheit = tempCelsius * 9 / 5;
        setTempC(tempCelsius);
        setTempF(tempFahrenheit);
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

    // Fallback: If graph spec not found (e.g. for custom IDs), construct a minimal one
    if (!graphSpec) {
      console.log(`Graph ID ${graphId} not found in core config, constructing custom spec...`);
      const graphDef = GRAPHS.find(g => g.id === graphId);
      if (graphDef) {
        graphSpec = {
          id: graphId,
          title: graphDef.label,
          kind: 'line',
          datasets: [
            { varId: graphDef.varId, externalSourceName: 'baseline', label: 'Baseline' },
            { varId: graphDef.varId, label: 'Current' }
          ]
        };
      } else {
        console.error(`Graph config for ${graphId} not found`);
        return;
      }
    }

    console.log(`Loading graph ${graphId}:`, graphSpec);

    const canvas = document.getElementById('exercise2-graph-canvas') as HTMLCanvasElement;
    if (!canvas) {
      console.error('Canvas element not found for Exercise 2');
      return;
    }
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    // Ensure consistent size
    canvas.width = rect.width * dpr;
    canvas.height = 300 * dpr;
    canvas.style.width = '100%';
    canvas.style.height = '300px';

    let viewModel;
    try {
      viewModel = createGraphViewModel(graphSpec);
    } catch (e) {
      console.error('Error creating graph view model:', e);
      return;
    }

    const style = {
      font: {
        family: 'system-ui, -apple-system, sans-serif',
        style: 'normal',
        color: '#1f2937'
      },
      xAxis: { tickMaxCount: 6 },
      yAxis: { tickMaxCount: 6 },
      getAxisLabelFontSize: () => 14,
      getTickLabelFontSize: () => 12,
      getDefaultLineWidth: () => 4,
      plotBackgroundColor: '#ffffff'
    };

    const options = { style, responsive: true, animations: true };

    try {
      graphViewRef.current = new GraphView(canvas, viewModel, options, true);
      updateGraphData(graphViewRef.current);
    } catch (e) {
      console.error('CRITICAL ERROR instantiating GraphView:', e);
      setError('Failed to initialize graph visualization.');
    }
  };

  const handleRenewablesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const sliderPos = parseFloat(e.target.value);
    setRenewablesVal(sliderPos);

    if (renewablesInputRef.current) {
      // ID 16: Negative = Subsidy (Cheaper). Positive = Tax.
      // We map 0-100 Slider to 0.0 (Status Quo) to -0.07 (Max Subsidy)
      // Adjust this range as needed based on Min (likely -0.08 or so).
      const min = renewablesInputRef.current.min !== undefined ? renewablesInputRef.current.min : -0.08;

      // Let's assume user wants "Make cheaper" -> Subsidy.
      // Slider 0 = Status Quo (0.00)
      // Slider 100 = Max Subsidy (min value)

      const val = 0 + (sliderPos / 100) * (min - 0);

      console.log(`Setting Renewables (16) to: ${val}`);
      renewablesInputRef.current.set(val);

      setRenewablesText(getSliderText(val));
    }
  };

  // Initialize
  useEffect(() => {
    const initApp = async () => {
      try {
        setIsLoading(true);
        coreConfigRef.current = getDefaultConfig();
        modelRef.current = await createAsyncModel();
        modelContextRef.current = modelRef.current.addContext();
        createDefaultOutputs();

        // Load Inputs
        // Renewables: 16 (Not 25)
        renewablesInputRef.current = modelContextRef.current.getInputForId('16');
        console.log('Renewables input:', renewablesInputRef.current);

        if (renewablesInputRef.current) {
          const current = renewablesInputRef.current.get();
          // For initialization, verify where we are. Default is likely ~0.
          // We map current model value back to slider 0-100?
          // If current is 0, slider is 0.
          // If current is -0.08, slider is 100.

          const min = renewablesInputRef.current.min !== undefined ? renewablesInputRef.current.min : -0.08;

          // Inverse logic: val = (pos/100) * min  -> pos = (val / min) * 100
          // (Assuming min is negative)

          if (min < 0) {
            const calculatedPos = (current / min) * 100;
            setRenewablesVal(Math.max(0, Math.min(100, calculatedPos)));
          } else {
            setRenewablesVal(0);
          }

          setRenewablesText(getSliderText(current));
        }

        modelContextRef.current.onOutputsChanged = () => {
          updateDashboard();
        };

        setTimeout(() => {
          // toggle initial graph
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

    if (!modelRef.current) {
      initApp();
    }

    return () => { };
  }, []);

  // Effect to reload graph when selectedGraphId changes
  useEffect(() => {
    if (!isLoading && !error && coreConfigRef.current && modelRef.current) {
      // Need to dispose old graph?
      // Just re-call loadGraph, it will overwrite the chart on canvas
      loadGraph(selectedGraphId);
    }
  }, [selectedGraphId, isLoading, error]);

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading Model...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 font-sora">
      <h2 className="text-xl px-4 pt-4 mb-4 font-bold text-gray-800 dark:text-gray-200">En-Roads Dashboard: Renewables</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Graph Area */}
        <div className="md:col-span-2 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600">
          <div className="flex justify-between items-center mb-4">
            <select
              value={selectedGraphId}
              onChange={(e) => setSelectedGraphId(e.target.value)}
              className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 font-bold"
            >
              {GRAPHS.map(g => (
                <option key={g.id} value={g.id}>{g.label}</option>
              ))}
            </select>
          </div>
          <div className="relative w-full h-[300px]">
            <canvas id="exercise2-graph-canvas" className="w-full h-full" />
          </div>
          <div className="flex gap-4 justify-center mt-4 text-xs font-semibold uppercase tracking-wider">
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

        {/* Temperature Display */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 flex flex-col items-center justify-center text-center">
          <div className="text-5xl md:text-6xl font-black text-blue-500 mb-2">
            +{tempC.toFixed(1)}°C
          </div>
          <div className="text-xl md:text-2xl font-bold text-blue-400 mb-6">
            +{tempF.toFixed(1)}°F
          </div>
          <div className="text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider text-sm">
            Temperature<br />Increase by<br />2100
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <span className="text-blue-500">▶</span>
              <label className="font-bold text-gray-700 dark:text-gray-200">Renewables</label>
            </div>
            <span className="text-sm font-mono text-gray-500">{renewablesText}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={renewablesVal}
            onChange={handleRenewablesChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700 accent-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
