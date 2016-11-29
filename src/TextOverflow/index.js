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

  componentWillUnmount() {
    this.popover && this.popover.unmount()
  }

  getPopoverProps() {
    const { className, children, ...other } = this.props
    return {
      triggerNode: ReactDOM.findDOMNode(this),
      onMouseEnter: () => {
        clearTimeout(this.closeTimer)
      },
      onMouseLeave: () => {
        this.closeTimer = setTimeout(::this.popover.close, 150)
      },
      className: classnames('bfd-text-overflow__popover', className),
      content: children.props.children,
      ...other
    }
  }

  getTriggerProps() {
    const { className, children, direction, align, ...other } = this.props
    return {
      className: classnames(children.props.className, 'bfd-text-overflow'),
      onMouseEnter: e => {
        const target = e.currentTarget
        if (target.offsetWidth < target.scrollWidth) {
          clearTimeout(this.closeTimer)
          this.openTimer = setTimeout(() => {
            if (!this.popover) {
              this.popover = new Popover(::this.getPopoverProps)
            }
            this.popover.open()
          }, 150)
        }
      },
      onMouseLeave: () => {
        clearTimeout(this.openTimer)
        this.closeTimer = setTimeout(() => {
          this.popover && this.popover.close()
        }, 150)
      }
    }
  }

  render() {
    const { children } = this.props
    return React.cloneElement(children, this.getTriggerProps())
  }
}

TextOverflow.defaultProps = {
  direction: 'up',
  align: 'middle'
}

TextOverflow.propTypes = {

  children: PropTypes.element.isRequired,

  // 提示框位置方向，默认 `up`
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),

  // 提示框对齐方式，默认 `middle`
  align: PropTypes.oneOf(['top', 'right', 'bottom', 'left', 'middle'])
}

export default TextOverflow
