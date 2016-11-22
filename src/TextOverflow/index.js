/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import invariant from 'invariant'
import Popover from '../Popover'
import './index.less'

class TextOverflow extends Component {

  componentDidMount() {
    this.popover = new Popover(this.getPopoverProps())
  }

  componentDidUpdate() {
    const { direction } = this.props
    this.popover.render({ direction })
  }

  componentWillUnmount() {
    this.popover.unmount()
  }

  getPopoverProps() {
    return {
      triggerNode: ReactDOM.findDOMNode(this),
      onMouseEnter: () => {
        clearTimeout(this.closeTimer)
      },
      onMouseLeave: () => {
        this.closeTimer = setTimeout(::this.popover.close, 150)
      },
      ...this.props
    }
  }

  getTriggerProps() {
    const { children } = this.props
    return {
      onMouseEnter: e => {
        const target = e.currentTarget
        if (target.offsetWidth < target.scrollWidth) {
          clearTimeout(this.closeTimer)
          this.openTimer = setTimeout(() => {
            this.popover.render({content: children.props.children})
            this.popover.open()
          }, 150)
        }
      },
      onMouseLeave: () => {
        clearTimeout(this.openTimer)
        this.closeTimer = setTimeout(::this.popover.close, 150)
      },
      className: classnames(children.props.className, 'bfd-text-overflow')
    }
  }

  render() {
    const { children } = this.props
    invariant(!children.length, 'Children should be single, check the children of TextOverflow')
    return React.cloneElement(children, this.getTriggerProps())
  }
}

TextOverflow.propTypes = {

  // 提示框位置方向，可选值：up/down/left/right，默认自适应
  direction: PropTypes.string
}

export default TextOverflow
