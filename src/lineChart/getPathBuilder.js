import d3 from 'd3'

export default env => {

  const category = env.config.category
  let key

  const line = d3.svg.line()
    .interpolate('cardinal')
    .x(d => env.xScale(d[category]))
    .y(d => env.yScale(d[key]))

  const area = d3.svg.area()
    .interpolate('cardinal')
    .x(d => env.xScale(d[category]))
    .y0(env.height)
    .y1(d => env.yScale(d[key]))

  const builder = {line, area}

  return function(type, index) {
    key = env.series[index].key
    return builder[type]
  }
}