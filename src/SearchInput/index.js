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
import controlledPropValidator from '../_shared/propValidator/controlled'
import Button from '../Button'
import ClearableInput from '../ClearableInput'
import './index.less'

class SearchInput extends Component {

  constructor(props) {
    super()
    this.state = {
      value: 'value' in props ? props.value : props.defaultValue
    }
  }

  handleChange(value) {
    this.setState({ value })
    this.props.onChange && this.props.onChange(value)
  }

  handleSearch() {
    this.props.onSearch && this.props.onSearch(this.state.value)
  }

  handleKeyUp(e) {
    e.key === 'Enter' && this.handleSearch()
  }

  render() {
    const {
      className, label, size, defaultValue, onSearch, onChange, placeholder,
      ...other
    } = this.props
    const { value } = this.state
    delete other.value
    const width = this.props.width || '300px'

    const inputProps = { value, size, placeholder }

    return (
      <div className={classnames('bfd-search_input', className)} {...other}>
        <ClearableInput
          style={{width}}
          onKeyUp={::this.handleKeyUp}
          onChange={::this.handleChange}
          {...inputProps}
        />
        <Button size={size} onClick={::this.handleSearch} icon="search">{label}</Button>
      </div>
    )
  }
}

SearchInput.defaultProps = {
  label: '搜索'
}

SearchInput.propTypes = {

  // 输入框值
  value: controlledPropValidator(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),

  // 同 value，不可控
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  // 搜索框值改变事件，value为搜索框输入值
  onChange: PropTypes.func,

  // 搜索按钮单击事件，value为搜索框输入值
  onSearch: PropTypes.func.isRequired,

  // 搜索按钮名称，默认 `搜索`
  label: PropTypes.string,

  // 搜索框提示信息
  placeholder: PropTypes.string,

  // 输入框高度尺寸，默认中等尺寸
  size: PropTypes.oneOf(['sm', 'lg']),

  // 输入框宽度，默认为300px
  width: PropTypes.string
}

export default SearchInput
