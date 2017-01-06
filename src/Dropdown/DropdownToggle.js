/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React from 'react'
import classnames from 'classnames'

const DropdownToggle = props => {
  const { className, children, open, ...other } = props
  return (
    <div className={classnames('bfd-dropdown-toggle', {
      'bfd-dropdown-toggle--open': open
    }, className)} {...other}>
      {children}
    </div>
  )
}

export default DropdownToggle
