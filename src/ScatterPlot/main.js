import d3 from 'd3'

function getDomain(series) {
  let domain = []
  series.forEach((serie, i) => {
    domain = domain.concat(d3.extent(serie.data, d => d))
  })
  return d3.extent(domain, d => d)
}

export default class {

  constructor(config) {

    const {container, category, cols, data} = config

    const yAxisConfig = config.yAxis || {}
    const colors = ['#f5867d', '#aaa']

    const margin = {
      top: 20,
      right: 20,
      bottom: 30,
      left: 40
    }

    const _w = container.clientWidth
    const _h = container.clientHeight || _w * .5

    const width = _w - margin.left - margin.right
    const height = _h - margin.top - margin.bottom

    const svg = d3.select(container)
      .html('')
      .append('svg')
      .attr('class', 'scatter-plot')
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

    const xAxisPaddingScale = 0.2
    const xScale = d3.scale.ordinal()
      .rangePoints([0, width], xAxisPaddingScale)
      .domain(categories)

    const yScale = d3.scale.linear()
      .range([height, 0])
      .domain(getDomain(series))
      .nice()

    const xAxis = d3.svg.axis().scale(xScale)
      .orient('bottom')
      .tickSize(6, 0)

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

    const seriesGroup = svg.append('g')
    series.forEach((serie, i) => {
      seriesGroup.append('g')
        .selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('r', 10)
        .attr('cx', d => xScale(d[category]))
        .attr('cy', d => yScale(d[serie.key]))
        .attr('fill', colors[i])
        .attr('fill-opacity', .7)
        .attr('name', serie.name)
        .attr('value', (d, i) => serie.data[i])
        .on('mouseenter', (d, i) => {
          const target = d3.select(d3.event.target)
          // Tooltip content
          let html = categories[i] + '<br>' + target.attr('name') + '：' + target.attr('value')
          tooltip
            .html(html)
            .style({
              left: d3.event.pageX + 'px',
              top: d3.event.pageY + 'px',
              opacity: 1
            })
        })
        .on('mouseout', () => {
          tooltip
            // .delay(200)
            .style('opacity', 0)
        })
    })
  }
}