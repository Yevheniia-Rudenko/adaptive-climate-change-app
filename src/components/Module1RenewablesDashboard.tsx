import { useEffect, useRef, useState, ChangeEvent } from 'react';
import { createAsyncModel, getDefaultConfig, createDefaultOutputs } from '@climateinteractive/en-roads-core';
import enStrings from '@climateinteractive/en-roads-core/strings/en';
import deStrings from '@climateinteractive/en-roads-core/strings/de';
import esStrings from '@climateinteractive/en-roads-core/strings/es';
import { GraphView } from '@climateinteractive/sim-ui-graph';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/enroads-dashboard.css';

const MAIN_GRAPH = { id: '62', labelKey: 'graph_62_title', varId: '_co2_equivalent_net_emissions', canvasId: 'module1-renewables-graph-emissions' };

const SECONDARY_GRAPHS = [
  { id: '90', labelKey: 'graph_90_title', varId: '_slr_from_2000_in_meters' },
  { id: '275', labelKey: 'graph_275_title', varId: '_excess_deaths_from_extreme_heat_per_100k_people' },
  { id: '279', labelKey: 'graph_279_title', varId: '_percent_endemic_species_at_high_risk_of_extinction' },
  { id: '183', labelKey: 'graph_183_title', varId: '_crop_yield_per_hectare_kg_per_year_per_ha' },
  { id: '112', labelKey: 'graph_112_title', varId: '_pm2_5_emissions_from_energy_mt_per_year' }
];

const SECONDARY_GRAPH_CANVAS_ID = 'module1-renewables-graph-secondary';
const ALL_GRAPH_DEFS = [MAIN_GRAPH, ...SECONDARY_GRAPHS];

