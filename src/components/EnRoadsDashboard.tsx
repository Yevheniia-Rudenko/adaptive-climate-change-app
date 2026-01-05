import { useEffect, useRef, useState, ChangeEvent } from 'react';
import { createAsyncModel, getDefaultConfig, createDefaultOutputs } from '@climateinteractive/en-roads-core';
import enStrings from '@climateinteractive/en-roads-core/strings/en';
import { GraphView } from '@climateinteractive/sim-ui-graph';
import '../styles/enroads-dashboard.css';

export default function EnRoadsDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sliderValue, setSliderValue] = useState(20);
  const [sliderText, setSliderText] = useState('status quo');
  const [tempC, setTempC] = useState(3.2);
  const [tempF, setTempF] = useState(5.7);
  
  const emissionsCanvasRef = useRef<HTMLCanvasElement>(null);
  const temperatureCanvasRef = useRef<HTMLCanvasElement>(null);
  const modelRef = useRef<any>(null);
  const modelContextRef = useRef<any>(null);
  const renewablesInputRef = useRef<any>(null);
  const emissionsGraphViewRef = useRef<any>(null);
  const temperatureGraphViewRef = useRef<any>(null);
  const coreConfigRef = useRef<any>(null);

  // Helper function to get localized string
  const str = (key: string) => {
    return (enStrings as any)[key] || key;
  };

  // Get slider text based on value
  const getSliderText = (value: number) => {
    if (value >= 0.015) return 'taxed';
    if (value > 0.001) return 'lightly taxed';
    if (value >= -0.001) return 'status quo';
    if (value > -0.015) return 'lightly subsidized';
    if (value > -0.035) return 'subsidized';
    return 'highly subsidized';
  };

  // Create graph view model
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

  // Update graph data from model
  const updateGraphData = (graphView: any) => {
    if (!graphView || !modelContextRef.current) return;

    const graphViewModel = graphView.viewModel;
    for (const datasetViewModel of graphViewModel.getDatasets()) {
      const datasetSpec = datasetViewModel.spec;
      const series = modelContextRef.current.getSeriesForVar(
        datasetSpec.varId,
        datasetSpec.externalSourceName
      );
      
      console.log('Updating dataset:', datasetSpec.varId, 'external:', datasetSpec.externalSourceName, 'points:', series?.points?.length);
      
      const newPoints = series?.points || [];
      datasetViewModel.points = [...newPoints];
      
      // For emissions graph, show net emissions
      if (datasetSpec.varId === '_co2_equivalent_net_emissions') {
        datasetViewModel.visible = true;
      } 
      // For temperature graph, show temperature datasets
      else if (datasetSpec.varId === '_temperature_relative_to_1850_1900') {
        datasetViewModel.visible = true;
      }
      // Hide other datasets
      else {
        datasetViewModel.visible = false;
      }
    }
    
    graphView.updateData(true);
  };

  // Update temperature display
  const updateTemperatureDisplay = () => {
    if (!modelContextRef.current) return;

    const tempSeries = modelContextRef.current.getSeriesForVar('_temperature_relative_to_1850_1900');
    
    if (tempSeries && tempSeries.points && tempSeries.points.length > 0) {
      const tempCelsius = tempSeries.getValueAtTime(2100);
      const tempFahrenheit = tempCelsius * 9/5;
      
      console.log('Temperature updated:', tempCelsius.toFixed(2), '°C');
      setTempC(tempCelsius);
      setTempF(tempFahrenheit);
    } else {
      // Fallback: approximate from emissions
      const emissionsSeries = modelContextRef.current.getSeriesForVar('_co2_equivalent_net_emissions');
      if (emissionsSeries) {
        const emissions2100 = emissionsSeries.getValueAtTime(2100);
        const tempCelsius = 1.5 + (emissions2100 / 69.6) * 1.8;
        const tempFahrenheit = tempCelsius * 9/5;
        
        console.log('Temperature updated (from emissions):', tempCelsius.toFixed(2), '°C');
        setTempC(tempCelsius);
        setTempF(tempFahrenheit);
      }
    }
  };

  // Update all graphs
  const updateAllGraphs = () => {
    console.log('updateAllGraphs called');
    if (emissionsGraphViewRef.current) {
      updateGraphData(emissionsGraphViewRef.current);
    }
    if (temperatureGraphViewRef.current) {
      updateGraphData(temperatureGraphViewRef.current);
    }
    updateTemperatureDisplay();
  };

  // Initialize emissions graph
  const initEmissionsGraph = () => {
    if (!emissionsCanvasRef.current || !coreConfigRef.current) return;

    const graphSpec = coreConfigRef.current.graphs.get('62');
    if (!graphSpec) {
      console.error('Emissions graph not found');
      return;
    }

    // Set canvas dimensions explicitly
    const canvas = emissionsCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    // Set display size (CSS pixels)
    canvas.style.width = rect.width + 'px';
    canvas.style.height = '280px';
    
    // Set actual size in memory (scaled for retina)
    canvas.width = rect.width * dpr;
    canvas.height = 280 * dpr;

    const viewModel = createGraphViewModel(graphSpec);
    
    // Override dataset colors and line widths
    const datasets = viewModel.getDatasets();
    datasets.forEach((dataset: any) => {
      if (dataset.spec.varId === '_co2_equivalent_net_emissions') {
        // Current scenario - brighter blue with thicker line
        if (!dataset.spec.externalSourceName) {
          dataset.spec.color = '#66B5EF'; // RGB(102, 181, 239)
          dataset.spec.lineWidth = 6;
        }
        // Baseline - keep black but make thicker
        else if (dataset.spec.externalSourceName === 'baseline') {
          dataset.spec.lineWidth = 6;
        }
      }
    });
    
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
      getDefaultLineWidth: () => 6
    };

    const options = { 
      style,
      responsive: true,
      animations: true
    };
    
    emissionsGraphViewRef.current = new GraphView(
      canvas,
      viewModel,
      options,
      true
    );
    
    updateGraphData(emissionsGraphViewRef.current);
  };

  // Initialize temperature graph
  const initTemperatureGraph = () => {
    if (!temperatureCanvasRef.current || !coreConfigRef.current) return;

    const graphSpec = coreConfigRef.current.graphs.get('86');
    if (!graphSpec) {
      console.error('Temperature graph not found');
      return;
    }

    const canvas = temperatureCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    canvas.style.width = rect.width + 'px';
    canvas.style.height = '280px';
    canvas.width = rect.width * dpr;
    canvas.height = 280 * dpr;

    const viewModel = createGraphViewModel(graphSpec);
    
    const datasets = viewModel.getDatasets();
    datasets.forEach((dataset: any) => {
      if (dataset.spec.varId === '_temperature_relative_to_1850_1900') {
        if (!dataset.spec.externalSourceName) {
          dataset.spec.color = '#EF4444';
          dataset.spec.lineWidth = 6;
        } else if (dataset.spec.externalSourceName === 'baseline') {
          dataset.spec.lineWidth = 6;
        }
      }
    });
    
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
      getDefaultLineWidth: () => 6
    };

    const options = { 
      style,
      responsive: true,
      animations: true
    };
    
    temperatureGraphViewRef.current = new GraphView(
      canvas,
      viewModel,
      options,
      true
    );
    
    updateGraphData(temperatureGraphViewRef.current);
  };

  // Handle slider change
  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const sliderPos = parseFloat(e.target.value);
    const value = 0.02 - (sliderPos / 70) * 0.07;
    
    setSliderValue(sliderPos);
    setSliderText(getSliderText(value));
    
    if (renewablesInputRef.current) {
      renewablesInputRef.current.set(value);
    }
  };

  // Initialize the application
  useEffect(() => {
    const initApp = async () => {
      try {
        console.log('Loading En-ROADS model...');
        setIsLoading(true);

        // Load the core configuration
        coreConfigRef.current = getDefaultConfig();

        // Initialize the En-ROADS model
        modelRef.current = await createAsyncModel();
        modelContextRef.current = modelRef.current.addContext();
        
        // Create outputs object
        createDefaultOutputs();

        // Get renewables input
        renewablesInputRef.current = modelContextRef.current.getInputForId('16');
        
        if (!renewablesInputRef.current) {
          throw new Error('Renewables input not found');
        }

        // Set initial values - use EN-ROADS baseline defaults
        const renewablesInitialValue = 0.02 - (20 / 70) * 0.07;
        renewablesInputRef.current.set(renewablesInitialValue);

        // Initialize graph with a small delay to ensure DOM is ready
        setTimeout(() => {
          initEmissionsGraph();
          initTemperatureGraph();
          updateTemperatureDisplay();
        }, 100);

        // Set up output change handler
        modelContextRef.current.onOutputsChanged = () => {
          console.log('Model outputs changed, updating graphs...');
          updateAllGraphs();
        };

        console.log('Dashboard initialized successfully');
        setIsLoading(false);
      } catch (err) {
        console.error('Failed to initialize dashboard:', err);
        setError('Failed to load the En-ROADS model. Please refresh the page.');
        setIsLoading(false);
      }
    };

    initApp();

    // Cleanup
    return () => {
      if (emissionsGraphViewRef.current) {
        emissionsGraphViewRef.current = null;
      }
      if (temperatureGraphViewRef.current) {
        temperatureGraphViewRef.current = null;
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

  return (
    <div className="enroads-container">
      {/* Renewables Dashboard - Emissions */}
      <div className="enroads-dashboard">
        {/* Graph Section */}
        <div className="enroads-graph-section">
          <div className="enroads-graph-container">
            <div className="enroads-graph-header">
              <span className="enroads-graph-icon">▶</span>
              <h3 className="enroads-graph-title">Greenhouse Gas Net Emissions</h3>
              <button className="enroads-graph-menu">⋮</button>
            </div>
            <div className="enroads-graph-content">
              <canvas 
                ref={emissionsCanvasRef} 
                className="enroads-graph-canvas"
                width={800}
                height={280}
              ></canvas>
              <div className="enroads-graph-legend">
                <div className="enroads-legend-item">
                  <div className="enroads-legend-color" style={{ background: '#000', height: '6px' }}></div>
                  <span>BASELINE</span>
                </div>
                <div className="enroads-legend-item">
                  <div className="enroads-legend-color" style={{ background: '#66B5EF', height: '6px' }}></div>
                  <span>CURRENT SCENARIO</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Temperature Display */}
        <div className="enroads-temperature-section">
          <div className="enroads-temperature-display">
            <div className="enroads-temperature-value">+{tempC.toFixed(1)}°C</div>
            <div className="enroads-temperature-value-f">+{tempF.toFixed(1)}°F</div>
            <div className="enroads-temperature-label">
              Temperature<br />Increase by<br />2100
            </div>
          </div>
        </div>
      </div>

      {/* Renewables Slider Section */}
      <div className="enroads-slider-section">
        <div className="enroads-slider-container">
          <div className="enroads-slider-header">
            <span className="enroads-slider-icon">▶</span>
            <label htmlFor="renewables-slider" className="enroads-slider-label">
              Renewables
            </label>
            <button className="enroads-slider-menu">⋮</button>
          </div>
          <div className="enroads-slider-controls">
            <input
              type="range"
              id="renewables-slider"
              min="0"
              max="70"
              step="1"
              value={sliderValue}
              onChange={handleSliderChange}
              className="enroads-slider"
            />
          </div>
          <div className="enroads-slider-status">
            <span>{sliderText}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
