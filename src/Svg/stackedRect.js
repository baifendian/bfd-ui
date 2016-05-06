/**
 * Rect chart based on d3.js
 */
import d3 from 'd3'

export default class {

  constructor(config) {
    this.div = config.div
    this.arrow = config.arrow
    this.svg = config.svg
    this.padding = config.padding
    this.height = config.height
    this.xScale = config.xScale
    this.yScale = config.yScale
  }

  resetYScale(yScale) {
    this.yScale = yScale
  }

  create(series, dataset, nameSet, count, index) {
    const div = this.div
    const arrow = this.arrow
    const padding = this.padding
    const xScale = this.xScale
    const yScale = this.yScale
    const height = this.height
    this.rect = this.svg.selectAll()
      .data(dataset.data)
      .enter()
      .append('rect')
      .attr('class', 'MyRect')
      .on('mouseover', function(d, i) {
        const x = parseFloat(d3.select(this).attr('x'))
        const width = parseFloat(d3.select(this).attr('width'))
        let sum = 0
        for (let j = 0; j < series.length; j++) {
          const value = series[j].data[i]
          sum += value
          if (index == j) {
            break
          }
        }
        div.transition()
          .duration(200)
          .style('opacity', .9)

        arrow.transition()
          .duration(200)
          .style('opacity', .9)

        div.html(dataset.name + '：' + d)
          .style('left', (padding.left + x - (div[0][0].clientWidth / 2)) + (width / 2) + 'px')
          .style('top', (yScale(sum) + 16) + 'px')

        arrow.style('left', (padding.left + x + width / 2 - 6) + 'px')
          .style('top', (yScale(sum) + div[0][0].clientHeight + 16) + 'px')
        d3.select(this).attr('opacity', '0.8')
      })
      .on('mouseout', function() {
        div.transition()
          .duration(500)
          .style('opacity', 0)

        arrow.transition()
          .duration(500)
          .style('opacity', 0)
        d3.select(this).attr('opacity', 1)
      })
      .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
      .attr('x', function(d, i) {
        const innerPading = xScale.rangeBand() / 4
        return xScale(nameSet[i]) + innerPading
      })
      .attr('width', xScale.rangeBand() / 2)
      .attr('y', function() {
        const min = yScale.domain()[0]
        return yScale(min)
      })
      .attr('height', function() {
        return 0
      })
      .attr('fill', dataset.color)
      .transition()
      .delay(function(d, i) {
        return i * 0
      })
      .duration(2000)
      .ease('bounce')
      .attr('y', function(d, i) {
        let sum = 0
        for (let j = 0; j < series.length; j++) {
          const value = series[j].data[i]
          sum += value
          if (index == j) {
            break
          }

        }
        return yScale(sum)
      })
      .attr('height', function(d) {
        return height - yScale(d)
      })
      .attr('fill', dataset.color)
    return this
  }

}