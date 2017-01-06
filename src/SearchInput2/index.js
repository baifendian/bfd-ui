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
import Input from '../Input'
import Button from '../Button'
import './index.less'

class SearchInput2 extends Component {

  constructor(props) {
    super()
    this.state = {
      value: 'value' in props ? props.value : props.defaultValue
    }
  }

  componentWillReceiveProps(nextProps) {
    'value' in nextProps && this.setState({value: nextProps.value})
  }

  handleChange(e) {
    const { value } = e.target
    this.setState({ value })
    this.props.onChange && this.props.onChange(value)
  }

  handleSearch() {
    this.props.onSearch && this.props.onSearch(this.state.value)
  }

  handleKeyDown(e) {
    if (this.props.onSearch && e.key === 'Enter') {
      this.props.onSearch(this.state.value)
    }
  }

  render() {

    const {
      className, defaultValue, onChange, onSearch, block, size, placeholder, ...other
    } = this.props
    const { value } = this.state
    delete other.value

    const inputProps = { value, size, placeholder }

    return (
      <div className={classnames('bfd-search-input2', {
        'bfd-search-input2--block': block
      }, className)} {...other}>
        <Input
          onChange={::this.handleChange}
          onKeyDown={::this.handleKeyDown}
          {...inputProps}
        />
        <Button
          tabIndex="-1"
          icon="search"
          size="sm"
          transparent
          className="bfd-search-input2__search"
          onClick={::this.handleSearch}
        />
      </div>
    )
  }
}

SearchInput2.defaultProps = {
  placeholder: '请输入关键词'
}

SearchInput2.propTypes = {

  // 输入框的值
  value: controlledPropValidator(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),

  // 初始化输入框的值
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  // 输入改变后的回调，参数为当前输入框的值
  onChange: PropTypes.func,

  // 搜索事件
  onSearch: PropTypes.func,

  // 输入框尺寸
  size: PropTypes.oneOf(['sm', 'lg']),

  // 同 input placeholder，默认`请输入关键词`
  placeholder: PropTypes.string,

  // 是否块级元素显示，块级显示则宽度 `100%`
  block: PropTypes.bool
}

export default SearchInput2
