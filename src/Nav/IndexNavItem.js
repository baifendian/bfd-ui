/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { PropTypes } from 'react'
import NavItem from './NavItem'

const IndexNavItem = props => <NavItem index {...props} />

IndexNavItem.propTypes = {

  // 菜单图标，参考 Icon 组件 type 属性
  icon: PropTypes.string,

  // 菜单标题
  title: PropTypes.string
}

export default IndexNavItem