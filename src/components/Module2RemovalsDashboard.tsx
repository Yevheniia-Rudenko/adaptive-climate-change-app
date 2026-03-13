import { useEffect, useRef, useState, ChangeEvent } from 'react';
import { createAsyncModel, getDefaultConfig, createDefaultOutputs } from '@climateinteractive/en-roads-core';
import enStrings from '@climateinteractive/en-roads-core/strings/en';
import { GraphView } from '@climateinteractive/sim-ui-graph';
import '../styles/enroads-dashboard.css';

// Four graphs: CO₂ Emissions & Removals (combined), CO₂ Concentration, Global Temperature
const GRAPH_CONFIGS = [
  { id: '57', label: 'CO₂ Emissions and Removals', canvasId: 'module2-removals-graph-emissions-removals' },
  { id: '88', label: 'CO₂ Concentration', canvasId: 'module2-removals-graph-concentration' },
  { id: '86', label: 'Global Temperature by 2100', canvasId: 'module2-removals-graph-temperature' },
];

export default function Module2RemovalsDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Slider states
  const [carbonPriceVal, setCarbonPriceVal] = useState(0);
  const [carbonPriceText, setCarbonPriceText] = useState('$0 / ton CO₂');
  const [natureVal, setNatureVal] = useState(0);
  const [natureText, setNatureText] = useState('status quo');
  const [techVal, setTechVal] = useState(0);
  const [techText, setTechText] = useState('status quo');

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
  const natureInputRef = useRef<any>(null); // Afforestation / nature-based removal
  const techInputRef = useRef<any>(null); // Technological removal (DACCS, etc.)

  const str = (key: string) => (enStrings as any)[key] || key;

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
      for (const datasetViewModel of graphViewModel.getDatasets()) {
        const datasetSpec = datasetViewModel.spec;
        const series = modelContextRef.current.getSeriesForVar(
          datasetSpec.varId,
          datasetSpec.externalSourceName
        );
        datasetViewModel.points = [...(series?.points || [])];
        if (!datasetSpec.externalSourceName) {
          datasetSpec.color = '#EF4444';
          datasetSpec.lineWidth = 4;
        } else if (datasetSpec.externalSourceName === 'baseline') {
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

  const loadGraph = (canvasId: string, graphId: string) => {
    if (!coreConfigRef.current) return;
    const graphSpec = coreConfigRef.current.graphs.get(graphId);

    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = rect.width * dpr;
    canvas.height = 250 * dpr;
    canvas.style.width = '100%';
    canvas.style.height = '250px';

    try {
      const viewModel = createGraphViewModel(graphSpec);
      const style = {
        font: { family: 'system-ui, sans-serif', size: 12, color: '#333' },
        xAxis: { tickMaxCount: 6 },
        yAxis: { tickMaxCount: 6 },
        getDefaultLineWidth: () => 4,
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
      setCarbonPriceText(`$${Math.round(modelVal)} / ton CO₂`);
      setTimeout(() => updateAllGraphs(), 100);
    }
  };

  const handleNatureChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setNatureVal(val);
    if (natureInputRef.current && modelRef.current) {
      const min = natureInputRef.current.min ?? -5;
      const max = natureInputRef.current.max ?? 5;
      const modelVal = min + (val / 100) * (max - min);
      natureInputRef.current.set(modelVal);
      if (modelVal > 0.5) setNatureText('high reforestation');
      else if (modelVal > 0.1) setNatureText('moderate reforestation');
      else if (modelVal >= -0.1) setNatureText('status quo');
      else if (modelVal >= -0.5) setNatureText('moderate deforestation');
      else setNatureText('high deforestation');
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
      if (val <= 1) setTechText('status quo');
      else if (val < 33) setTechText('low investment');
      else if (val < 66) setTechText('medium investment');
      else setTechText('high investment');
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

        // Find all three inputs by scanning varIds
        for (let i = 0; i < 200; i++) {
          const input = modelContextRef.current.getInputForId(String(i));
          if (!input?.varId) continue;
          const varId = input.varId.toLowerCase();

          // Carbon Price
          if (!carbonPriceInputRef.current && (varId.includes('_price') || varId === '_carbon_price' || varId.includes('carbon_tax'))) {
            carbonPriceInputRef.current = input;
            console.log(`Module2Removals: Found Carbon Price at ID ${i}: ${input.varId}`);
          }

          // Nature-based removal (afforestation/deforestation)
          if (!natureInputRef.current && (varId.includes('afforest') || (varId.includes('deforest') && !varId.includes('from')))) {
            natureInputRef.current = input;
            console.log(`Module2Removals: Found Nature-based at ID ${i}: ${input.varId}, min: ${input.min}, max: ${input.max}`);
          }

          // Technological removal (direct air capture, tech carbon removal)
          if (!techInputRef.current && (varId.includes('tech') && (varId.includes('remov') || varId.includes('carbon') || varId.includes('capture')))) {
            techInputRef.current = input;
            console.log(`Module2Removals: Found Tech removal at ID ${i}: ${input.varId}, min: ${input.min}, max: ${input.max}`);
          }
        }

        // Fallback: dump all inputs to help debug
        if (!natureInputRef.current || !techInputRef.current) {
          console.log('Module2Removals: Dumping all inputs for debugging...');
          for (let i = 0; i < 200; i++) {
            const input = modelContextRef.current.getInputForId(String(i));
            if (input?.varId) {
              console.log(`  ID ${i}: ${input.varId}`);
            }
          }
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

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading Model...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 font-sora">
      <h2 className="text-xl px-4 pt-4 mb-4 font-bold text-gray-800 dark:text-gray-200">
        ⚙️ Make a Model: Carbon Price + CO₂ Removals
      </h2>

      {/* Temperature display */}
      <div className="flex justify-center mb-4">
        <div className="bg-white dark:bg-gray-800 px-6 py-3 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 text-center">
          <div className="text-3xl md:text-4xl font-black text-red-500">+{tempC.toFixed(1)}°C</div>
          <div className="text-lg font-bold text-red-400">+{tempF.toFixed(1)}°F</div>
          <div className="text-gray-500 text-xs font-bold uppercase mt-1">Global Temperature by 2100</div>
        </div>
      </div>

      {/* Three graphs in a grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {GRAPH_CONFIGS.map((cfg) => (
          <div
            key={cfg.canvasId}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600"
          >
            <h3 className="text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">{cfg.label}</h3>
            <div className="relative w-full h-[250px]">
              <canvas id={cfg.canvasId} className="w-full h-full" />
            </div>
          </div>
        ))}
      </div>

      {/* Sliders */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 space-y-6">
        {/* Carbon Price */}
        <div className="space-y-2">
          <div className="flex justify-between font-bold text-gray-700 dark:text-gray-200">
            <label>💰 Carbon Price</label>
            <span className="text-xs font-mono text-gray-500">{carbonPriceText}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={carbonPriceVal}
            onChange={handleCarbonPriceChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-green-500"
          />
        </div>

        {/* Nature-based Removals */}
        <div className="space-y-2">
          <div className="flex justify-between font-bold text-gray-700 dark:text-gray-200">
            <label>🌱 Nature-Based Removals</label>
            <span className="text-xs font-mono text-gray-500">{natureText}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={natureVal}
            onChange={handleNatureChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
          />
        </div>

        {/* Technological Removals */}
        <div className="space-y-2">
          <div className="flex justify-between font-bold text-gray-700 dark:text-gray-200">
            <label>🔧 Technological Removals</label>
            <span className="text-xs font-mono text-gray-500">{techText}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={techVal}
            onChange={handleTechChange}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>
      </div>
    </div>
  );
}
