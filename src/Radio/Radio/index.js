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

const Radio = props => {

  const { children, className, onClick, ...inputProps } = props
  
  const classNames = classnames('bfd-radio', {
    'bfd-radio--disabled': inputProps.disabled
  }, className)

  return (
    <label className={classNames} onClick={e => {
      if (e.target.tagName === 'INPUT') {
        e.stopPropagation()
      } else {
        onClick && onClick(e)
      }
    }}>
      <input type="radio" {...inputProps} />
      <span className="bfd-radio__status"></span>
      {children && <span className="bfd-radio__text">{children}</span>}
    </label>
  )
}

Radio.propTypes = {

  // 值，如果结合 RadioGroup 使用，与其 value 或 defaultValue 对应
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  // 单独使用时，是否选中，与 RadioGroup 一起使用时无需指定
  checked: PropTypes.bool,

  // 单独使用时，初始是否选中（不可控），与 RadioGroup 一起使用时无需指定
  defaultChecked: PropTypes.bool,

  // 单独使用时，切换选中后的回调，参数为 event 对象，与 RadioGroup 一起使用时无需指定
  onChange: PropTypes.func,

  // 是否禁用
  disabled: PropTypes.bool
}

export default Radio