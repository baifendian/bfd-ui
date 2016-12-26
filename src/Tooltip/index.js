/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { PropTypes } from 'react'
import classnames from 'classnames'
import Popover from '../Popover'

const Tooltip = props => {
  const { children, className, title, ...other } = props
  return (
    <Popover
      className={classnames('bfd-tooltip__popover', className)}
      content={title}
      {...other}
    >
      {children}
    </Popover>
  )
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
