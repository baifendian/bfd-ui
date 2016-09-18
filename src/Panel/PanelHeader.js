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

const PanelHeader = props => {
  const { children, className, ...other } = props
  return (
    <div className={classnames('bfd-panel__header', className)} {...other}>
      {children}
    </div>
  )
}

export default PanelHeader