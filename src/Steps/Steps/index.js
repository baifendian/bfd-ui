/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component, PropTypes } from 'react'
import findAllByType from '../../findAllByType'
import classnames from 'classnames'
import Step from '../Step'
import './main.less'

class Steps extends Component {
  constructor() {
    super()
    this.state = {
      width: 0,
      height: 0
    }
  }

  render() {

    const rows = []
    const { children, className, height, current, onStepClick, ...other } = this.props
    const items = findAllByType(children, Step)
    items.map((item, index) => {
      rows.push(<Step 
        key={index} 
        index={index}         
        current={this.props.current || 0}
        icon={item.props.icon}
        max={items.length}
        width={this.state.width} 
        height={this.state.height} 
        title={item.props.title || ''}
        onStep={this.props.onStepClick}
        />)
    })

    return (
      <div 
        ref="container"
        style={{height: this.props.height+'px'}} 
        className={classnames('bfd-steps', className)} {...other}>
        {rows}
      </div>
    )
  }

  componentDidMount() {
    const container = this.refs.container
    if (!parseInt(getComputedStyle(container).height, 10)) {
      container.style.height = '100%'
    }

    const width = this.refs.container.clientWidth
    const height = this.refs.container.clientHeight
    const {
      children
    } = this.props
    const items = findAllByType(children, Step)
    this.setState({
      width: width / items.length,
      height
    })
  }
}

Steps.propTypes = {

  // 步骤条高度
  height: PropTypes.number,

  // 指定当前步骤，从 0 开始记数
  current: PropTypes.number.isRequired,

  // 点击事件，参数返回索引值和名称
  onStepClick: PropTypes.func.isRequired
}

export default Steps