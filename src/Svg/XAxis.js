/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule src/Svg/XAxis.js
 */

import d3 from 'd3'
import Axis from './Axis'

export default class XAxis extends Axis {
  
  constructor(options) {

    super(options)

    this.scale = d3.scale.ordinal()
      .domain(this.categories)
      .rangePoints([0, this.length])

    this.axis.orient('bottom')
      .scale(this.scale)
      .tickSize(0, 0)
      .tickPadding(10)

    this.container.attr('class', 'axis-x')
      .attr('transform', `translate(0, ${this.top})`)
      .call(this.axis)
  }

  getPaddingScale() {
    return 20 / (this.length / this.categories.length)
  }

  getPositionByIndex(index) {
    return this.getPosition(this.categories[index])
  }
}