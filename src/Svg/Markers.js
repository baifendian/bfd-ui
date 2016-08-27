import d3 from 'd3'

export default class Markers {

  constructor(options) {

    Object.assign(this, options)

    const group = this.container.selectAll('g')
      .data(this.data)
      .enter()
      .append('g')
      .attr('class', 'marker')
      .attr('transform', d => {
        const x = this.xAxis.getPosition(d[this.category])
        const y = this.yAxis.getPosition(d[this.key])
        return `translate(${x}, ${y})`
      })

    group.append('circle')
      .attr('class', 'marker-inner')
      .attr('r', 5)
      .attr('fill', '#fff')
      .attr('stroke', '#fff')

    group.append('circle')
      .attr('class', 'marker-outer')
      .attr('r', 3.5)
      .attr('fill', '#fff')
      .attr('stroke', this.color)
      .attr('stroke-width', 2)
  }
}