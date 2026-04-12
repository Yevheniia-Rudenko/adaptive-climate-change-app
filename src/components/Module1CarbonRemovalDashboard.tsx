import { useEffect, useRef, useState, ChangeEvent } from 'react';
import { createAsyncModel, getDefaultConfig, createDefaultOutputs } from '@climateinteractive/en-roads-core';
import enStrings from '@climateinteractive/en-roads-core/strings/en';
import { GraphView } from '@climateinteractive/sim-ui-graph';
import '../styles/enroads-dashboard.css';

// Graph definitions for Section 1 dropdown
const SECTION1_GRAPHS = [
  { id: '90', label: 'Sea Level Rise', varId: '_slr_from_2000_in_meters' },
  { id: '169', label: 'Deforestation', varId: '_deforestation_in_mha_per_year' },
  { id: '275', label: 'Deaths from Extreme Heat', varId: '_excess_deaths_from_extreme_heat_per_100k_people' },
  { id: '279', label: 'Species Loss - Extinction', varId: '_percent_endemic_species_at_high_risk_of_extinction' },
  { id: '183', label: 'Crop Yield', varId: '_crop_yield_per_hectare_kg_per_year_per_ha' },
  { id: '112', label: 'Air Pollution', varId: '_pm2_5_emissions_from_energy_mt_per_year' }
];

// Graph definitions for Section 2 dropdown
const SECTION2_GRAPHS = [
  { id: '62', label: 'CO2 Net Emissions', varId: '_co2_equivalent_net_emissions' },
  { id: '169', label: 'Deforestation', varId: '_deforestation_in_mha_per_year' }
];

