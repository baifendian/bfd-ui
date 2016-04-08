/**
 * Line chart based on d3.js
 */
import d3 from 'd3'

export default class {

  /**
   * 获取Y轴最大最小值区间
   */
  getDomain(series) {
    let domain = []
    series.forEach((serie) => {
      domain = domain.concat(d3.extent(serie.data, d => d))
    })
    domain = d3.extent(domain, d => d)

    const paddingScale = 0.2
    const padding = (domain[1] - domain[0]) * paddingScale
    domain = [domain[0] >= 0 ? 0 : domain[0] - padding, domain[1] + padding]

    return domain
  }

  constructor(config) {

    const { container, category, cols, data } = config

    const yAxisConfig = config.yAxis || {}
    const colors = config.colors || ['#26c6da', '#5c6bc0', '#f9ce1d', '#9c27b0']

    const padding = [20, 20, 30, 40]

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

    const xAxis = d3.svg.axis().scale(xScale)
      .orient('bottom')
      .tickSize(6, 0)

    // 处理x轴数据节点过多的问题
    const interval = Math.ceil(categories.join('').length / (width / 10))
    interval > 1 && xAxis.tickValues(xScale.domain().filter((d, i) => !(i % interval)))

    const yAxis = d3.svg.axis().scale(yScale)
      .orient('left')
      .ticks(5)
      .tickFormat(d => d3.format(yAxisConfig.format || 's')(d))
      .tickSize(-width)

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

    const activeLine = svg.append('line')
      .attr('y1', height)
      .attr('class', 'active-line')
      .style('opacity', 0)
      .style('stroke', colors[0])


    /**
     * 绘制曲线、曲面、标记点
     */
    const group = svg.append('g').attr('clip-path', 'url(#rectClip-' + id + ')')

    const interpolate = 'cardinal'

    const linePathGenerator = d3.svg.line()
      .interpolate(interpolate)
      .x(d => xScale(d[category]))

    const areaPathGenerator = d3.svg.area()
      .interpolate(interpolate)
      .x(d => xScale(d[category]))
      .y0(height)

    series.forEach((serie, i) => {
      const serieGroup = group.append('g').attr('class', 'serie-group serie-group-' + i)
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
          fill: 'url(#' + gradientID + ')',
          opacity: 0.4
        })

      // 标记点
      const gEnter = serieGroup.selectAll('g')
        .data(data)
        .enter()
        .append('g')
        .attr('class', (d, i) => 'marker marker-' + i)

      gEnter.append('circle')
        .attr('class', 'marker-inner')
        .attr('cx', d => xScale(d[config.category]))
        .attr('cy', d => yScale(d[serie.key]))
        .attr('r', 4)
        .attr('fill', '#fff')
        .attr('stroke', '#fff')

      gEnter.append('circle')
        .attr('class', 'marker-outer')
        .attr('cx', d => xScale(d[config.category]))
        .attr('cy', d => yScale(d[serie.key]))
        .attr('r', 3)
        .attr('fill', '#fff')
        .attr('stroke', color)
        .attr('stroke-width', 2)
    })


    /**
     * tooltip功能
     */
    // x轴边距实际大小
    const xAxisPadding = width / (categories.length - 1 + xAxisPaddingScale) * xAxisPaddingScale / 2

    const duration = 250 / categories.length

    const markers = svg.selectAll('.marker')

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

    // const resetLastMarkers = function() {
    //   lastMarkers
    //     .select('.marker-outer')
    //     .attr('r', 6)
    //   lastMarkers
    //     .select('.marker-inner')
    //     .attr('r', 2)
    //     .attr('fill', '#fff')
    // }

    // let lastMarkers
    let lastxAxisIndex

    // 绘制一个矩形，鼠标在此区域下均可触发 tooltip
    svg.append('rect')
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .attr('width', width)
      .attr('height', height)
      .on('mouseover', function() {
        tooltipElement.style({
          left: d3.event.offsetX + 'px',
          top: d3.event.offsetY + 'px',
          opacity: 1
        })
      })
      .on('mousemove', function() {
        // 计算当前鼠标位置最接近的x轴节点
        let xAxisIndex = (categories.length - 1) * (d3.mouse(this)[0] - xAxisPadding) / (width - xAxisPadding * 2)
        xAxisIndex = +xAxisIndex.toFixed(0)

        if (lastxAxisIndex === xAxisIndex) return

        const x = xScale(categories[xAxisIndex])
        const dataItem = data[xAxisIndex]
        const maxValue = Math.max.apply(null, series.map(serie => {
          return serie.data[xAxisIndex]
        }))
        activeLine
          .transition()
          .duration(duration)
          .attr('x1', x)
          .attr('x2', x)
          .attr('y2', yScale(maxValue))
          // .attr('y2', 0)
          .style('opacity', 1)

        lastxAxisIndex = xAxisIndex

        tooltipElement
          .transition()
          .duration(duration)
          .style({
            left: d3.event.offsetX + 'px',
            top: d3.event.offsetY + 'px',
            opacity: 1
          })

        // Tooltip 内容
        let html = categories[xAxisIndex] + '<br>'
        series.forEach((serie) => {
          html += serie.name + '：' + serie.data[xAxisIndex] + '</br>'
        })
        tooltipElement.html(html)

        // 更新标记显示
        // lastMarkers && resetLastMarkers()

        // lastMarkers = markers.filter(`.marker-${xAxisIndex}`)
        // lastMarkers
        //   .select('.marker-outer')
        //   .attr('r', 7)
        // lastMarkers
        //   .select('.marker-inner')
        //   .attr('r', 3)
        //   .data(series)
        //   .attr('fill', (d, i) => colors[i])

      })
      .on('mouseout', function() {
        lastxAxisIndex = null
        // resetLastMarkers()
        tooltipElement
          .transition()
          .delay(200)
          .style('opacity', 0)
        activeLine.style('opacity', 0)
      })


    /**
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

        let node = d3.select(this)
        let isDisabled = node.classed('disabled')

        // 至少保留一条系列
        if (!isDisabled && series.length === 1) return

        node.classed('disabled', !isDisabled)

        _series[i].disabled = !isDisabled

        series = _series.filter(serie => !serie.disabled)

        yScale.domain(that.getDomain(series))

        // 轴、曲线、曲面重绘
        svg.select('.axis-y').transition().duration(500).call(yAxis)

        let serieGroups = svg.selectAll('.serie-group')
        serieGroups.filter('.serie-group-' + i).style('display', isDisabled ? 'block' : 'none')

        _series.forEach((serie, i) => {
          if (serie.disabled) return
          let serieGroup = d3.select(serieGroups[0][i]).transition().duration(500)
          serieGroup.select('path.line')
            .attr('d', linePathGenerator.y(d => yScale(d[serie.key])))
          serieGroup.select('path.area')
            .attr('d', areaPathGenerator.y1(d => yScale(d[serie.key])))
          serieGroup.selectAll('.marker circle')
            .attr('cy', d => yScale(d[serie.key]))
        })
      })
      .each(function(d, i) {
        let node = d3.select(this)
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