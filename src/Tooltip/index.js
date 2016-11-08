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
import invariant from 'invariant'
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
    this.popover = new Popover(this.getPopoverProps())
    window.addEventListener('click', this.handleBodyClick)
  }

  componentDidUpdate() {
    const { title, direction } = this.props
    this.popover.render({
      content: title,
      direction
    })
  }

  componentWillUnmount() {
    this.popover.unmount()
    window.removeEventListener('click', this.handleBodyClick)
  }

  getPopoverProps() {
    const { triggerMode, title, direction } = this.props
    const props = {
      triggerNode: ReactDOM.findDOMNode(this),
      content: title,
      direction
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
    invariant(!children.length, 'Children should be single, check the children of Tooltip.')
    return React.cloneElement(children, this.getTriggerProps())
  }
}

Tooltip.defaultProps = {
  triggerMode: 'hover'
}

Tooltip.propTypes = {

  // 提示框显示内容，可以是文本字符串，也可以是 React 元素
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),

  // 提示框位置方向，可选值：up/down/left/right，默认自适应
  direction: PropTypes.string,

  // 提示框触发方式，可选值：hover/click，默认 hover
  triggerMode: PropTypes.string
}

export default Tooltip
