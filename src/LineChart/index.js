/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import './index.less'
import React, { PropTypes } from 'react'
import classnames from 'classnames'
import Chart from '../Chart'
import Main from './main'

const LineChart = props => {
  const { className, ...other } = props
  return (
    <Chart type={Main} className={classnames('bfd-line-chart', className)} {...other} />
  )
}

LineChart.propTypes = {

  // Y 轴字段配置
  cols: PropTypes.object.isRequired,

  // X 轴字段 key
  category: PropTypes.string.isRequired,

  // 线的颜色值，数组的形式按顺序配置
  colors: PropTypes.array,

  /**
   * Y 轴相关配置
   * ```js
   * {
   *   // Y字段值格式，默认 '.2s', 其他格式配置参考 
   *   // https://github.com/d3/d3-format 
   *   format: '.2%'
   * }
   * ```
   */
  yAxis: PropTypes.object,

  /**
   * 数据源，格式：
   * ```js
   * // 字段分别对应 cols 和 category 的配置
   * [{
   *   user: 100,
   *   sales: 3432,
   *   date: "2016-01-01"
   * }]
   * ```
   */
  data: PropTypes.object,

  // URL 数据源，格式同 data
  url: PropTypes.string
}

export default LineChart