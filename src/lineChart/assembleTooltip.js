import d3 from 'd3'

export default env => {

  const {width, xAxisPaddingScale, categories, series, container, svg} = env
  // Get xScale rangePoints padding to calculate tootip index.
  const step = width / (categories.length - 1 + xAxisPaddingScale)
  const xAxisPadding = step * xAxisPaddingScale / 2
  const duration = 200 / categories.length
  const markers = svg.selectAll('.marker')
  const tooltip = d3.select(container)
    .append('div')
    .attr('class', 'bcharts-tooltip')
    .style({
      position: 'absolute',
      left: 0,
      top: 0,
      opacity: 0,
      'pointer-events': 'none'
    })
  const resetLastMarkers = function() {
    lastMarkers
      .select('.marker-outer')
      .attr('r', 6)
    lastMarkers
      .select('.marker-inner')
      .attr('r', 2)
      .attr('fill', '#fff')
  }

  let lastMarkers
  let lastIndex

  // Tooltip trigger area.
  svg.append('rect')
    .attr('fill', 'none')
    .attr('pointer-events', 'all')
    .attr('width', env.width)
    .attr('height', env.height)
    .on('mouseover', () => {
      tooltip.style({
        left: d3.event.offsetX + 'px',
        top: d3.event.offsetY + 'px',
        opacity: 1
      })
    })
    .on('mousemove', function() {
      // Get nearest xAxis index of mouse position.
      let index = (categories.length - 1) * (d3.mouse(this)[0] - xAxisPadding) / (width - xAxisPadding * 2)
      index = +index.toFixed(0)

      if (lastIndex === index) return

      // Change tooltip position when index change.
      tooltip
        .transition()
        .duration(duration)
        .style({
          left: d3.event.offsetX + 'px',
          top: d3.event.offsetY + 'px',
          opacity: 1
        })

      // Tooltip content
      let html = categories[index] + '<br>'
      series.forEach((serie, i) => {
        if (!env.actives[i]) return
        html += serie.name + '：' + serie.data[index] + '</br>'
      })
      tooltip.html(html)

      // Update markers
      lastMarkers && resetLastMarkers()
      lastIndex = index
      lastMarkers = markers.filter('.marker-' + index)
      lastMarkers
        .select('.marker-outer')
        .attr('r', 7)
      lastMarkers
        .select('.marker-inner')
        .attr('r', 3)
        .attr('fill', '#65a6ff')

    })
    .on('mouseout', () => {
      lastIndex = null
      resetLastMarkers()
      tooltip
        .transition()
        .delay(200)
        .style('opacity', 0)
    })
}