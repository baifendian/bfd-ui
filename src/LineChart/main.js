/**
 * Line chart based on d3.js
 */
import d3 from 'd3'
import XAxis from '../Svg/XAxis'

export default class LineChart {

  static defaultConfig = {
    yAxis: {},
    colors: ['#26c6da', '#5c6bc0', '#f9ce1d', '#9c27b0']
  }

  constructor(config) {
    
    this.config = Object.assign(config, LineChart.defaultConfig)
    
    // 实例唯一ID
    this.id = Math.random().toString(16).slice(2)
    this.series = this.getSeries()
    this.categories = this.getCategories()

    this.createContainer()
    this.createAxis()
    this.createGeometry()
    this.createTooltip()
    this.createLegend()
    this.createMarkers()
    this.startAnimation()
  }

  /**
   * 获取 data 与 cols 关联后的数据
   */
  getSeries() {
    const { cols, data } = this.config
    const series = Object.keys(cols).map(key => {
      return {
        key,
        name: cols[key],
        data: []
      }
    })
    data.forEach(item => {
      series.forEach(({ key, data }) => {
        data.push(item[key])
      })
    })
    return series
  }

  /**
   * 获取 X 轴分类的数据
   */
  getCategories() {
    const { category, data } = this.config
    return data.map(item => item[category])
  }

  /**
   * 获取 Y 轴值域，最大值适当增大，预留边距
   */
  getYDomain(series) {
    const domain = d3.extent(series.reduce((current, next) => {
      [].push.apply(current, d3.extent(next.data))
      return current
    }, []))
    if (domain[0] > 0) {
      domain[0] = 0
    }
    domain[1] *= 1.1
    return domain
  }

  /**
   * 计算 Y 轴 tickValues，实现无边距均分效果
   */
  getYTickValues() {
    const max = this.yScale.invert(0)
    const values = []
    const step = max / 5
    for (let i = 0; i <= 5; i++) {
      values.push(step * i)
    }
    return values
  }

