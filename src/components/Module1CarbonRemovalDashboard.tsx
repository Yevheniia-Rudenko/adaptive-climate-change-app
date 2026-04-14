import { useEffect, useRef, useState, ChangeEvent } from 'react';
import { createAsyncModel, getDefaultConfig, createDefaultOutputs } from '@climateinteractive/en-roads-core';
import enStrings from '@climateinteractive/en-roads-core/strings/en';
import { GraphView } from '@climateinteractive/sim-ui-graph';
import '../styles/enroads-dashboard.css';

// Graph definitions for Section 1 dropdown
const SECTION1_GRAPHS = [
  { id: '90', label: 'Sea Level Rise', varId: '_slr_from_2000_in_meters' },
  { id: '169', label: 'Deforestation', varId: '_global_deforestation_mha' },
  { id: '275', label: 'Deaths from Extreme Heat', varId: '_excess_deaths_from_extreme_heat_per_100k_people' },
  { id: '279', label: 'Species Loss - Extinction', varId: '_percent_endemic_species_at_high_risk_of_extinction' },
  { id: '183', label: 'Crop Yield', varId: '_crop_yield_per_hectare_kg_per_year_per_ha' },
  { id: '112', label: 'Air Pollution', varId: '_pm2_5_emissions_from_energy_mt_per_year' }
];

// Graph definitions for Section 2 dropdown
const SECTION2_GRAPHS = [
  { id: '62', label: 'CO2 Net Emissions', varId: '_co2_equivalent_net_emissions' },
  { id: '169', label: 'Deforestation', varId: '_global_deforestation_mha' }
];

const NATURE_REMOVALS_INPUT_ID = '417';
const NATURE_REMOVALS_MODE_SWITCH_ID = '418';

