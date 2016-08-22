import './index.less'
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import shouldComponentUpdate from '../../shouldComponentUpdate'
import { Dropdown, DropdownToggle, DropdownMenu } from '../../Dropdown'
import TextOverflow from '../../TextOverflow'
import Fetch from '../../Fetch'
import ClearableInput from '../../ClearableInput'
import Icon from '../../Icon'

class Select extends Component {

  constructor(props) {
    super()
    this.optionsWithProps = []
    this.title = null
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

  shouldComponentUpdate: shouldComponentUpdate

  handleLoad(data) {
    this.setState({ data })
  }

  handleSelect(value) {
    this.refs.dropdown.close()
    this.setState({ value })
    this.props.onChange && this.props.onChange(value)
  }

  handleKeyDown(e) {
    const key = e.key
    const { optionsWithProps } = this
    let { index } = this.state
    if (key === 'ArrowDown' || key === 'ArrowUp') {
      if (key === 'ArrowDown') {
        if (index === optionsWithProps.length - 1) index = 0
        else index++
      }
      if (key === 'ArrowUp') {
        e.preventDefault()
        if (index === 0) index = optionsWithProps.length - 1
        else index--
      }
      this.setState({ index })
    }
    if (key === 'Enter') {
      this.handleSelect(optionsWithProps[index].props.value)
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

  getOptionsWithProps() {
    this.title = null
    const { children, render, defaultOption } = this.props
    let res
    if (children) {
      res = React.Children.map(children, this.getOptionWithProps.bind(this))
    } else {
      res = this.state.data.map((item, i) => {
        return this.getOptionWithProps(render.call(this, item, i), i)
      })
    }
    if (defaultOption) {
      res.unshift(this.getOptionWithProps(defaultOption, -1))
    }
    return res
  }

  getOptionWithProps(option, i) {
    if (!option) return
    const { value, children } = option.props
    let selected = false
    if (this.state.value === value) {
      this.title = children
      selected = true
    }
    return React.cloneElement(option, {
      selected,
      key: i,
      onClick: this.handleSelect.bind(this, value)
    })
  }

  render() {
    
    const { list, searchValue, index } = this.state
    const { className, children, size, disabled, placeholder, searchable, url, ...other } = this.props

    let optionsWithProps = this.getOptionsWithProps()

    if (searchValue) {
      optionsWithProps = optionsWithProps.filter(option => {
        const { value, children } = option.props
        if (!value) return false
        return children.indexOf(searchValue) !== -1 || value.indexOf(searchValue) !== -1
      })
    }

    if (searchable) {
      optionsWithProps = optionsWithProps.map((option, i) => {
        return React.cloneElement(option, {
          active: index === i
        })
      })
    }

    this.optionsWithProps = optionsWithProps

    const classNames = classnames('bfd-select', {
      [`bfd-select--${size}`]: size
    }, className)

    return (
      <Dropdown 
        ref="dropdown" 
        className={classNames} 
        disabled={disabled} 
        onToggle={::this.handleDropToggle}
        {...other}
      >
        <DropdownToggle>
          <Fetch url={url} onSuccess={::this.handleLoad}>
            <TextOverflow>
              <div className="bfd-select__title">{this.title || placeholder}</div>
            </TextOverflow>
            <Icon type="caret-down" className="bfd-select__caret" />
          </Fetch>
        </DropdownToggle>
        <DropdownMenu>
          {searchable && (
            <ClearableInput 
              ref="clearableInput"
              value={searchValue}
              placeholder="请输入关键词搜索" 
              onChange={::this.handleSearch} 
              onKeyDown={::this.handleKeyDown}
            />
          )}
          <ul>{optionsWithProps}</ul>
        </DropdownMenu>
      </Dropdown>
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