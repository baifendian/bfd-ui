/**
 * Column chart based on d3.js
 * create by tenglong.jiang on 2016/4/21
 */
import d3 from 'd3'
import Svg from '../Svg/svg'
import Rect from '../Svg/rect'
import Legend from '../Svg/legend'
import Color from '../Svg/color'

export default class {

  /**
   * 获取Y轴最大最小值区间
   */
  getDomain(series) {
    let maxs = []
    series.forEach((serie) => {
      maxs.push(d3.max(serie.data))
    })
    const max = d3.max(maxs) || 0
    return [0, max * 1.1]
  }

  constructor(config) {

    const {
      container,
      category,
      cols,
      data
    } = config

    //画布周边的空白
    const padding = {
      left: 45,
      right: 10,
      top: 50,
      bottom: 30
    };
    const color = new Color('C2');
    const width = container.clientWidth - padding.left - padding.right;
    const height = (container.clientHeight || width * .5) - padding.top - padding.bottom;
    const dataset = config.data || [];

    //const colors = "#FF0F00 #FF6600 #FF9E01 #FCD202 #F8FF01 #B0DE09 #04D215 #0D8ECF #0D52D1 #2A0CD0 #8A0CCF #CD0D74 #754DEB #DDDDDD #999999 #333333 #000000 #57032A #CA9726 #990000 #4B0C25".split(" ");
    config.width = width;
    config.height = height;
    config.padding = padding;

    /**
     * tooltip 浮层对象节点
     * @type {node}
     */
    const tooltipElement = d3.select(container)
      .append('div')
      .attr('class', 'tooltip')
      .style({
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0,
        'pointer-events': 'none'
      })
    const arrow = d3.select(container).append('div')
      .attr('class', 'arrow-down')
      .style({
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0,
        'pointer-events': 'none'
      })

    /**
     * 转换数据格式
     */
    let series = Object.keys(cols).map((key, i) => {
      return {
        key,
        name: cols[key],
        data: [],
        color: color.getDefault(i) || color.getColor(0, color.getDefault())
      }
    })

    // X轴节点数
    const categories = []

    data.forEach(item => {
      categories.push(item[category])
      series.forEach(serie => {
        serie.data.push(item[serie.key])
      })
    })

    //x轴的比例尺
    let xScale = d3.scale.ordinal()
      .domain(categories)
      .rangeRoundBands([0, width])

    //y轴的比例尺
    let yScale = d3.scale.linear()
      .domain(this.getDomain(series))
      .range([height, 0])
      .nice();

    config.series = series;
    config.categories = categories;
    config.xScale = xScale;
    config.yScale = yScale;

    const svg = new Svg(config).create({
      highBg: 1
    });
    const xItemLen = width / dataset.length;

    let rect = new Rect({
      div: tooltipElement,
      arrow: arrow,
      svg: svg.svg,
      height: height,
      padding: padding,
      xScale: xScale,
      yScale: yScale
    });

    series.map((serie, index) => {
      rect.create(serie, categories, series.length, index)
    })

    const _this = this;
    const _series = [...series]
    const legend = new Legend(config).create(_series, function(index, isDisabled) {
      //onClickCallback
      series = _series.filter(serie => !serie.disabled)

      yScale.domain(_this.getDomain(series)).nice()

      svg.setYScale(yScale)
      svg.setSeries(series)

      svg.svg.selectAll("rect.MyRect").remove()

      rect.resetYScale(yScale)

      series.map((serie, i) => {
        rect.create(serie, categories, series.length, i)
      })
    })
  }

}