import d3 from 'd3'

export default class Axis {
  
  constructor(options) {
    Object.assign(this, options)
    d3.svg.axis()
      .orient(this.orient)
      .tickSize(...this.tickSize)
      .tickPadding(this.tickPadding || 0)
  }
}