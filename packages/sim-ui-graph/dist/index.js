var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};

// src/graph-view.ts
import { Chart as Chart3 } from "chart.js";
import ChartAnnotations from "chartjs-plugin-annotation";

// src/impl/view-impl-bar.ts
import Chart from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.Tooltip.positioners.barToday = function(elements) {
  const tooltip = this;
  const datasetIndex = elements[0]._index;
  const annotationId2 = `line${datasetIndex}`;
  const annotationElements = tooltip._chart.annotation.elements;
  const annotationKey = Object.keys(annotationElements).find((elem) => elem.startsWith(annotationId2));
  if (annotationKey) {
    const annotation = tooltip._chart.annotation.elements[annotationKey]._model;
    return {
      x: annotation.right,
      y: annotation.top + (annotation.bottom - annotation.top) * 0.5
    };
  } else {
    return void 0;
  }
};
function barChartJsConfig(viewModel, data, tooltipsEnabled) {
  const spec = viewModel.spec;
  function formatValue(value) {
    return viewModel.formatYAxisTickValue(value);
  }
  return {
    type: "horizontalBar",
    data,
    plugins: [ChartDataLabels],
    options: {
      plugins: {
        datalabels: {
          color: "black",
          align: "end",
          anchor: "end",
          font: {
            // XXX: This is a hack for adjusting the vertical position of the label
            // relative to the center of the bar; it relies on the string having a
            // prepended newline.  Based on the following comment:
            //   https://github.com/chartjs/chartjs-plugin-datalabels/issues/153#issuecomment-724070514
            lineHeight: 0.15
          },
          formatter: (value) => {
            return `
${formatValue(value)}`;
          }
        }
      },
      scales: {
        xAxes: [
          {
            id: "bar-x-0",
            scaleLabel: {
              display: false
            },
            ticks: {
              maxTicksLimit: 2,
              display: false,
              beginAtZero: true
            },
            gridLines: {
              display: false
            }
          }
        ],
        yAxes: [
          {
            id: "bar-y-0",
            scaleLabel: {
              display: false
            },
            ticks: {
              display: true
            },
            gridLines: {
              display: false
            }
          }
        ]
      },
      tooltips: {
        enabled: tooltipsEnabled,
        position: "barToday",
        titleMarginBottom: 0,
        callbacks: {
          title: function(tooltipItems) {
            const options = this._chart.options;
            if (tooltipItems.length > 0) {
              const datasetIndex = tooltipItems[0].index;
              const todayValue = options.annotation.annotations[datasetIndex].xMin;
              const todayLabelKey = spec.legendItems[0].labelKey;
              const todayLabel = viewModel.getStringForKey(todayLabelKey);
              return `${todayLabel}: ${formatValue(todayValue)}`;
            } else {
              return "";
            }
          },
          label: () => {
            return "";
          }
        }
      }
    }
  };
}
function createBarChartJsData(spec) {
  const itemCount = spec.legendItems.length;
  const baselineColor = spec.legendItems[itemCount - 2].color;
  const currentColor = spec.legendItems[itemCount - 1].color;
  const minBarLength = 2;
  return {
    datasets: [
      {
        backgroundColor: baselineColor,
        hoverBackgroundColor: baselineColor,
        minBarLength
      },
      {
        backgroundColor: currentColor,
        hoverBackgroundColor: currentColor,
        minBarLength
      }
    ]
  };
}
function updateBarChartJsData(viewModel, chartData, options) {
  var _a;
  function getValueAtTime(points, year) {
    let point;
    for (let i = points.length - 1; i >= 0; i--) {
      if (points[i].x === year) {
        point = points[i];
        break;
      }
    }
    return Math.abs((point == null ? void 0 : point.y) || 0);
  }
  function rgba(hexColor, alpha) {
    if (alpha === 1) {
      return hexColor;
    }
    const r = parseInt(hexColor.substring(1, 3), 16);
    const g = parseInt(hexColor.substring(3, 5), 16);
    const b = parseInt(hexColor.substring(5, 7), 16);
    return `rgba(${r},${g},${b},${alpha})`;
  }
  const datasetViewModels = viewModel.getDatasets();
  const datasetCount = datasetViewModels.length;
  const groupCount = datasetCount / 2;
  const currentYear2 = (/* @__PURE__ */ new Date()).getFullYear();
  const todayValues = [];
  const baseline2100Values = [];
  const current2100Values = [];
  for (let datasetIndex = 0; datasetIndex < datasetCount; datasetIndex++) {
    const datasetViewModel = datasetViewModels[datasetIndex];
    const datasetSpec = datasetViewModel.spec;
    const datasetPoints = datasetViewModel.points;
    if (datasetSpec.externalSourceName === "Ref") {
      todayValues.push(getValueAtTime(datasetPoints, currentYear2));
      baseline2100Values.push(getValueAtTime(datasetPoints, 2100));
    } else {
      current2100Values.push(getValueAtTime(datasetPoints, 2100));
    }
  }
  chartData.datasets[0].data = baseline2100Values;
  chartData.datasets[1].data = current2100Values;
  const highlightedDatasetSpec = (_a = viewModel.getHighlightedDataset) == null ? void 0 : _a.call(viewModel);
  const highlightActive = highlightedDatasetSpec !== void 0;
  const legendItems = viewModel.spec.legendItems;
  const itemCount = legendItems.length;
  const baselineColor = legendItems[itemCount - 2].color;
  const currentColor = legendItems[itemCount - 1].color;
  for (let i = 0; i <= 1; i++) {
    const chartDataset = chartData.datasets[i];
    const datasetColor = i === 1 ? currentColor : baselineColor;
    if (highlightActive) {
      const highlighted = i === 0 && highlightedDatasetSpec.externalSourceName === "Ref" || i === 1 && highlightedDatasetSpec.externalSourceName === void 0;
      const alpha = highlighted ? 1 : 0.1;
      chartDataset.backgroundColor = rgba(datasetColor, alpha);
    } else {
      chartDataset.backgroundColor = datasetColor;
    }
  }
  const max = (values) => {
    let maxValue2 = 0;
    for (const v of values) {
      if (v > maxValue2) {
        maxValue2 = v;
      }
    }
    return maxValue2;
  };
  const maxBaselineValue = max(baseline2100Values);
  const maxCurrentValue = max(current2100Values);
  let maxValue;
  if (maxCurrentValue > maxBaselineValue) {
    if (maxCurrentValue > maxBaselineValue * 1.1) {
      maxValue = maxCurrentValue;
    } else {
      maxValue = maxBaselineValue;
    }
  } else {
    maxValue = maxBaselineValue;
  }
  options.scales.xAxes[0].ticks.max = maxValue * 1.3;
  const showTodayLine = viewModel.spec.legendItems.length === 3;
  if (showTodayLine) {
    options.annotation = {
      annotations: []
    };
    const thickness = options.scales.xAxes[0].ticks.max * 5e-3;
    const todayColor = viewModel.spec.legendItems[0].color;
    for (let groupIndex = 0; groupIndex < groupCount; groupIndex++) {
      const current2100Value = current2100Values[groupIndex];
      const todayValue = todayValues[groupIndex];
      const full = current2100Value >= todayValue;
      options.annotation.annotations.push(line(groupIndex, todayValue, thickness, todayColor, full));
    }
  }
}
var annotationId = 1;
function line(index, x, thickness, color, full) {
  const extent = 0.45;
  const yMin = index - extent;
  const yMax = full ? index + extent : index + 0.05;
  return {
    type: "box",
    id: `line${index}-${annotationId++}`,
    drawTime: "afterDatasetsDraw",
    xScaleID: "bar-x-0",
    yScaleID: "bar-y-0",
    xMin: x,
    xMax: x + thickness,
    yMin,
    yMax,
    backgroundColor: color,
    borderColor: "rgba(0, 0, 0, 0)",
    borderWidth: 0.01
  };
}

