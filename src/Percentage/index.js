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
import invariant from 'invariant'
import shouldComponentUpdate from '../shouldComponentUpdate'
import './index.less'

class Percentage extends Component {

  constructor() {
    super()
    this.state = {}
  }

  shouldComponentUpdate = shouldComponentUpdate

  componentDidMount() {
    const $root = findDOMNode(this)
    const width = this.props.width || ($root && $root.offsetWidth)
    if (width) {
      this.setState({size: width})
    } else {
      invariant(
        false,
        `The container width for \`Percentage\` is undefined, Check the width of \`Percentage\`.`
      )
    }
  }

  componentDidUpdate() {
    this.animate()
  }

  animate() {
    const { percent } = this.props
    const { foreCircle, text } = this.refs
    const dashOffset = this.dash * percent / 100
    const duration = 800
    let start = null
    const step = timestrap => {
      if (!start) start = timestrap
      const progress = timestrap - start
      const scale = Math.pow(progress / duration, 3)
      foreCircle.style.strokeDashoffset = this.dash - dashOffset * scale
      text.textContent = Math.round(percent * scale) + '%'
      if (progress < duration) {
        window.requestAnimationFrame(step)
      }
    }
    window.requestAnimationFrame(step)
  }

  renderSVG() {
    const { size } = this.state
    if (!size) return null

    const { percent, foreColor, backColor, textColor } = this.props
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
      <svg width={size} height={size}>
        <circle stroke={backColor || '#f5f5f5'} {...shareProps} />
        <circle
          ref="foreCircle"
          stroke={foreColor || '#2196f3'}
          strokeLinecap="round"
          strokeDasharray={this.dash}
          style={{strokeDashoffset: this.dash}}
          {...shareProps}
        />
        <text
          ref="text"
          textAnchor="middle"
          fontSize={fontSize}
          fill={textColor || foreColor || '#2196f3'}
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
    const {
      className, width, percent, foreColor, backColor, textColor, ...other
    } = this.props
    return (
      <div className={classnames('bfd-percentage', className)} {...other}>
        {this.renderSVG()}
      </div>
    )
  }
}

Percentage.propTypes = {

  // 宽度，单位像素，如果不指定，则按父元素内容宽度自适应。也可以通过 css 控制
  width: PropTypes.number,

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
