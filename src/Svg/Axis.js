import d3 from 'd3'

export default class Axis {
  
  constructor(options) {
    Object.assign(this, options)
    this.axis = d3.svg.axis()
  }

  getPosition(value) {
    return this.scale(value)
  }
}