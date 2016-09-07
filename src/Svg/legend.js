/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import d3 from 'd3'

export default class {

  constructor(config) {
    this.container = config.container
  }

  create(dataset, callback) {
    const container = this.container
    d3.select(container)
      .append('div')
      .attr('class', 'legend')
      .selectAll('div')
      .data(dataset)
      .enter()
      .append('div')
      .style('cursor', 'pointer')
      .style('text-align', 'center')
      .each(function(d, i) {
        const node = d3.select(this)
        node.append('span')
          .attr('class', 'line')
          .style('background-color', dataset[i].color)
        node.append('br')
        node.append('span')
          .attr('class', 'text')
          .text(d.name)
      })
      .on('click', function(d, i) {
        const node = d3.select(this)
        const isDisabled = node.classed('disabled')
        node.classed('disabled', !isDisabled)
        dataset[i].disabled = !isDisabled
        if (typeof callback == 'function') {
          callback(i, !isDisabled)
        }
      })
  }
}