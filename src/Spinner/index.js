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
import './index.less'

const Spinner = props => {

  const { className, style, height, ...other} = props

  if (typeof height !== 'undefined') {
    other.style = Object.assign(style || {}, {
      width: height + 'px',
      height: height + 'px'
    })
  }

  return (
    <div className={classnames('bfd-spinner', className)} {...other}>
      {Array.from({length: 12}).map((v, i) => (
        <div key={i} className={`bfd-spinner__child-${i + 1}`} />
      ))}
    </div>
  )
}

Spinner.propTypes = {

  // 高度，默认 30 px，宽度与高度相同
  height: PropTypes.number
}

export default Spinner