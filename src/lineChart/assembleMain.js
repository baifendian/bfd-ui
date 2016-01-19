import defaultColors from '../colors'

export default env => {

  const colors = env.config.colors || defaultColors
  const group = env.svg.append('g').attr('clip-path', 'url(#rectClip-' + env.id + ')')
  const config = env.config

  env.series.forEach((serie, i) => {

    const serieGroup = group.append('g').attr('class', 'serie-group serie-group-' + i)
    const color = colors[i]
    const gradientID = 'gradient-' + env.id + '-' + i

    // Lines
    serieGroup.append('path')
      .attr('class', 'line')
      .datum(config.data)
      .attr('d', env.pathBuilder('line', i))
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 2)

    // Areas
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
      .datum(config.data)
      .attr('d', env.pathBuilder('area', i))
      .style({
        fill: 'url(#' + gradientID + ')',
        opacity: .4
      })

    // Markers
    const gEnter = serieGroup.selectAll('g')
      .data(config.data)
      .enter()
      .append('g')
      .attr('class', (d, i) => 'marker marker-' + i)

    gEnter.append('circle')
      .attr('class', 'marker-outer')
      .attr('cx', d => env.xScale(d[config.category]))
      .attr('cy', d => env.yScale(d[serie.key]))
      .attr('r', 6)
      .attr('fill', color)
      .attr('stroke', '#f5f5f5')
      .attr('stroke-width', 2)

    gEnter.append('circle')
      .attr('class', 'marker-inner')
      .attr('cx', d => env.xScale(d[config.category]))
      .attr('cy', d => env.yScale(d[serie.key]))
      .attr('r', 2)
      .attr('fill', '#fff')
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
  })
}