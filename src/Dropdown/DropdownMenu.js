/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule src/Dropdown/DropdownMenu.js
 */

import React from 'react'
import classnames from 'classnames'

const DropdownMenu = props => {
  const { className, children, ...other } = props
  return (
    <div className={classnames('bfd-dropdown__menu', className)} {...other}>{children}</div>
  )
}

export default DropdownMenu