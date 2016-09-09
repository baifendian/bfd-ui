/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import d3 from 'd3'
import Svg from '../Svg/svg'
import Rect from '../Svg/stackedRect'
import Legend from '../Svg/legend'
import Color from '../Svg/color'

export default class {

  /**
   * 获取Y轴最大最小值区间
   */
  getDomain(series) {
    const maxs = []
    series.forEach(serie => {
      const data = serie.data
      for (let i = 0; i < data.length; i++) {
        const value = data[i]
        if (i >= maxs.length) {
          maxs.push(value)
        } else {
          maxs[i] = maxs[i] + value
        }
      }
    })
    const max = d3.max(maxs) || 0
    return [0, max * 1.05]
  }

  constructor(config) {

    const {
      container,
      category,
      cols,
      data
    } = config

    //  画布周边的空白
    const padding = {
      left: 45,
      right: 10,
      top: 50,
      bottom: 30
    }
    const color = new Color('C2') // 默认第二色系
    const width = container.clientWidth - padding.left - padding.right
    const height = (container.clientHeight || width * .5) - padding.top - padding.bottom

    config.width = width
    config.height = height
    config.padding = padding

    /**
     * tooltip 浮层对象节点
     * @type {node}
     */
    const tooltipElement = d3.select(container)
      .append('div')
      .attr('class', 'tooltip')
      .style({
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0,
        'pointer-events': 'none'
      })

    const arrow = d3.select(container).append('div')
      .attr('class', 'arrow-down')
      .style({
        position: 'absolute',
        left: 0,
        top: 0,
        opacity: 0,
        'pointer-events': 'none'
      })

    /**
     * 转换数据格式
     */
    let series = Object.keys(cols).map((key, i) => {
      return {
        key,
        name: cols[key],
        data: [],
        color: color.getDefault(i) || color.getColor(0, color.getDefault())
      }
    })

    //  X轴节点数
    const categories = []

    data.forEach(item => {
      categories.push(item[category])
      series.forEach(serie => {
        serie.data.push(item[serie.key])
      })
    })

    //  x轴的比例尺
    const xScale = d3.scale.ordinal()
      .domain(categories)
      .rangeRoundBands([0, width])

    //  y轴的比例尺
    const yScale = d3.scale.linear()
      .domain(this.getDomain(series))
      .range([height, 0])
      .nice()

    config.series = series
    config.categories = categories
    config.xScale = xScale
    config.yScale = yScale

    const svg = new Svg(config).create({
      highBg: 1
    })

    const rect = new Rect({
      div: tooltipElement,
      svg: svg.getSvg(),
      arrow,
      height,
      padding,
      cols,
      xScale,
      yScale
    })

    series.map((serie, index) => {
      rect.create(series, serie, categories, series.length, index)
    })

    const _this = this
    const _series = [...series]
    new Legend(config).create(_series, function() {
      //  onClickCallback
      series = _series.filter(serie => !serie.disabled)

      yScale.domain(_this.getDomain(series)).nice()

      svg.setYScale(yScale)
      svg.setSeries(series)

      svg.getSvg().selectAll('rect.MyRect').remove()

      rect.resetYScale(yScale)

      series.map((serie, i) => {
        rect.create(series, serie, categories, series.length, i)
      })
    })
  }
}