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
    const { className, source, onFocus, onKeyDown, onChange, ...other } = this.props
    return (
      <Dropdown
        className={classnames('bfd-auto-complete', className)}
        open={open}
        onToggle={open => this.setState({ open })}
      >
        <DropdownToggle>
          <ClearableInput
            value={value}
            onKeyDown={::this.handleKeyDown}
            onChange={::this.handleInput}
            {...other}
          />
        </DropdownToggle>
        <DropdownMenu>
          <ul className="bfd-auto-complete__result">
          {result.map((item, i) => (
            <li
              key={i}
              className={classnames({'bfd-auto-complete__option--active': index === i})}
              onClick={this.handleSelect.bind(this, item)}
            >
              {item}
            </li>
          ))}
          </ul>
        </DropdownMenu>
      </Dropdown>
    )
  }
}

AutoComplete.propTypes = {

  source: PropTypes.array.isRequired,

  value: PropTypes.string,

  defaultValue: PropTypes.string,

  onChange: PropTypes.func,

  size: PropTypes.string,

  disabled: PropTypes.bool,

  placeholder: PropTypes.string,

  customProp({ value, onChange }) {
    if (value && !onChange) {
      return new Error('You provided a `value` prop without an `onChange` handler')
    }
  }
}

export default AutoComplete
