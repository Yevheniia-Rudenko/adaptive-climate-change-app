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

export default function Module1RenewablesDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Slider states
  const [renewablesVal, setRenewablesVal] = useState(0);
  const [renewablesText, setRenewablesText] = useState('status quo');

  // selectedGraphId stays as state (needed for dropdown + useEffect trigger)
  const [selectedGraphId, setSelectedGraphId] = useState('86');

  // Temperature display — use refs + direct DOM to avoid React re-renders that reset canvas
  const tempCRef = useRef<HTMLSpanElement>(null);
  const tempFRef = useRef<HTMLSpanElement>(null);

  const graphContainerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const modelRef = useRef<any>(null);
  const modelContextRef = useRef<any>(null);
  const graphViewRef = useRef<any>(null);
  const coreConfigRef = useRef<any>(null);

  // Input refs
  const renewablesInputRef = useRef<any>(null);

  const str = (key: string) => {
    return (enStrings as any)[key] || key;
  };

  const getSliderText = (value: number) => {
    if (value <= -0.01) return 'subsidized';
    if (value >= 0.01) return 'taxed';
    return 'status quo';
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
          datasetSpec.color = '#00b6f1'; // CI blue for current scenario
          datasetSpec.lineWidth = 4;
        } else if (datasetSpec.externalSourceName === 'baseline' || datasetSpec.externalSourceName === 'Ref') {
          datasetSpec.color = '#000000';
          datasetSpec.lineWidth = 4;
        }
      }

      // FIX: no animation to prevent chart flickering/jumping
      graphView.updateData(false);
    } catch (e) {
      console.error('Error in updateGraphData:', e);
    }
  };

  const updateTemperatureDisplay = () => {
    if (!modelContextRef.current) return;

    let tempSeries = modelContextRef.current.getSeriesForVar('_temperature_change_from_1850');
    if (!tempSeries || !tempSeries.points) {
      tempSeries = modelContextRef.current.getSeriesForVar('_temperature_relative_to_1850_1900');
    }

    if (tempSeries && tempSeries.points && tempSeries.points.length > 0) {
      const tempCelsius = tempSeries.getValueAtTime(2100);
      const tempFahrenheit = tempCelsius * 9 / 5;
      // FIX: direct DOM update instead of setState to avoid React re-render
      if (tempCRef.current) tempCRef.current.textContent = `+${tempCelsius.toFixed(1)}°C`;
      if (tempFRef.current) tempFRef.current.textContent = `+${tempFahrenheit.toFixed(1)}°F`;
    } else {
      const emissionsSeries = modelContextRef.current.getSeriesForVar('_co2_equivalent_net_emissions');
      if (emissionsSeries && emissionsSeries.points && emissionsSeries.points.length > 0) {
        const emissions2100 = emissionsSeries.getValueAtTime(2100);
        const tempCelsius = 1.5 + (emissions2100 / 69.6) * 1.8;
        const tempFahrenheit = tempCelsius * 9 / 5;
        if (tempCRef.current) tempCRef.current.textContent = `+${tempCelsius.toFixed(1)}°C`;
        if (tempFRef.current) tempFRef.current.textContent = `+${tempFahrenheit.toFixed(1)}°F`;
      }
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

    let graphSpec = coreConfigRef.current.graphs.get(graphId);

    if (!graphSpec) {
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

    const canvas = canvasRef.current;
    if (!canvas) {
      console.error('Canvas element not found for Exercise 2');
      return;
    }

    resizeCanvasToContainer();

    let viewModel;
    try {
      viewModel = createGraphViewModel(graphSpec);
    } catch (e) {
      console.error('Error creating graph view model:', e);
      return;
    }

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
      const min = renewablesInputRef.current.min !== undefined ? renewablesInputRef.current.min : -0.08;
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

        renewablesInputRef.current = modelContextRef.current.getInputForId('16');

        if (renewablesInputRef.current) {
          const current = renewablesInputRef.current.get();
          const min = renewablesInputRef.current.min !== undefined ? renewablesInputRef.current.min : -0.08;
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
          loadGraph(selectedGraphId);
          setTimeout(() => updateDashboard(), 50);
        }, 150);

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
      loadGraph(selectedGraphId);
    }
  }, [selectedGraphId, isLoading, error]);

  useEffect(() => {
    const container = graphContainerRef.current;
    if (!container) return;

    const ro = new ResizeObserver(() => {
      resizeCanvasToContainer();
      if (graphViewRef.current) graphViewRef.current.updateData(false);
    });

    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  if (isLoading) return <div className="p-8 text-center text-gray-500">Loading Model...</div>;
  if (error) return <div className="p-8 text-center text-red-600">{error}</div>;

  return (
    <div className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-4 rounded-xl border border-gray-200 dark:border-gray-700 font-sora mb-24">
      <h2 className="text-lg sm:text-xl px-3 sm:px-4 pt-3 sm:pt-4 mb-4 font-bold text-gray-800 dark:text-gray-200">En-Roads Dashboard: Renewables</h2>

      {/* Temperature card — centered at top */}
      <div className="flex justify-center mb-4">
        <div className="bg-white dark:bg-gray-800 px-6 sm:px-8 py-5 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 text-center">
          <span ref={tempCRef} className="block text-4xl sm:text-5xl font-black text-green-500 mb-1">+3.2°C</span>
          <span ref={tempFRef} className="block text-lg sm:text-xl font-bold text-green-400 mb-3">+5.7°F</span>
          <div className="text-gray-500 dark:text-gray-400 font-semibold uppercase tracking-wider text-xs">Global Temperature<br />by 2100</div>
        </div>
      </div>

      {/* Graph */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 mb-4">
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
        <div ref={graphContainerRef} style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
          <canvas
            ref={canvasRef}
            style={{ display: 'block', width: '100%', pointerEvents: 'none' }}
          />
        </div>
        {/* Legend badges */}
        <div className="flex justify-center gap-3 mt-3">
          <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#000000' }}>BASELINE</span>
          <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#00b6f1' }}>CURRENT SCENARIO</span>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 space-y-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="font-bold text-gray-700 dark:text-gray-200">Renewables</label>
            <span className="text-sm font-mono text-gray-500">{renewablesText}</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={renewablesVal}
            onChange={handleRenewablesChange}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${renewablesVal}%, #e5e7eb ${renewablesVal}%, #e5e7eb 100%)`
            }}
          />
        </div>
      </div>
    </div>
  );
}
