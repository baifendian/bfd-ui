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

const Checkbox = props => {

  const { children, className, block, onClick, ...inputProps } = props

  const classNames = classnames('bfd-checkbox', {
    'bfd-checkbox--disabled': inputProps.disabled,
    'bfd-checkbox--block': block
  }, className)
  
  return (
    <label className={classNames} onClick={e => {
      if (e.target.tagName === 'INPUT') {
        e.stopPropagation()
      } else {
        onClick && onClick(e)
      }
    }}>
      <input 
        type="checkbox" 
        className="bfd-checkbox__input"
        {...inputProps}
      />
      <span className="bfd-checkbox__status" />
      {children && <span className="bfd-checkbox__text">{children}</span>}
    </label>
  )
}

Checkbox.propTypes = {

  // 值，如果结合 ChecboxGroup 使用，与其选中的值相对应
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  
  // 是否选中
  checked: PropTypes.bool,

  // 初始是否选中（不可控）
  defaultChecked: PropTypes.bool,

  // 切换选中后的回调，参数为 event 对象
  onChange: PropTypes.func,

  // 是否禁用
  disabled: PropTypes.bool,
  
  // 是否块级布局
  block: PropTypes.bool,
  
  customProp({ checked, onChange }) {
    if (checked && !onChange) {
      return new Error('You provided a `checked` prop without an `onChange` handler')
    }
  }
}

export default Checkbox