// src/impl/view-impl-line.ts
import { Chart as Chart2 } from "chart.js";
var TRANSPARENT = "rgba(0, 0, 0, 0)";
var currentYear = (/* @__PURE__ */ new Date()).getFullYear();
function lineChartJsConfig(viewModel, options, data, tooltipsEnabled) {
  const spec = viewModel.spec;
  const style = options.style || {};
  const xStyle = style.xAxis || {};
  const yStyle = style.yAxis || {};
  let xTickCallback;
  if (spec.xMin === 1990 && spec.xMax > 2020 && spec.xMax < 2030) {
    xTickCallback = (value) => {
      return value !== 2020 ? value : "";
    };
  }
  const plugins = [];
  if ((options == null ? void 0 : options.tooltipMode) === "vertical-line") {
    if (Chart2.Tooltip.positioners.custom === void 0) {
      Chart2.Tooltip.positioners.custom = function(elements, eventPosition) {
        if ((elements == null ? void 0 : elements.length) === 0) {
          return { x: 0, y: 0 };
        }
        const chart = elements[0]._chart;
        const chartArea = chart.chartArea;
        const chartW = chartArea.right - chartArea.left;
        const xOffset = eventPosition.x > chartArea.left + chartW * 0.2 ? -50 : 50;
        const x = eventPosition.x + xOffset;
        const y = Math.min(Math.max(eventPosition.y, chartArea.top + 10), chartArea.bottom - 10);
        return {
          x,
          y
        };
      };
    }
    plugins.push({
      afterDraw: (chart) => {
        const tooltip = chart.tooltip;
        if ((tooltip == null ? void 0 : tooltip._active) === void 0 || tooltip._active.length === 0) {
          return;
        }
        const chartArea = chart.chartArea;
        const x = tooltip._eventPosition.x;
        if (x < chartArea.left || x > chartArea.right) {
          return;
        }
        const ctx = chart.ctx;
        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, chartArea.top);
        ctx.lineTo(x, chartArea.bottom);
        ctx.lineWidth = 1;
        ctx.strokeStyle = "rgba(0, 0, 0, 0.2)";
        ctx.stroke();
        ctx.restore();
      }
    });
  }
  const chartConfig = {
    type: "line",
    data,
    options: {
      scales: {
        xAxes: [
          {
            id: "x1",
            type: "linear",
            position: "bottom",
            scaleLabel: {
              display: xStyle.axisLabelVisible !== false && spec.xAxisLabelKey !== void 0,
              padding: {
                top: 0,
                bottom: 5
              }
            },
            ticks: __spreadValues(__spreadValues(__spreadValues({
              display: xStyle.tickLabelsVisible !== false,
              maxRotation: 0,
              min: spec.xMin,
              max: spec.xMax
            }, xStyle.tickMaxCount !== void 0 && {
              maxTicksLimit: xStyle.tickMaxCount
            }), xTickCallback && {
              callback: xTickCallback
            }), options.showCurrentYear && {
              stepSize: 1,
              autoSkip: false,
              callback: (value) => {
                const ticks = [2e3, currentYear, 2050, 2075, 2100];
                return ticks.indexOf(value) >= 0 ? value : void 0;
              }
            }),
            gridLines: {
              display: xStyle.gridLinesVisible !== false,
              // TODO: Add style option
              // drawOnChartArea: false,
              color: xStyle.gridLineColor || "rgba(0, 0, 0, 0.1)",
              drawTicks: xStyle.tickLinesVisible !== false
            }
          }
        ],
        yAxes: [
          {
            afterFit: (scale) => {
              if (yStyle.tickAreaScale !== void 0) {
                scale.width *= yStyle.tickAreaScale;
              }
            },
            scaleLabel: {
              display: yStyle.axisLabelVisible !== false && spec.yAxisLabelKey !== void 0
            },
            ticks: {
              display: yStyle.tickLabelsVisible !== false,
              maxTicksLimit: yStyle.tickMaxCount,
              beginAtZero: true,
              min: spec.yMin,
              max: spec.yMax,
              suggestedMin: spec.ySoftMin,
              suggestedMax: spec.ySoftMax,
              callback: (value) => {
                return viewModel.formatYAxisTickValue(value);
              }
            },
            gridLines: {
              display: yStyle.gridLinesVisible !== false,
              // TODO: Add style option
              // drawOnChartArea: false,
              color: xStyle.gridLineColor || "rgba(0, 0, 0, 0.1)",
              zeroLineColor: xStyle.gridLineColor || "rgba(0, 0, 0, 0.25)",
              drawTicks: yStyle.tickLinesVisible !== false
            },
            stacked: isStacked(spec)
          }
        ]
      },
      tooltips: __spreadValues({
        enabled: tooltipsEnabled,
        filter: (tooltipItem) => {
          if (spec.xMin !== void 0 && spec.xMax !== void 0) {
            const x = tooltipItem.xLabel;
            return x >= spec.xMin && x <= spec.xMax;
          } else {
            return true;
          }
        },
        callbacks: {
          label: (tooltipItem) => {
            return viewModel.formatYAxisTooltipValue(tooltipItem.yLabel);
          }
        }
      }, options.tooltipMode === "vertical-line" && {
        intersect: false,
        mode: "index",
        position: "custom",
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        yAlign: "right"
      })
    },
    plugins
  };
  if (options.showCurrentYear) {
    chartConfig.options.scales.xAxes.push({
      id: "x2",
      type: "linear",
      position: "bottom",
      scaleLabel: {
        display: false
      },
      ticks: {
        display: false,
        maxRotation: 0,
        min: spec.xMin,
        max: spec.xMax,
        stepSize: 1,
        autoSkip: false,
        callback: (value) => {
          return value === currentYear ? value : void 0;
        }
      },
      gridLines: {
        display: xStyle.gridLinesVisible !== false,
        color: "#ddd",
        borderDash: [5, 5],
        drawBorder: false,
        drawTicks: false
      }
    });
  }
  if (isStackedWithRefLine(spec)) {
    chartConfig.options.scales.yAxes.push({
      id: "stacked-ref-line",
      display: false,
      scaleLabel: {
        display: false
      },
      ticks: {
        display: false,
        beginAtZero: true,
        min: spec.yMin,
        max: spec.yMax,
        suggestedMin: spec.ySoftMin,
        suggestedMax: spec.ySoftMax
      },
      stacked: false
    });
  }
  return chartConfig;
}
function createLineChartJsData(viewModel) {
  const graphSpec = viewModel.spec;
  const datasetViewModels = viewModel.getDatasets();
  const datasetCount = datasetViewModels.length;
  const stacked = isStacked(viewModel.spec);
  const chartDatasets = [];
  for (let datasetIndex = 0; datasetIndex < datasetCount; datasetIndex++) {
    const chartDataset = {};
    const datasetViewModel = datasetViewModels[datasetIndex];
    const datasetSpec = datasetViewModel.spec;
    const color = datasetViewModel.color || datasetSpec.color;
    const lineStyle = datasetSpec.lineStyle;
    const lineStyleModifiers = datasetSpec.lineStyleModifiers;
    if (stacked && lineStyle === "area") {
      chartDataset.fill = true;
      chartDataset.borderColor = TRANSPARENT;
      chartDataset.backgroundColor = color;
    } else if (lineStyle === "scatter") {
      chartDataset.type = "scatter";
      chartDataset.fill = false;
      chartDataset.borderColor = TRANSPARENT;
      chartDataset.backgroundColor = color;
    } else {
      chartDataset.backgroundColor = color;
      if ((lineStyleModifiers == null ? void 0 : lineStyleModifiers.indexOf("fill-to-next")) >= 0) {
        chartDataset.fill = "+1";
      } else {
        chartDataset.fill = false;
      }
      if (lineStyle === "none") {
        chartDataset.borderColor = TRANSPARENT;
      } else {
        chartDataset.borderColor = color;
        chartDataset.borderCapStyle = "round";
      }
    }
    if (stacked && lineStyle !== "area") {
      chartDataset.yAxisID = "stacked-ref-line";
      chartDataset.order = -1;
    }
    if ((lineStyleModifiers == null ? void 0 : lineStyleModifiers.indexOf("straight")) >= 0) {
      chartDataset.lineTension = 0;
    }
    if ((lineStyleModifiers == null ? void 0 : lineStyleModifiers.indexOf("order-top")) >= 0) {
      chartDataset.order = -1;
    } else {
      const orderModifier = lineStyleModifiers == null ? void 0 : lineStyleModifiers.find((m) => m.startsWith("order-"));
      if (orderModifier) {
        switch (orderModifier) {
          case "order-1":
            chartDataset.order = 1;
            break;
          case "order-2":
            chartDataset.order = 2;
            break;
          case "order-3":
            chartDataset.order = 3;
            break;
          default:
            break;
        }
      }
    }
    chartDataset.pointHoverRadius = 0;
    if (lineStyle === "none") {
      chartDataset.pointHitRadius = 0;
    } else {
      chartDataset.pointHitRadius = 3;
    }
    const customChartDataset = chartDataset;
    if (chartDataset.borderColor !== TRANSPARENT) {
      customChartDataset.origBorderColor = chartDataset.borderColor;
    }
    if (chartDataset.fill !== false) {
      customChartDataset.origBackgroundColor = chartDataset.backgroundColor;
    }
    customChartDataset.origOrder = chartDataset.order;
    chartDatasets.push(chartDataset);
  }
  if (stacked && isStackedWithRefLine(graphSpec)) {
    if (graphSpec.yMax === void 0 && graphSpec.ySoftMax === void 0) {
      let msg = "Stacked graphs containing a ref line must have a defined yMax or ySoftMax";
      msg += ` (id=${graphSpec.id})`;
      throw new Error(msg);
    }
    const addHiddenScatterPoint = (yAxisId) => {
      const chartDataset = {};
      chartDataset.yAxisID = yAxisId;
      chartDataset.type = "scatter";
      chartDataset.fill = false;
      chartDataset.borderColor = TRANSPARENT;
      chartDataset.backgroundColor = TRANSPARENT;
      chartDataset.pointHitRadius = 0;
      chartDataset.pointHoverRadius = 0;
      chartDataset.pointRadius = 0;
      chartDataset.data = [{ x: 2100, y: 0 }];
      chartDatasets.push(chartDataset);
    };
    addHiddenScatterPoint(void 0);
    addHiddenScatterPoint("stacked-ref-line");
  }
  return {
    datasets: chartDatasets
  };
}
function updateLineChartJsData(viewModel, chartData) {
  var _a;
  const datasetViewModels = viewModel.getDatasets();
  const datasetCount = datasetViewModels.length;
  const highlightedDatasetSpec = (_a = viewModel.getHighlightedDataset) == null ? void 0 : _a.call(viewModel);
  const highlightActive = highlightedDatasetSpec !== void 0;
  for (let datasetIndex = 0; datasetIndex < datasetCount; datasetIndex++) {
    const datasetViewModel = datasetViewModels[datasetIndex];
    const datasetSpec = datasetViewModel.spec;
    const chartDataset = chartData.datasets[datasetIndex];
    const customChartDataset = chartDataset;
    const varId = datasetSpec.varId;
    const sourceName = datasetSpec.externalSourceName;
    chartDataset.data = datasetViewModel.points;
    if (datasetViewModel.opacity !== void 0) {
      const opacity = datasetViewModel.opacity;
      const origColor = datasetViewModel.color || datasetViewModel.spec.color;
      const color = deriveWithOpacity(origColor, opacity);
      chartDataset.borderColor = color;
    }
    chartDataset.hidden = datasetViewModel.visible === false;
    if (highlightActive) {
      const highlighted = (highlightedDatasetSpec == null ? void 0 : highlightedDatasetSpec.varId) === varId && (highlightedDatasetSpec == null ? void 0 : highlightedDatasetSpec.externalSourceName) == sourceName;
      const alpha = highlighted ? 1 : 0.2;
      if (customChartDataset.origBorderColor) {
        chartDataset.borderColor = blendWithWhite(customChartDataset.origBorderColor, alpha);
      }
      if (customChartDataset.origBackgroundColor) {
        chartDataset.backgroundColor = blendWithWhite(customChartDataset.origBackgroundColor, alpha);
      }
      if (highlighted && !isStacked(viewModel.spec)) {
        chartDataset.order = -10;
      } else {
        chartDataset.order = customChartDataset.origOrder;
      }
    } else {
      const overriddenColor = datasetViewModel.color;
      if (customChartDataset.origBorderColor) {
        chartDataset.borderColor = overriddenColor || customChartDataset.origBorderColor;
      }
      if (customChartDataset.origBackgroundColor) {
        chartDataset.backgroundColor = overriddenColor || customChartDataset.origBackgroundColor;
      }
      chartDataset.order = customChartDataset.origOrder;
    }
  }
  if (isStackedWithRefLine(viewModel.spec)) {
    const yMax = getStackedMaxY(viewModel.spec, chartData);
    const updateHiddenScatterPoint = (index) => {
      const point = chartData.datasets[index].data[0];
      point.y = yMax;
    };
    updateHiddenScatterPoint(datasetCount);
    updateHiddenScatterPoint(datasetCount + 1);
  }
}
function deriveWithOpacity(hexColor, opacity) {
  const r = parseInt(hexColor.substring(1, 3), 16);
  const g = parseInt(hexColor.substring(3, 5), 16);
  const b = parseInt(hexColor.substring(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
function blendWithWhite(hexColor, alpha) {
  if (alpha === 1) {
    return hexColor;
  }
  function convert(start, end) {
    return parseInt(hexColor.substring(start, end), 16) / 255;
  }
  function mix(src) {
    const premultipliedSrc = src * alpha;
    const premultipliedDst = 1;
    const result = premultipliedSrc + premultipliedDst * (1 - alpha);
    return Math.round(result * 255);
  }
  const r = mix(convert(1, 3));
  const g = mix(convert(3, 5));
  const b = mix(convert(5, 7));
  return `rgb(${r},${g},${b})`;
}
function isStacked(spec) {
  return spec.kind === "stacked-line";
}
function isStackedWithRefLine(spec) {
  return isStacked(spec) && spec.datasets.some((d) => d.lineStyle !== "area");
}
function getStackedMaxY(spec, chartData) {
  var _a;
  const stackedTotals = /* @__PURE__ */ new Map();
  const varCount = spec.datasets.length;
  let refMaxY = 0;
  for (let varIndex = 0; varIndex < varCount; varIndex++) {
    const lineStyle = spec.datasets[varIndex].lineStyle;
    const data = chartData.datasets[varIndex].data;
    switch (lineStyle) {
      case "area":
        for (const point of data) {
          const sum = (_a = stackedTotals.get(point.x)) != null ? _a : 0;
          stackedTotals.set(point.x, sum + point.y);
        }
        break;
      case "2px_line":
      case "dashed":
      case "dotted":
      case "line":
      case "scatter":
      case "none":
      case "thinline":
        for (const point of data) {
          refMaxY = Math.max(refMaxY, point.y);
        }
        break;
      default:
        throw new Error("Unhandled ref line style for stacked graph");
    }
  }
  let maxY = 0;
  for (const stackedY of stackedTotals.values()) {
    maxY = Math.max(maxY, stackedY);
  }
  maxY = Math.max(maxY, refMaxY);
  return maxY;
}

// src/graph-view.ts
Chart3.plugins.register(ChartAnnotations);
var GraphView = class {
  constructor(canvas, viewModel, options, tooltipsEnabled) {
    this.canvas = canvas;
    this.viewModel = viewModel;
    if (viewModel.spec.kind === "h-bar") {
      this.tooltipsAvailable = viewModel.spec.legendItems[0].labelKey.indexOf("today") >= 0;
    } else {
      this.tooltipsAvailable = true;
    }
    this.chart = createChart(canvas, viewModel, options, this.tooltipsAvailable && tooltipsEnabled);
  }
  /**
   * Set whether animations should be enabled.
   *
   * Note that if you want to disable animations entirely, it is better to
   * set `animations` to false in `GraphViewOptions` to avoid initializing
   * animation support in the underlying chart library.  This method is mainly
   * useful in cases where animations are disabled initially but you want to
   * enable them later.
   */
  setAnimationsEnabled(enabled) {
    if (this.chart) {
      this.chart.options.animation = { duration: enabled ? 1e3 : 0 };
      this.chart.options.hover = { animationDuration: enabled ? 400 : 0 };
      this.chart.options.responsiveAnimationDuration = 0;
      this.chart.update();
    }
  }
  /**
   * Set whether tooltips should be displayed.  This has no effect on
   * graph types (e.g. bar graphs) for which tooltips are always disabled.
   */
  setTooltipsEnabled(enabled) {
    if (this.tooltipsAvailable && this.chart) {
      this.chart.options.tooltips.enabled = enabled;
      this.chart.update();
    }
  }
  /**
   * Update all labels to use the appropriate translated strings.
   * This should be called after the current locale/language has
   * changed to ensure that the labels are updated.  This will also
   * cause the chart to refresh its ticks and tooltips to use
   * the correct locale-specific formatting based on the current
   * locale value.
   */
  updateLabels() {
    if (this.chart) {
      const graphSpec = this.viewModel.spec;
      const xAxisLabel = stringForKey(this.viewModel, graphSpec.xAxisLabelKey);
      const yAxisLabel = stringForKey(this.viewModel, graphSpec.yAxisLabelKey);
      this.chart.config.options.scales.xAxes[0].scaleLabel.labelString = xAxisLabel;
      this.chart.config.options.scales.yAxes[0].scaleLabel.labelString = yAxisLabel;
      this.chart.config.data.labels = getDatasetLabels(this.viewModel);
      this.chart.update();
    }
  }
  /**
   * Update the chart to reflect the latest data from the model.
   * This should be called after the model has produced new outputs.
   *
   * @param animated Whether to animate the data when it is updated.
   */
  updateData(animated = true) {
    var _a, _b;
    if (this.chart) {
      if (this.viewModel.spec.kind === "h-bar") {
        updateBarChartJsData(this.viewModel, this.chart.data, this.chart.options);
      } else {
        updateLineChartJsData(this.viewModel, this.chart.data);
      }
      if (((_b = (_a = this.viewModel).getHighlightedDataset) == null ? void 0 : _b.call(_a)) !== void 0) {
        if (this.chart.options.tooltips.enabled) {
          this.chart.options.tooltips.enabled = false;
          this.chart.update({ duration: 0 });
          setTimeout(() => {
            this.chart.options.tooltips.enabled = true;
          }, 10);
        }
      }
      this.chart.update(animated ? void 0 : { duration: 0 });
    }
  }
  /**
   * Destroy the chart and any associated resources.
   */
  destroy() {
    var _a;
    (_a = this.chart) == null ? void 0 : _a.destroy();
    this.chart = void 0;
  }
};
function createChart(canvas, viewModel, options, tooltipsEnabled) {
  const style = options.style || {};
  let chartData;
  let chartJsConfig;
  if (viewModel.spec.kind === "h-bar") {
    chartData = createBarChartJsData(viewModel.spec);
    chartJsConfig = barChartJsConfig(viewModel, chartData, tooltipsEnabled);
    updateBarChartJsData(viewModel, chartData, chartJsConfig.options);
  } else {
    chartData = createLineChartJsData(viewModel);
    chartJsConfig = lineChartJsConfig(viewModel, options, chartData, tooltipsEnabled);
    updateLineChartJsData(viewModel, chartData);
  }
  if (options.animations === false) {
    chartJsConfig.options.animation = { duration: 0 };
    chartJsConfig.options.hover = { animationDuration: 0 };
    chartJsConfig.options.responsiveAnimationDuration = 0;
  }
  if (options.responsive !== false) {
    chartJsConfig.options.responsive = true;
  } else {
    chartJsConfig.options.responsive = false;
  }
  chartJsConfig.options.maintainAspectRatio = false;
  chartJsConfig.options.title = { display: false };
  chartJsConfig.options.legend = { display: false };
  chartJsConfig.options.elements = {
    point: {
      radius: 0
    }
  };
  const graphSpec = viewModel.spec;
  const xAxisLabel = stringForKey(viewModel, graphSpec.xAxisLabelKey);
  const yAxisLabel = stringForKey(viewModel, graphSpec.yAxisLabelKey);
  chartJsConfig.options.scales.xAxes[0].scaleLabel.labelString = xAxisLabel;
  chartJsConfig.options.scales.yAxes[0].scaleLabel.labelString = yAxisLabel;
  chartJsConfig.data.labels = getDatasetLabels(viewModel);
  function applyFontOptions(obj, axisFontStyle) {
    var _a, _b, _c;
    if (!obj) {
      return;
    }
    if ((_a = style.font) == null ? void 0 : _a.family) {
      obj.fontFamily = style.font.family;
    }
    if (axisFontStyle == null ? void 0 : axisFontStyle.family) {
      obj.fontFamily = axisFontStyle.family;
    }
    if ((_b = style.font) == null ? void 0 : _b.style) {
      obj.fontStyle = style.font.style;
    }
    if (axisFontStyle == null ? void 0 : axisFontStyle.style) {
      obj.fontStyle = axisFontStyle.style;
    }
    if ((_c = style.font) == null ? void 0 : _c.color) {
      obj.fontColor = style.font.color;
    }
    if (axisFontStyle == null ? void 0 : axisFontStyle.color) {
      obj.fontColor = axisFontStyle.color;
    }
  }
  function applyFontOptionsForAxis(chartAxis, axisStyle) {
    applyFontOptions(chartAxis.scaleLabel, axisStyle == null ? void 0 : axisStyle.axisLabelFont);
    applyFontOptions(chartAxis.ticks, axisStyle == null ? void 0 : axisStyle.tickLabelFont);
  }
  chartJsConfig.options.scales.xAxes.forEach((axis) => applyFontOptionsForAxis(axis, style.xAxis));
  chartJsConfig.options.scales.yAxes.forEach((axis) => applyFontOptionsForAxis(axis, style.yAxis));
  if (viewModel.spec.kind === "h-bar") {
    const fontOptions = chartJsConfig.options.plugins.datalabels.font;
    if (style.font) {
      fontOptions.family = style.font.family;
      fontOptions.style = style.font.style;
    }
  }
  if (style.font) {
    chartJsConfig.options.tooltips.titleFontFamily = style.font.family;
    chartJsConfig.options.tooltips.titleFontStyle = style.font.style;
    chartJsConfig.options.tooltips.bodyFontFamily = style.font.family;
    chartJsConfig.options.tooltips.bodyFontStyle = style.font.style;
  }
  let currentBox = {
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
    yMin: 0,
    yMax: 0
  };
  function notifyResizedIfNeeded(chart) {
    var _a;
    const yAxisScale = chart.scales["y-axis-0"];
    const yMin = yAxisScale == null ? void 0 : yAxisScale.min;
    const yMax = yAxisScale == null ? void 0 : yAxisScale.max;
    const area = chart.chartArea;
    const box = {
      left: area.left,
      top: area.top,
      right: area.right,
      bottom: area.bottom,
      yMin,
      yMax
    };
    if (box.left !== currentBox.left || box.top !== currentBox.top || box.right !== currentBox.right || box.bottom !== currentBox.bottom || box.yMin !== currentBox.yMin || box.yMax !== currentBox.yMax) {
      currentBox = box;
      (_a = viewModel.onResize) == null ? void 0 : _a.call(viewModel, box);
    }
  }
  if (!chartJsConfig.plugins) {
    chartJsConfig.plugins = [];
  }
  chartJsConfig.plugins.push({
    afterLayout: (chart) => {
      applyScaleFactors(viewModel, style, chart.options, chartData);
      notifyResizedIfNeeded(chart);
    },
    resize: (chart) => {
      applyScaleFactors(viewModel, style, chart.options, chartData);
      notifyResizedIfNeeded(chart);
    },
    afterDatasetsDraw: (chart) => {
      if (viewModel.spec.id !== "62") {
        return;
      }
      const datasetViewModels = viewModel.getDatasets();
      const ndcVarId = "_all_countries_follow_ndcs";
      const ndcDataset = (varId) => datasetViewModels.find((d) => d.spec.varId === varId);
      const ndcConstant = (varId) => {
        const dataset = ndcDataset(varId);
        if (dataset === void 0 || dataset.visible === false) {
          return void 0;
        }
        return dataset.points[0].y;
      };
      const ndcRangeLo = ndcConstant(ndcVarId + "_range_low");
      const ndcRangeHi = ndcConstant(ndcVarId + "_range_high");
      if (ndcRangeLo === void 0 || ndcRangeHi === void 0) {
        return;
      }
      const a = chart.chartArea;
      const chartW = a.right - a.left;
      const chartH = a.bottom - a.top;
      const yAxisScale = chart.scales["y-axis-0"];
      const yMin = yAxisScale.min;
      const yMax = yAxisScale.max;
      const barPctH = (ndcRangeHi - ndcRangeLo) / (yMax - yMin);
      const boxW = chartW * 0.02;
      const boxH = chartH * barPctH;
      const boxX = a.left + chartW * ((2030 - 2e3) / (2100 - 2e3)) - boxW * 0.5;
      const boxY = a.bottom - chartH * ((ndcRangeLo - yMin) / (yMax - yMin)) - boxH;
      chart.ctx.fillStyle = ndcDataset(ndcVarId).spec.color;
      fillRoundRect(chart.ctx, boxX, boxY, boxW, boxH, boxW * 0.4);
    }
  });
  return new Chart3(canvas, chartJsConfig);
}
function fillRoundRect(ctx, x, y, w, h, r) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
  ctx.fill();
}
function applyScaleFactors(viewModel, style, options, chartData) {
  var _a;
  const datasetViewModels = viewModel.getDatasets();
  const datasetCount = datasetViewModels.length;
  if (style.getTickLabelFontSize) {
    const scaleFactor = viewModel.spec.id === "141" ? 0.9 : 1;
    const scaleFontSizeInPx = style.getTickLabelFontSize() * scaleFactor;
    const scaleTickSizeInPx = scaleFontSizeInPx * 0.6;
    for (const axis of [...options.scales.xAxes, ...options.scales.yAxes]) {
      axis.ticks.fontSize = scaleFontSizeInPx;
      axis.gridLines.tickMarkLength = scaleTickSizeInPx;
    }
    const tooltipFontSizeInPx = scaleFontSizeInPx * 0.9;
    options.tooltips.titleFontSize = tooltipFontSizeInPx;
    options.tooltips.bodyFontSize = tooltipFontSizeInPx;
  }
  if (style.getAxisLabelFontSize) {
    const axisFontSizeInPx = style.getAxisLabelFontSize();
    for (const axis of [...options.scales.xAxes, ...options.scales.yAxes]) {
      axis.scaleLabel.fontSize = axisFontSizeInPx;
    }
    if (viewModel.spec.kind === "h-bar") {
      const fontOptions = options.plugins.datalabels.font;
      const scaleFactor = datasetCount <= 8 ? 1.4 : 0.8;
      fontOptions.size = axisFontSizeInPx * scaleFactor;
      options.plugins.datalabels.padding = axisFontSizeInPx * 0.15;
    }
  }
  if (viewModel.spec.kind !== "line" && viewModel.spec.kind !== "stacked-line") {
    return;
  }
  const lineWidthInPx = style.getDefaultLineWidth ? style.getDefaultLineWidth() : 12;
  for (let datasetIndex = 0; datasetIndex < datasetCount; datasetIndex++) {
    const datasetSpec = datasetViewModels[datasetIndex].spec;
    const chartDataset = chartData.datasets[datasetIndex];
    if (style.getDatasetStyle) {
      const datasetStyle = style.getDatasetStyle(datasetSpec, lineWidthInPx);
      if (datasetStyle.lineWidth !== void 0) {
        chartDataset.borderWidth = datasetStyle.lineWidth;
      }
      if (datasetStyle.lineDash !== void 0) {
        chartDataset.borderDash = datasetStyle.lineDash;
      }
      if (datasetStyle.pointRadius !== void 0) {
        chartDataset.pointRadius = datasetStyle.pointRadius;
        chartDataset.pointHoverRadius = chartDataset.pointRadius;
      }
    } else {
      const lineStyle = datasetSpec.lineStyle;
      switch (lineStyle) {
        case "dashed": {
          const dashLengthInPx = lineWidthInPx * 1.2;
          const dashSpaceInPx = lineWidthInPx * 1.7;
          chartDataset.borderDash = [dashLengthInPx, dashSpaceInPx];
          chartDataset.borderWidth = lineWidthInPx * 0.35;
          break;
        }
        case "dotted": {
          const dotSizeInPx = 0.2;
          const dotSpaceInPx = lineWidthInPx * 2;
          chartDataset.borderDash = [dotSizeInPx, dotSpaceInPx];
          chartDataset.borderWidth = lineWidthInPx * 0.6;
          break;
        }
        case "thinline":
          chartDataset.borderWidth = lineWidthInPx * 0.35;
          break;
        case "2px_line":
          chartDataset.borderWidth = lineWidthInPx * 0.2;
          break;
        case "scatter":
          chartDataset.pointRadius = 1e-4;
          break;
        case "none":
          chartDataset.borderWidth = void 0;
          chartDataset.pointRadius = void 0;
          break;
        case "line":
        default:
          chartDataset.borderWidth = lineWidthInPx;
          break;
      }
      const pointModifier = (_a = datasetSpec.lineStyleModifiers) == null ? void 0 : _a.find((mod) => mod.startsWith("show-"));
      if (pointModifier !== void 0) {
        let defaultRadius;
        switch (pointModifier) {
          case "show-diamond":
            chartDataset.pointStyle = "rectRot";
            defaultRadius = lineWidthInPx * 0.6;
            break;
          case "show-triangle":
            chartDataset.pointStyle = "triangle";
            defaultRadius = lineWidthInPx * 0.7;
            break;
          case "show-dot":
          default:
            chartDataset.pointStyle = "circle";
            defaultRadius = lineWidthInPx * 0.5;
            break;
        }
        if (chartDataset.borderWidth !== void 0) {
          chartDataset.pointRadius = chartDataset.borderWidth * 1.5;
        } else {
          chartDataset.pointRadius = defaultRadius;
        }
        chartDataset.pointHoverRadius = chartDataset.pointRadius;
      }
    }
    chartDataset.pointBorderWidth = 0;
    if (chartDataset.borderWidth !== void 0 || chartDataset.pointRadius !== void 0) {
      chartDataset.pointHitRadius = lineWidthInPx * 0.8;
    }
  }
}
function getDatasetLabels(viewModel) {
  if (viewModel.spec.kind === "h-bar") {
    const datasetViewModels = viewModel.getDatasets();
    const datasetsForLabels = datasetViewModels.filter((_, index) => index % 2 === 0);
    return datasetsForLabels.map((datasetViewModel) => {
      const label = viewModel.getStringForKey(datasetViewModel.spec.labelKey);
      if (label.includes("<br>")) {
        return label.split("<br>");
      } else {
        return label;
      }
    });
  } else {
    return [];
  }
}
function stringForKey(viewModel, key) {
  if (key) {
    return viewModel.getStringForKey(key);
  } else {
    return void 0;
  }
}
export {
  GraphView
};
//# sourceMappingURL=index.js.map