export default function Module1CarbonRemovalDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSection1Expanded, setIsSection1Expanded] = useState(false);
  const [isSection2Expanded, setIsSection2Expanded] = useState(false);

  // Section 1 states
  const [section1SliderValue, setSection1SliderValue] = useState(0);
  const [section1SliderText, setSection1SliderText] = useState('status quo');
  const [selectedGraphId, setSelectedGraphId] = useState('90');
  const [section2SelectedGraphId, setSection2SelectedGraphId] = useState('62');

  // Section 2 states
  const [section2DeforestationValue, setSection2DeforestationValue] = useState(0);
  const [section2DeforestationText, setSection2DeforestationText] = useState('status quo');

  // Temperature display — use refs + direct DOM to avoid React re-renders that reset canvas
  const tempCRef = useRef<HTMLSpanElement>(null);
  const tempFRef = useRef<HTMLSpanElement>(null);
  const section1TempCOutsideRef = useRef<HTMLDivElement>(null);
  const section1TempFOutsideRef = useRef<HTMLDivElement>(null);
  const section2TempCOutsideRef = useRef<HTMLDivElement>(null);
  const section2TempFOutsideRef = useRef<HTMLDivElement>(null);

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
  const natureModeSwitchRef = useRef<any>(null);
  const deforestationInputRef = useRef<any>(null);

  const str = (key: string) => {
    return (enStrings as any)[key] || key;
  };

  const getInputRangeLabel = (input: any, value: number) => {
    const rangeLabelKeys: string[] = input?.spec?.rangeLabelKeys ?? [
      'input_range__status_quo',
      'input_range__low',
      'input_range__medium',
      'input_range__high',
      'input_range__very_high'
    ];
    const rangeDividers: number[] = input?.spec?.rangeDividers ?? [6, 20, 60, 100];

    let idx = rangeDividers.findIndex((d) => value < d);
    if (idx === -1) idx = rangeLabelKeys.length - 1;
    return str(rangeLabelKeys[idx] ?? 'input_range__status_quo');
  };

  const getCarbonRemovalText = (value: number) => {
    if (value >= 70) return 'high growth';
    if (value >= 40) return 'medium growth';
    if (value >= 15) return 'low growth';
    return 'status quo';
  };

  const getDeforestationText = (value: number) => {
    if (value >= 0.1) return 'increased';
    if (value >= -1.0) return 'status quo';
    if (value >= -4.0) return 'reduced';
    return 'highly reduced';
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
        let series = modelContextRef.current.getSeriesForVar(
          datasetSpec.varId,
          datasetSpec.externalSourceName
        );

        // En-ROADS uses both `baseline` and `Ref` depending on graph/source.
        // Try both so baseline always appears when available.
        if ((!series || !series.points || series.points.length === 0) && datasetSpec.externalSourceName === 'baseline') {
          series = modelContextRef.current.getSeriesForVar(datasetSpec.varId, 'Ref');
        } else if ((!series || !series.points || series.points.length === 0) && datasetSpec.externalSourceName === 'Ref') {
          series = modelContextRef.current.getSeriesForVar(datasetSpec.varId, 'baseline');
        }

        const newPoints = series?.points || [];
        datasetViewModel.points = [...newPoints];

        // Preserve config-defined colors (e.g. Species Loss marine/land).
        // Only apply defaults when no color is set.
        if (datasetSpec.externalSourceName === 'baseline' || datasetSpec.externalSourceName === 'Ref') {
          if (!datasetSpec.color) datasetSpec.color = '#000000';
          datasetSpec.lineWidth = 4;
        } else {
          if (!datasetSpec.color) datasetSpec.color = '#00b6f1';
          datasetSpec.lineWidth = 4;
        }
      }

      graphView.updateData(true);
    } catch (e) {
      console.error('Error updating graph data:', e);
    }
  };

  const updateTemperatureDisplay = () => {
    if (!modelContextRef.current) return;

    const setAllTemperatureLabels = (tempCelsius: number) => {
      const tempFahrenheit = tempCelsius * 9 / 5;
      const cText = `+${tempCelsius.toFixed(1)}°C`;
      const fText = `+${tempFahrenheit.toFixed(1)}°F`;

      if (tempCRef.current) tempCRef.current.textContent = cText;
      if (tempFRef.current) tempFRef.current.textContent = fText;
      if (section1TempCOutsideRef.current) section1TempCOutsideRef.current.textContent = cText;
      if (section1TempFOutsideRef.current) section1TempFOutsideRef.current.textContent = fText;
      if (section2TempCOutsideRef.current) section2TempCOutsideRef.current.textContent = cText;
      if (section2TempFOutsideRef.current) section2TempFOutsideRef.current.textContent = fText;
    };

    // Try multiple temperature variables
    let tempSeries = modelContextRef.current.getSeriesForVar('_temperature_change_from_1850');

    if (!tempSeries || !tempSeries.points) {
      tempSeries = modelContextRef.current.getSeriesForVar('_temperature_relative_to_1850_1900');
    }

    if (tempSeries && tempSeries.points && tempSeries.points.length > 0) {
      const tempCelsius = tempSeries.getValueAtTime(2100);
      setAllTemperatureLabels(tempCelsius);
    } else {
      // Fallback: approximate from emissions
      console.log('Temperature series not found, using emissions fallback');
      const emissionsSeries = modelContextRef.current.getSeriesForVar('_co2_equivalent_net_emissions');
      if (emissionsSeries && emissionsSeries.points && emissionsSeries.points.length > 0) {
        const emissions2100 = emissionsSeries.getValueAtTime(2100);
        const tempCelsius = 1.5 + (emissions2100 / 69.6) * 1.8;
        setAllTemperatureLabels(tempCelsius);
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

    const fromConfig = coreConfigRef.current?.graphs?.get(graphId);
    if (fromConfig) {
      // Graph 279 (Species Loss) shows marine + land species as separate lines.
      // Explicitly set palette so chart lines and legend badges always match.
      if (graphId === '279') {
        const MARINE = '#3385C6';
        const LAND   = '#843C0C';
        const curr = (fromConfig.datasets || []).filter((d: any) => !d.externalSourceName);
        const base = (fromConfig.datasets || []).filter(
          (d: any) => d.externalSourceName === 'Ref' || d.externalSourceName === 'baseline'
        );
        return {
          ...fromConfig,
          datasets: [
            ...base.slice(0, 2).map((d: any, i: number) => ({ ...d, color: [MARINE, LAND][i] })),
            ...curr.slice(0, 2).map((d: any, i: number) => ({ ...d, color: [MARINE, LAND][i] }))
          ]
        };
      }

      const baselineDataset = fromConfig.datasets?.find(
        (d: any) => d.externalSourceName === 'Ref' || d.externalSourceName === 'baseline'
      );
      const currentDataset = fromConfig.datasets?.find((d: any) => !d.externalSourceName);

      // Preferred path: preserve canonical En-ROADS varIds and dataset structure,
      // but constrain to the two scenario lines shown by the badges.
      if (baselineDataset && currentDataset) {
        return {
          ...fromConfig,
          datasets: [
            {
              ...baselineDataset,
              label: 'Baseline',
              color: '#000000',
              lineStyle: baselineDataset.lineStyle || 'thinline'
            },
            {
              ...currentDataset,
              label: 'Current',
              color: '#00b6f1',
              lineStyle: currentDataset.lineStyle || 'line'
            }
          ]
        };
      }

      // If config does not expose both datasets, still use config metadata and fallback varId.
      return {
        ...fromConfig,
        datasets: [
          { varId: graphDef.varId, externalSourceName: 'Ref', label: 'Baseline', color: '#000000', lineStyle: 'thinline' },
          { varId: graphDef.varId, label: 'Current', color: '#00b6f1', lineStyle: 'line' }
        ]
      };
    }

    return {
      id: graphDef.id,
      title: graphDef.label,
      kind: 'line',
      datasets: [
        { varId: graphDef.varId, externalSourceName: 'Ref', label: 'Baseline', color: '#000000', lineStyle: 'thinline' },
        { varId: graphDef.varId, label: 'Current', color: '#00b6f1', lineStyle: 'line' }
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
      getDefaultLineWidth: () => 4,
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
    if (!section1GraphViewRef.current) {
      window.setTimeout(() => {
        section1GraphViewRef.current = initGraph(section1GraphContainerRef, section1CanvasRef, graphId, SECTION1_GRAPHS);
        if (section1GraphViewRef.current) updateGraphData(section1GraphViewRef.current);
      }, 120);
    }
  };

  const loadSection2Graph = (graphId: string) => {
    section2GraphViewRef.current = initGraph(section2GraphContainerRef, section2CanvasRef, graphId, SECTION2_GRAPHS);
    if (!section2GraphViewRef.current) {
      window.setTimeout(() => {
        section2GraphViewRef.current = initGraph(section2GraphContainerRef, section2CanvasRef, graphId, SECTION2_GRAPHS);
        if (section2GraphViewRef.current) updateGraphData(section2GraphViewRef.current);
      }, 120);
    }
  };

  const handleSection1SliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const sliderPos = parseFloat(e.target.value);

    setSection1SliderValue(sliderPos);
    setSection1SliderText(getCarbonRemovalText(sliderPos));

    if (carbonRemovalInputRef.current) {
      const min = carbonRemovalInputRef.current.min ?? 0;
      const max = carbonRemovalInputRef.current.max ?? 100;
      const modelVal = min + (sliderPos / 100) * (max - min);

      carbonRemovalInputRef.current.set(modelVal);

      // Force model update
      setTimeout(() => {
        updateAllGraphs();
      }, 100);
    }
  };



  const handleSection2DeforestationChange = (e: ChangeEvent<HTMLInputElement>) => {
    const sliderPos = parseFloat(e.target.value);

    setSection2DeforestationValue(sliderPos);
    setSection2DeforestationText(getDeforestationText(sliderPos));

    if (deforestationInputRef.current) {
      const min = deforestationInputRef.current.min !== undefined ? deforestationInputRef.current.min : -10;
      const max = deforestationInputRef.current.max !== undefined ? deforestationInputRef.current.max : 1;
      const modelVal = min + ((sliderPos + 10) / 11) * (max - min);
      deforestationInputRef.current.set(modelVal);

      // Force model update
      setTimeout(() => {
        updateAllGraphs();
      }, 100);
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

        carbonRemovalInputRef.current = modelContextRef.current.getInputForId(NATURE_REMOVALS_INPUT_ID);
        natureModeSwitchRef.current = modelContextRef.current.getInputForId(NATURE_REMOVALS_MODE_SWITCH_ID);

        if (!carbonRemovalInputRef.current) {
          throw new Error('Carbon removal input not found');
        }

        // Ensure aggregate nature-based removals slider is active.
        if (natureModeSwitchRef.current?.set) natureModeSwitchRef.current.set(0);

        const natureMin = carbonRemovalInputRef.current.min ?? 0;
        const natureMax = carbonRemovalInputRef.current.max ?? 100;
        const natureDenom = natureMax - natureMin;
        
        setSection1SliderValue(0);
        setSection1SliderText(getCarbonRemovalText(0));
        if (carbonRemovalInputRef.current?.set) {
          const modelVal = natureMin + (0 / 100) * natureDenom;
          carbonRemovalInputRef.current.set(modelVal);
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

        if (deforestationInputRef.current) {
          setSection2DeforestationValue(0);
          setSection2DeforestationText(getDeforestationText(0));
          if (deforestationInputRef.current.set) {
            const min = deforestationInputRef.current.min !== undefined ? deforestationInputRef.current.min : -10;
            const max = deforestationInputRef.current.max !== undefined ? deforestationInputRef.current.max : 1;
            const modelVal = min + ((0 + 10) / 11) * (max - min);
            deforestationInputRef.current.set(modelVal);
          }
        } else {
          console.warn('Deforestation input not found, Section 2 deforestation slider will not function');
        }

        // Set up output change handler FIRST — before any set() calls
        modelContextRef.current.onOutputsChanged = () => {
          updateAllGraphs();
        };

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

    const ro = new ResizeObserver(() => {
      if (section1GraphContainerRef.current && section1CanvasRef.current) {
        resizeCanvasToContainer(section1GraphContainerRef, section1CanvasRef);
        if (section1GraphViewRef.current) section1GraphViewRef.current.updateData(false);
      }

      if (section2GraphContainerRef.current && section2CanvasRef.current) {
        resizeCanvasToContainer(section2GraphContainerRef, section2CanvasRef);
        if (section2GraphViewRef.current) section2GraphViewRef.current.updateData(false);
      }
    });

    if (container1) ro.observe(container1);
    if (container2) ro.observe(container2);
    if (!container1 && !container2) return () => ro.disconnect();

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
      <div className="font-sora mb-24 space-y-6">
          {/* SECTION 1: Nature-Based Carbon Removal & Impact Analysis */}
          <div className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 rounded-xl border border-gray-200 dark:border-gray-700">
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

            {/* Temperature card (match Module 2 small view) */}
            <div className="flex justify-center mb-4">
              <div className="bg-white dark:bg-gray-800 px-6 py-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 text-center inline-flex flex-col items-center w-fit mx-auto">
                <div
                  ref={section1TempCOutsideRef}
                  style={{
                    color: '#14a9df',
                    fontSize: 'clamp(3rem, 3vw, 3rem)',
                    fontWeight: 800,
                    lineHeight: 1.5,
                  }}
                >
                  +3.2°C
                </div>
                <div className="mx-auto my-4 h-[2px] w-[72%] bg-black" />
                <div
                  ref={section1TempFOutsideRef}
                  style={{
                    color: '#14a9df',
                    fontSize: 'clamp(1.5rem, 1.5vw, 1.5rem)',
                    fontWeight: 800,
                    lineHeight: 1,
                  }}
                >
                  +5.7°F
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
              <div ref={section1GraphContainerRef} className="relative w-full h-[250px] overflow-hidden">
                <canvas
                  ref={section1CanvasRef}
                  style={{ display: 'block', width: '100%', height: '100%', pointerEvents: 'none' }}
                />
              </div>
              {/* Dynamic legend — species graph gets marine/land badges */}
                            {selectedGraphId === '279' ? (
                <div className="mt-3 text-center">
                  <div className="flex justify-center gap-3 mb-1">
                    <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#3385C6' }}>MARINE SPECIES</span>
                    <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#843C0C' }}>LAND SPECIES</span>
                  </div>
                  <p className="text-xs text-gray-500 italic">Dashed lines represent Baseline</p>
                </div>
              ) : (
                <div className="flex justify-center gap-3 mt-3">
                  <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#000000' }}>BASELINE</span>
                  <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#00b6f1' }}>CURRENT SCENARIO</span>
                </div>
              )}
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
                  max="100"
                  step="1"
                  value={section1SliderValue}
                  onChange={handleSection1SliderChange}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #53B1E8 0%, #53B1E8 ${section1SliderValue}%, #e5e7eb ${section1SliderValue}%, #e5e7eb 100%)`
                  }}
                />
              </div>
            </div>
          </div>

          {/* SECTION 2: Deforestation Analysis */}
          <div className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 rounded-xl border border-gray-200 dark:border-gray-700">
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

            {/* Temperature card (match Module 2 small view) */}
            <div className="flex justify-center mb-4">
              <div className="bg-white dark:bg-gray-800 px-6 py-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 text-center inline-flex flex-col items-center w-fit mx-auto">
                <div
                  ref={section2TempCOutsideRef}
                  style={{
                    color: '#14a9df',
                    fontSize: 'clamp(3rem, 3vw, 3rem)',
                    fontWeight: 800,
                    lineHeight: 1.5,
                  }}
                >
                  +3.2°C
                </div>
                <div className="mx-auto my-4 h-[2px] w-[72%] bg-black" />
                <div
                  ref={section2TempFOutsideRef}
                  style={{
                    color: '#14a9df',
                    fontSize: 'clamp(1.5rem, 1.5vw, 1.5rem)',
                    fontWeight: 800,
                    lineHeight: 1,
                  }}
                >
                  +5.7°F
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
              <div ref={section2GraphContainerRef} className="relative w-full h-[250px] overflow-hidden">
                <canvas
                  ref={section2CanvasRef}
                  style={{ display: 'block', width: '100%', height: '100%', pointerEvents: 'none' }}
                />
              </div>
              {/* Dynamic legend — species graph gets marine/land badges */}
                            {section2SelectedGraphId === '279' ? (
                <div className="mt-3 text-center">
                  <div className="flex justify-center gap-3 mb-1">
                    <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#3385C6' }}>MARINE SPECIES</span>
                    <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#843C0C' }}>LAND SPECIES</span>
                  </div>
                  <p className="text-xs text-gray-500 italic">Dashed lines represent Baseline</p>
                </div>
              ) : (
                <div className="flex justify-center gap-3 mt-3">
                  <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#000000' }}>BASELINE</span>
                  <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#00b6f1' }}>CURRENT SCENARIO</span>
                </div>
              )}
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
                  max="100"
                  step="1"
                  value={section1SliderValue}
                  onChange={handleSection1SliderChange}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #53B1E8 0%, #53B1E8 ${section1SliderValue}%, #e5e7eb ${section1SliderValue}%, #e5e7eb 100%)`
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
                  min="-10"
                  max="1"
                  step="0.1"
                  value={section2DeforestationValue}
                  onChange={handleSection2DeforestationChange}
                  className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, #53B1E8 0%, #53B1E8 ${((section2DeforestationValue + 10) / 11) * 100}%, #e5e7eb ${((section2DeforestationValue + 10) / 11) * 100}%, #e5e7eb 100%)`
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
                <div className="flex justify-start items-center mb-2">
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
              max="100"
              step="1"
              value={section1SliderValue}
              onChange={handleSection1SliderChange}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #53B1E8 0%, #53B1E8 ${section1SliderValue}%, #e5e7eb ${section1SliderValue}%, #e5e7eb 100%)`
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
                <div className="flex justify-start items-center mb-2">
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
                max="100"
                step="1"
                value={section1SliderValue}
                onChange={handleSection1SliderChange}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #53B1E8 0%, #53B1E8 ${section1SliderValue}%, #e5e7eb ${section1SliderValue}%, #e5e7eb 100%)`
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
                min="-10"
                max="1"
                step="0.1"
                value={section2DeforestationValue}
                onChange={handleSection2DeforestationChange}
                className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, #53B1E8 0%, #53B1E8 ${((section2DeforestationValue + 10) / 11) * 100}%, #e5e7eb ${((section2DeforestationValue + 10) / 11) * 100}%, #e5e7eb 100%)`
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
