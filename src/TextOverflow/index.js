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
import '../Tooltip/index.less'

class TextOverflow extends Component {
  render() {
    const { children, className, ...other } = this.props
    return (
      <Popover
        className={classnames('bfd-tooltip__popover', className)}
        content={children.props.children}
        shouldOpen={() => {
          if (!this.rootNode) {
            this.rootNode = ReactDOM.findDOMNode(this)
          }
          return this.rootNode.offsetWidth < this.rootNode.scrollWidth
        }}
        {...other}
      >
        {React.cloneElement(children, {
          className: classnames(children.props.className, 'bfd-text-overflow')
        })}
      </Popover>
    )
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
