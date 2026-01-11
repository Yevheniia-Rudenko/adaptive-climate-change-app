import { useEffect, useRef, useState, ChangeEvent } from 'react';
import { createAsyncModel, getDefaultConfig } from '@climateinteractive/en-roads-core';
import enStrings from '@climateinteractive/en-roads-core/strings/en';
import { GraphView } from '@climateinteractive/sim-ui-graph';
import '../styles/enroads-dashboard.css';

export default function FourthExerciseDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sliderValue, setSliderValue] = useState<number | null>(null);
  const [sliderLabel, setSliderLabel] = useState<string>('Carbon Price');
  const [sliderText, setSliderText] = useState<string>('status quo');
  const [tempC, setTempC] = useState(0);
  const [tempF, setTempF] = useState(0);

  const deathsCanvasRef = useRef<HTMLCanvasElement>(null);
  const modelRef = useRef<any>(null);
  const modelContextRef = useRef<any>(null);
  const carbonPriceInputRef = useRef<any>(null);
  const carbonPriceSpecRef = useRef<any>(null);
  const deathsGraphViewRef = useRef<any>(null);
  const coreConfigRef = useRef<any>(null);

  const str = (key: string) => {
    return (enStrings as any)[key] || key;
  };

  const createGraphViewModel = (graphSpec: any) => {
    const datasetViewModels = graphSpec.datasets.map((datasetSpec: any) => ({
      spec: datasetSpec,
      visible: true,
      points: []
    }));

    const formatNumber = (value: number, format?: string) => {
      if (format === '.0f') return String(Math.round(value));
      if (format === '.1f') return (Math.round(value * 10) / 10).toFixed(1);
      if (format === '.2f') return (Math.round(value * 100) / 100).toFixed(2);
      if (format === '.3f') return (Math.round(value * 1000) / 1000).toFixed(3);
      return (Math.round(value * 10) / 10).toFixed(1);
    };

    return {
      spec: graphSpec,
      getDatasets: () => datasetViewModels,
      getStringForKey: (key: string) => str(key),
      formatYAxisTickValue: (value: number) => {
        const stringValue = formatNumber(value, graphSpec.yFormat);
        if (graphSpec.kind === 'h-bar' && graphSpec.id !== '145') {
          return `${stringValue}%`;
        } else {
          return stringValue;
        }
      },
      formatYAxisTooltipValue: (value: number) => {
        return formatNumber(value, graphSpec.yFormat === '.0f' ? '.0f' : '.2f');
      }
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
      datasetViewModel.visible = true;
      datasetViewModel.points = series?.points || [];
    }

    graphView.updateData(true);
  };

  const initDeathsGraph = () => {
    if (!deathsCanvasRef.current || !coreConfigRef.current) return;
    // Graph ID 145: Deaths from extreme heat by region
    const graphSpec = coreConfigRef.current.graphs.get('145');
    if (!graphSpec) {
      console.error('Deaths graph (145) not found');
      return;
    }

    const canvas = deathsCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.style.width = rect.width + 'px';
    canvas.style.height = '280px';
    canvas.width = rect.width * dpr;
    canvas.height = 280 * dpr;

    const viewModel = createGraphViewModel(graphSpec);
    const style = {
      font: {
        family: 'system-ui, -apple-system, sans-serif',
        style: 'normal',
        color: '#1f2937'
      },
      xAxis: {
        tickMaxCount: 6
      },
      yAxis: {
        tickMaxCount: 6
      },
      getAxisLabelFontSize: () => 14,
      getTickLabelFontSize: () => 12,
      getDefaultLineWidth: () => 3
    };
    const options = { style, responsive: true, animations: true };

    deathsGraphViewRef.current = new GraphView(canvas, viewModel, options, true);
    updateGraphData(deathsGraphViewRef.current);
  };

  const updateTemperatureDisplay = () => {
    if (!modelContextRef.current) return;
    const tempSeries = modelContextRef.current.getSeriesForVar('_temperature_relative_to_1850_1900');
    if (tempSeries && tempSeries.points && tempSeries.points.length > 0) {
      const tempCelsius = tempSeries.getValueAtTime(2100);
      const tempFahrenheit = tempCelsius * 9 / 5;
      setTempC(tempCelsius);
      setTempF(tempFahrenheit);
    } else {
      const emissionsSeries = modelContextRef.current.getSeriesForVar('_co2_equivalent_net_emissions');
      if (emissionsSeries) {
        const emissions2100 = emissionsSeries.getValueAtTime(2100);
        const tempCelsius = 1.5 + (emissions2100 / 69.6) * 1.8;
        const tempFahrenheit = tempCelsius * 9 / 5;
        setTempC(tempCelsius);
        setTempF(tempFahrenheit);
      }
    }
  };

  const updateAllGraphs = () => {
    if (deathsGraphViewRef.current) {
      updateGraphData(deathsGraphViewRef.current);
    }
    updateTemperatureDisplay();
  };

  const getSliderTextForValue = (value: number) => {
    const spec = carbonPriceSpecRef.current;
    if (spec?.rangeLabelKeys && spec?.rangeDividers) {
        const labels: string[] = spec.rangeLabelKeys;
        const dividers: number[] = spec.rangeDividers;
        if (dividers.length === labels.length - 1) {
            for (let i = 0; i < dividers.length; i++) {
                if (value < dividers[i]) return str(labels[i]);
            }
            return str(labels[labels.length - 1]);
        }
    }
    // Fallback: just show the value if no specific labels match standard pattern
    return `$${value.toFixed(0)}`;
  };

  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setSliderValue(value);
    setSliderText(getSliderTextForValue(value));
    if (carbonPriceInputRef.current) {
      carbonPriceInputRef.current.set(value);
    }
  };

  useEffect(() => {
    const initApp = async () => {
      try {
        setIsLoading(true);
        coreConfigRef.current = getDefaultConfig();

        modelRef.current = await createAsyncModel();
        modelContextRef.current = modelRef.current.addContext();
        modelContextRef.current.onOutputsChanged = () => {
          updateAllGraphs();
        };

        // Input ID 39: Carbon Price
        carbonPriceSpecRef.current = coreConfigRef.current.inputs.get('39');
        carbonPriceInputRef.current = modelContextRef.current.getInputForId('39');

        if (!carbonPriceInputRef.current || !carbonPriceSpecRef.current) {
          throw new Error('Carbon Price input/spec not found');
        }

        const defaultVal = carbonPriceSpecRef.current.defaultValue ?? 0;
        setSliderValue(defaultVal);
        setSliderLabel(str('input_039_label'));
        setSliderText(getSliderTextForValue(defaultVal));
        carbonPriceInputRef.current.set(defaultVal);

        // Set default values for other parameters to match En-ROADS behavior
        const setInput = (id: string, value: number) => {
          const input = modelContextRef.current.getInputForId(id);
          if (input) {
            input.set(value);
          } else {
            console.warn(`Input ${id} not found`);
          }
        };

        // Year carbon price starts to phase in: 2026
        setInput('40', 2026);
        // Years to achieve initial carbon price: 10
        setInput('41', 10);
        // Final carbon price: 0
        setInput('42', 0);
        // Year to start achieving final carbon price: 2100
        setInput('43', 2100);
        // Carbon price applies to bioenergy emissions: False (Disabled)
        setInput('312', 0);
        // Carbon price encourages carbon capture and storage (CCS): True (Enabled)
        setInput('298', 1);
        // Carbon price encourages direct air carbon capture and storage (DACCS): True (Enabled)
        setInput('299', 1);
        // Use clean electricity standard: False (Disabled)
        setInput('245', 0);
        // Emissions performance standard: 100
        setInput('45', 100);
        // Emissions performance standard start year: 2100
        setInput('46', 2100);

        requestAnimationFrame(() => {
          initDeathsGraph();
          updateAllGraphs();
        });

        setIsLoading(false);
      } catch (err) {
        console.error('Failed to initialize fourth exercise dashboard:', err);
        setError('Failed to load the En-ROADS model. Please refresh the page.');
        setIsLoading(false);
      }
    };

    initApp();

    return () => {
      if (deathsGraphViewRef.current) {
        if (typeof deathsGraphViewRef.current.destroy === 'function') {
          deathsGraphViewRef.current.destroy();
        }
        deathsGraphViewRef.current = null;
      }
    };
  }, []);

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

  const sliderMin = carbonPriceSpecRef.current?.minValue ?? 0;
  const sliderMax = carbonPriceSpecRef.current?.maxValue ?? 100;
  const sliderStep = carbonPriceSpecRef.current?.step ?? 1;
  const displayC = Math.max(0, Math.round(tempC * 10) / 10);
  const displayF = Math.round(((displayC * 9) / 5) * 10) / 10;

  return (
    <div className="enroads-container">
      <div className="enroads-dashboard">
        <div className="enroads-graph-section">
          <div className="enroads-graph-container">
            <div className="enroads-graph-header">
              <span className="enroads-graph-icon">▶</span>
              <h3 className="enroads-graph-title">{str('graph_145_title')}</h3>
              <button className="enroads-graph-menu">⋮</button>
            </div>
            <div className="enroads-graph-content">
              <canvas
                ref={deathsCanvasRef}
                className="enroads-graph-canvas"
                width={800}
                height={280}
              ></canvas>
            </div>
          </div>
        </div>
        <div className="enroads-temperature-section">
          <div className="enroads-temperature-display">
            <div className="enroads-temperature-value">+{displayC.toFixed(1)}°C</div>
            <div className="enroads-temperature-value-f">+{displayF.toFixed(1)}°F</div>
            <div className="enroads-temperature-label">
              Temperature<br />Increase by<br />2100
            </div>
          </div>
        </div>
      </div>

      <div className="enroads-slider-section">
        <div className="enroads-slider-container">
          <div className="enroads-slider-header">
            <span className="enroads-slider-icon">▶</span>
            <label htmlFor="carbon-price-slider" className="enroads-slider-label">
              {sliderLabel}
            </label>
            <button className="enroads-slider-menu">⋮</button>
          </div>
          <div className="enroads-slider-controls">
            {sliderValue !== null && (
              <input
                type="range"
                id="carbon-price-slider"
                min={sliderMin}
                max={sliderMax}
                step={sliderStep}
                value={sliderValue}
                onChange={handleSliderChange}
                className="enroads-slider"
              />
            )}
          </div>
          <div className="enroads-slider-status">
            <span>{sliderText}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
