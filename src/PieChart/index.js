/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React from 'react'
import Chart from '../Chart'
import PieChart from './main'


export default React.createClass({
  render() {
    return <Chart type={PieChart} className="bfd-pie-chart" {...this.props}/>
  }
})