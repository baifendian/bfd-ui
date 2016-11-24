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
    this.context.dropdown.menu = this
    return (
      <div className={classnames('bfd-dropdown__menu', {
        'bfd-dropdown__menu--right': right
      }, className)} {...other}>
        {children}
      </div>
    )
  }
}

DropdownMenu.contextTypes = {
  dropdown: PropTypes.object
}

DropdownMenu.propTypes = {
  right: PropTypes.bool
}

export default DropdownMenu
