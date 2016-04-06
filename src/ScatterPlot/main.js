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

    const paddingScale = .2
    const padding = (domain[1] - domain[0]) * paddingScale
    domain = [domain[0] - padding, domain[1] + padding]
    return domain
  }

  constructor(config) {

    const {container, category, cols, data} = config

    const yAxisConfig = config.yAxis || {}
    const colors = ['#80deea', '#9fa8da']

    const margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 40
    }

    // 实例唯一ID
    const id = Math.random().toString(16).slice(2)

    const _w = container.clientWidth
    const _h = container.clientHeight || _w * .5

    const width = _w - margin.left - margin.right
    const height = _h - margin.top - margin.bottom

    const svg = d3.select(container)
      .html('')
      .append('svg')
      .attr('width', _w)
      .attr('height', _h)
      .append('g')
      .attr('transform', `translate(${margin.left}, ${margin.top})`)


    // get data
    let series = Object.keys(cols).map(key => {
      return {
        key, name: cols[key], data: []
      }
    })

    let categories = []

    data.forEach(item => {
      categories.push(item[category])
      series.forEach(serie => {
        serie.data.push(item[serie.key])
      })
    })

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
      .attr('class', 'axis-x')
      .attr('transform', `translate(0, ${height})`)
      .call(xAxis)

    svg.append('g')
      .attr('class', 'axis-y')
      .call(yAxis)


    // 初始化渲染动画，从左到右划出
    svg.append('clipPath')
      .attr('id', `rectClip-${id}`)
      .append('rect')
      .attr('width', 0)
      .attr('height', height + 10)
      .transition()
      .duration(900)
      .attr('width', width)

    /**
     * Tooltip
     */
    const tooltip = d3.select(container)
      .append('div')
      .attr('class', 'tooltip')
      .style({
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0,
        'pointer-events': 'none'
      })

    const seriesGroup = svg.append('g').attr('clip-path', 'url(#rectClip-' + id + ')')
    series.forEach((serie, i) => {
      seriesGroup.append('g')
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('r', 6)
        .attr('cx', d => xScale(d[category]))
        .attr('cy', d => yScale(d[serie.key]))
        .attr('fill', colors[i])
        .attr('fill-opacity', .7)
        .attr('name', serie.name)
        .attr('value', (d, i) => serie.data[i])
        .on('mouseenter', function() {
          const target = d3.select(this)
          target.attr('r', 10)

          // Tooltip content
          let html = categories[i] + '<br>' + target.attr('name') + '：' + target.attr('value')
          tooltip
            .html(html)
            .style({
              left: d3.event.offsetX + 'px',
              top: d3.event.offsetY + 'px',
              opacity: 1
            })
        })
        .on('mouseout', function() {
          const target = d3.select(this)
          target.attr('r', 10)

          target.attr('r', 6)

          tooltip
            // .delay(200)
            .style('opacity', 0)
        })
    })
  }
}