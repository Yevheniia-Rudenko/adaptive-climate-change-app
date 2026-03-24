import { useEffect, useRef, useState, ChangeEvent } from 'react';
import { createAsyncModel, getDefaultConfig, createDefaultOutputs } from '@climateinteractive/en-roads-core';
import enStrings from '@climateinteractive/en-roads-core/strings/en';
import { GraphView } from '@climateinteractive/sim-ui-graph';
import '../styles/enroads-dashboard.css';

// Graph definitions for Section 1 dropdown
const SECTION1_GRAPHS = [
  { id: '86', label: 'Global Temperature by 2100', varId: '_temperature_relative_to_1850_1900' },
  { id: '90', label: 'Sea Level Rise', varId: '_slr_from_2000_in_meters' },
  { id: '169', label: 'Deforestation', varId: '_deforestation_in_mha_per_year' },
  { id: '275', label: 'Deaths from Extreme Heat', varId: '_excess_deaths_from_extreme_heat_per_100k_people' },
  { id: '279', label: 'Species Loss - Extinction', varId: '_percent_endemic_species_at_high_risk_of_extinction' },
  { id: '183', label: 'Crop Yield', varId: '_crop_yield_per_hectare_kg_per_year_per_ha' },
  { id: '112', label: 'Air Pollution', varId: '_pm2_5_emissions_from_energy_mt_per_year' }
];

// Graph definitions for Section 2 dropdown
const SECTION2_GRAPHS = [
  { id: '86', label: 'Global Temperature by 2100', varId: '_temperature_relative_to_1850_1900' },
  { id: '62', label: 'CO2 Net Emissions', varId: '_co2_equivalent_net_emissions' },
  { id: '169', label: 'Deforestation', varId: '_deforestation_in_mha_per_year' }
];