export default function Module1CarbonRemovalDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSection1Expanded, setIsSection1Expanded] = useState(false);
  const [isSection2Expanded, setIsSection2Expanded] = useState(false);

  // Section 1 states
  const [section1SliderValue, setSection1SliderValue] = useState(20);
  const [section1SliderText, setSection1SliderText] = useState('status quo');
  const [selectedGraphId, setSelectedGraphId] = useState('90');
  const [section2SelectedGraphId, setSection2SelectedGraphId] = useState('62');

  // Section 2 states
  const [section2DeforestationValue, setSection2DeforestationValue] = useState(50);
  const [section2DeforestationText, setSection2DeforestationText] = useState('status quo');

  // Temperature display — use refs + direct DOM to avoid React re-renders that reset canvas
  const tempCRef = useRef<HTMLSpanElement>(null);
  const tempFRef = useRef<HTMLSpanElement>(null);

  // Refs for Section 1
  const section1GraphContainerRef = useRef<HTMLDivElement>(null);
  const section1CanvasRef = useRef<HTMLCanvasElement>(null);
  const section1GraphViewRef = useRef<any>(null);

  // Refs for Section 2 (single graph with dropdown)
  const section2GraphContainerRef = useRef<HTMLDivElement>(null);
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

        // Color coding — same as Module 2
        if (!datasetSpec.externalSourceName) {
          datasetSpec.color = '#53B1E8'; // Current scenario
          datasetSpec.lineWidth = 2;
        } else if (datasetSpec.externalSourceName === 'baseline' || datasetSpec.externalSourceName === 'Ref') {
          datasetSpec.color = '#000000'; // Black for baseline
          datasetSpec.lineWidth = 2;
        }
      }

      graphView.updateData(false);
    } catch (e) {
      console.error('Error updating graph data:', e);
    }
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

  const getGraphHeight = (containerWidth: number) => {
    const height = containerWidth * 0.55;
    return Math.max(220, Math.min(320, Math.round(height)));
  };

  const resizeCanvasToContainer = (containerRef: React.RefObject<HTMLDivElement | null>, canvasRef: React.RefObject<HTMLCanvasElement | null>) => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const height = getGraphHeight(rect.width);

    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = '100%';
    canvas.style.height = `${height}px`;
  };

  const getSafeLineGraphSpec = (
    graphDefs: Array<{ id: string; label: string; varId: string }>,
    graphId: string
  ) => {
    const graphDef = graphDefs.find((g) => g.id === graphId);
    if (!graphDef) return null;

    return {
      id: graphDef.id,
      title: graphDef.label,
      kind: 'line',
      datasets: [
        { varId: graphDef.varId, externalSourceName: 'baseline', label: 'Baseline' },
        { varId: graphDef.varId, label: 'Current' }
      ]
    };
  };

  const initGraph = (
    containerRef: React.RefObject<HTMLDivElement | null>,
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
    graphId: string,
    graphDefs: Array<{ id: string; label: string; varId: string }>
  ) => {
    if (!canvasRef.current || !containerRef.current || !coreConfigRef.current) return null;

    const graphSpec = getSafeLineGraphSpec(graphDefs, graphId);
    if (!graphSpec) {
      console.error(`Graph ${graphId} not found`);
      return null;
    }

    const canvas = canvasRef.current;
    resizeCanvasToContainer(containerRef, canvasRef);

    const viewModel = createGraphViewModel(graphSpec);

    const containerWidth = containerRef.current.getBoundingClientRect().width || 640;
    const compact = containerWidth < 420;

      const isDark = document.documentElement.classList.contains('dark');
    const style = {
      font: {
        family: 'system-ui, -apple-system, sans-serif',
        style: 'normal',
        color: isDark ? '#e2e8f0' : '#1f2937',
        size: compact ? 13 : 14
      },
      xAxis: { tickMaxCount: compact ? 6 : 8 },
      yAxis: { tickMaxCount: compact ? 6 : 8 },
      getAxisLabelFontSize: () => (compact ? 14 : 16),
      getTickLabelFontSize: () => (compact ? 12 : 14),
      getDefaultLineWidth: () => 2,
      plotBackgroundColor: isDark ? '#1e293b' : '#ffffff'
    };

    const options = {
      style,
      responsive: true,
      animations: false
    };

    try {
      const graphView = new GraphView(canvas, viewModel, options, true);
      updateGraphData(graphView);
      return graphView;
    } catch (e) {
      console.error('Error initializing graph:', e);
      return null;
    }
  };

  const loadSection1Graph = (graphId: string) => {
    section1GraphViewRef.current = initGraph(section1GraphContainerRef, section1CanvasRef, graphId, SECTION1_GRAPHS);
  };

  const loadSection2Graph = (graphId: string) => {
    section2GraphViewRef.current = initGraph(section2GraphContainerRef, section2CanvasRef, graphId, SECTION2_GRAPHS);
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
    if (!SECTION1_GRAPHS.some((g) => g.id === selectedGraphId)) {
      setSelectedGraphId(SECTION1_GRAPHS[0].id);
    }
    if (!SECTION2_GRAPHS.some((g) => g.id === section2SelectedGraphId)) {
      setSection2SelectedGraphId(SECTION2_GRAPHS[0].id);
    }
  }, [selectedGraphId, section2SelectedGraphId]);

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

  useEffect(() => {
    const container1 = section1GraphContainerRef.current;
    const container2 = section2GraphContainerRef.current;
    if (!container1 || !container2) return;

    const ro = new ResizeObserver(() => {
      resizeCanvasToContainer(section1GraphContainerRef, section1CanvasRef);
      if (section1GraphViewRef.current) section1GraphViewRef.current.updateData(false);

      resizeCanvasToContainer(section2GraphContainerRef, section2CanvasRef);
      if (section2GraphViewRef.current) section2GraphViewRef.current.updateData(false);
    });

    ro.observe(container1);
    ro.observe(container2);
    return () => ro.disconnect();
  }, [isLoading]);

  useEffect(() => {
    const previousBodyOverflow = document.body.style.overflow;
    if (isSection1Expanded || isSection2Expanded) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [isSection1Expanded, isSection2Expanded]);

  useEffect(() => {
    if (isLoading || !coreConfigRef.current) return;

    const timer = window.setTimeout(() => {
      loadSection1Graph(selectedGraphId);
      loadSection2Graph(section2SelectedGraphId);
      setTimeout(() => updateAllGraphs(), 50);
    }, 120);

    return () => window.clearTimeout(timer);
  }, [isSection1Expanded, isSection2Expanded, isLoading, selectedGraphId, section2SelectedGraphId]);

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
    <>
      <div className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 rounded-xl border border-gray-200 dark:border-gray-700 font-sora mb-24">
          {/* Temperature card — centered at top like Module 2 */}
          <div className="flex justify-center mb-4">
            <div className="bg-white dark:bg-gray-800 px-6 sm:px-8 py-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 text-center">
              <span ref={tempCRef} className="block text-4xl sm:text-5xl font-black text-green-500 mb-1">+3.2°C</span>
              <span ref={tempFRef} className="block text-lg sm:text-xl font-bold text-green-400 mb-3">+5.7°F</span>
              <div className="text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider text-xs">Global Temperature<br />by 2100</div>
            </div>
          </div>

          {/* SECTION 1: Nature-Based Carbon Removal & Impact Analysis */}
          <div className="mb-8">
            <div className="flex items-start justify-between gap-3 px-3 sm:px-4 pt-3 sm:pt-4 mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200">
                Section 1: Nature-Based Carbon Removal &amp; Impacts
              </h2>
              <button
                type="button"
                onClick={() => {
                  setIsSection2Expanded(false);
                  setIsSection1Expanded(true);
                }}
                className="px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg border hover:opacity-90"
                style={{ backgroundColor: '#53B1E8', borderColor: '#53B1E8', color: '#ffffff' }}
              >
                Open Full Screen
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 mb-4">
              <div className="flex justify-between items-center mb-4">
                <select
                  value={selectedGraphId}
                  onChange={(e) => setSelectedGraphId(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 font-bold"
                >
                  {SECTION1_GRAPHS.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}
                </select>
              </div>
              <div ref={section1GraphContainerRef} style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
                <canvas
                  ref={section1CanvasRef}
                  style={{ display: 'block', width: '100%', pointerEvents: 'none' }}
                />
              </div>
              {/* Legend badges */}
              <div className="flex justify-center gap-3 mt-3">
                <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#000000' }}>BASELINE</span>
                <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#53B1E8' }}>CURRENT SCENARIO</span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center font-bold text-gray-700 dark:text-gray-200">
                  <label>Carbon-Dioxide Removal - Nature Based</label>
                  <span className="text-sm font-mono text-gray-500">{section1SliderText}</span>
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
                    background: `linear-gradient(to right, #53B1E8 0%, #53B1E8 ${(section1SliderValue / 70) * 100}%, #e5e7eb ${(section1SliderValue / 70) * 100}%, #e5e7eb 100%)`
                  }}
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: Deforestation Analysis */}
          <div>
            <div className="flex items-start justify-between gap-3 px-3 sm:px-4 pt-3 sm:pt-4 mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200">
                Section 2: Deforestation Analysis
              </h2>
              <button
                type="button"
                onClick={() => {
                  setIsSection1Expanded(false);
                  setIsSection2Expanded(true);
                }}
                className="px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg border hover:opacity-90"
                style={{ backgroundColor: '#53B1E8', borderColor: '#53B1E8', color: '#ffffff' }}
              >
                Open Full Screen
              </button>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 mb-4">
              <div className="flex justify-between items-center mb-4">
                <select
                  value={section2SelectedGraphId}
                  onChange={(e) => setSection2SelectedGraphId(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 font-bold"
                >
                  {SECTION2_GRAPHS.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}
                </select>
              </div>
              <div ref={section2GraphContainerRef} style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
                <canvas
                  ref={section2CanvasRef}
                  style={{ display: 'block', width: '100%', pointerEvents: 'none' }}
                />
              </div>
              {/* Legend badges */}
              <div className="flex justify-center gap-3 mt-3">
                <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#000000' }}>BASELINE</span>
                <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#53B1E8' }}>CURRENT SCENARIO</span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 space-y-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center font-bold text-gray-700 dark:text-gray-200">
                  <label>Carbon-Dioxide Removal - Nature Based</label>
                  <span className="text-sm font-mono text-gray-500">{section1SliderText}</span>
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
                    background: `linear-gradient(to right, #53B1E8 0%, #53B1E8 ${(section1SliderValue / 70) * 100}%, #e5e7eb ${(section1SliderValue / 70) * 100}%, #e5e7eb 100%)`
                  }}
                />
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center font-bold text-gray-700 dark:text-gray-200">
                  <label>Deforestation</label>
                  <span className="text-sm font-mono text-gray-500">{section2DeforestationText}</span>
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
                    background: `linear-gradient(to right, #53B1E8 0%, #53B1E8 ${section2DeforestationValue}%, #e5e7eb ${section2DeforestationValue}%, #e5e7eb 100%)`
                  }}
                />
              </div>
            </div>
          </div>
      </div>

      {isSection1Expanded && (
        <div className="fixed inset-0 z-50 bg-white p-4 md:p-6 overflow-y-auto font-sora">
          <div className="relative px-4 pt-4 mb-4">
            <h2 className="text-2xl font-extrabold text-gray-800 dark:text-gray-200 text-center">
              Section 1: Nature-Based Carbon Removal &amp; Impacts
            </h2>
            <button
              type="button"
              onClick={() => setIsSection1Expanded(false)}
              className="absolute right-4 top-4 px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg border hover:opacity-90"
              style={{ backgroundColor: '#53B1E8', borderColor: '#53B1E8', color: '#ffffff' }}
            >
              Close Full Screen
            </button>
          </div>

          <div className="overflow-x-auto mb-4">
            <div className="flex items-stretch gap-4 min-w-[1320px]">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 flex-1 min-w-0">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-extrabold text-gray-700 dark:text-gray-200">Section 1 Graph</h3>
                  <select
                    value={selectedGraphId}
                    onChange={(e) => setSelectedGraphId(e.target.value)}
                    className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg block p-2.5 font-bold"
                  >
                    {SECTION1_GRAPHS.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}
                  </select>
                </div>
                <div ref={section1GraphContainerRef} className="relative w-full h-[300px] overflow-hidden">
                  <canvas ref={section1CanvasRef} style={{ display: 'block', width: '100%', pointerEvents: 'none' }} />
                </div>
                <div className="flex justify-center gap-3 mt-3">
                  <span className="px-3 py-1 text-xs font-bold uppercase text-white bg-black rounded" style={{ backgroundColor: '#000000' }}>BASELINE</span>
                  <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#53B1E8' }}>CURRENT SCENARIO</span>
                </div>
              </div>

              <div className="shrink-0 w-fit">
                <div className="px-6 pb-4 text-center inline-flex flex-col items-center w-fit h-fit" style={{ transform: 'translateY(110px)' }}>
                  <span ref={tempCRef} style={{ color: '#14a9df', fontSize: 'clamp(3rem, 3vw, 3rem)', fontWeight: 800, lineHeight: 1.5 }}>+3.2°C</span>
                  <div className="mx-auto my-4 h-[2px] w-[72%] bg-black" />
                  <span ref={tempFRef} style={{ color: '#14a9df', fontSize: 'clamp(1.5rem, 1.5vw, 1.5rem)', fontWeight: 800, lineHeight: 1 }}>+5.7°F</span>
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

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 space-y-2">
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
                background: `linear-gradient(to right, #53B1E8 0%, #53B1E8 ${(section1SliderValue / 70) * 100}%, #e5e7eb ${(section1SliderValue / 70) * 100}%, #e5e7eb 100%)`
              }}
            />
          </div>
        </div>
      )}

      {isSection2Expanded && (
        <div className="fixed inset-0 z-50 bg-white p-4 md:p-6 overflow-y-auto font-sora">
          <div className="relative px-4 pt-4 mb-4">
            <h2 className="text-2xl font-extrabold text-gray-800 dark:text-gray-200 text-center">
              Section 2: Deforestation Analysis
            </h2>
            <button
              type="button"
              onClick={() => setIsSection2Expanded(false)}
              className="absolute right-4 top-4 px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg border hover:opacity-90"
              style={{ backgroundColor: '#53B1E8', borderColor: '#53B1E8', color: '#ffffff' }}
            >
              Close Full Screen
            </button>
          </div>

          <div className="overflow-x-auto mb-4">
            <div className="flex items-stretch gap-4 min-w-[1320px]">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 flex-1 min-w-0">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-extrabold text-gray-700 dark:text-gray-200">Section 2 Graph</h3>
                  <select
                    value={section2SelectedGraphId}
                    onChange={(e) => setSection2SelectedGraphId(e.target.value)}
                    className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded-lg block p-2.5 font-bold"
                  >
                    {SECTION2_GRAPHS.map(g => <option key={g.id} value={g.id}>{g.label}</option>)}
                  </select>
                </div>
                <div ref={section2GraphContainerRef} className="relative w-full h-[300px] overflow-hidden">
                  <canvas ref={section2CanvasRef} style={{ display: 'block', width: '100%', pointerEvents: 'none' }} />
                </div>
                <div className="flex justify-center gap-3 mt-3">
                  <span className="px-3 py-1 text-xs font-bold uppercase text-white bg-black rounded" style={{ backgroundColor: '#000000' }}>BASELINE</span>
                  <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#53B1E8' }}>CURRENT SCENARIO</span>
                </div>
              </div>

              <div className="shrink-0 w-fit">
                <div className="px-6 pb-4 text-center inline-flex flex-col items-center w-fit h-fit" style={{ transform: 'translateY(110px)' }}>
                  <span ref={tempCRef} style={{ color: '#14a9df', fontSize: 'clamp(3rem, 3vw, 3rem)', fontWeight: 800, lineHeight: 1.5 }}>+3.2°C</span>
                  <div className="mx-auto my-4 h-[2px] w-[72%] bg-black" />
                  <span ref={tempFRef} style={{ color: '#14a9df', fontSize: 'clamp(1.5rem, 1.5vw, 1.5rem)', fontWeight: 800, lineHeight: 1 }}>+5.7°F</span>
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
                  background: `linear-gradient(to right, #53B1E8 0%, #53B1E8 ${(section1SliderValue / 70) * 100}%, #e5e7eb ${(section1SliderValue / 70) * 100}%, #e5e7eb 100%)`
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
                  background: `linear-gradient(to right, #53B1E8 0%, #53B1E8 ${section2DeforestationValue}%, #e5e7eb ${section2DeforestationValue}%, #e5e7eb 100%)`
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
