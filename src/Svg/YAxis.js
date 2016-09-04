/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule src/Svg/YAxis.js
 */

import d3 from 'd3'
import Axis from './Axis'

export default class YAxis extends Axis {
  
  constructor(options) {

    super(options)

    this.scale = d3.scale.linear()
      .domain(this.getDomain())
      .range([this.length, 0])

    const format = d3.format(this.format || '.2s')
    this.axis.scale(this.scale)
      .orient('left')
      .tickValues(this.getTickValues())
      .tickFormat(d => format(d))
      .tickSize(-this.right, 10)

    this.container.attr('class', 'axis-y')
      .call(this.axis)
  }

  getDomain() {
    const domain = d3.extent(this.series.reduce((current, next) => {
      [].push.apply(current, d3.extent(next.data))
      return current
    }, []))
    if (domain[0] > 0) {
      domain[0] = 0
    }
    domain[1] *= 1.1
    return domain
  }

  getTickValues() {
    const max = this.scale.invert(0)
    const values = []
    const step = max / 5
    for (let i = 0; i <= 5; i++) {
      values.push(step * i)
    }
    return values
  }

  setSeries(series) {
    this.series = series
    this.scale.domain(this.getDomain())
    this.axis.tickValues(this.getTickValues())
    this.container.transition().duration(500).call(this.axis)
  }
}