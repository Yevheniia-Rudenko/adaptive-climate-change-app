import { useEffect, useRef, useState, ChangeEvent } from 'react';
import { createAsyncModel, getDefaultConfig, createDefaultOutputs } from '@climateinteractive/en-roads-core';
import enStrings from '@climateinteractive/en-roads-core/strings/en';
import deStrings from '@climateinteractive/en-roads-core/strings/de';
import esStrings from '@climateinteractive/en-roads-core/strings/es';
import { GraphView } from '@climateinteractive/sim-ui-graph';
import { useLanguage } from '../contexts/LanguageContext';
import '../styles/enroads-dashboard.css';

// ── Only 2 data graphs — temperature is displayed as a live number card ───────
const GRAPHS = [
  { id: '62',  label: 'CO2 Emissions',     canvasId: 'fft-graph-co2'       },
  { id: '90',  label: 'Sea Level Rise',    canvasId: 'fft-graph-sea-level'  },
];

// ── En-ROADS status quo defaults (model's built-in baseline values) ────────────────
const SQ_COAL = -30;  // Coal price adj:  -30% (En-ROADS default)
const SQ_OIL  =  15;  // Oil  price adj:  +15% (tax 35 − subsidy 20, En-ROADS default)
const SQ_GAS  = -30;  // Gas  price adj:  -30% (En-ROADS default)

// ── Label helpers ─────────────────────────────────────────────────────────────
// Coal & Gas  →  200→100 Highly Discouraged | 99→1 Discouraged |
//                0→-25 Less Encouraged | -26→-35 Status Quo | -36→-50 More Encouraged
const getCoalGasLabel = (v: number): string => {
  if (v >= 100) return 'Highly Discouraged';
  if (v >= 1)   return 'Discouraged';
  if (v >= -25) return 'Less Encouraged';
  if (v >= -35) return 'Status Quo';
  return         'More Encouraged';
};

// Oil  →  200→100 Highly Discouraged | 99→20 Discouraged | 19→0 Status Quo |
//         -1→-25 Encouraged | -26→-50 Highly Encouraged
const getOilLabel = (v: number): string => {
  if (v >= 100) return 'Highly Discouraged';
  if (v >= 20)  return 'Discouraged';
  if (v >= 0)   return 'Status Quo';
  if (v >= -25) return 'Encouraged';
  return         'Highly Encouraged';
};

// Slider range: min=-50 (right/encouraged) … max=200 (left/discouraged)
// Rendered with transform:scaleX(-1) → visual LEFT = discouraged, RIGHT = encouraged
const sliderPct = (v: number) => ((v + 50) / 250) * 100;

const rangeGrad = (v: number, def: number) => {
  const track = '#e5e7eb';
  const a = Math.min(sliderPct(v), sliderPct(def));
  const b = Math.max(sliderPct(v), sliderPct(def));
  return `linear-gradient(to right, ${track} 0%, ${track} ${a}%, #53B1E8 ${a}%, #53B1E8 ${b}%, ${track} ${b}%, ${track} 100%)`;
};

