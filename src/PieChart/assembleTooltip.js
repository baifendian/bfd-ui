/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule src/PieChart/assembleTooltip.js
 */

import d3 from 'd3'

export default (env, flag) => {

  // clear tooltip.
  d3.select(env.container).selectAll('.bcharts-tooltip').remove()

  // 添加一个提示框
  const tooltip = d3.select(env.container)
    .append('div')
    .style({
      position: 'absolute',
      opacity: 0,
      'pointer-events': 'none'
    })
    .attr('class', 'bcharts-tooltip')

  env.svg.select('.pie-slices')
    .selectAll('.bfd-pie-md')
    .on('click', function(d) {
      d3.select('.pie-slices').selectAll('.bfd-pie-lg').style('display', 'none')
      d3.select('.pie-slices').selectAll('.bfd-pie-md').style('display', 'block')
      d3.select(env.container).selectAll('.bfd-pie-flag').style('display', 'none')
      d3.select('.pie-slices').selectAll('path[fill="' + d.data.color + '"]').style('display', 'block')
      d3.select(this).style('display', 'none')

      if (env.config.tooltip.point && typeof env.config.tooltip.point.events.click === 'function') {
        env.config.tooltip.point.events.click(d.data)
      }
    })


  env.svg.select('.pie-slices')
    .selectAll('.bfd-pie-md,.bfd-pie-lg')
    .on('mouseover', function(d) {
      // 计算份额的百分比
      const percent = Number(d.value) / d3.sum(flag ? env.config.data : env.config.dataLegend, function(d) {
        return d.value
      }) * 100

      tooltip.html(env.config.name + '<br/>' + d.data.name + ':' + d.data.value + '(' + percent.toFixed(0) + '%)')
        .style('left', (d3.event.layerX) + 'px')
        .style('top', (d3.event.layerY + 50) + 'px')
        .style('opacity', 1.0)
    })
    .on('mousemove', function() {
      /* left 和 top 来改变提示框的位置 */
      tooltip.style('left', (d3.event.layerX) + 'px')
        .style('top', (d3.event.layerY + 50) + 'px')
    })
    .on('mouseout', function() {
      tooltip.style('opacity', 0.0)
    })
}