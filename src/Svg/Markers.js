/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

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