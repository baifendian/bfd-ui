/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import d3 from 'd3'

export default class Axis {
  
  constructor(options) {
    Object.assign(this, options)
    this.axis = d3.svg.axis()
  }

  getPosition(value) {
    return this.scale(value)
  }
}