  /**
   * 创建容器
   */
  createContainer() {
    const { container } = this.config
    const width = container.clientWidth
    const height = (container.clientHeight || width * .5)
    this.padding = [30, 10, 30, 40]
    const [top, right, bottom, left] = this.padding
    this.container = d3.select(container)
      .html('')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${left}, ${top})`)
    this.innerWidth = width - left - right
    this.innerHeight = height - top - bottom
  }

  // 获取 X 轴两边边距因子
  getXAxisPaddingScale() {
    return 20 / (this.innerWidth / this.categories.length)
  }

  drawXAxis() {
    this.xScale.rangePoints([0, this.innerWidth], this.getXAxisPaddingScale())
    this.xAxis.scale(this.xScale)

    // 处理x轴数据节点过多的问题
    const interval = Math.ceil(this.categories.join('').length / (this.innerWidth / 10))
    this.xAxis.tickValues(this.xScale.domain().filter((d, i) => !(i % interval)))
    
    this.container.select('.axis-x')
      .attr('transform', `translate(0, ${this.innerHeight})`)
      .call(this.xAxis)
  }

  /**
   * 绘制坐标轴
   */
  createAxis() {

    const { yAxis } = this.config
    
    this.xScale = d3.scale
      .ordinal()
      .domain(this.categories)

    this.yScale = d3.scale
      .linear()
      .domain(this.getYDomain(this.series))
      .range([this.innerHeight, 0])

    this.xAxis = d3.svg.axis()
      .orient('bottom')
      .tickSize(0, 0)
      .tickPadding(10)

    const format = d3.format(yAxis.format || '.2s')
    this.yAxis = d3.svg.axis()
      .scale(this.yScale)
      .orient('left')
      .tickValues(this.getYTickValues())
      .tickFormat(d => format(d))
      .tickSize(-this.innerWidth, 10)

    this.container.append('g')
      .attr('class', 'axis-y')
      .call(this.yAxis)

    this.container.append('g')
      .attr('class', 'axis-x')
    this.drawXAxis()
  }

  /**
   * 绘制曲线、曲面
   */
  createGeometry() {

    const { colors, data, category } = this.config

    const seriesGroup = this.container.append('g').attr('class', `series-group`)
    
    // 弯曲类型
    const INTERPOLATE = 'cardinal'

    this.linePathGenerator = d3.svg.line()
      .interpolate(INTERPOLATE)
      .x(d => this.xScale(d[category]))

    this.areaPathGenerator = d3.svg.area()
      .interpolate(INTERPOLATE)
      .x(d => this.xScale(d[category]))
      .y0(this.innerHeight)

    this.series.forEach(({ key }, i) => {
      const serieGroup = seriesGroup.append('g')
        .attr('class', `serie-group serie-group-${key}`)
      const color = colors[i]

      // 曲线
      serieGroup.append('path')
        .attr('class', 'line')
        .datum(data)
        .attr('d', this.linePathGenerator.y(d => this.yScale(d[key])))
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', 2)

      // 曲面渐变效果
      const gradientID = `gradient-${this.id}-${i}`
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

      // 曲面 
      serieGroup.append('path')
        .attr('class', 'area')
        .datum(data)
        .attr('d', this.areaPathGenerator.y1(d => this.yScale(d[key])))
        .style({
          fill: `url(#${gradientID})`,
          opacity: 0.4
        })
    })
  }

  /**
   * tooltip功能：参考线、参考线与 x 轴交汇的圆点、详细数据浮层
   */
  createTooltip() {

    const { container } = this.config

    const padding = this.getXAxisPaddingScale()

    // x轴边距实际大小
    this.xAxisPadding = this.innerWidth / 
      (this.categories.length - 1 + padding) * padding / 2

    // 存储最后的索引，index 未变化时不再重复绘制(参考线、tooltip等)
    this.lastxAxisIndex = null

    // 参考线
    this.activeLine = this.container.append('line')
      .attr('y2', 0)
      .attr('y1', this.innerHeight)
      .attr('class', 'active-line')
      .style('opacity', 0)

    // 参考线与 x 轴交汇的圆点
    this.activeCircle = this.container.append('circle')
      .style('opacity', 0)
      .attr('class', 'active-circle')
      .attr('r', 2)
      .attr('cy', this.innerHeight)

    // tooltip 浮层对象节点
    this.tooltip = d3.select(container)
      .append('div')
      .attr('class', 'bfd-line-chart__tooltip')
      .style({
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0,
        'pointer-events': 'none'
      })

    this.createTooltipTrigger()
  }

  /**
   * 创建 Tooltip 功能触发器
   */
  createTooltipTrigger() {
    
    // 动画时长（参考线、tooltip平滑过渡）
    const duration = 400 / this.categories.length

    this.container.append('rect')
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .attr('width', this.innerWidth)
      .attr('height', this.innerHeight)
      .on('mouseover', () => {
        this.drawTooltip(0)
      })
      .on('mousemove', () => {
        this.drawTooltip(duration)
      })
      .on('mouseout', () => {
        this.lastxAxisIndex = null
        this.activeLine.style('opacity', 0)
        this.activeCircle.style('opacity', 0)
        this.tooltip
          .transition()
          .delay(200)
          .style('opacity', 0)
      })
  }

  /**
   * 获取鼠标在 X 轴上的索引
   */
  getMouseIndexInXAxis() {
    let xAxisIndex = (this.categories.length - 1) * 
      (d3.mouse(d3.event.currentTarget)[0] - this.xAxisPadding) / 
      (this.innerWidth - this.xAxisPadding * 2)
    return +xAxisIndex.toFixed(0) || 0
  }

  /**
   * 绘制 Tooltip，包括浮层、参考线等
   */
  drawTooltip(duration) {

    const { yAxis } = this.config

    const xAxisIndex = this.getMouseIndexInXAxis()
    if (this.lastxAxisIndex === xAxisIndex) return

    this.lastxAxisIndex = xAxisIndex

    // x 轴坐标
    const x = this.xScale(this.categories[xAxisIndex])

    // 绘制参考线
    this.activeLine
      .transition()
      .duration(duration)
      .attr('x1', x)
      .attr('x2', x)
      .style('opacity', 1)

    // 绘制参考线与 x 轴交汇的圆点
    this.activeCircle.transition()
      .duration(duration)
      .attr('cx', x)
      .style('opacity', 1)

    // Tooltip 浮层内容
    const format = d3.format(yAxis.format || '.2s')
    const html = this.series.reduce((current, serie, i) => {
      return current + (`
        <tr>
          <td>${serie.name}:</td>
          <td>${format(serie.data[xAxisIndex])}</td>
        </tr>
      `)
    }, `<h2>${this.categories[xAxisIndex]}</h2><table>`) + '</table>'
    this.tooltip.html(html)

    // 绘制浮层
    const { clientWidth, clientHeight } = this.tooltip[0][0]

    let relativeSize = -(clientWidth / 2 + 15)
    if (x - 10 < clientWidth) {
      relativeSize = Math.abs(relativeSize)
    }

    this.tooltip
      .transition()
      .duration(duration)
      .style({
        left: x + relativeSize + 'px',
        top: d3.event.offsetY - clientHeight / 2 + 'px',
        opacity: 1
      })
  }

  /**
   * 标记点。没有和线、面一起绘制的原因是因为需要放到最顶层，防止被 activeLine 覆盖
   */
  createMarkers() {

    const { category, colors, data } = this.config
    const markersGroup = this.container.append('g')
      .attr('class', 'markers-group')

    this.series.forEach(({ key }, i) => {
      const markerGroup = markersGroup.append('g')
        .attr('class', `marker-group-${key}`)

      const gEnter = markerGroup.selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr('class', 'marker')
        .attr('transform', d => {
          return `translate(${this.xScale(d[category])}, ${this.yScale(d[key])})`
        })

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
  }

  /**
   * 图例
   */
  createLegend() {

    const { container, category, colors } = this.config
    const disabledMap = {}
    const t = d3.transition().duration(500)

    const selection = d3.select(container)
      .append('div')
      .attr('class', 'bfd-line-chart__legend')
      .selectAll('div')
      .data(this.series)
      .enter()
      .append('div')
      .style('cursor', 'pointer')
      .on('click', ({ key }) => {

        const node = d3.select(d3.event.currentTarget)
        const disabled = !node.classed('disabled')
        disabledMap[key] = disabled
        const series = this.series.filter(({ key }) => !disabledMap[key])

        // 至少保留一条系列
        if (disabled && !series.length) {
          disabledMap[key] = false
          return
        }
        node.classed('disabled', disabled)

        this.yScale.domain(this.getYDomain(series)).nice()
        this.yAxis.tickValues(this.getYTickValues())

        // svg 重绘
        this.container.select('.axis-y').transition(t).call(this.yAxis)

        const serieGroup = this.container.select(`.serie-group-${key}`)
        const markerGroup = this.container.select(`.marker-group-${key}`)
        const display = disabled ? 'none' : 'block'
        serieGroup.style('display', display)
        markerGroup.style('display', display)

        series.forEach(({ key }) => {
          
          if (disabledMap[key]) return

          const serieGroup = this.container.select(`.serie-group-${key}`).transition(t)
          serieGroup.select('path.line')
            .attr('d', this.linePathGenerator.y(d => this.yScale(d[key])))
          serieGroup.select('path.area')
            .attr('d', this.areaPathGenerator.y1(d => this.yScale(d[key])))

          const markerGroup = this.container.select(`.marker-group-${key}`).transition(t)
          markerGroup.selectAll('.marker')
            .attr('transform', d => {
              return `translate(${this.xScale(d[category])}, ${this.yScale(d[key])})`
            })
        })
      })
    
    selection.each((d, i) => {
      const node = d3.select(selection[0][i])
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

  /**
   * 初始化渲染动画
   */
  startAnimation() {
    
    // 动画元素矢量蒙板
    const clipId = `rectClip-${this.id}`
    this.container.select('.series-group').attr('clip-path', `url(#${clipId})`)
    this.container.select('.markers-group').attr('clip-path', `url(#${clipId})`)

    this.container.append('clipPath')
      .attr('id', clipId)
      .append('rect')
      .attr('width', 0)
      .attr('height', this.innerHeight - 1)
      .transition()
      .duration(900)
      .attr('width', this.innerWidth)
  }
}