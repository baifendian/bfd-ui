/**
 * Line chart based on d3.js
 */
import d3 from 'd3'

export default class {

  /**
   * 获取Y轴最大最小值区间
   */
  getDomain(series) {
    let maxs = []
    series.forEach((serie) => {
      maxs.push(d3.max(serie.data))
    })
    const max = d3.max(maxs)
    return [0, max * 1.1]
  }

  /**
   * 获取Y轴 tickValues，nice 和 ticks 无法同时使用，只能手动划分
   */
  getTickValues(yScale) {
    const max = yScale.invert(0)
    const values = []
    const step = max / 5
    for (let i = 0; i <= 5; i++) {
      values.push(step * i)
    }
    return values
  }

  constructor(config) {

    const { container, category, cols, data } = config

    const yAxisConfig = config.yAxis || {}
    const colors = config.colors || ['#26c6da', '#5c6bc0', '#f9ce1d', '#9c27b0']

    const padding = [30, 10, 30, 40]

    // 实例唯一ID
    const id = Math.random().toString(16).slice(2)
    const width = container.clientWidth - padding[3] - padding[1]
    const height = (container.clientHeight || width * .5) - padding[0] - padding[2]

    const svg = d3.select(container)
      .html('')
      .append('svg')
      .attr('width', width + padding[3] + padding[1])
      .attr('height', height + padding[0] + padding[2])
      .append('g')
      .attr('transform', `translate(${padding[3]}, ${padding[0]})`)


    /**
     * 转换数据格式
     */
    let series = Object.keys(cols).map(key => {
      return {
        key, name: cols[key], data: []
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


    /**
     * 绘制坐标轴
     */
    const xAxisPaddingScale = 20 / (width / categories.length)
    const xScale = d3.scale.ordinal()
      .rangePoints([0, width], xAxisPaddingScale)
      .domain(categories)

    const yScale = d3.scale.linear()
      .range([height, 0])
      .domain(this.getDomain(series))
      .nice()

    const xAxis = d3.svg.axis().scale(xScale)
      .orient('bottom')
      .tickSize(0, 0)
      .tickPadding(10)

    // 处理x轴数据节点过多的问题
    const interval = Math.ceil(categories.join('').length / (width / 10))
    interval > 1 && xAxis.tickValues(xScale.domain().filter((d, i) => !(i % interval)))

    const yAxis = d3.svg.axis().scale(yScale)
      .orient('left')
      .tickValues(this.getTickValues(yScale))
      .tickFormat(d => d3.format(yAxisConfig.format || 's')(d))
      .tickSize(-width, 10)

    svg.append('g')
      .attr('class', 'axis-y')
      .call(yAxis)

    svg.append('g')
      .attr('class', 'axis-x')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis)

    // 初始化渲染动画，从左到右划出
    svg.append('clipPath')
      .attr('id', `rectClip-${id}`)
      .append('rect')
      .attr('width', 0)
      .attr('height', height - 1)
      .transition()
      .duration(900)
      .attr('width', width)

    /**
     * 绘制曲线、曲面
     */
    const seriesGroup = svg.append('g').attr('clip-path', `url(#rectClip-${id})`)

    const interpolate = 'cardinal'

    const linePathGenerator = d3.svg.line()
      .interpolate(interpolate)
      .x(d => xScale(d[category]))

    const areaPathGenerator = d3.svg.area()
      .interpolate(interpolate)
      .x(d => xScale(d[category]))
      .y0(height)

    series.forEach((serie, i) => {
      const serieGroup = seriesGroup.append('g').attr('class', `serie-group serie-group-${i}`)
      const color = colors[i]
      const gradientID = `gradient-${id}-${i}`

      // 曲线
      serieGroup.append('path')
        .attr('class', 'line')
        .datum(data)
        .attr('d', linePathGenerator.y(d => yScale(d[serie.key])))
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', 2)

      // 曲面
      const linearGradient = serieGroup
        .append('linearGradient')
        .attr('id', gradientID)
        .attr('x1', '50%')
        .attr('y1', '0%')
        .attr('x2', '50%')
        .attr('y2', '100%')
      linearGradient.append('stop')
        .attr('offset', 0)
        .style('stop-color', color)
      linearGradient.append('stop')
        .attr('offset', 1)
        .style('stop-color', '#fff')
      serieGroup.append('path')
        .attr('class', 'area')
        .datum(data)
        .attr('d', areaPathGenerator.y1(d => yScale(d[serie.key])))
        .style({
          fill: `url(#${gradientID})`,
          opacity: 0.4
        })
    })


    /**
     * =========================================================================================
     * tooltip功能：参考线、参考线与 x 轴交汇的圆点、详细数据浮层
     */
    
    /**
     * 存储最后的索引，相同的位置不再重复绘制(参考线、tooltip等)
     * @type {number}
     */
    let lastxAxisIndex

    /** 
     * 动画时长（参考线、tooltip平滑过渡）
     * @type {number}
     */
    const duration = 250 / categories.length

    /**
     * 参考线
     * @type {node}
     */
    const activeLine = svg.append('line')
      .attr('y2', 0)
      .attr('y1', height)
      .attr('class', 'active-line')
      .style('opacity', 0)

    /**
     * 参考线与 x 轴交汇的圆点
     * @type {node}
     */
    const activeCircle = svg.append('circle')
      .style('opacity', 0)
      .attr('class', 'active-circle')
      .attr('r', 2)
      .attr('cy', height)

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

    /** 
     * x轴边距实际大小，计算 getXAxisIndex 时需要
     * @type {number}
     */
    const xAxisPadding = width / (categories.length - 1 + xAxisPaddingScale) * xAxisPaddingScale / 2

    /**
     * 获取当前鼠标位置最接近的 x 轴索引
     */
    function getXAxisIndex(eventTarget) {
      let xAxisIndex = (categories.length - 1) * (d3.mouse(eventTarget)[0] - xAxisPadding) / (width - xAxisPadding * 2)
      return +xAxisIndex.toFixed(0)
    }

    /**
     * 鼠标滑动绘制相关元件
     * @param  {Number}  xAxisIndex x轴索引
     * @param  {Boolean} isInitial  是否mouseover
     */
    function drawTooltip(eventTarget, isInitial) {

      const xAxisIndex = getXAxisIndex(eventTarget)
      
      if (lastxAxisIndex !== xAxisIndex) {

        lastxAxisIndex = xAxisIndex

        // x 轴坐标
        const x = xScale(categories[xAxisIndex])
        const _duration = isInitial ? 0 : duration

        // 绘制参考线
        activeLine
          .transition()
          .duration(_duration)
          .attr('x1', x)
          .attr('x2', x)
          .style('opacity', 1)

        // 绘制参考线与 x 轴交汇的圆点
        activeCircle.transition()
          .duration(_duration)
          .attr('cx', x)
          .style('opacity', 1)

        // Tooltip 浮层内容
        let html = `${categories[xAxisIndex]}<br>`
        series.forEach((serie) => {
          html += `${serie.name}: ${serie.data[xAxisIndex]}</br>`
        })
        tooltipElement.html(html)


        // 绘制浮层
        const tooltipWidth = tooltipElement[0][0].clientWidth
        const tooltipHeight = tooltipElement[0][0].clientHeight

        let relativeSize = -(tooltipWidth / 2 + 15)
        if (x - 10 < tooltipWidth) {
          relativeSize = Math.abs(relativeSize)
        }

        tooltipElement
          .transition()
          .duration(_duration)
          .style({
            left: x + relativeSize + 'px',
            top: d3.event.offsetY - tooltipHeight / 2 + 'px',
            opacity: 1
          })
      }
    }

    // 绘制一个矩形，鼠标在此区域下均可触发 tooltip
    svg.append('rect')
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .attr('width', width)
      .attr('height', height)
      .on('mouseover', function() {
        drawTooltip(this, true)
      })
      .on('mousemove', function() {
        drawTooltip(this)
      })
      .on('mouseout', function() {
        lastxAxisIndex = null
        activeLine.style('opacity', 0)
        activeCircle.style('opacity', 0)
        tooltipElement
          .transition()
          .delay(200)
          .style('opacity', 0)
      })


    /**
     * =========================================================================================
     * 标记点。没有和线、面一起绘制的原因是因为需要放到最顶层，防止被 activeLine 覆盖
     */
    const markersGroup = svg.append('g').attr('clip-path', `url(#rectClip-${id})`)
    series.forEach((serie, i) => {
      const markerGroup = markersGroup.append('g').attr('class', `marker-group marker-group-${i}`)

      const gEnter = markerGroup.selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr('transform', d => `translate(${xScale(d[category])}, ${yScale(d[serie.key])})`)
        .attr('class', 'marker')

      gEnter.append('circle')
        .attr('class', 'marker-inner')
        .attr('r', 5)
        .attr('fill', '#fff')
        .attr('stroke', '#fff')

      gEnter.append('circle')
        .attr('class', 'marker-outer')
        .attr('r', 3.5)
        .attr('fill', '#fff')
        .attr('stroke', colors[i])
        .attr('stroke-width', 2)
    })


    /**
     * =========================================================================================
     * 图例
     */
    // series副本，保存初始数据
    const _series = [...series]
    const that = this

    d3.select(container)
      .append('div')
      .attr('class', 'legend')
      .selectAll('div')
      .data(series)
      .enter()
      .append('div')
      .style('cursor', 'pointer')
      .on('click', function(d, i) {

        const node = d3.select(this)
        const isDisabled = node.classed('disabled')

        // 至少保留一条系列
        if (!isDisabled && series.length === 1) return

        node.classed('disabled', !isDisabled)

        _series[i].disabled = !isDisabled

        series = _series.filter(serie => !serie.disabled)

        yScale.domain(that.getDomain(series)).nice()
        yAxis.tickValues(that.getTickValues(yScale))

        // 轴、曲线、曲面、标记点重绘
        svg.select('.axis-y').transition().duration(500).call(yAxis)

        const serieGroups = svg.selectAll('.serie-group')
        const markerGroups = svg.selectAll('.marker-group')
        const display = isDisabled ? 'block' : 'none'
        serieGroups.filter(`.serie-group-${i}`).style('display', display)
        markerGroups.filter(`.marker-group-${i}`).style('display', display)

        _series.forEach((serie, i) => {
          if (serie.disabled) return
          
          const serieGroup = d3.select(serieGroups[0][i]).transition().duration(500)
          const markerGroup = d3.select(markerGroups[0][i]).transition().duration(500)

          serieGroup.select('path.line')
            .attr('d', linePathGenerator.y(d => yScale(d[serie.key])))
          serieGroup.select('path.area')
            .attr('d', areaPathGenerator.y1(d => yScale(d[serie.key])))
          
          markerGroup.selectAll('.marker')
            .attr('transform', d => `translate(${xScale(d[category])}, ${yScale(d[serie.key])})`)
        })
      })
      .each(function(d, i) {
        const node = d3.select(this)
        node.append('span')
          .attr('class', 'line')
          .style('background-color', colors[i])
        node.append('span')
          .attr('class', 'circle')
          .style('border-color', colors[i])
        node.append('span')
          .attr('class', 'text')
          .text(d.name)
      })
  }

}