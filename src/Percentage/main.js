import d3 from 'd3'

export default class {

  constructor(config) {

    const { container, percent, foreColor, backColor, textColor } = config

    const width = container.clientWidth
    const height = width
    const strokeWidth = width / 20
    const radius = width / 2 - strokeWidth / 2

    const svg = d3.select(container)
      .html('')
      .append('svg')
      .attr('width', width)
      .attr('height', height)
      .attr('transform', `translate(${width / 2}, ${height / 2})`)

    const circle1 = svg.append('circle')
      .attr('r', radius)
      .attr('fill', 'none')
      .attr('stroke', backColor || '#f5f5f5')
      .attr('stroke-width', strokeWidth)
      .attr('cx', width / 2)
      .attr('cy', height / 2)


    const circle2 = svg.append('circle')
      .attr('r', radius)
      .attr('fill', 'none')
      .attr('stroke', foreColor || '#2196f3')
      .attr('stroke-width', strokeWidth)
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('stroke-dasharray', Math.PI * radius * 2)
      .attr('stroke-dashoffset', Math.PI * radius * 2)
      .transition()
      .duration(1000)
      .attr('stroke-dashoffset', Math.PI * radius * 2 * (1 - (percent / 100)))

    const fontSize = width * .25
    const text = svg.append('text')
      .attr('text-anchor', 'middle')
      .attr('x', width / 2)
      .attr('y', height / 2)
      .append('tspan')
      .style('font-size', fontSize)
      .attr('fill', textColor || '#2196f3')
      .attr('dy', '.3em')
      .text(0 + '%')
      .transition()
      .duration(1000)
      .tween('text', function(d) {
        const i = d3.interpolateRound(0, percent)
        return function(t) {
          this.textContent = i(t) + '%'
        }
      })
  }
}