export default function Module1CarbonRemovalDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Section 1 states
  const [section1SliderValue, setSection1SliderValue] = useState(20);
  const [section1SliderText, setSection1SliderText] = useState('status quo');
  const [selectedGraphId, setSelectedGraphId] = useState('86');
  const [section2SelectedGraphId, setSection2SelectedGraphId] = useState('86');

  // Section 2 states
  const [section2DeforestationValue, setSection2DeforestationValue] = useState(50);
  const [section2DeforestationText, setSection2DeforestationText] = useState('status quo');

  // Temperature display — use refs + direct DOM to avoid React re-renders that reset canvas
  const tempCRef = useRef<HTMLSpanElement>(null);
  const tempFRef = useRef<HTMLSpanElement>(null);

  // Refs for Section 1
  const section1CanvasRef = useRef<HTMLCanvasElement>(null);
  const section1GraphViewRef = useRef<any>(null);

  // Refs for Section 2 (single graph with dropdown)
  const section2CanvasRef = useRef<HTMLCanvasElement>(null);
  const section2GraphViewRef = useRef<any>(null);

  // Model refs
  const modelRef = useRef<any>(null);
  const modelContextRef = useRef<any>(null);
  const coreConfigRef = useRef<any>(null);

  // Input refs
  const carbonRemovalInputRef = useRef<any>(null);
  const deforestationInputRef = useRef<any>(null);

  const str = (key: string) => {
    return (enStrings as any)[key] || key;
  };

  const getSliderText = (value: number) => {
    if (value >= 0.015) return 'taxed';
    if (value > 0.001) return 'lightly taxed';
    if (value >= -0.001) return 'status quo';
    if (value > -0.015) return 'lightly subsidized';
    if (value > -0.035) return 'subsidized';
    return 'highly subsidized';
  };

  const getDeforestationText = (value: number) => {
    if (value > 0.5) return 'high deforestation';
    if (value > 0.1) return 'moderate deforestation';
    if (value >= -0.1) return 'status quo';
    if (value > -0.5) return 'moderate reforestation';
    return 'high reforestation';
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
        if (graphSpec.kind === 'h-bar' && graphSpec.id !== '142') {
          return `${stringValue}%`;
        }
        return stringValue;
      },
      formatYAxisTooltipValue: (value: number) => value.toFixed(2)
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

      // Color coding — same as Module 2
      if (!datasetSpec.externalSourceName) {
        datasetSpec.color = '#00b6f1'; // CI blue for current scenario
        datasetSpec.lineWidth = 4;
      } else if (datasetSpec.externalSourceName === 'baseline' || datasetSpec.externalSourceName === 'Ref') {
        datasetSpec.color = '#000000'; // Black for baseline
        datasetSpec.lineWidth = 4;
      }
    }

    graphView.updateData(false);
  };

  const updateTemperatureDisplay = () => {
    if (!modelContextRef.current) return;

    // Try multiple temperature variables
    let tempSeries = modelContextRef.current.getSeriesForVar('_temperature_change_from_1850');

    if (!tempSeries || !tempSeries.points) {
      tempSeries = modelContextRef.current.getSeriesForVar('_temperature_relative_to_1850_1900');
    }

    if (tempSeries && tempSeries.points && tempSeries.points.length > 0) {
      const tempCelsius = tempSeries.getValueAtTime(2100);
      const tempFahrenheit = tempCelsius * 9 / 5;

      console.log(`Temperature updated: ${tempCelsius.toFixed(2)}°C`);
      if (tempCRef.current) tempCRef.current.textContent = `+${tempCelsius.toFixed(1)}°C`;
      if (tempFRef.current) tempFRef.current.textContent = `+${tempFahrenheit.toFixed(1)}°F`;
    } else {
      // Fallback: approximate from emissions
      console.log('Temperature series not found, using emissions fallback');
      const emissionsSeries = modelContextRef.current.getSeriesForVar('_co2_equivalent_net_emissions');
      if (emissionsSeries && emissionsSeries.points && emissionsSeries.points.length > 0) {
        const emissions2100 = emissionsSeries.getValueAtTime(2100);
        const tempCelsius = 1.5 + (emissions2100 / 69.6) * 1.8;
        const tempFahrenheit = tempCelsius * 9 / 5;

        console.log(`Temperature from emissions: ${tempCelsius.toFixed(2)}°C (emissions: ${emissions2100.toFixed(2)})`);
        if (tempCRef.current) tempCRef.current.textContent = `+${tempCelsius.toFixed(1)}°C`;
        if (tempFRef.current) tempFRef.current.textContent = `+${tempFahrenheit.toFixed(1)}°F`;
      }
    }
  };

  const updateAllGraphs = () => {
    // Update Section 1 graph
    if (section1GraphViewRef.current) {
      updateGraphData(section1GraphViewRef.current);
    }

    // Update Section 2 graph
    if (section2GraphViewRef.current) {
      updateGraphData(section2GraphViewRef.current);
    }

    updateTemperatureDisplay();
  };

  const initGraph = (canvasRef: React.RefObject<HTMLCanvasElement | null>, graphId: string) => {
    if (!canvasRef.current || !coreConfigRef.current) return null;

    const graphSpec = coreConfigRef.current.graphs.get(graphId);
    if (!graphSpec) {
      console.error(`Graph ${graphId} not found`);
      return null;
    }

    const canvas = canvasRef.current;
    const dpr = window.devicePixelRatio || 1;
    const CANVAS_WIDTH = 640;
    const CANVAS_HEIGHT = 320;

    canvas.style.width = CANVAS_WIDTH + 'px';
    canvas.style.height = CANVAS_HEIGHT + 'px';
    canvas.width = CANVAS_WIDTH * dpr;
    canvas.height = CANVAS_HEIGHT * dpr;

    const viewModel = createGraphViewModel(graphSpec);

    const style = {
      font: {
        family: 'system-ui, -apple-system, sans-serif',
        style: 'normal',
        color: '#1f2937'
      },
      xAxis: { tickMaxCount: 8 },
      yAxis: { tickMaxCount: 8 },
      getAxisLabelFontSize: () => 16,
      getTickLabelFontSize: () => 14,
      getDefaultLineWidth: () => 5
    };

    const options = {
      style,
      responsive: false,
      animations: false
    };

    const graphView = new GraphView(canvas, viewModel, options, true);
    updateGraphData(graphView);
    return graphView;
  };

  const loadSection1Graph = (graphId: string) => {
    section1GraphViewRef.current = initGraph(section1CanvasRef, graphId);
  };

  const loadSection2Graph = (graphId: string) => {
    section2GraphViewRef.current = initGraph(section2CanvasRef, graphId);
  };

  const handleSection1SliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const sliderPos = parseFloat(e.target.value);
    // Reverse the mapping: 0 = highly subsidized, 70 = taxed
    const value = -0.05 + (sliderPos / 70) * 0.07;

    console.log(`Slider changed: position=${sliderPos}, value=${value.toFixed(4)}`);

    setSection1SliderValue(sliderPos);
    setSection1SliderText(getSliderText(value));

    if (carbonRemovalInputRef.current) {
      carbonRemovalInputRef.current.set(value);
      console.log('Carbon removal input set to:', value);

      // Force model update
      setTimeout(() => {
        console.log('Forcing graph and temperature update...');
        updateAllGraphs();
      }, 100);
    }
  };



  const handleSection2DeforestationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const sliderPos = parseFloat(e.target.value);
    // Map slider 0-100 to deforestation range (will determine actual range after finding input)
    const value = (sliderPos - 50) / 50; // -1 to 1 range as placeholder

    setSection2DeforestationValue(sliderPos);
    setSection2DeforestationText(getDeforestationText(value));

    if (deforestationInputRef.current) {
      const min = deforestationInputRef.current.min !== undefined ? deforestationInputRef.current.min : -1;
      const max = deforestationInputRef.current.max !== undefined ? deforestationInputRef.current.max : 1;
      const modelVal = min + (sliderPos / 100) * (max - min);
      deforestationInputRef.current.set(modelVal);
    }
  };

  useEffect(() => {
    const initApp = async () => {
      try {
        console.log('Loading En-ROADS model...');
        setIsLoading(true);

        coreConfigRef.current = getDefaultConfig();
        modelRef.current = await createAsyncModel();
        modelContextRef.current = modelRef.current.addContext();
        createDefaultOutputs();

        // Get carbon removal input (ID 16)
        carbonRemovalInputRef.current = modelContextRef.current.getInputForId('16');

        if (!carbonRemovalInputRef.current) {
          throw new Error('Carbon removal input not found');
        }

        // Find deforestation input
        console.log('Searching for deforestation input...');
        for (let i = 0; i < 200; i++) {
          const input = modelContextRef.current.getInputForId(String(i));
          if (input && input.varId) {
            const varId = input.varId.toLowerCase();
            if (varId.includes('deforestation') || varId.includes('forest')) {
              console.log(`Found potential deforestation input at ID ${i}: ${input.varId}`);
              if (varId.includes('deforestation') && !varId.includes('from')) {
                deforestationInputRef.current = input;
                console.log(`Using deforestation input ID ${i}: ${input.varId}, min: ${input.min}, max: ${input.max}`);
                break;
              }
            }
          }
        }

        if (!deforestationInputRef.current) {
          console.warn('Deforestation input not found, Section 2 deforestation slider will not function');
        }

        // Set up output change handler FIRST — before any set() calls
        modelContextRef.current.onOutputsChanged = () => {
          updateAllGraphs();
        };

        // Set initial values — this triggers model run
        const carbonRemovalInitialValue = 0.02 - (20 / 70) * 0.07;
        carbonRemovalInputRef.current.set(carbonRemovalInitialValue);

        // Initialize graphs after model has had time to run
        setTimeout(() => {
          loadSection1Graph(selectedGraphId);
          loadSection2Graph(section2SelectedGraphId);
          // Explicitly update graphs with current model data
          setTimeout(() => updateAllGraphs(), 50);
        }, 150);

        setIsLoading(false);
      } catch (err) {
        console.error('Failed to initialize dashboard:', err);
        setError('Failed to load the En-ROADS model. Please refresh the page.');
        setIsLoading(false);
      }
    };

    initApp();

    return () => {
      section1GraphViewRef.current = null;
      section2GraphViewRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!isLoading && coreConfigRef.current) {
      loadSection1Graph(selectedGraphId);
    }
  }, [selectedGraphId, isLoading]);

  useEffect(() => {
    if (!isLoading && coreConfigRef.current) {
      loadSection2Graph(section2SelectedGraphId);
    }
  }, [section2SelectedGraphId, isLoading]);

  if (isLoading) {
    return (
      <div className="enroads-loading">
        <div className="loading-spinner"></div>
        <p>Loading En-ROADS model...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="enroads-error">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 font-sora mb-24">

      {/* Temperature card — centered at top like Module 2 */}
      <div className="flex justify-center mb-6">
        <div className="bg-white dark:bg-gray-800 px-8 py-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 text-center">
          <span ref={tempCRef} className="block text-4xl md:text-5xl font-black text-green-500 mb-1">+3.2°C</span>
          <span ref={tempFRef} className="block text-lg md:text-xl font-bold text-green-400 mb-3">+5.7°F</span>
          <div className="text-gray-500 text-xs font-bold uppercase">Global Temperature<br />by 2100</div>
        </div>
      </div>

      {/* SECTION 1: Nature-Based Carbon Removal & Impact Analysis */}
      <div className="mb-8">
        <h2 className="text-xl px-4 pt-2 mb-4 font-bold text-gray-800 dark:text-gray-200">
          Section 1: Nature-Based Carbon Removal &amp; Impacts
        </h2>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 mb-4">
          <select
            value={selectedGraphId}
            onChange={(e) => setSelectedGraphId(e.target.value)}
            className="mb-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg block w-full p-2.5 font-bold"
          >
            {SECTION1_GRAPHS.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}
          </select>
          <div style={{ position: 'relative', width: '100%', height: '320px', overflow: 'hidden' }}>
            <canvas
              ref={section1CanvasRef}
              style={{ display: 'block', width: '640px', height: '320px', pointerEvents: 'none' }}
            /></div>
          {/* Legend badges */}
          <div className="flex justify-center gap-3 mt-3">
            <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#000000' }}>BASELINE</span>
            <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#00b6f1' }}>CURRENT SCENARIO</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between font-bold text-gray-700 dark:text-gray-200">
              <label>Carbon-Dioxide Removal - Nature Based</label>
              <span className="text-xs font-mono text-gray-500">{section1SliderText}</span>
            </div>
            <input
              type="range"
              min="0"
              max="70"
              step="1"
              value={section1SliderValue}
              onChange={handleSection1SliderChange}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(section1SliderValue / 70) * 100}%, #e5e7eb ${(section1SliderValue / 70) * 100}%, #e5e7eb 100%)`
              }}
            />
          </div>
        </div>
      </div>

      {/* SECTION 2: Deforestation Analysis */}
      <div>
        <h2 className="text-xl px-4 pt-2 mb-4 font-bold text-gray-800 dark:text-gray-200">
          Section 2: Deforestation Analysis
        </h2>

        <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 mb-4">
          <select
            value={section2SelectedGraphId}
            onChange={(e) => setSection2SelectedGraphId(e.target.value)}
            className="mb-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg block w-full p-2.5 font-bold"
          >
            {SECTION2_GRAPHS.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}
          </select>
          <div style={{ position: 'relative', width: '100%', height: '320px', overflow: 'hidden' }}>
            <canvas
              ref={section2CanvasRef}
              style={{ display: 'block', width: '640px', height: '320px', pointerEvents: 'none' }}
            /></div>
          {/* Legend badges */}
          <div className="flex justify-center gap-3 mt-3">
            <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#000000' }}>BASELINE</span>
            <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#00b6f1' }}>CURRENT SCENARIO</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between font-bold text-gray-700 dark:text-gray-200">
              <label>Carbon-Dioxide Removal - Nature Based</label>
              <span className="text-xs font-mono text-gray-500">{section1SliderText}</span>
            </div>
            <input
              type="range"
              min="0"
              max="70"
              step="1"
              value={section1SliderValue}
              onChange={handleSection1SliderChange}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${(section1SliderValue / 70) * 100}%, #e5e7eb ${(section1SliderValue / 70) * 100}%, #e5e7eb 100%)`
              }}
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between font-bold text-gray-700 dark:text-gray-200">
              <label>Deforestation</label>
              <span className="text-xs font-mono text-gray-500">{section2DeforestationText}</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              step="1"
              value={section2DeforestationValue}
              onChange={handleSection2DeforestationChange}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #f97316 0%, #f97316 ${section2DeforestationValue}%, #e5e7eb ${section2DeforestationValue}%, #e5e7eb 100%)`
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
