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
import Popover from '../Popover'
import './index.less'

class TextOverflow extends Component {

  componentDidMount() {
    const triggerNode = ReactDOM.findDOMNode(this)
    this.popover = new Popover({
      triggerNode,
      shouldOpen: () => triggerNode.offsetWidth < triggerNode.scrollWidth,
      ...this.getPopoverOptions()
    })
  }

  componentDidUpdate(prevProps, prevState) {
    this.popover.update(this.getPopoverOptions())
  }

  componentWillUnmount() {
    this.popover.unmount()
  }

  getPopoverOptions() {
    const { className, children, ...other } = this.props
    return {
      className: classnames('bfd-text-overflow__popover', className),
      content: children.props.children,
      ...other
    }
  }

  render() {
    const { children } = this.props
    return React.cloneElement(children, {
      className: classnames(children.props.className, 'bfd-text-overflow')
    })
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
