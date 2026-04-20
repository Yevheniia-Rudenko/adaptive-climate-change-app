import { useEffect, useRef, useState, ChangeEvent } from 'react';
import { createAsyncModel, getDefaultConfig, createDefaultOutputs } from '@climateinteractive/en-roads-core';
import enStrings from '@climateinteractive/en-roads-core/strings/en';
import deStrings from '@climateinteractive/en-roads-core/strings/de';
import esStrings from '@climateinteractive/en-roads-core/strings/es';
import { GraphView } from '@climateinteractive/sim-ui-graph';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/enroads-dashboard.css';

// Graph definitions for Section 1 dropdown
const SECTION1_GRAPHS = [
  { id: '90', labelKey: 'graph_90_title', varId: '_slr_from_2000_in_meters' },
  { id: '169', labelKey: 'graph_169_title', varId: '_global_deforestation_mha' },
  { id: '275', labelKey: 'graph_275_title', varId: '_excess_deaths_from_extreme_heat_per_100k_people' },
  { id: '279', labelKey: 'graph_279_title', varId: '_percent_endemic_species_at_high_risk_of_extinction' },
  { id: '183', labelKey: 'graph_183_title', varId: '_crop_yield_per_hectare_kg_per_year_per_ha' },
  { id: '112', labelKey: 'graph_112_title', varId: '_pm2_5_emissions_from_energy_mt_per_year' }
];

// Graph definitions for Section 2 dropdown
const SECTION2_GRAPHS = [
  { id: '62', labelKey: 'graph_62_title', varId: '_co2_equivalent_net_emissions' },
  { id: '169', labelKey: 'graph_169_title', varId: '_global_deforestation_mha' }
];

const NATURE_REMOVALS_INPUT_ID = '417';
const NATURE_REMOVALS_MODE_SWITCH_ID = '418';

