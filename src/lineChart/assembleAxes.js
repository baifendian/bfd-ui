import d3 from 'd3'

export default env => {

  const xAxis = d3.svg.axis().scale(env.xScale)
    .orient('bottom')
    // .tickValues(xScale.domain().filter((d, i) => !(i % 2))
    .tickSize(6, 0)

  const yAxisConfig = env.config.yAxis || {}

  const yAxis = d3.svg.axis().scale(env.yScale)
    .orient('left')
    .ticks(5)
    .tickFormat(d => d3.format(yAxisConfig.format || 's')(d))
    .tickSize(-env.width)

  env.svg.append('g')
    .attr('class', 'axis-x')
    .attr('transform', 'translate(0, ' + env.height + ')')
    .call(xAxis)

  env.svg.append('g')
    .attr('class', 'axis-y')
    .call(yAxis)

  return {xAxis, yAxis}
}