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

class DropdownToggle extends Component {
  render() {
    const { children, className, ...other } = this.props
    const { dropdown } = this.context
    dropdown.toggle = this
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
}

DropdownToggle.contextTypes = {
  dropdown: PropTypes.object
}

export default DropdownToggle