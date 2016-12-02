/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import Popover from '../Popover'

class Tooltip extends Component {

  constructor(props) {
    super()
    if (props.triggerMode === 'click') {
      this.handleBodyClick = () => {
        this.popover.close()
      }
    }
  }

  componentDidMount() {
    this.popover = new Popover(::this.getPopoverProps)
    this.handleBodyClick && window.addEventListener('click', this.handleBodyClick)
  }

  componentDidUpdate() {
    this.popover.update()
  }

  componentWillUnmount() {
    this.popover.unmount()
    this.handleBodyClick && window.removeEventListener('click', this.handleBodyClick)
  }

  getPopoverProps() {
    const { triggerMode, title, ...other } = this.props
    const props = {
      triggerNode: ReactDOM.findDOMNode(this),
      content: title,
      ...other
    }
    if (triggerMode === 'hover') {
      props.onMouseEnter = () => {
        clearTimeout(this.closeTimer)
      }
      props.onMouseLeave = () => {
        this.closeTimer = setTimeout(::this.popover.close, 150)
      }
    } else {
      props.onClick = e => e.stopPropagation()
    }
    return props
  }

  getTriggerProps() {
    const { triggerMode } = this.props
    const props = {}
    if (triggerMode === 'hover') {
      props.onMouseEnter = () => {
        clearTimeout(this.closeTimer)
        this.openTimer = setTimeout(::this.popover.open, 150)
      }
      props.onMouseLeave = () => {
        clearTimeout(this.openTimer)
        this.closeTimer = setTimeout(::this.popover.close, 150)
      }
    } else {
      props.onClick = e => {
        e.stopPropagation()
        this.popover.toggle()
      }
    }
    return props
  }

  render() {
    const { children } = this.props
    return React.cloneElement(children, this.getTriggerProps())
  }
}

Tooltip.defaultProps = {
  triggerMode: 'hover',
  direction: 'up',
  align: 'middle'
}

Tooltip.propTypes = {

  children: PropTypes.element.isRequired,

  // 提示框显示内容，可以是文本字符串，也可以是 React 元素
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

  // 提示框触发方式，默认 `hover`
  triggerMode: PropTypes.oneOf(['hover', 'click']),

  // 提示框位置方向，默认 `up`
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),

  // 提示框对齐方式，默认 `middle`
  align: PropTypes.oneOf(['top', 'right', 'bottom', 'left', 'middle'])
}

export default Tooltip
