export default env => {
  env.svg.append('clipPath')
    .attr('id', 'rectClip-' + env.id)
    .append('rect')
    .attr('width', 0)
    .attr('height', env.height + 10)
    .transition()
    .duration(900)
    .attr('width', env.width)
}