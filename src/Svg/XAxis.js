import d3 from 'd3'

export default class XAxis {
  
  constructor(options) {
    
    Object.assign(this, options)

    this.scale = d3.scale.ordinal()
      .domain(this.categories)
      .rangePoints([0, this.length])

    this.axis = d3.svg.axis()
      .orient('bottom')
      .scale(this.scale)
      .tickSize(0, 0)
      .tickPadding(10)

    this.container.append('g')
      .attr('class', 'axis-x')
      .attr('transform', `translate(0, ${this.top})`)
      .call(this.axis)
  }

  getPosition(value) {
    return this.scale(value)
  }

  getPositionByIndex(index) {
    return this.scale(this.categories[index])
  }
}