export default function Module1FossilFuelTaxesDashboard() {
  const { language } = useLanguage();
  const ui = {
    en: {
      title: 'En-ROADS Dashboard: Fossil Fuel Taxes',
      openFullscreen: 'Open Full Screen',
      closeFullscreen: 'Close Full Screen',
      temperatureTitle: 'Temperature\nIncrease by\n2100',
      co2NetEmissions: 'CO2 Net Emissions',
      seaLevelRise: 'Sea Level Rise',
      baseline: 'BASELINE',
      currentScenario: 'CURRENT SCENARIO',
      taxOnCoal: 'Tax on Coal',
      taxOnOil: 'Tax on Oil',
      taxOnGas: 'Tax on Gas',
      highlyDiscouraged: 'Highly Discouraged',
      discouraged: 'Discouraged',
      lessEncouraged: 'Less Encouraged',
      statusQuo: 'Status Quo',
      moreEncouraged: 'More Encouraged',
      encouraged: 'Encouraged',
      highlyEncouraged: 'Highly Encouraged',
    },
    de: {
      title: 'En-ROADS Dashboard: Steuern auf fossile Brennstoffe',
      openFullscreen: 'Vollbild öffnen',
      closeFullscreen: 'Vollbild schließen',
      temperatureTitle: 'Temperatur-\nanstieg bis\n2100',
      co2NetEmissions: 'CO2-Nettoemissionen',
      seaLevelRise: 'Meeresspiegelanstieg',
      baseline: 'BASISLINIE',
      currentScenario: 'AKTUELLES SZENARIO',
      taxOnCoal: 'Steuer auf Kohle',
      taxOnOil: 'Steuer auf Öl',
      taxOnGas: 'Steuer auf Gas',
      highlyDiscouraged: 'Stark gebremst',
      discouraged: 'Gebremst',
      lessEncouraged: 'Weniger gefördert',
      statusQuo: 'Status Quo',
      moreEncouraged: 'Mehr gefördert',
      encouraged: 'Gefördert',
      highlyEncouraged: 'Stark gefördert',
    },
    es: {
      title: 'En-ROADS Dashboard: Impuestos a combustibles fósiles',
      openFullscreen: 'Abrir pantalla completa',
      closeFullscreen: 'Cerrar pantalla completa',
      temperatureTitle: 'Aumento de\ntemperatura\npara 2100',
      co2NetEmissions: 'Emisiones netas de CO2',
      seaLevelRise: 'Aumento del nivel del mar',
      baseline: 'LÍNEA DE BASE',
      currentScenario: 'ESCENARIO ACTUAL',
      taxOnCoal: 'Impuesto al carbón',
      taxOnOil: 'Impuesto al petróleo',
      taxOnGas: 'Impuesto al gas',
      highlyDiscouraged: 'Muy desincentivado',
      discouraged: 'Desincentivado',
      lessEncouraged: 'Menos incentivado',
      statusQuo: 'Status Quo',
      moreEncouraged: 'Más incentivado',
      encouraged: 'Incentivado',
      highlyEncouraged: 'Muy incentivado',
    },
    tr: {
      title: 'En-ROADS Gösterge Paneli: Fosil Yakıt Vergileri',
      openFullscreen: 'Tam ekran aç',
      closeFullscreen: 'Tam ekranı kapat',
      temperatureTitle: '2100 yılına kadar\nSıcaklık\nArtışı',
      co2NetEmissions: 'CO2 net emisyonları',
      seaLevelRise: 'Deniz seviyesi yükselmesi',
      baseline: 'TEMEL SENARYO',
      currentScenario: 'MEVCUT SENARYO',
      taxOnCoal: 'Kömür vergisi',
      taxOnOil: 'Petrol vergisi',
      taxOnGas: 'Gaz vergisi',
      highlyDiscouraged: 'Çok caydırılmış',
      discouraged: 'Caydırılmış',
      lessEncouraged: 'Daha az teşvik',
      statusQuo: 'Mevcut durum',
      moreEncouraged: 'Daha çok teşvik',
      encouraged: 'Teşvik edilmiş',
      highlyEncouraged: 'Çok teşvik edilmiş',
    },
  }[language] ?? {
    title: 'En-ROADS Dashboard: Fossil Fuel Taxes',
    openFullscreen: 'Open Full Screen',
    closeFullscreen: 'Close Full Screen',
    temperatureTitle: 'Temperature\nIncrease by\n2100',
    co2NetEmissions: 'CO2 Net Emissions',
    seaLevelRise: 'Sea Level Rise',
    baseline: 'BASELINE',
    currentScenario: 'CURRENT SCENARIO',
    taxOnCoal: 'Tax on Coal',
    taxOnOil: 'Tax on Oil',
    taxOnGas: 'Tax on Gas',
    highlyDiscouraged: 'Highly Discouraged',
    discouraged: 'Discouraged',
    lessEncouraged: 'Less Encouraged',
    statusQuo: 'Status Quo',
    moreEncouraged: 'More Encouraged',
    encouraged: 'Encouraged',
    highlyEncouraged: 'Highly Encouraged',
  };

  const getCoalGasLabelLocalized = (v: number): string => {
    if (v >= 100) return ui.highlyDiscouraged;
    if (v >= 1)   return ui.discouraged;
    if (v >= -25) return ui.lessEncouraged;
    if (v >= -35) return ui.statusQuo;
    return         ui.moreEncouraged;
  };

  const getOilLabelLocalized = (v: number): string => {
    if (v >= 100) return ui.highlyDiscouraged;
    if (v >= 20)  return ui.discouraged;
    if (v >= 0)   return ui.statusQuo;
    if (v >= -25) return ui.encouraged;
    return         ui.highlyEncouraged;
  };

  const [isLoading,  setIsLoading]  = useState(true);
  const [error,      setError]      = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  // ── Slider state — default 0 = En-ROADS model baseline (no additional policy) ──
  const [coalVal,  setCoalVal]  = useState(SQ_COAL);
  const [oilVal,   setOilVal]   = useState(SQ_OIL);
  const [gasVal,   setGasVal]   = useState(SQ_GAS);
  const [coalText, setCoalText] = useState(getCoalGasLabelLocalized(SQ_COAL));
  const [oilText,  setOilText]  = useState(getOilLabelLocalized(SQ_OIL));
  const [gasText,  setGasText]  = useState(getCoalGasLabelLocalized(SQ_GAS));

  // ── Temperature — DOM refs to avoid re-renders that remount canvases ──────
  const tempCRef = useRef<HTMLElement | null>(null);
  const tempFRef = useRef<HTMLElement | null>(null);
  // expanded view duplicate refs
  const tempCRef2 = useRef<HTMLElement | null>(null);
  const tempFRef2 = useRef<HTMLElement | null>(null);

  const modelRef        = useRef<any>(null);
  const modelContextRef = useRef<any>(null);
  const graphViewRefs   = useRef<Record<string, any>>({});
  const coreConfigRef   = useRef<any>(null);
  const coalInputRef    = useRef<any>(null);
  const oilInputRef     = useRef<any>(null);
  const gasInputRef     = useRef<any>(null);

  const getEnRoadsStrings = () => {
    switch (language) {
      case 'de': return deStrings;
      case 'es': return esStrings;
      default: return enStrings;
    }
  };
  const str = (key: string) => (getEnRoadsStrings() as any)[key] || key;

  // ── Safe 2-dataset graph spec ─────────────────────────────────────────────
  const getSafeSpec = (graphId: string) => {
    const raw = coreConfigRef.current?.graphs?.get(graphId);
    if (!raw) return null;
    const baseline = raw.datasets?.find(
      (d: any) => d.externalSourceName === 'Ref' || d.externalSourceName === 'baseline'
    );
    const current = raw.datasets?.find((d: any) => !d.externalSourceName);
    if (baseline && current) {
      return {
        ...raw,
        datasets: [
          { ...baseline, label: 'Baseline', color: '#000000', lineStyle: baseline.lineStyle || 'thinline' },
          { ...current,  label: 'Current',  color: '#53B1E8', lineStyle: current.lineStyle  || 'line'     },
        ],
      };
    }
    const gDef = GRAPHS.find(g => g.id === graphId);
    if (!gDef) return null;
    return {
      ...raw,
      datasets: [
        { varId: gDef.id, externalSourceName: 'Ref', label: 'Baseline', color: '#000000', lineStyle: 'thinline' },
        { varId: gDef.id,                            label: 'Current',  color: '#53B1E8', lineStyle: 'line'     },
      ],
    };
  };

  const createGraphViewModel = (graphSpec: any) => {
    const dsVMs = (graphSpec.datasets || []).map((ds: any) => ({
      spec: ds, visible: true, points: [],
    }));
    return {
      spec: graphSpec,
      getDatasets: () => dsVMs,
      getStringForKey: (key: string) => str(key),
      formatYAxisTickValue:    (v: number) => v.toFixed(1),
      formatYAxisTooltipValue: (v: number) => v.toFixed(2),
    };
  };

  const updateGraphData = (graphView: any) => {
    try {
      if (!graphView || !modelContextRef.current) return;
      for (const dsVM of graphView.viewModel.getDatasets()) {
        const ds = dsVM.spec;
        let series = modelContextRef.current.getSeriesForVar(ds.varId, ds.externalSourceName);
        if (!series?.points?.length && ds.externalSourceName === 'baseline')
          series = modelContextRef.current.getSeriesForVar(ds.varId, 'Ref');
        else if (!series?.points?.length && ds.externalSourceName === 'Ref')
          series = modelContextRef.current.getSeriesForVar(ds.varId, 'baseline');
        const pts = series?.points || [];
        dsVM.points = [...pts];
        if (pts.length <= 2) { dsVM.visible = false; continue; }
        dsVM.visible = true;
        if (!ds.externalSourceName) { if (!ds.color) ds.color = '#53B1E8'; ds.lineWidth = 4; }
        else                        { if (!ds.color) ds.color = '#000000'; ds.lineWidth = 4; }
      }
      graphView.updateData(false);
    } catch (e) { console.error(e); }
  };

  const updateTemperatureDisplay = () => {
    if (!modelContextRef.current) return;
    let s = modelContextRef.current.getSeriesForVar('_temperature_change_from_1850');
    if (!s?.points?.length)
      s = modelContextRef.current.getSeriesForVar('_temperature_relative_to_1850_1900');
    if (s?.points?.length) {
      const c = s.getValueAtTime(2100);
      const f = c * 9 / 5;
      const cStr = `+${c.toFixed(1)}°C`;
      const fStr = `+${f.toFixed(1)}°F`;
      if (tempCRef.current)  tempCRef.current.textContent  = cStr;
      if (tempFRef.current)  tempFRef.current.textContent  = fStr;
      if (tempCRef2.current) tempCRef2.current.textContent = cStr;
      if (tempFRef2.current) tempFRef2.current.textContent = fStr;
    }
  };

  const updateDashboard = () => {
    for (const key of Object.keys(graphViewRefs.current))
      if (graphViewRefs.current[key]) updateGraphData(graphViewRefs.current[key]);
    updateTemperatureDisplay();
  };

  const loadGraph = (canvasId: string, graphId: string) => {
    const graphSpec = getSafeSpec(graphId);
    if (!graphSpec) return;
    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const dpr  = window.devicePixelRatio || 1;
    const w    = rect.width || 640;
    // Responsive height: taller when narrow (mobile, single-col), shorter when wide (tablet 2-col)
    const height = Math.max(200, Math.min(300, Math.round(w * 0.55)));
    canvas.width  = Math.floor(w * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width  = '100%';
    canvas.style.height = `${height}px`;
    canvas.style.pointerEvents = 'none';
    try {
      const isDark = document.documentElement.classList.contains('dark');
      const style = {
        font: { family: 'system-ui,-apple-system,sans-serif', style: 'normal',
                color: isDark ? '#e2e8f0' : '#1f2937', size: 13 },
        xAxis: { tickMaxCount: 6 },
        yAxis: { tickMaxCount: 6 },
        getAxisLabelFontSize: () => 14,
        getTickLabelFontSize: () => 12,
        getDefaultLineWidth:  () => 4,
        plotBackgroundColor: isDark ? '#1e293b' : '#ffffff',
      };
      const gv = new GraphView(canvas, createGraphViewModel(graphSpec), { style, responsive: true, animations: false }, true);
      graphViewRefs.current[canvasId] = gv;
      updateGraphData(gv);
    } catch (e) { console.error('loadGraph error', canvasId, e); }
  };

  const handleSliderChange = (type: 'coal' | 'oil' | 'gas', e: ChangeEvent<HTMLInputElement>) => {
    const v = parseFloat(e.target.value);
    if (type === 'coal') {
      setCoalVal(v); setCoalText(getCoalGasLabelLocalized(v));
      if (coalInputRef.current) coalInputRef.current.set(v - SQ_COAL);
    } else if (type === 'oil') {
      setOilVal(v);  setOilText(getOilLabelLocalized(v));
      if (oilInputRef.current)  oilInputRef.current.set(v - SQ_OIL);
    } else {
      setGasVal(v);  setGasText(getCoalGasLabelLocalized(v));
      if (gasInputRef.current)  gasInputRef.current.set(v - SQ_GAS);
    }
    setTimeout(() => updateDashboard(), 50);
  };

  useEffect(() => {
    const init = async () => {
      try {
        setIsLoading(true);
        coreConfigRef.current   = getDefaultConfig();
        modelRef.current        = await createAsyncModel();
        modelContextRef.current = modelRef.current.addContext();
        createDefaultOutputs();
        coalInputRef.current = modelContextRef.current.getInputForId('1');
        oilInputRef.current  = modelContextRef.current.getInputForId('7');
        gasInputRef.current  = modelContextRef.current.getInputForId('10');
        // Do NOT call set() — let model use its built-in baseline so current = baseline at startup.
        modelContextRef.current.onOutputsChanged = () => updateDashboard();
        setTimeout(() => {
          for (const g of GRAPHS) loadGraph(g.canvasId, g.id);
          setTimeout(() => updateDashboard(), 50);
        }, 150);
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        setError(language === 'de' ? 'En-ROADS-Modell konnte nicht geladen werden.' : language === 'es' ? 'Error al cargar el modelo En-ROADS.' : 'Failed to load En-ROADS model.');
        setIsLoading(false);
      }
    };
    if (!modelRef.current) init();
    return () => {
      // Reset on unmount so HMR always gets a clean model init
      modelRef.current = null;
      modelContextRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (isLoading || !coreConfigRef.current) return;
    const prev = document.body.style.overflow;
    if (isExpanded) {
      document.body.style.overflow = 'hidden';
      document.body.classList.add('module-fullscreen-active');
      document.documentElement.classList.add('module-fullscreen-active');
    }
    const t = window.setTimeout(() => {
      for (const g of GRAPHS) loadGraph(g.canvasId, g.id);
      updateTemperatureDisplay();
    }, 120);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prev;
      document.body.classList.remove('module-fullscreen-active');
      document.documentElement.classList.remove('module-fullscreen-active');
    };
  }, [isExpanded, isLoading]);

  if (isLoading) return <div className="p-8 text-center text-gray-500">{language === 'de' ? 'Modell wird geladen...' : language === 'es' ? 'Cargando modelo...' : 'Loading Model...'}</div>;
  if (error)     return <div className="p-8 text-center text-red-600">{error}</div>;

  const Legend = () => (
    <div className="flex justify-center gap-3 mt-3">
      <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#000000' }}>{ui.baseline}</span>
      <span className="px-3 py-1 text-xs font-bold uppercase text-white rounded" style={{ backgroundColor: '#53B1E8' }}>{ui.currentScenario}</span>
    </div>
  );

  return (
    <div
      className={isExpanded
        ? 'fixed inset-0 bg-white dark:bg-gray-900 p-4 md:p-6 overflow-y-auto font-sora'
        : 'bg-gray-50 dark:bg-gray-900 p-4 rounded-xl border border-gray-200 dark:border-gray-700 font-sora mb-24'}
      style={isExpanded ? { zIndex: 2147483647 } : undefined}
    >
      {/* ── Header ── */}
      {isExpanded ? (
        <div className="relative px-4 pt-4 mb-6">
          <h2 className="text-2xl font-extrabold text-gray-800 dark:text-gray-200 text-center">
            {ui.title}
          </h2>
          <button type="button" onClick={() => setIsExpanded(v => !v)}
            className="absolute right-4 top-4 px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg border hover:opacity-90"
            style={{ backgroundColor: '#53B1E8', borderColor: '#53B1E8', color: '#fff' }}>
            {ui.closeFullscreen}
          </button>
        </div>
      ) : (
        <div className="flex items-start justify-between gap-3 px-4 pt-4 mb-6">
          <h2 className="text-2xl font-extrabold text-gray-800 dark:text-gray-200">
            {ui.title}
          </h2>
          <button type="button" onClick={() => setIsExpanded(v => !v)}
            className="px-3 py-2 text-xs sm:text-sm font-semibold rounded-lg border hover:opacity-90"
            style={{ backgroundColor: '#53B1E8', borderColor: '#53B1E8', color: '#fff' }}>
            {ui.openFullscreen}
          </button>
        </div>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          TRIANGLE LAYOUT
          ▲  Temperature card  — full width, top
          ▼  CO2  |  Sea Level — two columns, bottom
      ════════════════════════════════════════════════════════════════════ */}
      <div className="flex flex-col gap-4 mb-4">

        {/* ── TOP: Temperature card — same style as other dashboards ── */}
        <div className="flex justify-center">
          <div className="bg-white dark:bg-gray-800 px-6 py-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 text-center inline-flex flex-col items-center w-fit mx-auto">
            <span
              ref={el => { tempCRef.current = el; }}
              style={{ color: '#14a9df', fontSize: 'clamp(3rem, 3vw, 3rem)', fontWeight: 800, lineHeight: 1.5 }}
            >+3.3°C</span>
            <div className="mx-auto my-4 h-[2px] w-[72%] bg-black" />
            <span
              ref={el => { tempFRef.current = el; }}
              style={{ color: '#14a9df', fontSize: 'clamp(1.5rem, 1.5vw, 1.5rem)', fontWeight: 800, lineHeight: 1 }}
            >+5.9°F</span>
            <div className="mt-3 whitespace-pre-line leading-tight text-gray-900 dark:text-gray-100" style={{ fontSize: 'clamp(1.5rem, 1.5vw, 1.5rem)', fontWeight: 800 }}>
              {ui.temperatureTitle}
            </div>
          </div>
        </div>

        {/* ── BOTTOM: CO2 | Sea Level (two columns) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* CO2 Net Emissions */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600">
            <h3 className="text-xl font-extrabold text-gray-700 dark:text-gray-200 mb-2">{ui.co2NetEmissions}</h3>
            <div className="relative w-full">
              <canvas id="fft-graph-co2" className="w-full"
                style={{ display: 'block', pointerEvents: 'none' }} />
            </div>
            <Legend />
          </div>

          {/* Sea Level Rise */}
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600">
            <h3 className="text-xl font-extrabold text-gray-700 dark:text-gray-200 mb-2">{ui.seaLevelRise}</h3>
            <div className="relative w-full">
              <canvas id="fft-graph-sea-level" className="w-full"
                style={{ display: 'block', pointerEvents: 'none' }} />
            </div>
            <Legend />
          </div>

        </div>
      </div>

      {/* ── Sliders ── */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-100 dark:border-gray-600 space-y-6">

        {/* Coal */}
        <div className="space-y-2">
          <div className="flex justify-between font-bold text-gray-700 dark:text-gray-200">
            <label>{ui.taxOnCoal}</label>
            <span className="text-xs font-mono text-gray-500">{coalText}</span>
          </div>
          <div className="enroads-range-wrap" style={{ transform: 'scaleX(-1)' }}>
            <div
              className="enroads-range-tick"
              style={{ ['--tick-frac' as any]: String(sliderPct(SQ_COAL) / 100) }}
            />
            <input
              type="range"
              min="-50"
              max="200"
              step="1"
              value={coalVal}
              onChange={e => handleSliderChange('coal', e)}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{ background: rangeGrad(coalVal, SQ_COAL) }}
            />
          </div>
        </div>

        {/* Oil */}
        <div className="space-y-2">
          <div className="flex justify-between font-bold text-gray-700 dark:text-gray-200">
            <label>{ui.taxOnOil}</label>
            <span className="text-xs font-mono text-gray-500">{oilText}</span>
          </div>
          <div className="enroads-range-wrap" style={{ transform: 'scaleX(-1)' }}>
            <div
              className="enroads-range-tick"
              style={{ ['--tick-frac' as any]: String(sliderPct(SQ_OIL) / 100) }}
            />
            <input
              type="range"
              min="-50"
              max="200"
              step="1"
              value={oilVal}
              onChange={e => handleSliderChange('oil', e)}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{ background: rangeGrad(oilVal, SQ_OIL) }}
            />
          </div>
        </div>

        {/* Gas */}
        <div className="space-y-2">
          <div className="flex justify-between font-bold text-gray-700 dark:text-gray-200">
            <label>{ui.taxOnGas}</label>
            <span className="text-xs font-mono text-gray-500">{gasText}</span>
          </div>
          <div className="enroads-range-wrap" style={{ transform: 'scaleX(-1)' }}>
            <div
              className="enroads-range-tick"
              style={{ ['--tick-frac' as any]: String(sliderPct(SQ_GAS) / 100) }}
            />
            <input
              type="range"
              min="-50"
              max="200"
              step="1"
              value={gasVal}
              onChange={e => handleSliderChange('gas', e)}
              className="w-full h-2 rounded-lg appearance-none cursor-pointer"
              style={{ background: rangeGrad(gasVal, SQ_GAS) }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}
