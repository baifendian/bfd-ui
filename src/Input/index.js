/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule src/Input/index.js
 */

import './index.less'
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

class Input extends Component {

  /**
   * @public
   * @name this.refs.input.focus
   * @description 同 HTMLInputElement.focus()
   */
  focus() {
    this.refs.input.focus()
  }

  /**
   * @public
   * @name this.refs.input.select
   * @description 同 HTMLInputElement.select()
   */
  select() {
    this.refs.input.select()
  }

  render() {
    const { className, size, ...other } = this.props
    const classNames = classnames(
      'bfd-input', 
      {
        [`bfd-input--${size}`]: size
      },
      className
    )
    return <input ref="input" className={classNames} { ...other } />
  }
}

Input.propTypes = {

  // 输入框的值
  value: PropTypes.string,

  // 初始化输入框的值
  defaultValue: PropTypes.string,

  // 输入改变后的回调，参数为 event 对象
  onChange: PropTypes.func,

  // 输入框大小，除默认外可选值：sm、lg
  size: PropTypes.string,

  // 是否禁用
  disabled: PropTypes.bool,

  // 同 input placeholder
  placeholder: PropTypes.string,

  customProp({ value, onChange }) {
    if (value && !onChange) {
      return new Error('You provided a `value` prop without an `onChange` handler')
    }
  }
}

export default Input