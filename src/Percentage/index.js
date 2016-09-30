/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component, PropTypes } from 'react'
import { findDOMNode } from 'react-dom'
import classnames from 'classnames'
import shouldComponentUpdate from '../shouldComponentUpdate'
import './index.less'

class Percentage extends Component {

  constructor() {
    super()
    this.state = {}
  }

  shouldComponentUpdate = shouldComponentUpdate

  componentDidMount() {
    this.setState({size: findDOMNode(this).clientWidth})
  }

  componentDidUpdate() {
    const { percent } = this.props
    const circle = this.refs.foreCircle
    circle.clientWidth
    circle.style.strokeDashoffset = this.dash * (1 - (percent / 100))
  }

  renderSvg() {

    const { percent, foreColor, backColor, textColor, ...other } = this.props
    const { size } = this.state

    if (!size) return
    
    const strokeWidth = size / 20
    const radius = size / 2 - strokeWidth / 2
    const fontSize = size * .25
    const shareProps = {
      r: radius,
      fill: 'none',
      strokeWidth,
      cx: size / 2,
      cy: size / 2
    }

    this.dash = Math.PI * radius * 2

    return (
      <svg width={size} height={size} {...other}>
        <circle stroke={backColor} {...shareProps} />
        <circle 
          ref="foreCircle"
          stroke={foreColor} 
          style={{
            transition: 'stroke-dashoffset 1s ease-out',
            'strokeDasharray': this.dash,
            'strokeDashoffset': this.dash
          }}
          {...shareProps}
        />
        <text 
          textAnchor="middle" 
          fontSize={fontSize} 
          fill={textColor} 
          x={size / 2} 
          y={size / 2} 
          dy=".3em"
        >
          {percent + '%'}
        </text>
      </svg>
    )
  }

  render() {
    const { className, ...other } = this.props
    return (
      <div className={classnames('bfd-percentage', className)} {...other}>
        {this.renderSvg()}
      </div>
    )
  }
}

Percentage.defaultProps = {
  backColor: '#f5f5f5',
  foreColor: '#2196f3',
  textColor: '#2196f3'
}

Percentage.propTypes = {

  // 百分比数值
  percent: PropTypes.number.isRequired,

  // 前景色，默认主色调颜色
  foreColor: PropTypes.string,

  // 背景色，默认 #f5f5f5
  backColor: PropTypes.string,

  // 文字颜色，默认主色调颜色
  textColor: PropTypes.string,

  customProp({ percent }) {
    if (percent < 0 || percent > 100) {
      return new Error('`percent` should in domain [0, 100]')
    }
  }
}

export default Percentage