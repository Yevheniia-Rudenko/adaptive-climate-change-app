import { useEffect, useRef, useState, ChangeEvent } from 'react';
import { createAsyncModel, getDefaultConfig, createDefaultOutputs } from '@climateinteractive/en-roads-core';
import enStrings from '@climateinteractive/en-roads-core/strings/en';
import { GraphView } from '@climateinteractive/sim-ui-graph';
import '../styles/enroads-dashboard.css';

export default function SecondExerciseDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [coalSliderValue, setCoalSliderValue] = useState(20);
  const [coalSliderText, setCoalSliderText] = useState('status quo');
  const [oilSliderValue, setOilSliderValue] = useState(20);
  const [oilSliderText, setOilSliderText] = useState('status quo');
  const [gasSliderValue, setGasSliderValue] = useState(20);
  const [gasSliderText, setGasSliderText] = useState('status quo');
  const [tempC, setTempC] = useState(3.2);
  const [tempF, setTempF] = useState(5.7);
  const [seaLevelRise, setSeaLevelRise] = useState(0.5);
  
  const seaLevelCanvasRef = useRef<HTMLCanvasElement>(null);
  const modelRef = useRef<any>(null);
  const modelContextRef = useRef<any>(null);
  const coalTaxInputRef = useRef<any>(null);
  const oilTaxInputRef = useRef<any>(null);
  const gasTaxInputRef = useRef<any>(null);
  const seaLevelGraphViewRef = useRef<any>(null);
  const coreConfigRef = useRef<any>(null);

  // Helper function to get localized string
  const str = (key: string) => {
    return (enStrings as any)[key] || key;
  };

  // Get slider text based on value - EN-ROADS exact thresholds
  const getSliderText = (value: number, type: 'coal' | 'oil' | 'gas' = 'coal') => {
    if (type === 'coal') {
      // Coal: 100 to -15
      if (value >= 30) return 'very highly taxed';
      if (value >= 15) return 'highly taxed';
      if (value >= 5) return 'taxed';
      if (value >= -5) return 'status quo';
      return 'subsidized';  // -6 to -15
    } else if (type === 'oil') {
      // Oil: 85 to -15
      if (value >= 25) return 'very highly taxed';
      if (value >= 12) return 'highly taxed';
      if (value >= 5) return 'taxed';
      if (value >= -5) return 'status quo';
      return 'subsidized';  // -6 to -15
    } else {
      // Gas: 5 to -0.7
      if (value >= 1.4) return 'very highly taxed';    // 5 to 1.4
      if (value >= 0.7) return 'highly taxed';         // 1.3 to 0.7
      if (value >= 0.2) return 'taxed';                // 0.6 to 0.2
      if (value >= -0.2) return 'status quo';          // 0.1 to -0.2
      return 'subsidized';                             // -0.3 to -0.7
    }
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
      
      // For sea level rise graph, show sea level datasets
      if (datasetSpec.varId === '_slr_from_2000_in_meters') {
        datasetViewModel.visible = true;
        console.log('Sea level dataset visible, points:', newPoints.length);
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

  // Update sea level rise display
  const updateSeaLevelDisplay = () => {
    if (!modelContextRef.current) return;

    const seaLevelSeries = modelContextRef.current.getSeriesForVar('_slr_from_2000_in_meters');
    
    if (seaLevelSeries && seaLevelSeries.points && seaLevelSeries.points.length > 0) {
      const seaLevel = seaLevelSeries.getValueAtTime(2100);
      console.log('Sea level updated:', seaLevel.toFixed(3), 'm');
      setSeaLevelRise(seaLevel);
    }
  };

  // Update all graphs
  const updateAllGraphs = () => {
    console.log('updateAllGraphs called');
    if (seaLevelGraphViewRef.current) {
      console.log('Updating sea level graph');
      updateGraphData(seaLevelGraphViewRef.current);
    } else {
      console.warn('Sea level graph ref is null');
    }
    updateTemperatureDisplay();
    updateSeaLevelDisplay();
  };

  // Initialize sea level rise graph
  const initSeaLevelGraph = () => {
    if (!seaLevelCanvasRef.current || !coreConfigRef.current) return;

    const graphSpec = coreConfigRef.current.graphs.get('90');
    if (!graphSpec) {
      console.error('Sea level rise graph not found');
      return;
    }

    const canvas = seaLevelCanvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    
    canvas.style.width = rect.width + 'px';
    canvas.style.height = '280px';
    canvas.width = rect.width * dpr;
    canvas.height = 280 * dpr;

    const viewModel = createGraphViewModel(graphSpec);
    
    const datasets = viewModel.getDatasets();
    datasets.forEach((dataset: any) => {
      if (dataset.spec.varId === '_slr_from_2000_in_meters') {
        if (!dataset.spec.externalSourceName) {
          dataset.spec.color = '#3B82F6';
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
    
    seaLevelGraphViewRef.current = new GraphView(
      canvas,
      viewModel,
      options,
      true
    );
    
    updateGraphData(seaLevelGraphViewRef.current);
  };

  // Handle coal tax slider change
  const handleCoalTaxSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const sliderPos = parseFloat(e.target.value);
    // Convert slider position (0-70) to tax value (100 to -15 $/ton) - EN-ROADS range
    const value = 100 - (sliderPos / 70) * 115;
    
    setCoalSliderValue(sliderPos);
    setCoalSliderText(getSliderText(value, 'coal'));
    
    if (coalTaxInputRef.current) {
      coalTaxInputRef.current.set(value);
    }
  };

  // Handle oil tax slider change
  const handleOilTaxSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const sliderPos = parseFloat(e.target.value);
    // Convert slider position (0-70) to tax value (85 to -15 $/barrel) - EN-ROADS range
    const value = 85 - (sliderPos / 70) * 100;
    
    setOilSliderValue(sliderPos);
    setOilSliderText(getSliderText(value, 'oil'));
    
    if (oilTaxInputRef.current) {
      oilTaxInputRef.current.set(value);
    }
  };

  // Handle gas tax slider change
  const handleGasTaxSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    const sliderPos = parseFloat(e.target.value);
    // Convert slider position (0-70) to tax value (5 to -0.7 $/MCF) - EN-ROADS range
    const value = 5 - (sliderPos / 70) * 5.7;
    
    setGasSliderValue(sliderPos);
    setGasSliderText(getSliderText(value, 'gas'));
    
    if (gasTaxInputRef.current) {
      gasTaxInputRef.current.set(value);
    }
  };

  // Initialize the application
  useEffect(() => {
    const initApp = async () => {
      try {
        console.log('Loading En-ROADS model for 2nd exercise...');
        setIsLoading(true);

        // Load the core configuration
        coreConfigRef.current = getDefaultConfig();

        // Initialize the En-ROADS model
        modelRef.current = await createAsyncModel();
        modelContextRef.current = modelRef.current.addContext();
        
        // Create outputs object
        createDefaultOutputs();

        // Get coal tax input (optional - won't break if not found)
        coalTaxInputRef.current = modelContextRef.current.getInputForId('1');
        if (!coalTaxInputRef.current) {
          console.log('Coal tax input not found with ID "1", trying numeric ID 1');
          coalTaxInputRef.current = modelContextRef.current.getInputForId(1);
        }
        if (coalTaxInputRef.current) {
          console.log('✓ Coal tax input loaded successfully');
          console.log('Coal tax input object:', coalTaxInputRef.current);
          console.log('Coal tax current value:', coalTaxInputRef.current.get());
          console.log('Coal tax min/max:', coalTaxInputRef.current.min, coalTaxInputRef.current.max);
        } else {
          console.warn('✗ Coal tax input not available in this EN-ROADS version');
        }

        // Get oil tax input (optional - won't break if not found)
        oilTaxInputRef.current = modelContextRef.current.getInputForId('7');
        if (!oilTaxInputRef.current) {
          console.log('Oil tax input not found with ID "7", trying numeric ID 7');
          oilTaxInputRef.current = modelContextRef.current.getInputForId(7);
        }
        if (oilTaxInputRef.current) {
          console.log('✓ Oil tax input loaded successfully');
        } else {
          console.warn('✗ Oil tax input not available in this EN-ROADS version');
        }

        // Get gas tax input (optional - won't break if not found)
        gasTaxInputRef.current = modelContextRef.current.getInputForId('10');
        if (!gasTaxInputRef.current) {
          console.log('Gas tax input not found with ID "10", trying numeric ID 10');
          gasTaxInputRef.current = modelContextRef.current.getInputForId(10);
        }
        if (gasTaxInputRef.current) {
          console.log('✓ Gas tax input loaded successfully');
        } else {
          console.warn('✗ Gas tax input not available in this EN-ROADS version');
        }

        if (coalTaxInputRef.current) {
          coalTaxInputRef.current.set(0); // 0 $/ton = status quo
          const coalSliderPos = ((100 - 0) / 115) * 70;
          setCoalSliderValue(coalSliderPos);
          setCoalSliderText(getSliderText(0, 'coal'));
          console.log('Coal tax set to status quo: 0 $/ton');
        }
        if (oilTaxInputRef.current) {
          oilTaxInputRef.current.set(0); // 0 $/barrel = status quo
          const oilSliderPos = ((85 - 0) / 100) * 70; // Use correct oil range
          setOilSliderValue(oilSliderPos);
          setOilSliderText(getSliderText(0, 'oil'));
          console.log('Oil tax set to baseline: 0 $/barrel');
        }
        if (gasTaxInputRef.current) {
          gasTaxInputRef.current.set(0); // 0 $/MCF = status quo
          const gasSliderPos = ((5 - 0) / 5.7) * 70; // Use correct formula
          setGasSliderValue(gasSliderPos);
          setGasSliderText(getSliderText(0, 'gas'));
          console.log('Gas tax set to baseline: 0 $/MCF');
        }

        // Initialize graph with a small delay to ensure DOM is ready
        setTimeout(() => {
          initSeaLevelGraph();
          updateTemperatureDisplay();
          updateSeaLevelDisplay();
        }, 100);

        // Set up output change handler
        modelContextRef.current.onOutputsChanged = () => {
          console.log('Model outputs changed, updating graphs...');
          updateAllGraphs();
        };

        console.log('2nd Exercise Dashboard initialized successfully');
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
      if (seaLevelGraphViewRef.current) {
        seaLevelGraphViewRef.current = null;
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
      {/* Tax Dashboard - Sea Level Rise */}
      <div className="enroads-dashboard">
        {/* Sea Level Rise Graph */}
        <div className="enroads-graph-section">
          <div className="enroads-graph-container">
            <div className="enroads-graph-header">
              <span className="enroads-graph-icon">▶</span>
              <h3 className="enroads-graph-title">Sea Level Rise</h3>
              <button className="enroads-graph-menu">⋮</button>
            </div>
            <div className="enroads-graph-content">
              <canvas 
                ref={seaLevelCanvasRef} 
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
                  <div className="enroads-legend-color" style={{ background: '#3B82F6', height: '6px' }}></div>
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

      {/* Tax Sliders Section */}
      <div className="enroads-slider-section" style={{ marginBottom: '260px', paddingBottom: '150px' }}>
        <div className="enroads-slider-container">
          <div className="enroads-slider-header">
            <span className="enroads-slider-icon">▶</span>
            <label htmlFor="coal-tax-slider" className="enroads-slider-label">
              Tax on Coal
            </label>
            <button className="enroads-slider-menu">⋮</button>
          </div>
          <div className="enroads-slider-controls">
            <input
              type="range"
              id="coal-tax-slider"
              min="0"
              max="70"
              step="1"
              value={coalSliderValue}
              onChange={handleCoalTaxSliderChange}
              className="enroads-slider"
            />
          </div>
          <div className="enroads-slider-status">
            <span>{coalSliderText}</span>
          </div>
        </div>

        <div className="enroads-slider-container">
          <div className="enroads-slider-header">
            <span className="enroads-slider-icon">▶</span>
            <label htmlFor="oil-tax-slider" className="enroads-slider-label">
              Tax on Oil
            </label>
            <button className="enroads-slider-menu">⋮</button>
          </div>
          <div className="enroads-slider-controls">
            <input
              type="range"
              id="oil-tax-slider"
              min="0"
              max="70"
              step="1"
              value={oilSliderValue}
              onChange={handleOilTaxSliderChange}
              className="enroads-slider"
            />
          </div>
          <div className="enroads-slider-status">
            <span>{oilSliderText}</span>
          </div>
        </div>

        <div className="enroads-slider-container">
          <div className="enroads-slider-header">
            <span className="enroads-slider-icon">▶</span>
            <label htmlFor="gas-tax-slider" className="enroads-slider-label">
              Tax on Gas
            </label>
            <button className="enroads-slider-menu">⋮</button>
          </div>
          <div className="enroads-slider-controls">
            <input
              type="range"
              id="gas-tax-slider"
              min="0"
              max="70"
              step="1"
              value={gasSliderValue}
              onChange={handleGasTaxSliderChange}
              className="enroads-slider"
            />
          </div>
          <div className="enroads-slider-status">
            <span>{gasSliderText}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
