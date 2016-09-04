/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule src/Radio/Radio/index.js
 */

import './index.less'
import React, { PropTypes } from 'react'
import classnames from 'classnames'

const Radio = props => {

  const { className, value, checked, disabled, onChange, children, ...other } = props
  const { ...inputProps } = { value, checked, disabled, onChange }
  
  const classNames = classnames('bfd-radio', {
    'bfd-radio--disabled': disabled
  }, className)
  return (
    <label className={classNames} {...other}>
      <input type="radio" {...inputProps} />
      <span className="bfd-radio__status"></span>
      <span className="bfd-radio__text">{children}</span>
    </label>
  )
}

Radio.propTypes = {

  // 值，与 RadioGroup value 对应
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,

  // 是否禁用
  disabled: PropTypes.bool
}

export default Radio