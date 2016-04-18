/**
 * China map based on d3.js
 */
import d3 from 'd3'
import json from './china.geo.json'

export default class {

  constructor(config) {

    const { container } = config

    const width = container.clientWidth
    const height = container.clientHeight || width * .7

    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    // 创建投影(projection)，经纬度转像素坐标
    const projection = d3.geo.mercator()
      .translate([width / 2, height / 2])
      .center([104, 38])
      .scale(width * .82)

    // 创建path
    const path = d3.geo.path().projection(projection)

    svg.selectAll('path')
      .data(json.features)
      .enter()
      .append('path')
      .attr('d', path)
      .on('mouseover', function(data) {
        
        d3.select(this).attr('fill', '#64b5f6')

        // 创建显示tooltip用的矩形
        svg.append('rect')
          .attr('id', 'tooltip1')
          .attr('x', 50)
          .attr('y', 50)
          .attr('width', 140)
          .attr('height', 130)
          .attr('stroke', 'black')
          .attr('fill', 'none')

        // 创建显示tooltip文本
        svg.append('text')
          .attr('id', 'tooltip2')
          .attr('x', 100)
          .attr('y', 100)
          .attr('text-anchor', 'middle')
          .attr('font-family', 'sans-serif')
          .attr('font-size', '11px')
          .attr('font-weight', 'bold')
          .attr('fill', 'black')
          .text(data.properties.name)
      })
      .on('mouseout', function() {
        d3.select(this).attr('fill', '#ccc')
        // Remove the tooltip
        d3.select('#tooltip1').remove()
        d3.select('#tooltip2').remove()
      })
      .attr('fill', function(d) {
        if (d.id === 'an_hui') {
          return '#64b5f6'
        }
        return '#ccc'
      })
      .attr('stroke', 'rgba(255,255,255,1)')
      .attr('stroke-width', 1)

    // 经纬度像素坐标
    // svg.selectAll('circle')
    //   .data(json.features)
    //   .enter()
    //   .append('circle')
    //   .attr("transform", function(d) {
    //     return "translate(" + projection(d.properties.cp) + ")";
    //   })
    //   .attr('r', 2)
    //   .attr('fill', 'red')
  }
}