export default function Module1RenewablesDashboard() {
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedSecondaryGraphId, setSelectedSecondaryGraphId] = useState('90');

  const [renewablesVal, setRenewablesVal] = useState(0);
  const [renewablesText, setRenewablesText] = useState('status quo');
  const [renewablesDefaultPct, setRenewablesDefaultPct] = useState<number | null>(null);

  // Use refs + direct DOM updates for temperature to avoid React re-renders
  // that reset the canvas on every model output change (the root cause of hover flicker).
  const tempCRef = useRef<HTMLSpanElement[]>([]);
  const tempFRef = useRef<HTMLSpanElement[]>([]);

  const modelRef = useRef<any>(null);
  const modelContextRef = useRef<any>(null);
  const graphViewRefs = useRef<Record<string, any>>({});
  const coreConfigRef = useRef<any>(null);
  const renewablesInputRef = useRef<any>(null);

  const getEnRoadsStrings = () => {
    switch (language) {
      case 'de': return deStrings;
      case 'es': return esStrings;
      default: return enStrings;
    }
  };

  const str = (key: string) => {
    if (key === 'graph_62_title') return language === 'de' ? 'CO2-Emissionen' : language === 'es' ? 'Emisiones de CO2' : 'CO2 Emissions';
    if (key === 'graph_90_title') return language === 'de' ? 'Meeresspiegelanstieg' : language === 'es' ? 'Aumento del nivel del mar' : 'Sea Level Rise';
    if (key === 'graph_275_title') return language === 'de' ? 'Todesfälle durch extreme Hitze' : language === 'es' ? 'Muertes por calor extremo' : 'Deaths from Extreme Heat';
    if (key === 'graph_279_title') return language === 'de' ? 'Artenverlust - Aussterben' : language === 'es' ? 'Pérdida de especies - extinción' : 'Species Loss - Extinction';
    if (key === 'graph_183_title') return language === 'de' ? 'Ernteerträge' : language === 'es' ? 'Rendimiento de cultivos' : 'Crop Yield';
    if (key === 'graph_112_title') return language === 'de' ? 'Luftverschmutzung aus der Energieerzeugung – PM2,5-Emissionen' : language === 'es' ? 'Contaminación del aire por energía - emisiones PM2,5' : 'Air Pollution';
    return (getEnRoadsStrings() as any)[key] || key;
  };

  const ui = {
    en: {
      intro: 'In this model, explore the impact of renewables on global temperature (remember our goal of 1.5°C!) and other impacts, which you can select in the graph dropdown.',
      choose: 'You can choose:',
      statusTitle: 'Status Quo:',
      statusText: 'Maintain the current levels of use of renewable energy. This is where the slider starts.',
      encourageTitle: 'Encourage:',
      encourageText: 'Support building and use of solar panels, geothermal, and wind turbines through government subsidies that allow investment in renewable energy and lower costs for consumers.',
      discourageTitle: 'Discourage:',
      discourageText: 'Through taxes raising costs of renewable energy investment and use, through public policy, or communications.',
      dashboardTitle: 'En-Roads Dashboard: Renewables',
      openFullscreen: 'Open Full Screen',
      closeFullscreen: 'Close Full Screen',
      baseline: 'BASELINE',
      currentScenario: 'CURRENT SCENARIO',
      co2Emissions: 'CO2 Emissions',
      seaLevelRise: 'Sea Level Rise',
      deathsExtremeHeat: 'Deaths from Extreme Heat',
      speciesLoss: 'Species Loss - Extinction',
      cropYield: 'Crop Yield',
      airPollution: 'Air Pollution',
      marineSpecies: 'MARINE SPECIES',
      landSpecies: 'LAND SPECIES',
      dashedBaseline: 'Dashed lines represent Baseline',
      temperatureTitle: 'Temperature\nIncrease by\n2100',
      renewablesLabel: 'Renewables',
      highlyDiscouraged: 'Highly discouraged',
      discouraged: 'Discouraged',
      statusQuo: 'Status quo',
      moreEncouraged: 'More encouraged',
      highlyEncouraged: 'Highly encouraged',
      loadingModel: 'Loading Model...',
      failedToLoad: 'Failed to load En-ROADS model.',
    },
    de: {
      intro: 'In diesem Modell untersuchst du den Einfluss erneuerbarer Energien auf die globale Temperatur (denk an unser Ziel von 1,5°C!) und auf weitere Auswirkungen, die du im Diagramm-Dropdown auswählen kannst.',
      choose: 'Du kannst wählen:',
      statusTitle: 'Status Quo:',
      statusText: 'Behalte das aktuelle Nutzungsniveau erneuerbarer Energien bei. Hier startet der Regler.',
      encourageTitle: 'Fördern:',
      encourageText: 'Unterstütze Ausbau und Nutzung von Solar, Geothermie und Wind über staatliche Förderungen, die Investitionen erleichtern und Kosten senken.',
      discourageTitle: 'Bremsen:',
      discourageText: 'Durch Steuern, politische Maßnahmen oder Kommunikation, die Investitionen und Nutzung erneuerbarer Energien verteuern.',
      dashboardTitle: 'En-Roads Dashboard: Erneuerbare Energien',
      openFullscreen: 'Vollbild öffnen',
      closeFullscreen: 'Vollbild schließen',
      baseline: 'BASISLINIE',
      currentScenario: 'AKTUELLES SZENARIO',
      co2Emissions: 'CO2-Emissionen',
      seaLevelRise: 'Meeresspiegelanstieg',
      deathsExtremeHeat: 'Todesfälle durch extreme Hitze',
      speciesLoss: 'Artenverlust - Aussterben',
      cropYield: 'Ernteerträge',
      airPollution: 'Luftverschmutzung aus der Energieerzeugung – PM2,5-Emissionen',
      marineSpecies: 'MEERESARTEN',
      landSpecies: 'LANDARTEN',
      dashedBaseline: 'Gestrichelte Linien zeigen die Basislinie',
      temperatureTitle: 'Temperatur-\nanstieg bis\n2100',
      renewablesLabel: 'Erneuerbare',
      highlyDiscouraged: 'Stark gebremst',
      discouraged: 'Gebremst',
      statusQuo: 'Status quo',
      moreEncouraged: 'Mehr gefördert',
      highlyEncouraged: 'Stark gefördert',
      loadingModel: 'Modell wird geladen...',
      failedToLoad: 'En-ROADS-Modell konnte nicht geladen werden.',
    },
    es: {
      intro: 'En este modelo, explora el impacto de las energías renovables en la temperatura global (¡recuerda nuestro objetivo de 1,5°C!) y otros impactos que puedes elegir en el menú del gráfico.',
      choose: 'Puedes elegir:',
      statusTitle: 'Status Quo:',
      statusText: 'Mantener los niveles actuales de uso de energías renovables. Aquí empieza el control deslizante.',
      encourageTitle: 'Fomentar:',
      encourageText: 'Apoyar la construcción y uso de paneles solares, geotermia y turbinas eólicas mediante subsidios públicos que faciliten la inversión y reduzcan costos.',
      discourageTitle: 'Desincentivar:',
      discourageText: 'Mediante impuestos que aumenten los costos de inversión y uso de renovables, políticas públicas o comunicación.',
      dashboardTitle: 'En-Roads Dashboard: Renovables',
      openFullscreen: 'Abrir pantalla completa',
      closeFullscreen: 'Cerrar pantalla completa',
      baseline: 'LÍNEA DE BASE',
      currentScenario: 'ESCENARIO ACTUAL',
      co2Emissions: 'Emisiones de CO2',
      seaLevelRise: 'Aumento del nivel del mar',
      deathsExtremeHeat: 'Muertes por calor extremo',
      speciesLoss: 'Pérdida de especies - extinción',
      cropYield: 'Rendimiento de cultivos',
      airPollution: 'Contaminación del aire por energía - emisiones PM2,5',
      marineSpecies: 'ESPECIES MARINAS',
      landSpecies: 'ESPECIES TERRESTRES',
      dashedBaseline: 'Las líneas punteadas muestran la línea de base',
      temperatureTitle: 'Aumento de\ntemperatura\npara 2100',
      renewablesLabel: 'Renovables',
      highlyDiscouraged: 'Muy desincentivado',
      discouraged: 'Desincentivado',
      statusQuo: 'Status quo',
      moreEncouraged: 'Más incentivado',
      highlyEncouraged: 'Muy incentivado',
      loadingModel: 'Cargando modelo...',
      failedToLoad: 'Error al cargar el modelo En-ROADS.',
    }
  }[language] ?? {
    intro: 'In this model, explore the impact of renewables on global temperature (remember our goal of 1.5°C!) and other impacts, which you can select in the graph dropdown.',
    choose: 'You can choose:',
    statusTitle: 'Status Quo:',
    statusText: 'Maintain the current levels of use of renewable energy. This is where the slider starts.',
    encourageTitle: 'Encourage:',
    encourageText: 'Support building and use of solar panels, geothermal, and wind turbines through government subsidies that allow investment in renewable energy and lower costs for consumers.',
    discourageTitle: 'Discourage:',
    discourageText: 'Through taxes raising costs of renewable energy investment and use, through public policy, or communications.',
    dashboardTitle: 'En-Roads Dashboard: Renewables',
    openFullscreen: 'Open Full Screen',
    closeFullscreen: 'Close Full Screen',
    baseline: 'BASELINE',
    currentScenario: 'CURRENT SCENARIO',
    co2Emissions: 'CO2 Emissions',
    seaLevelRise: 'Sea Level Rise',
    deathsExtremeHeat: 'Deaths from Extreme Heat',
    speciesLoss: 'Species Loss - Extinction',
    cropYield: 'Crop Yield',
    airPollution: 'Air Pollution',
    marineSpecies: 'MARINE SPECIES',
    landSpecies: 'LAND SPECIES',
    dashedBaseline: 'Dashed lines represent Baseline',
    temperatureTitle: 'Temperature\nIncrease by\n2100',
    renewablesLabel: 'Renewables',
    highlyDiscouraged: 'Highly discouraged',
    discouraged: 'Discouraged',
    statusQuo: 'Status quo',
    moreEncouraged: 'More encouraged',
    highlyEncouraged: 'Highly encouraged',
    loadingModel: 'Loading Model...',
    failedToLoad: 'Failed to load En-ROADS model.',
  };

  // Slider position: -50 (left, highly discouraged / tax) → 0 (status quo) → 100 (right, highly encouraged / subsidy)
  const getSliderText = (sliderPos: number) => {
    if (sliderPos <= -25)  return ui.highlyDiscouraged;
    if (sliderPos <= -1)   return ui.discouraged;
    if (sliderPos <= 30)   return ui.statusQuo;
    if (sliderPos <= 65)   return ui.moreEncouraged;
    return ui.highlyEncouraged;
  };

  const graphLabel = (id: string, labelKey: string) => {
    if (id === '62') return ui.co2Emissions;
    if (id === '90') return ui.seaLevelRise;
    if (id === '275') return ui.deathsExtremeHeat;
    if (id === '279') return ui.speciesLoss;
    if (id === '183') return ui.cropYield;
    if (id === '112') return ui.airPollution;
    return str(labelKey);
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

  const sliderPosToPct = (sliderPos: number) => {
    const min = -50;
    const max = 100;
    return ((sliderPos - min) / (max - min)) * 100;
  };

  const modelValToSliderPos = (modelVal: number, modelMin: number, modelMax: number) => {
    if (modelVal >= 0) {
      const denom = modelMax || 1;
      return -(modelVal / denom) * 50;
    }
    const denom = modelMin || -1;
    return (modelVal / denom) * 100;
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
        const title = graphSpec.title || '';
        if (graphSpec.kind === 'h-bar' || title.includes('Percent') || title.includes('Species')) {
          return `${stringValue}%`;
        }
        return stringValue;
      },
      formatYAxisTooltipValue: (value: number) => value.toFixed(2)
    };
  };

  const getGraphSpec = (graphId: string) => {
    const graphDef = ALL_GRAPH_DEFS.find((g) => g.id === graphId);
    const fromConfig = coreConfigRef.current?.graphs?.get(graphId);

    if (fromConfig) {
      if (graphId === '279') {
        // Explicitly assign En-ROADS species palette so chart lines and legend badges
        // always use the same hex values regardless of config color format.
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

      // For all other graphs, filter to 2 datasets (baseline + current).
      // Without this, raw config datasets with unknown externalSourceName values
      // return empty series → hidden by the ≤2-point guard → blank chart.
      const baselineDataset = fromConfig.datasets?.find(
        (d: any) => d.externalSourceName === 'Ref' || d.externalSourceName === 'baseline'
      );
      const currentDataset = fromConfig.datasets?.find((d: any) => !d.externalSourceName);

      if (baselineDataset && currentDataset) {
        return {
          ...fromConfig,
          datasets: [
            { ...baselineDataset, label: 'Baseline', color: '#000000', lineStyle: baselineDataset.lineStyle || 'thinline' },
            { ...currentDataset, label: 'Current', color: '#53B1E8', lineStyle: currentDataset.lineStyle || 'line' }
          ]
        };
      }

      if (graphDef) {
        return {
          ...fromConfig,
          datasets: [
            { varId: graphDef.varId, externalSourceName: 'Ref', label: 'Baseline', color: '#000000', lineStyle: 'thinline' },
            { varId: graphDef.varId, label: 'Current', color: '#53B1E8', lineStyle: 'line' }
          ]
        };
      }
    }

    if (!graphDef) return null;

    return {
      id: graphId,
      title: graphLabel(graphDef.id, graphDef.labelKey),
      kind: 'line',
      datasets: [
        { varId: graphDef.varId, externalSourceName: 'Ref', label: 'Baseline', color: '#000000', lineStyle: 'thinline' },
        { varId: graphDef.varId, label: 'Current', color: '#53B1E8', lineStyle: 'line' }
      ]
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

        // En-ROADS uses both 'baseline' and 'Ref' depending on graph/source.
        // Try the alternative so the baseline line always appears.
        if ((!series || !series.points || series.points.length === 0) && datasetSpec.externalSourceName === 'baseline') {
          series = modelContextRef.current.getSeriesForVar(datasetSpec.varId, 'Ref');
        } else if ((!series || !series.points || series.points.length === 0) && datasetSpec.externalSourceName === 'Ref') {
          series = modelContextRef.current.getSeriesForVar(datasetSpec.varId, 'baseline');
        }

        const newPoints = series?.points || [];
        datasetViewModel.points = [...newPoints];

        // Hide scatter/marker datasets (single dots) but keep full time-series.
        if (newPoints.length <= 2) {
          datasetViewModel.visible = false;
          continue;
        }
        datasetViewModel.visible = true;

        // Only apply default colors when the config hasn't already set one.
        // This preserves En-ROADS colors for multi-line graphs like Species Loss
        // (marine blue vs land brown) instead of painting everything the same blue.
        if (!datasetSpec.externalSourceName) {
          if (!datasetSpec.color) datasetSpec.color = '#53B1E8';
          datasetSpec.lineWidth = 4;
        } else if (datasetSpec.externalSourceName === 'baseline' || datasetSpec.externalSourceName === 'Ref') {
          if (!datasetSpec.color) datasetSpec.color = '#000000';
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

    const setAllTemps = (tempCelsius: number) => {
      const cText = `+${tempCelsius.toFixed(1)}°C`;
      const fText = `+${(tempCelsius * 9 / 5).toFixed(1)}°F`;
      for (const el of tempCRef.current) if (el) el.textContent = cText;
      for (const el of tempFRef.current) if (el) el.textContent = fText;
    };

    let tempSeries = modelContextRef.current.getSeriesForVar('_temperature_change_from_1850');
    if (!tempSeries || !tempSeries.points) {
      tempSeries = modelContextRef.current.getSeriesForVar('_temperature_relative_to_1850_1900');
    }

    if (tempSeries?.points?.length > 0) {
      setAllTemps(tempSeries.getValueAtTime(2100));
      return;
    }

    const emissionsSeries = modelContextRef.current.getSeriesForVar('_co2_equivalent_net_emissions');
    if (emissionsSeries?.points?.length > 0) {
      const emissions2100 = emissionsSeries.getValueAtTime(2100);
      setAllTemps(1.5 + (emissions2100 / 69.6) * 1.8);
    }
  };

  const updateDashboard = () => {
    for (const key of Object.keys(graphViewRefs.current)) {
      if (graphViewRefs.current[key]) updateGraphData(graphViewRefs.current[key]);
    }
    updateTemperatureDisplay();
  };

  const loadGraph = (canvasId: string, graphId: string, height = 250) => {
    const graphSpec = getGraphSpec(graphId);
    if (!graphSpec) return;

    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = Math.floor(rect.width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = '100%';
    canvas.style.height = `${height}px`;

    try {
      const viewModel = createGraphViewModel(graphSpec);
      const isDark = document.documentElement.classList.contains('dark');
      const style = {
        font: { family: 'system-ui, -apple-system, sans-serif', style: 'normal', color: isDark ? '#e2e8f0' : '#1f2937' },
        xAxis: { tickMaxCount: 6 },
        yAxis: { tickMaxCount: 6 },
        getAxisLabelFontSize: () => 14,
        getTickLabelFontSize: () => 12,
        getDefaultLineWidth: () => 4,
        plotBackgroundColor: isDark ? '#1e293b' : '#ffffff'
      };

      // animations: false prevents GraphView from firing continuous canvas events
      // during hover (which previously triggered onOutputsChanged → setState → re-render → flicker).
      const graphView = new GraphView(canvas, viewModel, { style, responsive: true, animations: false }, true);
      graphViewRefs.current[canvasId] = graphView;
      updateGraphData(graphView);
    } catch (e) {
      console.error('Error initializing graph view:', e);
    }
  };

  const handleRenewablesChange = (e: ChangeEvent<HTMLInputElement>) => {
    const sliderPos = parseFloat(e.target.value);
    setRenewablesVal(sliderPos);
    setRenewablesText(getSliderText(sliderPos));

    if (renewablesInputRef.current) {
      // Piecewise mapping — slider 0 = model 0 (status quo) exactly.
      // LEFT side [-50, 0] → tax/discourage → [0, modelMax]
      // RIGHT side [0, 100] → subsidy/encourage → [0, modelMin (negative)]
      const modelMin = renewablesInputRef.current.min !== undefined ? renewablesInputRef.current.min : -0.08;
      const modelMax = renewablesInputRef.current.max !== undefined ? renewablesInputRef.current.max : 0.08;
      const modelVal = sliderPos <= 0
        ? (-sliderPos / 50) * modelMax   // sliderPos=-50 → modelMax (taxed), 0 → 0
        : (sliderPos / 100) * modelMin;  // sliderPos=100 → modelMin (subsidised), 0 → 0
      renewablesInputRef.current.set(modelVal);
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

        renewablesInputRef.current = modelContextRef.current.getInputForId('16');

        if (renewablesInputRef.current) {
          const currentModelVal = renewablesInputRef.current.get?.() ?? 0;
          const modelMin = renewablesInputRef.current.min !== undefined ? renewablesInputRef.current.min : -0.08;
          const modelMax = renewablesInputRef.current.max !== undefined ? renewablesInputRef.current.max : 0.08;
          const defaultSliderPos = modelValToSliderPos(currentModelVal, modelMin, modelMax);
          const clampedDefaultSliderPos = Math.max(-50, Math.min(100, defaultSliderPos));
          setRenewablesVal(clampedDefaultSliderPos);
          setRenewablesText(getSliderText(clampedDefaultSliderPos));
          setRenewablesDefaultPct(Math.max(0, Math.min(100, sliderPosToPct(clampedDefaultSliderPos))));
        }

        modelContextRef.current.onOutputsChanged = () => updateDashboard();

        setTimeout(() => {
          loadGraph(MAIN_GRAPH.canvasId, MAIN_GRAPH.id, 250);
          loadGraph(SECONDARY_GRAPH_CANVAS_ID, selectedSecondaryGraphId, 250);
          updateDashboard();
        }, 150);

        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError(ui.failedToLoad);
        setIsLoading(false);
      }
    };

    if (!modelRef.current) initApp();
  }, []);

  // Reload BOTH graphs only when layout changes (expand/collapse) or on first load.
  // Re-initialising the main CO2 graph on every dropdown change caused it to flash.
  useEffect(() => {
    if (isLoading || !coreConfigRef.current) return;

    const previousBodyOverflow = document.body.style.overflow;
    if (isExpanded) document.body.style.overflow = 'hidden';

    const timer = window.setTimeout(() => {
      loadGraph(MAIN_GRAPH.canvasId, MAIN_GRAPH.id, isExpanded ? 300 : 250);
      loadGraph(SECONDARY_GRAPH_CANVAS_ID, selectedSecondaryGraphId, isExpanded ? 300 : 250);
      updateTemperatureDisplay();
    }, 120);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousBodyOverflow;
    };
  }, [isExpanded, isLoading]); // ← selectedSecondaryGraphId intentionally removed

  // Reload ONLY the secondary graph when the dropdown selection changes.
  useEffect(() => {
    if (isLoading || !coreConfigRef.current) return;
    const timer = window.setTimeout(() => {
      loadGraph(SECONDARY_GRAPH_CANVAS_ID, selectedSecondaryGraphId, isExpanded ? 300 : 250);
    }, 120);
    return () => window.clearTimeout(timer);
  }, [selectedSecondaryGraphId, isLoading]);

  if (isLoading) return <div className="p-8 text-center text-gray-500">{ui.loadingModel}</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div
      className={isExpanded
        ? 'fixed inset-0 z-50 bg-white p-4 md:p-6 overflow-y-auto font-sora'
        : 'bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 font-sora mb-24'}
    >
      <div className={isExpanded ? 'w-full h-full' : ''}>
        <div className="px-4 mb-4 text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
          <p>
            {ui.intro}
          </p>
          <p>{ui.choose}</p>
          <ul className="space-y-2" style={{ listStyleType: 'disc', paddingLeft: '1.5rem' }}>
            <li>
              <strong>{ui.statusTitle}</strong> {ui.statusText}
            </li>
            <li>
              <strong>{ui.encourageTitle}</strong> {ui.encourageText}
            </li>
            <li>
              <strong>{ui.discourageTitle}</strong> {ui.discourageText}
            </li>
          </ul>
        </div>

        {isExpanded ? (
          <div className="relative px-4 pt-4 mb-4">
            <h2 className="text-2xl font-extrabold text-gray-800 dark:text-gray-200 text-center">{ui.dashboardTitle}</h2>
            <button
              type="button"
              onClick={() => setIsExpanded((v) => !v)}
              className="absolute right-4 top-4 px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg border hover:opacity-90"
              style={{ backgroundColor: '#53B1E8', borderColor: '#53B1E8', color: '#ffffff' }}
            >
              {ui.closeFullscreen}
            </button>
          </div>
        ) : (
          <div className="flex items-start justify-between gap-3 px-4 pt-4 mb-4">
            <h2 className="text-2xl font-extrabold text-gray-800 dark:text-gray-200">{ui.dashboardTitle}</h2>
            <button
              type="button"
              onClick={() => setIsExpanded((v) => !v)}
              className="px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg border hover:opacity-90"
              style={{ backgroundColor: '#53B1E8', borderColor: '#53B1E8', color: '#ffffff' }}
            >
              {ui.openFullscreen}
            </button>
          </div>
        )}

        {isExpanded ? (
          <div className="overflow-x-auto mb-4">
            <div className="flex items-stretch gap-4 min-w-[1800px]">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 flex-1 min-w-0">
                <h3 className="text-xl font-extrabold text-gray-700 dark:text-gray-200 mb-2">{graphLabel(MAIN_GRAPH.id, MAIN_GRAPH.labelKey)}</h3>
                <div className="relative w-full">
                  <canvas id={MAIN_GRAPH.canvasId} className="w-full h-full" style={{ display: 'block', pointerEvents: 'none' }} />
                </div>
                <div className="flex justify-center gap-3 mt-3">
                  <span className="px-3 py-1 text-xs font-bold uppercase text-white bg-black rounded" style={{ backgroundColor: '#000000' }}>{ui.baseline}</span>
                  <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#53B1E8' }}>{ui.currentScenario}</span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 flex-1 min-w-0">
                <div className="flex justify-start items-center mb-2">
                  <select
                    value={selectedSecondaryGraphId}
                    onChange={(e) => setSelectedSecondaryGraphId(e.target.value)}
                    className="w-full max-w-full bg-blue-100 dark:bg-blue-900/50 border border-blue-300 dark:border-blue-500 text-blue-900 dark:text-blue-100 text-sm sm:text-base rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-3 pr-8 font-bold shadow-sm truncate"
                    style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
                  >
                    {SECONDARY_GRAPHS.map(g => <option key={g.id} value={g.id}>{graphLabel(g.id, g.labelKey)}</option>)}
                  </select>
                </div>
                <div className="relative w-full">
                  <canvas id={SECONDARY_GRAPH_CANVAS_ID} className="w-full h-full" style={{ display: 'block', pointerEvents: 'none' }} />
                </div>
                                {selectedSecondaryGraphId === '279' ? (
                  <div className="mt-3 text-center">
                    <div className="flex justify-center gap-3 mb-1">
                      <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#3385C6' }}>{ui.marineSpecies}</span>
                      <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#843C0C' }}>{ui.landSpecies}</span>
                    </div>
                    <p className="text-xs text-gray-500 italic">{ui.dashedBaseline}</p>
                  </div>
                ) : (
                  <div className="flex justify-center gap-3 mt-3">
                    <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#000000' }}>{ui.baseline}</span>
                    <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#53B1E8' }}>{ui.currentScenario}</span>
                  </div>
                )}
              </div>

              <div className="shrink-0 w-fit">
                <div className="px-6 pb-4 text-center inline-flex flex-col items-center w-fit h-fit" style={{ transform: 'translateY(110px)' }}>
                  <span
                    ref={(el) => { if (el) tempCRef.current[0] = el; }}
                    style={{ color: '#14a9df', fontSize: 'clamp(3rem, 3vw, 3rem)', fontWeight: 800, lineHeight: 1.5 }}
                  >
                    +3.3°C
                  </span>
                  <div className="mx-auto my-4 h-[2px] w-[72%] bg-black" />
                  <span
                    ref={(el) => { if (el) tempFRef.current[0] = el; }}
                    style={{ color: '#14a9df', fontSize: 'clamp(1.5rem, 1.5vw, 1.5rem)', fontWeight: 800, lineHeight: 1 }}
                  >
                    +5.9°F
                  </span>
                  <div className="mt-5 whitespace-pre-line leading-tight text-gray-900 dark:text-gray-100" style={{ fontSize: 'clamp(1.5rem, 1.5vw, 1.5rem)', fontWeight: 800 }}>
                    {ui.temperatureTitle}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="flex justify-center mb-4">
              <div className="bg-white dark:bg-gray-800 px-6 py-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 text-center inline-flex flex-col items-center w-fit mx-auto">
                <span
                  ref={(el) => { if (el) tempCRef.current[1] = el; }}
                  style={{ color: '#14a9df', fontSize: 'clamp(3rem, 3vw, 3rem)', fontWeight: 800, lineHeight: 1.5 }}
                >+3.3°C</span>
                <div className="mx-auto my-4 h-[2px] w-[72%] bg-black" />
                <span
                  ref={(el) => { if (el) tempFRef.current[1] = el; }}
                  style={{ color: '#14a9df', fontSize: 'clamp(1.5rem, 1.5vw, 1.5rem)', fontWeight: 800, lineHeight: 1 }}
                >+5.9°F</span>
                <div className="mt-3 leading-tight text-gray-900 dark:text-gray-100" style={{ fontSize: 'clamp(1.5rem, 1.5vw, 1.5rem)', fontWeight: 800 }}>
                  {ui.temperatureTitle}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600">
                <h3 className="text-xl font-extrabold text-gray-700 dark:text-gray-200 mb-2">{graphLabel(MAIN_GRAPH.id, MAIN_GRAPH.labelKey)}</h3>
                <div className="relative w-full">
                  <canvas id={MAIN_GRAPH.canvasId} className="w-full h-full" style={{ display: 'block', pointerEvents: 'none' }} />
                </div>
                <div className="flex justify-center gap-3 mt-3">
                  <span className="px-3 py-1 text-xs font-bold uppercase text-white bg-black rounded" style={{ backgroundColor: '#000000' }}>{ui.baseline}</span>
                  <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#53B1E8' }}>{ui.currentScenario}</span>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600">
                <div className="flex justify-start items-center mb-2">
                  <select
                    value={selectedSecondaryGraphId}
                    onChange={(e) => setSelectedSecondaryGraphId(e.target.value)}
                    className="w-full max-w-full bg-blue-100 dark:bg-blue-900/50 border border-blue-300 dark:border-blue-500 text-blue-900 dark:text-blue-100 text-sm sm:text-base rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-3 pr-8 font-bold shadow-sm truncate"
                    style={{ textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}
                  >
                    {SECONDARY_GRAPHS.map(g => <option key={g.id} value={g.id}>{graphLabel(g.id, g.labelKey)}</option>)}
                  </select>
                </div>
                <div className="relative w-full">
                  <canvas id={SECONDARY_GRAPH_CANVAS_ID} className="w-full h-full" style={{ display: 'block', pointerEvents: 'none' }} />
                </div>
                                {selectedSecondaryGraphId === '279' ? (
                  <div className="mt-3 text-center">
                    <div className="flex justify-center gap-3 mb-1">
                      <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#3385C6' }}>{ui.marineSpecies}</span>
                      <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#843C0C' }}>{ui.landSpecies}</span>
                    </div>
                    <p className="text-xs text-gray-500 italic">{ui.dashedBaseline}</p>
                  </div>
                ) : (
                  <div className="flex justify-center gap-3 mt-3">
                    <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#000000' }}>{ui.baseline}</span>
                    <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#53B1E8' }}>{ui.currentScenario}</span>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 space-y-2">
          <div className="flex justify-between font-bold text-gray-700 dark:text-gray-200">
            <label>{ui.renewablesLabel}</label>
            <span className="text-xs font-mono text-gray-500">{renewablesText}</span>
          </div>
          <div className="enroads-range-wrap">
            {renewablesDefaultPct !== null && (
              <div className="enroads-range-tick" style={{ ['--tick-frac' as any]: String(renewablesDefaultPct / 100) }} />
            )}
            <input
              type="range"
              min="-50"
              max="100"
              step="1"
              value={renewablesVal}
              onChange={handleRenewablesChange}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{
                background: getRangeHighlightBackground(((renewablesVal + 50) / 150) * 100, renewablesDefaultPct, '#53B1E8')
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
