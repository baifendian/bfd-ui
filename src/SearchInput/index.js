/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component, PropTypes } from 'react'
import Button from '../Button'
import ClearableInput from '../ClearableInput'
import classnames from 'classnames'
import './main.less'

class SearchInput extends Component {

  constructor() {
    super()
    this.value = ''
  }

  componentWillMount() {
    this.value = this.props.defaultValue || ''
  }

  render() {
    const { className, label, size, defaultValue, onSearch, onChange, ...other } = this.props
    const width = this.props.width || '300px'

    return (
      <div className={classnames('bfd-search_input', className, size)} {...other}>        
        <ClearableInput style={{width}} defaultValue={this.value} size={size} onKeyUp={::this.handleKeyUp} onChange={::this.handleChange} inline placeholder={this.props.placeholder || ''}/>
        <Button size={size} onClick={::this.handleClick} icon="search">{this.props.label || '搜索'}</Button>
      </div>
    )
  }

  handleChange(v) {
    this.value = v
    this.props.onChange && this.props.onChange(v)
  }

  handleClick() {
    if (typeof this.props.onSearch == 'function') {
      this.props.onSearch(this.value)
    }
  }

  handleKeyUp(e) {
    e.preventDefault()    
    const code = e.keyCode
    if(code == 13) {
      this.handleClick()
    }
  }
}

SearchInput.propTypes = {

  // 搜索框提示信息
  placeholder: PropTypes.string,

  // 搜索按钮名称，默认为“搜索”
  label: PropTypes.string,

  // 搜索按钮单击事件，value为搜索框输入值
  onSearch: PropTypes.func.isRequired,

  // 搜索框值改变事件，value为搜索框输入值
  onChange: PropTypes.func,

  // 输入框高度尺寸，参考 Bootstrap input，可选值：lg, sm，默认为lg
  size: PropTypes.string,

  // 输入框默认值
  defaultValue: PropTypes.string,

  // 输入框宽度，默认为300px
  width: PropTypes.string
}

export default SearchInput