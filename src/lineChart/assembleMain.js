import defaultColors from '../colors'

export default env => {

  const colors = env.config.colors || defaultColors
  const group = env.svg.append('g').attr('clip-path', 'url(#rectClip)')
  const config = env.config

  env.series.forEach((serie, i) => {

    const serieGroup = group.append('g').attr('class', 'serie-group serie-group-' + i)
    const color = colors[i]

    // Lines
    serieGroup.append('path')
      .attr('class', 'line')
      .datum(config.data)
      .attr('d', env.pathBuilder('line', i))
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 1)

    // Areas
    serieGroup.append('path')
      .attr('class', 'area')
      .datum(config.data)
      .attr('d', env.pathBuilder('area', i))
      .attr('fill', color)
      .style('opacity', .4)

    // Markers
    const gEnter = serieGroup.selectAll('g')
      .data(config.data)
      .enter()
      .append('g')

    // gEnter.append('circle')
    //   .attr('class', (d, i) => 'marker marker-' + i)
    //   .attr('r', 5)
    //   .attr('cx', d => env.xScale(d[config.category]))
    //   .attr('cy', d => env.yScale(d[serie.key]))
    //   .attr('fill', '#fff')
    
    gEnter.append('circle')
      .attr('class', (d, i) => 'marker marker-' + i)
      .attr('cx', d => env.xScale(d[config.category]))
      .attr('cy', d => env.yScale(d[serie.key]))
      .attr('r', 4)
      .attr('fill', '#fff')
      .attr('stroke', color)
      .attr('stroke-width', 2)
  })
}