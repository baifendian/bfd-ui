export default env => {

  let group = env.svg.append('g').attr('clip-path', 'url(#rectClip)')

  const config = env.config

  env.series.forEach((serie, i) => {

    let serieGroup = group.append('g').attr('class', 'serie-group serie-group-' + i)
    let color = config.colors[i]

    // Lines
    serieGroup.append('path')
      .attr('class', 'line')
      .datum(config.data)
      .attr('d', env.pathBuilder('line', i))
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 2)

    // Areas
    serieGroup.append('path')
      .attr('class', 'area')
      .datum(config.data)
      .attr('d', env.pathBuilder('area', i))
      .attr('fill', color)
      .style('opacity', .5)

    // Markers
    serieGroup.selectAll()
      .data(config.data)
      .enter()
      .append('circle')
      .attr('class', (d, i) => 'marker marker-' + i)
      .attr('r', 3)
      .attr('cx', d => env.xScale(d[config.category]))
      .attr('cy', d => env.yScale(d[serie.key]))
      .attr('fill', '#fff')
      .attr('stroke', color)
      .attr('stroke-width', 2)
  })
}