export default function Module1CarbonRemovalDashboard() {
  const { language, t } = useLanguage();
  const tx = t.data.modules.module1.components.carbonRemoval;
  const tc = t.data.modules.module2.components.exercise; // Also used in Module 1 for consistency

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSection1Expanded, setIsSection1Expanded] = useState(false);
  const [isSection2Expanded, setIsSection2Expanded] = useState(false);

  // Section 1 states
  const [section1SliderValue, setSection1SliderValue] = useState(0);
  const [section1SliderText, setSection1SliderText] = useState(tc.statusQuo);
  const [section1DefaultPct, setSection1DefaultPct] = useState<number | null>(null);
  const [selectedGraphId, setSelectedGraphId] = useState('90');
  const [section2SelectedGraphId, setSection2SelectedGraphId] = useState('62');

  // Section 2 states
  const [section2DeforestationValue, setSection2DeforestationValue] = useState(0);
  const [section2DeforestationText, setSection2DeforestationText] = useState(tc.statusQuo);
  const [section2DeforestationDefaultPct, setSection2DeforestationDefaultPct] = useState<number | null>(null);

  // Temperature display — use refs + direct DOM to avoid React re-renders that reset canvas
  const tempCRef = useRef<HTMLDivElement>(null);
  const tempFRef = useRef<HTMLDivElement>(null);
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

  const getEnRoadsStrings = () => {
    switch (language) {
      case 'de': return deStrings;
      case 'es': return esStrings;
      default: return enStrings;
    }
  };

  const str = (key: string) => {
    if (key === 'graph_62_title') {
      return (tx as any)?.co2NetEmissions ?? 'CO2 Net Emissions';
    }
    if (key === 'graph_90_title') {
      return language === 'de' ? 'Meeresspiegelanstieg' : language === 'es' ? 'Aumento del nivel del mar' : language === 'tr' ? 'Deniz seviyesi yükselmesi' : 'Sea Level Rise';
    }
    if (key === 'graph_169_title') {
      return language === 'de' ? 'Entwaldung' : language === 'es' ? 'Deforestación' : language === 'tr' ? 'Ormansızlaşma' : 'Deforestation';
    }
    if (key === 'graph_275_title') {
      return language === 'de' ? 'Todesfälle durch extreme Hitze' : language === 'es' ? 'Muertes por calor extremo' : language === 'tr' ? 'Aşırı sıcaktan ölümler' : 'Deaths from Extreme Heat';
    }
    if (key === 'graph_279_title') {
      return language === 'de' ? 'Artenverlust - Aussterben' : language === 'es' ? 'Pérdida de especies - extinción' : language === 'tr' ? 'Tür kaybı - yok oluş' : 'Species Loss - Extinction';
    }
    if (key === 'graph_183_title') {
      return language === 'de' ? 'Ernteerträge' : language === 'es' ? 'Rendimiento de cultivos' : language === 'tr' ? 'Ürün verimi' : 'Crop Yield';
    }
    if (key === 'graph_112_title') {
      return language === 'de' ? 'Luftverschmutzung aus der Energieerzeugung – PM2,5-Emissionen' : language === 'es' ? 'Contaminación del aire por energía – emisiones PM2,5' : language === 'tr' ? 'Enerjiden kaynaklanan hava kirliliği - PM2.5 emisyonları' : 'Air Pollution from Energy - PM2.5 Emissions';
    }
    return (getEnRoadsStrings() as any)[key] || key;
  };

  const getRangeHighlightBackground = (currentPct: number, defaultPct: number | null, color: string) => {
    const track = '#e5e7eb';
    const clampedCurrent = Math.max(0, Math.min(100, currentPct));
    if (defaultPct === null) {
      return `linear-gradient(to right, ${color} 0%, ${color} ${clampedCurrent}%, ${track} ${clampedCurrent}%, ${track} 100%)`;
    }

    const clampedDefault = Math.max(0, Math.min(100, defaultPct));
    const a = Math.min(clampedCurrent, clampedDefault);
    const b = Math.max(clampedCurrent, clampedDefault);
    return `linear-gradient(to right, ${track} 0%, ${track} ${a}%, ${color} ${a}%, ${color} ${b}%, ${track} ${b}%, ${track} 100%)`;
  };

  const getCarbonRemovalText = (value: number) => {
    if (value >= 70) return tx.highGrowth;
    if (value >= 40) return tx.mediumGrowth;
    if (value >= 15) return tx.lowGrowth;
    return tc.statusQuo;
  };

  const getDeforestationText = (value: number) => {
    if (value >= 0.1) return tx.increased;
    if (value >= -1.0) return tc.statusQuo;
    if (value >= -4.0) return tx.reduced;
    return tx.highlyReduced;
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
    graphDefs: Array<{ id: string; labelKey: string; varId: string }>,
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
              label: tx.baseline,
              color: '#000000',
              lineStyle: baselineDataset.lineStyle || 'thinline'
            },
            {
              ...currentDataset,
              label: tx.currentScenario,
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
          { varId: graphDef.varId, externalSourceName: 'Ref', label: tx.baseline, color: '#000000', lineStyle: 'thinline' },
          { varId: graphDef.varId, label: tx.currentScenario, color: '#00b6f1', lineStyle: 'line' }
        ]
      };
    }

    return {
      id: graphDef.id,
      title: str(graphDef.labelKey),
      kind: 'line',
      datasets: [
        { varId: graphDef.varId, externalSourceName: 'Ref', label: tx.baseline, color: '#000000', lineStyle: 'thinline' },
        { varId: graphDef.varId, label: tx.currentScenario, color: '#00b6f1', lineStyle: 'line' }
      ]
    };
  };

  const initGraph = (
    containerRef: React.RefObject<HTMLDivElement | null>,
    canvasRef: React.RefObject<HTMLCanvasElement | null>,
    graphId: string,
    graphDefs: Array<{ id: string; labelKey: string; varId: string }>
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
        setSection1DefaultPct(0);
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
          setSection2DeforestationDefaultPct(((0 + 10) / 11) * 100);
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
        setError(tc.failedToLoad);
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
        <p>{tc.loadingModel}</p>
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
          {/* MODEL 1: Nature-Based Carbon Removal */}
          <div className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between gap-3 px-3 sm:px-4 pt-3 sm:pt-4 mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200">
                {tx.title1}
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
                {tc.openFullscreen}
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
                  className="mt-3 whitespace-pre-line leading-tight text-gray-900 dark:text-gray-100"
                  style={{
                    fontSize: 'clamp(1.5rem, 1.5vw, 1.5rem)',
                    fontWeight: 800,
                  }}
                >
                  {tc.temperatureTitle}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 mb-4">
              <div className="flex justify-between items-center mb-4">
                <select
                  value={selectedGraphId}
                  onChange={(e) => setSelectedGraphId(e.target.value)}
                  className="bg-blue-100 dark:bg-blue-900/50 border border-blue-300 dark:border-blue-500 text-blue-900 dark:text-blue-100 text-base sm:text-lg rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-3 font-bold"
                >
                  {SECTION1_GRAPHS.map(g => <option key={g.id} value={g.id}>{str(g.labelKey)}</option>)}
                </select>
              </div>
              <div ref={section1GraphContainerRef} className="relative w-full">
                <canvas
                  ref={section1CanvasRef}
                  style={{ display: 'block', width: '100%', height: '100%', pointerEvents: 'none' }}
                />
              </div>
              {/* Dynamic legend — species graph gets marine/land badges */}
              {selectedGraphId === '279' ? (
                <div className="mt-3 text-center">
                  <div className="flex justify-center gap-3 mb-1">
                    <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#3385C6' }}>{tx.marineSpecies}</span>
                    <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#843C0C' }}>{tx.landSpecies}</span>
                  </div>
                  <p className="text-xs text-gray-500 italic">{tx.dashedBaseline}</p>
                </div>
              ) : (
                <div className="flex justify-center gap-3 mt-3">
                  <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#000000' }}>{tx.baseline}</span>
                  <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#00b6f1' }}>{tx.currentScenario}</span>
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center font-bold text-gray-700 dark:text-gray-200">
                  <label>{tx.natureLabel}</label>
                  <span className="text-sm font-mono text-gray-500">{section1SliderText}</span>
                </div>
                <div className="enroads-range-wrap">
                  {section1DefaultPct !== null && (
                    <div className="enroads-range-tick" style={{ ['--tick-frac' as any]: String(section1DefaultPct / 100) }} />
                  )}
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="1"
                    value={section1SliderValue}
                    onChange={handleSection1SliderChange}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: getRangeHighlightBackground(section1SliderValue, section1DefaultPct, '#53B1E8')
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: Deforestation Analysis */}
          <div className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 rounded-xl border border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between gap-3 px-3 sm:px-4 pt-3 sm:pt-4 mb-4">
              <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200">
                {tx.title2}
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
                {tc.openFullscreen}
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
                  className="mt-3 whitespace-pre-line leading-tight text-gray-900 dark:text-gray-100"
                  style={{
                    fontSize: 'clamp(1.5rem, 1.5vw, 1.5rem)',
                    fontWeight: 800,
                  }}
                >
                  {tc.temperatureTitle}
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 mb-4">
              <div className="flex justify-between items-center mb-4">
                <select
                  value={section2SelectedGraphId}
                  onChange={(e) => setSection2SelectedGraphId(e.target.value)}
                  className="bg-blue-100 dark:bg-blue-900/50 border border-blue-300 dark:border-blue-500 text-blue-900 dark:text-blue-100 text-base sm:text-lg rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-3 font-bold"
                >
                  {SECTION2_GRAPHS.map(g => <option key={g.id} value={g.id}>{str(g.labelKey)}</option>)}
                </select>
              </div>
              <div ref={section2GraphContainerRef} className="relative w-full">
                <canvas
                  ref={section2CanvasRef}
                  style={{ display: 'block', width: '100%', height: '100%', pointerEvents: 'none' }}
                />
              </div>
              <div className="flex justify-center gap-3 mt-3">
                <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#000000' }}>{tx.baseline}</span>
                <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#00b6f1' }}>{tx.currentScenario}</span>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center font-bold text-gray-700 dark:text-gray-200">
                  <label>{tx.deforestationLabel}</label>
                  <span className="text-sm font-mono text-gray-500">{section2DeforestationText}</span>
                </div>
                <div className="enroads-range-wrap">
                  {section2DeforestationDefaultPct !== null && (
                    <div className="enroads-range-tick" style={{ ['--tick-frac' as any]: String(section2DeforestationDefaultPct / 100) }} />
                  )}
                  <input
                    type="range"
                    min="-10"
                    max="1"
                    step="0.1"
                    value={section2DeforestationValue}
                    onChange={handleSection2DeforestationChange}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: getRangeHighlightBackground(((section2DeforestationValue + 10) / 11) * 100, section2DeforestationDefaultPct, '#53B1E8')
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
      </div>

      {/* MODALS / FULL SCREEN */}
      {isSection1Expanded && (
        <div className="fixed inset-0 z-[100] bg-white dark:bg-gray-900 overflow-y-auto p-4 sm:p-6 font-sora">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold dark:text-white">{tx.title1}</h2>
              <button
                onClick={() => setIsSection1Expanded(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg font-bold dark:text-white"
              >
                {tc.closeFullscreen}
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Temperature Display Column */}
              <div className="bg-blue-50 dark:bg-blue-900/20 p-8 rounded-2xl border border-blue-100 dark:border-blue-800 flex flex-col items-center justify-center text-center">
                <div className="space-y-2">
                  <div className="text-6xl sm:text-7xl font-extrabold text-[#14a9df]" ref={tempCRef}>+3.2°C</div>
                  <div className="w-48 h-1 bg-gray-900 dark:bg-gray-100 mx-auto opacity-20"></div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#14a9df]" ref={tempFRef}>+5.7°F</div>
                </div>
                <div className="mt-8 text-2xl sm:text-3xl font-extrabold dark:text-white leading-tight">
                  {tc.temperatureTitle}
                </div>
              </div>

              {/* Graph & Controls Column */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-6">
                    <select
                      value={selectedGraphId}
                      onChange={(e) => setSelectedGraphId(e.target.value)}
                      className="bg-blue-50 dark:bg-blue-900/40 border border-blue-200 dark:border-blue-700 text-blue-900 dark:text-blue-100 text-lg rounded-xl block p-4 font-bold focus:ring-4 focus:ring-blue-100"
                    >
                      {SECTION1_GRAPHS.map(g => <option key={g.id} value={g.id}>{str(g.labelKey)}</option>)}
                    </select>
                  </div>
                  <div className="aspect-[16/9] w-full" ref={section1GraphContainerRef}>
                    <canvas ref={section1CanvasRef} className="w-full h-full" />
                  </div>
                  {selectedGraphId === '279' ? (
                    <div className="mt-6 text-center">
                      <div className="flex justify-center gap-4 mb-2">
                        <span className="px-4 py-2 text-sm font-bold uppercase text-white rounded-lg shadow-sm" style={{ backgroundColor: '#3385C6' }}>{tx.marineSpecies}</span>
                        <span className="px-4 py-2 text-sm font-bold uppercase text-white rounded-lg shadow-sm" style={{ backgroundColor: '#843C0C' }}>{tx.landSpecies}</span>
                      </div>
                      <p className="text-sm text-gray-500 italic dark:text-gray-400">{tx.dashedBaseline}</p>
                    </div>
                  ) : (
                    <div className="flex justify-center gap-6 mt-6">
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded shadow-sm" style={{ backgroundColor: '#000000' }}></div>
                        <span className="text-sm font-bold uppercase dark:text-gray-300">{tx.baseline}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded shadow-sm" style={{ backgroundColor: '#00b6f1' }}></div>
                        <span className="text-sm font-bold uppercase dark:text-gray-300">{tx.currentScenario}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-6">
                    <label className="text-xl font-bold dark:text-white">{tx.natureLabel}</label>
                    <span className="px-4 py-1 bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-200 rounded-full font-bold">{section1SliderText}</span>
                  </div>
                  <div className="enroads-range-wrap py-4">
                    {section1DefaultPct !== null && (
                      <div className="enroads-range-tick" style={{ ['--tick-frac' as any]: String(section1DefaultPct / 100) }} />
                    )}
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="1"
                      value={section1SliderValue}
                      onChange={handleSection1SliderChange}
                      className="w-full h-3 rounded-full appearance-none cursor-pointer bg-gray-200 dark:bg-gray-700"
                      style={{
                        background: getRangeHighlightBackground(section1SliderValue, section1DefaultPct, '#53B1E8')
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {isSection2Expanded && (
        <div className="fixed inset-0 z-[100] bg-white dark:bg-gray-900 overflow-y-auto p-4 sm:p-6 font-sora">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl sm:text-2xl font-bold dark:text-white">{tx.title2}</h2>
              <button
                onClick={() => setIsSection2Expanded(false)}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg font-bold dark:text-white"
              >
                {tc.closeFullscreen}
              </button>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start">
              {/* Temperature Display Column */}
              <div className="bg-green-50 dark:bg-green-900/20 p-8 rounded-2xl border border-green-100 dark:border-green-800 flex flex-col items-center justify-center text-center">
                <div className="space-y-2">
                  <div className="text-6xl sm:text-7xl font-extrabold text-[#14a9df]" ref={tempCRef}>+3.2°C</div>
                  <div className="w-48 h-1 bg-gray-900 dark:bg-gray-100 mx-auto opacity-20"></div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-[#14a9df]" ref={tempFRef}>+5.7°F</div>
                </div>
                <div className="mt-8 text-2xl sm:text-3xl font-extrabold dark:text-white leading-tight">
                  {tc.temperatureTitle}
                </div>
              </div>

              {/* Graph & Controls Column */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-6">
                    <select
                      value={section2SelectedGraphId}
                      onChange={(e) => setSection2SelectedGraphId(e.target.value)}
                      className="bg-green-50 dark:bg-green-900/40 border border-green-200 dark:border-green-700 text-green-900 dark:text-green-100 text-lg rounded-xl block p-4 font-bold focus:ring-4 focus:ring-green-100"
                    >
                      {SECTION2_GRAPHS.map(g => <option key={g.id} value={g.id}>{str(g.labelKey)}</option>)}
                    </select>
                  </div>
                  <div className="aspect-[16/9] w-full" ref={section2GraphContainerRef}>
                    <canvas ref={section2CanvasRef} className="w-full h-full" />
                  </div>
                  <div className="flex justify-center gap-6 mt-6">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded shadow-sm" style={{ backgroundColor: '#000000' }}></div>
                      <span className="text-sm font-bold uppercase dark:text-gray-300">{tx.baseline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded shadow-sm" style={{ backgroundColor: '#00b6f1' }}></div>
                      <span className="text-sm font-bold uppercase dark:text-gray-300">{tx.currentScenario}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-6">
                    <label className="text-xl font-bold dark:text-white">{tx.deforestationLabel}</label>
                    <span className="px-4 py-1 bg-green-100 dark:bg-green-900/40 text-green-800 dark:text-green-200 rounded-full font-bold">{section2DeforestationText}</span>
                  </div>
                  <div className="enroads-range-wrap py-4">
                    {section2DeforestationDefaultPct !== null && (
                      <div className="enroads-range-tick" style={{ ['--tick-frac' as any]: String(section2DeforestationDefaultPct / 100) }} />
                    )}
                    <input
                      type="range"
                      min="-10"
                      max="1"
                      step="0.1"
                      value={section2DeforestationValue}
                      onChange={handleSection2DeforestationChange}
                      className="w-full h-3 rounded-full appearance-none cursor-pointer bg-gray-200 dark:bg-gray-700"
                      style={{
                        background: getRangeHighlightBackground(((section2DeforestationValue + 10) / 11) * 100, section2DeforestationDefaultPct, '#53B1E8')
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
