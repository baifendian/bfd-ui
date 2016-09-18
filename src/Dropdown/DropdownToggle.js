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

const DropdownToggle = (props, context) => {
  const { children, className, ...other } = props
  const { dropdown } = context
  return (
    <div 
      className={classnames('bfd-dropdown__toggle', className)}
      onClick={() => dropdown.handleToggle()}
      {...other}
    >
      {children}
    </div>
  )
}

DropdownToggle.contextTypes = {
  dropdown: PropTypes.object
}

export default DropdownToggle