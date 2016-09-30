/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import 'font-awesome/css/font-awesome.css'
import React, { PropTypes } from 'react'
import classnames from 'classnames'

const Icon = props => {
  const { className, type, ...other } = props
  return (
    <i className={classnames('bfd-icon fa', 'fa-' + type, className)} {...other}></i>
  )
}

Icon.propTypes = {
  // 图标类型，http://fontawesome.io/icons/
  type: PropTypes.string.isRequired
}

export default Icon