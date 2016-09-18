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

const DropdownMenu = props => {
  const { children, className, right, ...other } = props
  return (
    <div className={classnames('bfd-dropdown__menu', {
      'bfd-dropdown__menu--right': right
    }, className)} {...other}>
      {children}
    </div>
  )
}

DropdownMenu.propTypes = {
  // 是否右对齐
  right: PropTypes.bool
}

export default DropdownMenu