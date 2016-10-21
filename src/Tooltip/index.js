/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { PropTypes } from 'react'
import warning from 'warning'
import tooltip from './tooltip'

const Tooltip = props => {

  const { children, title } = props

  if (process.env.NODE_ENV !== 'production') {
    warning(!children.length, 'Children should be single, check the children of Tooltip.')
  }

  let timer

  return React.cloneElement(children, {
    onMouseEnter: e => {
      const target = e.currentTarget
      tooltip.clearCloseTimer()
      timer = setTimeout(() => {
        tooltip(title, target)
      }, 200)
    },
    onMouseLeave: () => {
      clearTimeout(timer)
      tooltip.registerCloseTimer(setTimeout(tooltip.close, 200))
    }
  })
}

Tooltip.propTypes = {

  // 提示框显示内容，可以是文本字符串，也可以是 React 元素
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element])
}

export default Tooltip
