/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

export default {

  handleLabelRemove(value, e) {
    e.stopPropagation()
    this.removeValue(value)
  },

  handleOptionCheck(value, e) {
    e.stopPropagation()
    e.target.checked ? this.addValue(value) : this.removeValue(value)
  },

  handleToggleAll(e) {
    e.stopPropagation()
    this.toggleAll(e.target.checked)
  },

  handleLoad(data) {
    this.setState({ data })
  },

  handleDropdownToggle(open) {
    if (open) {
      this.refs.input.focus()
    } else {
      this.refs.input.blur()
    }
  },

  handleInput(e) {
    e.stopPropagation()
    const value = e.target.value
    this.setState({
      searchValue: value,
      index: value ? 0 : -1
    })
  },

  handleKeyDown(e) {
    const key = e.key
    const { options } = this
    let { index } = this.state
    if (key === 'ArrowDown' || key === 'ArrowUp') {
      if (key === 'ArrowDown') {
        if (index === options.length) index = 0
        else index++
      }
      if (key === 'ArrowUp') {
        e.preventDefault()
        if (index === 0) index = options.length
        else index--
      }
      this.setState({ index })
    }
    if (key === 'Enter' && index > -1) {
      if (index < options.length) {
        const value = options[index].props.value
        if (this.valueSet.has(value)) {
          this.removeValue(value)
        } else {
          this.addValue(value)
        }
      } else {
        this.toggleAll(!this.isAll)
      }
    }
    if (key === 'Backspace' && !this.state.searchValue) {
      const value = this.state.values.pop()
      value && this.removeValue(value)
    }
  }
}