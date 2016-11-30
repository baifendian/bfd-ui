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
import shouldComponentUpdate from '../shouldComponentUpdate'
import Option from '../Select/Option'
import Checkbox from '../Checkbox'
import SelectDropdown from '../SelectDropdown'
import TagList from '../TagList'
import action from './action'
import './index.less'

class MultipleSelect extends Component {

  constructor(props) {
    super()
    this.options = []
    this.state = {
      data: props.data || [],
      values: props.values || props.defaultValues || [],
      searchValue: '',
      index: -2
    }
  }

  componentWillReceiveProps(nextProps) {
    nextProps.values && this.setState({values: nextProps.values})
    nextProps.data && this.setState({data: nextProps.data})
  }

  shouldComponentUpdate: shouldComponentUpdate

  change(values) {
    this.setState({
      values,
      searchValue: ''
    })
    this.refs.tagList.focus()
    this.props.onChange && this.props.onChange(values)
  }

  toggleAll(checked) {
    this.options.forEach(option => {
      this.valueSet[checked ? 'add' : 'delete'](option.props.value)
    })
    this.change([...this.valueSet])
  }

  addValue(value) {
    this.valueSet.add(value)
    this.change([...this.valueSet])
  }

  removeValue(value) {
    this.valueSet.delete(value)
    this.change([...this.valueSet])
  }

  traverseOptions(callback) {
    const { children, render } = this.props
    if (children) {
      React.Children.forEach(children, (option, i) => {
        if (!option) return
        callback(option, i)
      })
    } else {
      this.state.data.forEach((item, i) => {
        callback(render.call(this, item, i), i)
      })
    }
  }

  getCheckbox(value, children) {
    return (
      <Checkbox
        block
        value={value}
        checked={this.valueSet.has(value)}
        onChange={action.handleOptionCheck.bind(this, value)}
      >
        {children}
      </Checkbox>
    )
  }

  // 选中的标签
  getLabels(optionsMapper) {
    const labels = []
    this.state.values.forEach(key => {
      if (optionsMapper[key] || this.props.tagable) {
        labels.push({
          value: key,
          label: optionsMapper[key] || key
        })
      }
    })
    return labels
  }

  // 上下切换
  getWrapperOptions(options) {
    return options.map((option, i) => {
      return (
        <li key={i} className={classnames({
          'bfd-multiple-select__option': true,
          'bfd-multiple-select__option--active': this.state.index === i
        })}>
          {option}
        </li>
      )
    })
  }

  render() {

    const {
      children, className, defaultValues, onChange, data, url, disabled, tagable,
      placeholder, ...other
    } = this.props
    const { searchValue, index, values } = this.state

    delete other.values
    delete other.render

    const valueSet = this.valueSet = new Set(values)
    const optionsMapper = {}
    const options = []

    this.traverseOptions(option => {
      const { value, children } = option.props
      optionsMapper[value || children] = children
      // 搜索过滤
      const { searchValue } = this.state
      if (searchValue && children.indexOf(searchValue) === -1
          && (String(value) ? String(value).indexOf(searchValue) === -1 : true)) {
        return
      }
      options.push(this.getCheckbox(value || children, children))
    })

    // 自定义标签模式，防止重复
    if (tagable && searchValue && (!options[0] || options[0].props.children !== searchValue)) {
      options.unshift(this.getCheckbox(searchValue, searchValue))
    }

    const labels = this.getLabels(optionsMapper)
    const wrapperOptions = this.getWrapperOptions(options)
    const isAll = options.filter(option => !valueSet.has(option.props.value)).length === 0

    this.options = options
    this.isAll = isAll

    const Title = (
      <TagList
        ref="tagList"
        inputable
        inputValue={searchValue}
        onInput={action.handleInput.bind(this)}
        onInputKeyChange={action.handleKeyDown.bind(this)}
        labels={labels}
        placeholder={values && values.length ? '' : placeholder}
        onRemove={action.handleLabelRemove.bind(this)}
        disabled={disabled}
      />
    )

    return (
      <SelectDropdown
        className={classnames('bfd-multiple-select', className)}
        title={Title}
        url={url}
        onLoad={action.handleLoad.bind(this)}
        hasPropValue={!!this.props.values || !!this.props.defaultValues}
        disabled={disabled}
        onToggle={action.handleDropdownToggle.bind(this)}
        {...other}
      >
        {
          options.length ? (
            <ul>
              <li className={classnames({
                'bfd-multiple-select__option': true,
                'bfd-multiple-select__option--active': index === -1
              })}>
                <Checkbox
                  checked={isAll}
                  block
                  onChange={action.handleToggleAll.bind(this)}
                >
                  全选
                </Checkbox>
              </li>
              {wrapperOptions}
            </ul>
          ) : <div className="bfd-multiple-select__empty">无匹配选项</div>
        }
      </SelectDropdown>
    )
  }
}

MultipleSelect.defaultProps = {
  placeholder: '请选择'
}

MultipleSelect.propTypes = {

  // 选中的值
  values: PropTypes.array,

  // 初始化时选中的值（不可控）
  defaultValues: PropTypes.array,

  // 切换选择后的回调，参数为选中的值
  onChange: PropTypes.func,

  // 是否禁用
  disabled: PropTypes.bool,

  // 是否开启自定义标签输入功能
  tagable: PropTypes.bool,

  // Option 数据源，结合 render 使用
  data: PropTypes.array,

  // 数据源 URL，直接请求服务器，内部调用 xhr 模块
  url: PropTypes.string,

  // URL 数据源模式数据过滤，参数为服务器返回的数据，返回处理后的数据
  dataFilter: PropTypes.func,

  // data / url 方式时 Option 渲染回调，参数为当前数据和索引，返回一个 Option
  render: PropTypes.func,

  // 无匹配项时显示的内容，默认｀请选择｀
  placeholder: PropTypes.string,

  customProp({ values, onChange, url, render }) {
    if (values && !onChange) {
      return new Error('You provided a `values` prop without an `onChange` handler')
    }
    if (url && !render) {
      return new Error('You provided a `url` prop without an `render` handler')
    }
  }
}

export { MultipleSelect, Option }
