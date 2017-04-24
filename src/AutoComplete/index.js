/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import './index.less'
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import { Dropdown, DropdownToggle, DropdownMenu } from '../Dropdown'
import ClearableInput from '../ClearableInput'
import TextOverflow from '../TextOverflow'

class AutoComplete extends Component {

  constructor(props) {
    super()
    this.state = {
      open: false,
      index: -1,
      result: props.source,
      value: props.defaultValue || props.value || ''
    }
  }

  componentWillReceiveProps(nextProps) {
    'value' in nextProps && this.setState({value: nextProps.value})
    'source' in nextProps && this.setState({result: nextProps.source})
  }

  handleInput(value) {
    this.lastValue = value
    const state = { value }
    if (!value) {
      state.open = true
      state.result = this.props.source
      this.setState(state)
    } else {
      // reset tab index
      state.index = -1
      state.result = this.props.source.filter(item => item.indexOf(value) > -1)
      state.open = !!state.result.length
      this.setState(state)
    }
    this.props.onChange && this.props.onChange(value)
  }

  handleSelect(value) {
    this.setState({
      value,
      open: false
    })
    this.props.onChange && this.props.onChange(value)
  }

  handleKeyDown(e) {
    const { open, result } = this.state
    if (open) {
      const input = e.target
      const key = e.key
      let { index } = this.state
      if (key === 'ArrowDown' || key === 'ArrowUp') {
        if (key === 'ArrowDown') {
          if (index === result.length - 1) index = -1
          else index++
        }
        if (key === 'ArrowUp') {
          e.preventDefault()
          if (index === -1) index = result.length - 1
          else index--
        }
        this.setState({
          index,
          value: result[index] || this.lastValue
        })
      }
      if (key === 'Enter') {
        this.handleSelect(result[index])
        input.blur()
      }
    }
  }

  render() {
    const { open, index, result, value } = this.state
    const { className, source, onFocus, onKeyDown, onChange, disabled, isOpen, ...other } = this.props
    return (
      <Dropdown
        open={!!isOpen || open}
        disabled={!!disabled}
        aligned
        onToggle={open => this.setState({ open })}
      >
        <DropdownToggle className={classnames('bfd-auto-complete', className)}>
          <ClearableInput
            value={value}
            onKeyDown={::this.handleKeyDown}
            onChange={::this.handleInput}
            disabled={!!disabled}
            open={!!isOpen || open}
            {...other}
          />
        </DropdownToggle>
        <DropdownMenu className="bfd-auto-complete__popover">
          <ul className="bfd-auto-complete__result">
          {result.map((item, i) => (
            <TextOverflow key={item}>
              <li
                className={classnames({'bfd-auto-complete__option--active': index === i})}
                onClick={this.handleSelect.bind(this, item)}
              >
                {item}
              </li>
            </TextOverflow>
          ))}
          </ul>
        </DropdownMenu>
      </Dropdown>
    )
  }
}

AutoComplete.propTypes = {

  // 待搜索的数据源
  source: PropTypes.array.isRequired,

  // 输入框的值
  value: PropTypes.string,

  // 初始化输入框的值
  defaultValue: PropTypes.string,

  // 输入改变、选择后的回调，参数为当前输入框的值
  onChange: PropTypes.func,

  // 输入框大小，除默认外可选值：sm、lg
  size: PropTypes.string,

  // 是否禁用
  disabled: PropTypes.bool,

  // 是否打开下拉
  isOpen: PropTypes.bool,

  // 同 input placeholder
  placeholder: PropTypes.string,

  customProp({ value, onChange }) {
    if (value && !onChange) {
      return new Error('You provided a `value` prop without an `onChange` handler')
    }
  }
}

export default AutoComplete
