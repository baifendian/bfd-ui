import d3 from 'd3'

export default env => {

  // Get xScale rangePoints padding to calculate tootip index.
  const step = env.width / (env.categories.length - 1 + env.xAxisPaddingScale)
  const xAxisPadding = step * env.xAxisPaddingScale / 2

  const tooltip = d3.select(env.container)
    .append('div')
    .style({
      position: 'absolute',
      left: 0,
      top: 0,
      opacity: 0,
      'pointer-events': 'none'
    })
    .attr('class', 'bcharts-tooltip')
  const duration = 400 / env.categories.length

  const markers = env.svg.selectAll('circle.marker')

  let lastMarkers, lastIndex

  function resetLastMarkers() {
    lastMarkers
      // .transition()
      .attr('r', 4)
      .attr('fill', '#fff')
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 1)
  }

  // Tooltip trigger area.
  env.svg.append('rect')
    .attr('fill', 'none')
    .attr('pointer-events', 'all')
    .attr('width', env.width)
    .attr('height', env.height)
    .on('mouseover', () => {
      tooltip.style({
        left: (d3.event.offsetX) + 'px',
        top: (d3.event.offsetY) + 'px',
        opacity: 1
      })
    })
    .on('mousemove', function() {

      const pos = d3.mouse(this)

      // Get nearest xAxis index of mouse position.
      let index = (env.categories.length - 1) * (pos[0] - xAxisPadding) / (env.width - xAxisPadding * 2)
      index = +index.toFixed(0)

      // Change tooltip position when index change.
      if (lastIndex !== index) {

        tooltip
          // .transition()
          // .duration(duration)
          .style({
            left: d3.event.offsetX + 'px',
            top: d3.event.offsetY + 'px',
            opacity: 1
          })
        let html = env.categories[index] + '<br>'
        env.series.forEach((serie, i) => {
          if (!env.actives[i]) return
          html += serie.name + '：' + serie.data[index] + '</br>'
        })
        tooltip.html(html)

        lastMarkers && resetLastMarkers()
        lastIndex = index
        lastMarkers = markers.filter('.marker-' + index)
        lastMarkers
          // .transition()
          .attr('r', 4)
          .attr('fill', function() {
            return d3.select(this).attr('stroke')
          })
          .attr('stroke-width', 6)
          .attr('stroke-opacity', .5)
      }
    })
    .on('mouseout', () => {
      lastIndex = null
      resetLastMarkers()
      tooltip.transition().delay(200).style('opacity', 0)
    })
}