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
import warning from 'warning'
import shouldComponentUpdate from '../../shouldComponentUpdate'
import TextOverflow from '../../TextOverflow'
import ClearableInput from '../../ClearableInput'
import SelectDropdown from '../../SelectDropdown'
import './index.less'

class Select extends Component {

  constructor(props) {
    super()
    this.state = {
      data: props.data || [],
      index: -1,
      value: 'value' in props ? props.value : props.defaultValue,
      searchValue: null
    }
  }

  componentWillReceiveProps(nextProps) {
    const state = {
      searchValue: null
    }
    'value' in nextProps && (state.value = nextProps.value)
    'data' in nextProps && (state.data = nextProps.data)
    this.setState(state)
  }

  shouldComponentUpdate = shouldComponentUpdate

  handleLoad(data) {
    if (this.props.dataFilter) {
      data = this.props.dataFilter(data)
      warning(!!data, '`dataFilter` should return new data, check the `dataFilter` of `Select`.')
    }
    this.setState({ data })
  }

  handleSelect(value) {
    this.refs.dropdown.close()
    this.setState({ value })
    this.props.onChange && this.props.onChange(value)
  }

  handleKeyDown(options, e) {
    const key = e.key
    let { index } = this.state
    if (key === 'ArrowDown' || key === 'ArrowUp') {
      if (key === 'ArrowDown') {
        if (index === options.length - 1) index = 0
        else index++
      }
      if (key === 'ArrowUp') {
        e.preventDefault()
        if (index === 0) index = options.length - 1
        else index--
      }
      this.setState({ index })
    }
    if (key === 'Enter') {
      this.handleSelect(options[index].props.value)
    }
  }

  handleSearch(searchValue) {
    this.setState({
      searchValue,
      index: -1
    })
  }

  handleDropToggle(open) {
    this.props.searchable && open && setTimeout(() => {
      this.refs.clearableInput.focus()
    }, 0)
  }

  getOptionsWithProps(onMatch) {
    const { children, render, defaultOption } = this.props
    let res
    if (children) {
      res = React.Children.map(children, this.getOptionWithProps.bind(this, onMatch))
    } else {
      res = this.state.data.map((item, i) => {
        return this.getOptionWithProps(onMatch, render.call(this, item, i), i)
      })
    }
    if (defaultOption) {
      res.unshift(this.getOptionWithProps(onMatch, defaultOption, -1))
    }
    return res
  }

  getOptionWithProps(onMatch, option, i) {
    if (!option) return
    const { value, children } = option.props
    let selected = false
    if (this.state.value === value) {
      onMatch && onMatch(children)
      selected = true
    }
    return React.cloneElement(option, {
      selected,
      key: i,
      onClick: this.handleSelect.bind(this, value)
    })
  }

  filterBySearchValue(options) {
    const { searchValue } = this.state
    if (!searchValue) return options
    return options.filter(option => {
      const { value, children } = option.props
      if (!value && value !== 0) return false
      return children.indexOf(searchValue) !== -1 || String(value).indexOf(searchValue) !== -1
    })
  }

  shouldSearchable(options) {
    if (!this.props.searchable) return options
    const { index } = this.state
    return options.map((option, i) => {
      return React.cloneElement(option, {
        active: index === i
      })
    })
  }

  render() {

    const {
      children, className, defaultValue, onChange, data, url,
      dataFilter, defaultOption, size, disabled, placeholder, searchable, ...other
    } = this.props
    const { value, searchValue } = this.state

    delete other.value
    delete other.render

    let title = null
    let optionsWithProps = this.getOptionsWithProps(children => title = children)
    optionsWithProps = this.filterBySearchValue(optionsWithProps)
    optionsWithProps = this.shouldSearchable(optionsWithProps)

    const classNames = classnames('bfd-select', {
      [`bfd-select--${size}`]: size,
      [`bfd-select--searchable`]: searchable
    }, className)

    const Title = (
      <TextOverflow>
        <div className="bfd-select__title">{title || (!value && placeholder)}</div>
      </TextOverflow>
    )

    return (
      <SelectDropdown
        ref="dropdown"
        className={classNames}
        title={Title}
        url={url}
        onLoad={::this.handleLoad}
        hasPropValue={'value' in this.props || 'defaultValue' in this.props}
        disabled={disabled}
        onToggle={::this.handleDropToggle}
        caret
        {...other}
      >
        {searchable && (
          <ClearableInput
            ref="clearableInput"
            value={searchValue}
            placeholder="请输入关键词搜索"
            onChange={::this.handleSearch}
            onKeyDown={this.handleKeyDown.bind(this, optionsWithProps)}
          />
        )}
        <ul className="bfd-select__options">
          {optionsWithProps && optionsWithProps.length ? optionsWithProps : (
            <li className="bfd-select__option">无选项</li>
          )}
        </ul>
      </SelectDropdown>
    )
  }
}

Select.propTypes = {

  // 选中的值
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  // 初始化时选中的值（不可控）
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  // 切换选择后的回调，参数为选中的值
  onChange: PropTypes.func,

  // 数据源，结合 render 属性定义 Option 渲染逻辑
  data: PropTypes.array,

  // URL 数据源
  url: PropTypes.string,

  // URL 数据源模式数据过滤，参数为服务器返回的数据，返回处理后的数据
  dataFilter: PropTypes.func,

  // data 或 url 方式时 Option 渲染回调，参数为当前数据和索引，返回一个 Option
  render: PropTypes.func,

  // data 或 url 方式时默认的 Option，通常针对空值时的选项
  defaultOption: PropTypes.element,

  // 无选项对应时 Select 显示的内容
  placeholder: PropTypes.string,

  // 是否可搜索，搜索范围为 Option 的 value 和 children
  searchable: PropTypes.bool,

  // 是否禁用
  disabled: PropTypes.bool,

  // 尺寸，除默认值外可选值 sm、lg
  size: PropTypes.string,

  customProp({ value, onChange, url, render }) {
    if (value && !onChange) {
      return new Error('You provided a `value` prop without an `onChange` handler')
    }
    if (url && !render) {
      return new Error('You provided a `url` prop without an `render` handler')
    }
  }
}

export default Select
