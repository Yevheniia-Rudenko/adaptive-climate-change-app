import { useEffect, useRef, useState, ChangeEvent } from 'react';
import { createAsyncModel, getDefaultConfig, createDefaultOutputs } from '@climateinteractive/en-roads-core';
import enStrings from '@climateinteractive/en-roads-core/strings/en';
import deStrings from '@climateinteractive/en-roads-core/strings/de';
import esStrings from '@climateinteractive/en-roads-core/strings/es';
import { GraphView } from '@climateinteractive/sim-ui-graph';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/enroads-dashboard.css';

// Graph definitions with correct En-ROADS IDs
const GRAPHS = [
  { id: '90',  label: 'Sea Level Rise',                varId: '_slr_from_2000_in_meters' },
  { id: '275', label: 'Deaths from Extreme Heat',      varId: '_excess_deaths_from_extreme_heat_per_100k_people' },
  { id: '279', label: 'Species Loss - Extinction',     varId: '_percent_endemic_species_at_high_risk_of_extinction' },
  { id: '183', label: 'Crop Yield',                    varId: '_crop_yield_per_hectare_kg_per_year_per_ha' },
  { id: '112', label: 'Air Pollution',                 varId: '_pm2_5_emissions_from_energy_mt_per_year' },
];

export default function Module1CarbonPriceDashboard() {
  const { language } = useLanguage();
  const ui = {
    en: {
      title: 'Make a Model: Carbon Price',
      loadingModel: 'Loading Model...',
      failedToLoad: 'Failed to load En-ROADS model.',
      temperatureTitle: 'Temperature\nIncrease by\n2100',
      baseline: 'BASELINE',
      currentScenario: 'CURRENT SCENARIO',
      carbonPrice: 'Carbon Price',
      seaLevelRise: 'Sea Level Rise',
      deathsExtremeHeat: 'Deaths from Extreme Heat',
      speciesLoss: 'Species Loss - Extinction',
      cropYield: 'Crop Yield',
      airPollution: 'Air Pollution',
    },
    de: {
      title: 'Erstelle ein Modell: CO2-Preis',
      loadingModel: 'Modell wird geladen...',
      failedToLoad: 'En-ROADS-Modell konnte nicht geladen werden.',
      temperatureTitle: 'Temperatur-\nanstieg bis\n2100',
      baseline: 'BASISLINIE',
      currentScenario: 'AKTUELLES SZENARIO',
      carbonPrice: 'CO2-Preis',
      seaLevelRise: 'Meeresspiegelanstieg',
      deathsExtremeHeat: 'Todesfälle durch extreme Hitze',
      speciesLoss: 'Artenverlust - Aussterben',
      cropYield: 'Ernteertrag',
      airPollution: 'Luftverschmutzung',
    },
    es: {
      title: 'Crea un modelo: Precio al carbono',
      loadingModel: 'Cargando modelo...',
      failedToLoad: 'Error al cargar el modelo En-ROADS.',
      temperatureTitle: 'Aumento de\ntemperatura\npara 2100',
      baseline: 'LÍNEA DE BASE',
      currentScenario: 'ESCENARIO ACTUAL',
      carbonPrice: 'Precio al carbono',
      seaLevelRise: 'Aumento del nivel del mar',
      deathsExtremeHeat: 'Muertes por calor extremo',
      speciesLoss: 'Pérdida de especies - Extinción',
      cropYield: 'Rendimiento de cultivos',
      airPollution: 'Contaminación del aire',
    },
  }[language] ?? {
    title: 'Make a Model: Carbon Price',
    loadingModel: 'Loading Model...',
    failedToLoad: 'Failed to load En-ROADS model.',
    temperatureTitle: 'Temperature\nIncrease by\n2100',
    baseline: 'BASELINE',
    currentScenario: 'CURRENT SCENARIO',
    carbonPrice: 'Carbon Price',
    seaLevelRise: 'Sea Level Rise',
    deathsExtremeHeat: 'Deaths from Extreme Heat',
    speciesLoss: 'Species Loss - Extinction',
    cropYield: 'Crop Yield',
    airPollution: 'Air Pollution',
  };
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Carbon Price Slider state
  const [carbonPriceVal, setCarbonPriceVal] = useState(0); // 0-100 range for slider
  const [carbonPriceText, setCarbonPriceText] = useState('$0 / ton CO2');
  const [carbonPriceDefaultPct, setCarbonPriceDefaultPct] = useState<number | null>(null);

  // Temperature display — use refs + direct DOM to avoid React re-renders
  const tempCRef = useRef<HTMLSpanElement>(null);
  const tempFRef = useRef<HTMLSpanElement>(null);
  const [selectedGraphId, setSelectedGraphId] = useState('90');

  const modelRef = useRef<any>(null);
  const modelContextRef = useRef<any>(null);
  const graphViewRef = useRef<any>(null);
  const coreConfigRef = useRef<any>(null);
  const graphContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Input ref for Carbon Price (ID 48 usually, check if fails)
  const carbonPriceInputRef = useRef<any>(null);

  const getEnRoadsStrings = () => {
    switch (language) {
      case 'de': return deStrings;
      case 'es': return esStrings;
      default: return enStrings;
    }
  };
  const str = (key: string) => (getEnRoadsStrings() as any)[key] || key;

  const graphLabel = (id: string) => {
    if (id === '90') return ui.seaLevelRise;
    if (id === '275') return ui.deathsExtremeHeat;
    if (id === '279') return ui.speciesLoss;
    if (id === '183') return ui.cropYield;
    if (id === '112') return ui.airPollution;
    return id;
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
        let series = modelContextRef.current.getSeriesForVar(
          datasetSpec.varId,
          datasetSpec.externalSourceName
        );

        // Fallback: En-ROADS uses 'Ref' and 'baseline' interchangeably.
        if ((!series || !series.points || series.points.length === 0) && datasetSpec.externalSourceName === 'baseline') {
          series = modelContextRef.current.getSeriesForVar(datasetSpec.varId, 'Ref');
        } else if ((!series || !series.points || series.points.length === 0) && datasetSpec.externalSourceName === 'Ref') {
          series = modelContextRef.current.getSeriesForVar(datasetSpec.varId, 'baseline');
        }

        const newPoints = series?.points || [];
        datasetViewModel.points = [...newPoints];

        // Hide single-point scatter markers, show full time-series only.
        if (newPoints.length <= 2) { datasetViewModel.visible = false; continue; }
        datasetViewModel.visible = true;

        // Preserve config-defined colors (e.g. Species Loss marine/land).
        if (!datasetSpec.externalSourceName) {
          if (!datasetSpec.color) datasetSpec.color = '#00b6f1';
          datasetSpec.lineWidth = 4;
        } else if (datasetSpec.externalSourceName === 'baseline' || datasetSpec.externalSourceName === 'Ref') {
          if (!datasetSpec.color) datasetSpec.color = '#000000';
          datasetSpec.lineWidth = 4;
        }
      }
      graphView.updateData(false);
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
      if (tempCRef.current) tempCRef.current.textContent = `+${tempCelsius.toFixed(1)}°C`;
      if (tempFRef.current) tempFRef.current.textContent = `+${(tempCelsius * 9 / 5).toFixed(1)}°F`;
    }
  };

  const updateDashboard = () => {
    if (graphViewRef.current) updateGraphData(graphViewRef.current);
    updateTemperatureDisplay();
  };

  const getGraphHeight = (containerWidth: number) => {
    const height = containerWidth * 0.55;
    return Math.max(220, Math.min(320, Math.round(height)));
  };

  const resizeCanvasToContainer = () => {
    const container = graphContainerRef.current;
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

  const loadGraph = (graphId: string) => {
    if (!coreConfigRef.current) return;

    // Graph 279 (Species Loss): return raw config to preserve all species lines.
    // All other graphs: filter to safe 2-dataset spec so CO2 etc. always show.
    let graphSpec: any;
    const rawConfig = coreConfigRef.current.graphs.get(graphId);
    if (rawConfig) {
      if (graphId === '279') {
        const MARINE = '#3385C6';
        const LAND   = '#843C0C';
        const curr = (rawConfig.datasets || []).filter((d: any) => !d.externalSourceName);
        const base = (rawConfig.datasets || []).filter(
          (d: any) => d.externalSourceName === 'Ref' || d.externalSourceName === 'baseline'
        );
        graphSpec = {
          ...rawConfig,
          datasets: [
            ...base.slice(0, 2).map((d: any, i: number) => ({ ...d, color: [MARINE, LAND][i] })),
            ...curr.slice(0, 2).map((d: any, i: number) => ({ ...d, color: [MARINE, LAND][i] }))
          ]
        };
      } else {
        const baselineDataset = rawConfig.datasets?.find(
          (d: any) => d.externalSourceName === 'Ref' || d.externalSourceName === 'baseline'
        );
        const currentDataset = rawConfig.datasets?.find((d: any) => !d.externalSourceName);
        if (baselineDataset && currentDataset) {
          graphSpec = {
            ...rawConfig,
            datasets: [
              { ...baselineDataset, label: 'Baseline', color: '#000000', lineStyle: baselineDataset.lineStyle || 'thinline' },
              { ...currentDataset, label: 'Current', color: '#00b6f1', lineStyle: currentDataset.lineStyle || 'line' }
            ]
          };
        } else {
          const graphDef = GRAPHS.find(g => g.id === graphId);
          graphSpec = graphDef ? {
            ...rawConfig,
            datasets: [
              { varId: graphDef.varId, externalSourceName: 'Ref', label: 'Baseline', color: '#000000', lineStyle: 'thinline' },
              { varId: graphDef.varId, label: 'Current', color: '#00b6f1', lineStyle: 'line' }
            ]
          } : rawConfig;
        }
      }
    } else {
      const graphDef = GRAPHS.find(g => g.id === graphId);
      if (!graphDef) return;
      graphSpec = {
        id: graphId, title: graphDef.label, kind: 'line',
        datasets: [
          { varId: graphDef.varId, externalSourceName: 'Ref', label: 'Baseline', color: '#000000', lineStyle: 'thinline' },
          { varId: graphDef.varId, label: 'Current', color: '#00b6f1', lineStyle: 'line' }
        ]
      };
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    resizeCanvasToContainer();

    try {
      const viewModel = createGraphViewModel(graphSpec);
      const containerWidth = graphContainerRef.current?.getBoundingClientRect().width ?? 640;
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
        getDefaultLineWidth: () => (compact ? 4 : 5),
        plotBackgroundColor: isDark ? '#1e293b' : '#ffffff'
      };

      const options = { style, responsive: true, animations: false };
      graphViewRef.current = new GraphView(canvas, viewModel, options, true);
      updateGraphData(graphViewRef.current);
    } catch (e) { console.error('Error loading graph', e); }
  };

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value); // 0-100 slider position
    setCarbonPriceVal(val);

    if (carbonPriceInputRef.current && modelRef.current) {
      // Map 0-100 slider to Carbon Price range (e.g., $0 to $250/ton seems reasonable for En-Roads max)
      // Default max often around $100-$250. Let's assume $250 as a generic 'high' carbon price.
      const min = carbonPriceInputRef.current.min !== undefined ? carbonPriceInputRef.current.min : 0;
      const max = carbonPriceInputRef.current.max !== undefined ? carbonPriceInputRef.current.max : 250;

      const modelVal = min + (val / 100) * (max - min);

      console.log(`Ex4 Slider Change: ${val}% -> $${modelVal}`);

      carbonPriceInputRef.current.set(modelVal);
      setCarbonPriceText(`$${Math.round(modelVal)} / ton CO2`);

      // Model updates automatically via onOutputsChanged callback
      setTimeout(() => updateDashboard(), 100);
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

        // Debug: List all inputs to find Carbon Price
        console.log("Ex4 DEBUG: Listing all inputs with 'price' or 'carbon'...");
        for (let i = 0; i < 200; i++) {
          const input = modelContextRef.current.getInputForId(String(i));
          if (input && input.varId) {
            const varId = input.varId.toLowerCase();
            if (varId.includes('carbon') || varId.includes('price')) {
              console.log(`Ex4 DEBUG: Input ID ${i} -> varId: ${input.varId}, min: ${input.min}, max: ${input.max}`);
            }
          }
        }

        // Try to find Carbon Price input by checking varId
        let foundCarbonPrice = false;
        for (let i = 0; i < 200; i++) {
          const testInput = modelContextRef.current.getInputForId(String(i));
          if (testInput && testInput.varId) {
            const varId = testInput.varId.toLowerCase();
            // Look for price-related varIds
            if (varId.includes('_price') || varId === '_carbon_price' || varId.includes('carbon_tax')) {
              console.log(`Ex4: Found Carbon Price at ID ${i}: ${testInput.varId}`);
              carbonPriceInputRef.current = testInput;
              foundCarbonPrice = true;
              break;
            }
          }
        }

        if (!foundCarbonPrice) {
          console.error("Ex4 Error: Carbon Price input NOT found in IDs 0-200.");
        } else {
          console.log("Ex4: Carbon Price Input Min/Max:", carbonPriceInputRef.current.min, carbonPriceInputRef.current.max);
          const current = carbonPriceInputRef.current.get?.() ?? 0;
          const min = carbonPriceInputRef.current.min !== undefined ? carbonPriceInputRef.current.min : 0;
          const max = carbonPriceInputRef.current.max !== undefined ? carbonPriceInputRef.current.max : 250;
          const denom = max - min;
          const pct = denom !== 0 ? ((current - min) / denom) * 100 : 0;
          const clampedPct = Math.max(0, Math.min(100, pct));
          setCarbonPriceVal(clampedPct);
          setCarbonPriceDefaultPct(clampedPct);
          setCarbonPriceText(`$${Math.round(current)} / ton CO2`);
        }

        modelContextRef.current.onOutputsChanged = () => updateDashboard();

        setTimeout(() => {
          loadGraph(selectedGraphId);
          setTimeout(() => updateDashboard(), 50);
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

  useEffect(() => {
    if (!isLoading && coreConfigRef.current) loadGraph(selectedGraphId);
  }, [selectedGraphId]);

  useEffect(() => {
    const container = graphContainerRef.current;
    if (!container) return;

    const ro = new ResizeObserver(() => {
      resizeCanvasToContainer();
      if (graphViewRef.current) graphViewRef.current.updateData(false);
    });

    ro.observe(container);
    return () => ro.disconnect();
  }, [isLoading]);

  if (isLoading) return <div className="p-8 text-center text-gray-500">{ui.loadingModel}</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 rounded-xl border border-gray-200 dark:border-gray-700 font-sora mb-24">
      <h2 className="text-lg sm:text-xl px-3 sm:px-4 pt-3 sm:pt-4 mb-4 font-bold text-gray-800 dark:text-gray-200">{ui.title}</h2>

      {/* Temperature card — matches the design from other dashboards */}
      <div className="flex justify-center mb-4">
        <div className="bg-white dark:bg-gray-800 px-6 py-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 text-center inline-flex flex-col items-center w-fit mx-auto">
          <span
            ref={tempCRef}
            style={{ color: '#14a9df', fontSize: 'clamp(3rem, 3vw, 3rem)', fontWeight: 800, lineHeight: 1.5 }}
          >+3.3°C</span>
          <div className="mx-auto my-4 h-[2px] w-[72%] bg-black" />
          <span
            ref={tempFRef}
            style={{ color: '#14a9df', fontSize: 'clamp(1.5rem, 1.5vw, 1.5rem)', fontWeight: 800, lineHeight: 1 }}
          >+5.9°F</span>
          <div className="mt-3 whitespace-pre-line leading-tight text-gray-900 dark:text-gray-100" style={{ fontSize: 'clamp(1.5rem, 1.5vw, 1.5rem)', fontWeight: 800 }}>
            {ui.temperatureTitle}
          </div>
        </div>
      </div>

      {/* Graph */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 mb-4">
        <div className="flex justify-between items-center mb-4">
          <select
            value={selectedGraphId}
            onChange={(e) => setSelectedGraphId(e.target.value)}
            className="bg-blue-100 dark:bg-blue-900/50 border border-blue-300 dark:border-blue-500 text-blue-900 dark:text-blue-100 text-base sm:text-lg rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-3 font-bold"
          >
            {GRAPHS.map(g => <option key={g.id} value={g.id}>{graphLabel(g.id)}</option>)}
          </select>
        </div>
        <div ref={graphContainerRef} style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
          <canvas
            ref={canvasRef}
            style={{ display: 'block', width: '100%', pointerEvents: 'none' }}
          />
        </div>
        {/* Dynamic legend */}
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
              <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#000000' }}>{ui.baseline}</span>
              <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#00b6f1' }}>{ui.currentScenario}</span>
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center font-bold text-gray-700 dark:text-gray-200">
            <label>{ui.carbonPrice}</label>
            <span className="text-sm font-mono text-gray-500">{carbonPriceText}</span>
          </div>
          <div className="enroads-range-wrap">
            {carbonPriceDefaultPct !== null && (
              <div className="enroads-range-tick" style={{ ['--tick-frac' as any]: String(carbonPriceDefaultPct / 100) }} />
            )}
            <input
              type="range"
              min="0"
              max="100"
              value={carbonPriceVal}
              onChange={handleSliderChange}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{
                background: getRangeHighlightBackground(carbonPriceVal, carbonPriceDefaultPct, '#3B82F6')
              }}
            />
          </div>
        </div>
      </div>

    </div>
  );
}
