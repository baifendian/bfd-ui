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
import Input from '../Input'
import Button from '../Button'
import './index.less'

class ClearableInput extends Component {

  constructor(props) {
    super()
    this.state = {
      value: props.defaultValue || props.value || ''
    }
  }

  componentWillReceiveProps(nextProps) {
    'value' in nextProps && this.setState({value: nextProps.value})
  }

  handleClear(e) {
    e.stopPropagation()
    this.props.onClear && this.props.onClear()
    this.handleChange('')
  }

  handleInput(e) {
    e.stopPropagation()
    this.handleChange(e.target.value)
  }

  handleChange(value) {
    this.setState({ value })
    this.props.onChange && this.props.onChange(value)
  }

  /**
   * @public
   * @name this.refs.clearableInput.focus
   * @description 同 HTMLInputElement.focus()
   */
  focus() {
    this.refs.input.focus()
  }

  /**
   * @public
   * @name this.refs.clearableInput.select
   * @description 同 HTMLInputElement.select()
   */
  select() {
    this.refs.input.select()
  }

  render() {

    const { className, defaultValue, onChange, onClear, ...inputProps } = this.props
    const { value } = this.state

    delete inputProps.value

    return (
      <div className={classnames('bfd-clearable-input', className)}>
        <Input
          ref="input"
          value={value}
          onChange={::this.handleInput}
          {...inputProps}
        />
        {value && (
          <Button
            tabIndex="-1"
            icon="remove"
            size="sm"
            transparent
            className="bfd-clearable-input__clear"
            disabled={inputProps.disabled}
            onClick={::this.handleClear}
          />
        )}
      </div>
    )
  }
}

ClearableInput.propTypes = {

  // 输入框的值
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  // 初始化输入框的值
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  // 输入改变、清空后的回调，参数为当前输入框的值
  onChange: PropTypes.func,

  // 清空后的回调
  onClear: PropTypes.func,

  // 输入框尺寸
  size: PropTypes.oneOf(['sm', 'lg']),

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

export default ClearableInput
