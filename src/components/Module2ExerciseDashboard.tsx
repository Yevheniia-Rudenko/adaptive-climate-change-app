import { useEffect, useRef, useState, ChangeEvent } from 'react';
import { createAsyncModel, getDefaultConfig, createDefaultOutputs } from '@climateinteractive/en-roads-core';
import enStrings from '@climateinteractive/en-roads-core/strings/en';
import { GraphView } from '@climateinteractive/sim-ui-graph';
import '../styles/enroads-dashboard.css';

// Two fixed graphs for Module 2 — Temperature is shown via the side card only
const GRAPH_CONFIGS = [
  { id: '104', label: 'CO₂ Net Emissions', canvasId: 'module2-graph-emissions' },
  { id: '88', label: 'CO₂ Concentration', canvasId: 'module2-graph-concentration' },
];

export default function Module2ExerciseDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carbon Price slider state
  const [carbonPriceVal, setCarbonPriceVal] = useState(0);
  const [sliderText, setSliderText] = useState('status quo');

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

  const str = (key: string) => (enStrings as any)[key] || key;

  const getSliderText = (modelVal: number, max: number) => {
    const pct = max > 0 ? modelVal / max : 0;
    if (pct <= 0) return 'status quo';
    if (pct < 0.15) return 'low';
    if (pct < 0.4) return 'medium';
    if (pct < 0.7) return 'high';
    return 'very high';
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
      if (!datasetSpec.externalSourceName) {
        datasetSpec.color = '#3B82F6'; // Blue for current scenario
        datasetSpec.lineWidth = 4;
      } else if (datasetSpec.externalSourceName === 'baseline') {
        datasetSpec.color = '#000000'; // Black for baseline
        datasetSpec.lineWidth = 4;
      }
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
      const style = {
        font: { family: 'system-ui, -apple-system, sans-serif', style: 'normal', color: '#1f2937' },
        xAxis: { tickMaxCount: 6 },
        yAxis: { tickMaxCount: 6 },
        getAxisLabelFontSize: () => 14,
        getTickLabelFontSize: () => 12,
        getDefaultLineWidth: () => 4,
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

      setSliderText(val === 0 ? 'status quo' : getSliderText(modelVal, 250));
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
        setError('Failed to load En-ROADS model.');
        setIsLoading(false);
      }
    };

    if (!modelRef.current) initApp();
  }, []);

  if (isLoading) {
    return (
      <div className="enroads-loading">
        <div className="loading-spinner"></div>
        <p>Loading En-ROADS model...</p>
      </div>
    );
  }

  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 font-sora mb-24">
      <h2 className="text-xl px-4 pt-4 mb-4 font-bold text-gray-800 dark:text-gray-200">
        Test Your Predictions: Carbon Price Simulation
      </h2>

      {/* Temperature card */}
      <div className="flex justify-center mb-4">
        <div className="bg-white dark:bg-gray-800 px-8 py-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 text-center">
          <div className="text-4xl md:text-5xl font-black text-green-500 mb-1">+{tempC.toFixed(1)}°C</div>
          <div className="text-lg md:text-xl font-bold text-green-400 mb-3">+{tempF.toFixed(1)}°F</div>
          <div className="text-gray-500 text-xs font-bold uppercase">Global Temperature<br />by 2100</div>
        </div>
      </div>

      {/* CO₂ Net Emissions + CO₂ Concentration side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {GRAPH_CONFIGS.map((cfg) => (
          <div
            key={cfg.canvasId}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600"
          >
            <h3 className="text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">{cfg.label}</h3>
            <div className="relative w-full h-[250px]">
              <canvas id={cfg.canvasId} className="w-full h-full" />
            </div>
            {/* Legend badges */}
            <div className="flex justify-center gap-3 mt-3">
              <span className="px-3 py-1 text-xs font-bold uppercase text-white bg-black rounded" style={{ backgroundColor: '#000000' }}>BASELINE</span>
              <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#00b6f1' }}>CURRENT SCENARIO</span>
            </div>
          </div>
        ))}
      </div>

      {/* Carbon Price slider */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 space-y-2">
        <div className="flex justify-between font-bold text-gray-700 dark:text-gray-200">
          <label>Carbon Price</label>
          <span className="text-xs font-mono text-gray-500">{sliderText}</span>
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={carbonPriceVal}
          onChange={handleSliderChange}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-green-500"
          style={{
            background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${carbonPriceVal}%, #e5e7eb ${carbonPriceVal}%, #e5e7eb 100%)`
          }}
        />
      </div>
    </div>
  );
}
