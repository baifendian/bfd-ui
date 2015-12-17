import d3 from 'd3'

export default env => {

  // Get xScale rangePoints padding to calculate tootip index.
  const step = env.width / (env.categories.length - 1 + env.xAxisPaddingScale)
  const xAxisPadding = step * env.xAxisPaddingScale / 2

  const tooltip = d3.select(env.container)
    .append('div')
    .style({
      position: 'absolute',
      opacity: 0,
      'pointer-events': 'none'
    })
    .attr('class', 'bcharts-tooltip')

  let lastMarkers, lastIndex

  const resetLastMarkers = () => {
    lastMarkers
      .attr('r', 3)
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 1)
  }

  const markers = env.svg.selectAll('circle.marker')

  // Tooltip trigger area.
  env.svg.append('rect')
    .attr('fill', 'none')
    .attr('pointer-events', 'all')
    .attr('width', env.width)
    .attr('height', env.height)
    .on('mouseover', () => {
      tooltip.style({
        left: (d3.event.pageX) + 'px',
        top: (d3.event.pageY) + 'px',
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

        lastMarkers && resetLastMarkers()

        lastIndex = index

        lastMarkers = markers.filter('.marker-' + index)
          .attr('r', 5)
          .attr('stroke-width', 5)
          .attr('stroke-opacity', .5)

        tooltip
          .transition()
          .duration(150)
          .style({
            left: (d3.event.pageX) + 'px',
            top: (d3.event.pageY) + 'px',
            opacity: 1
          })

        let html = env.categories[index] + '<br>'
        env.series.forEach((serie, i) => {
          if (!env.actives[i]) return
          html += serie.name + '：<b>' + serie.data[index] + '</b></br>'
        })
        tooltip.html(html)
      }
    })
    .on('mouseout', () => {
      lastIndex = null
      resetLastMarkers()
      tooltip.transition().delay(200).style('opacity', 0)
    })
}