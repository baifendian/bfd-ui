/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

class DropdownMenu extends Component {
  render() {
    const { children, className, right, ...other } = this.props
    return null
  }
}

DropdownMenu.defaultProps = {
  direction: 'down',
  align: 'left'
}

DropdownMenu.propTypes = {

  // 展开方向，默认 `down`，如果实际空间不足，则可能自适应改变方向
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),

  // 对齐方式，默认 `left`
  align: PropTypes.oneOf(['top', 'right', 'bottom', 'left', 'middle']),

  // 是否右对齐，建议用 `align="right"` 代替
  right: PropTypes.bool
}

export default DropdownMenu
