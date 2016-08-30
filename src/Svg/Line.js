import d3 from 'd3'

export default class Line {

  static INTERPOLATE = 'cardinal'
  
  constructor(options) {

    Object.assign(this, options)

    this.generator = d3.svg.line()
      .interpolate(Line.INTERPOLATE)
      .x(d => this.xAxis.getPosition(d[this.category]))

    this.container
      .attr('class', 'line')
      .datum(this.data)
      .attr('fill', 'none')
      .attr('stroke', this.color)
      .attr('stroke-width', 2)

    this.render()
  }

  render() {
    this.container
      .transition()
      .duration(500)
      .attr('d', this.generator.y(d => this.yAxis.getPosition(d[this.key])))
  }

  toggle(show) {
    this.container.style('display', show ? 'block' : 'none')
  }
}