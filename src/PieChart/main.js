/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import './main.less'
import d3 from 'd3'
import initPie from './pie'
import assembleTooltip from './assembleTooltip'
import assembleLegend from './assembleLegend'
import color from './color'

export default class {

  constructor(config) {

    const padding = [100, 60]
    const {
      container,
      data,
      name,
      animation,
      radius,
      tooltip,
      legend
    } = config

    const env = {}
    env.container = container
    env.config = {}
    env.config.data = data
    env.config.name = name
    env.config.legend = {
      layout: legend.layout || 'vertical',
      align: legend.align || 'right',
      style: {
        x: legend.style.x || 0,
        y: legend.style.y || 0
      }
    }
    if (animation) env.config.animation = animation
    if (radius) env.config.radius = radius
    if (tooltip) env.config.tooltip = tooltip

    env.container.style.position = 'relative'

    env.config.legend.layout == 'vertical' ? env.width = env.container.clientWidth - padding[0] : env.width = env.container.clientWidth
    env.height = (env.container.clientHeight || env.container.clientWidth)

    if (!env.config.data) return

    // 获取颜色。 
    const colors = config.colors || color(2, env.config.data.length)

    for (let i = 0; i < env.config.data.length; i++) {
      env.config.data[i].color = colors[i]
      env.config.data[i].id = i
    }

    env.config.dataLegend = []
    for (const k in env.config.data) env.config.dataLegend.push(env.config.data[k])

    env.svg = d3.select(env.container)
      .append('svg')
      .attr('width', env.width)
      .attr('height', env.height)
      .append('g')


    if (env.config.legend.align == 'left') d3.select(env.container).select('svg').style('margin-left', padding[0] + 'px')
    if (env.config.legend.align == 'top') d3.select(env.container).select('svg').style('margin-top', padding[1] + 'px')
    if (env.config.legend.align == 'bottom') d3.select(env.container).select('svg').style('margin-bottom', padding[1] + 'px')

    env.svg.attr('transform', 'translate(' + (env.width / 2 + 10) + ',' + (env.width / 2 + 10) + ')')

    // 添加3个g标签，分别是 pie-lines pie-slices pie-labels
    env.svg.append('g')
      .attr('class', 'pie-lines')
    env.svg.append('g')
      .attr('class', 'pie-slices')
    env.svg.append('g')
      .attr('class', 'pie-labels')

    /*
     *init legend
     */
    assembleLegend(env)

    /*
     *init pie
     */
    initPie(env, true)

    /*
     *init tooltip
     */
    if (!env.config.tooltip || env.config.tooltip.enabled !== false) {
      assembleTooltip(env, true)
    }

    /*
     *自适应容器大小
     */

    let __w = env.container.clientWidth
    window.onresize = function() {

      if (env.container.clientWidth != __w) {

        env.svg.select('.pie-slices').selectAll('path').remove()
        env.svg.select('.pie-labels').selectAll('text').remove()
        env.svg.select('.pie-lines').selectAll('polyline').remove()

        env.config.legend.layout == 'vertical' ? env.width = env.container.clientWidth - padding[0] : env.width = env.container.clientWidth
        env.svg.attr('transform', 'translate(' + (env.width / 2 + 10) + ',' + (env.width / 2 + 10) + ')')

        d3.select(env.container)
          .select('svg')
          .attr('width', env.width)
          .attr('height', env.height)

        initPie(env, false)

        assembleTooltip(env, false)

        __w = env.container.clientWidth
      }

    }
  }
}