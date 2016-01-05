import d3 from 'd3'

export default env => {

  const xAxis = d3.svg.axis().scale(env.xScale)
    .orient('bottom')
    .tickSize(6, 0)

  const interval = Math.ceil(env.categories.join('').length / (env.width / 10))
  interval > 1 && xAxis.tickValues(env.xScale.domain().filter((d, i) => !(i % interval)))

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