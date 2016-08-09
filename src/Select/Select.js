import './Select.less'
import React, { Component, PropTypes } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu } from '../Dropdown'
import classnames from 'classnames'
import shouldComponentUpdate from '../shouldComponentUpdate'
import TextOverflow from '../TextOverflow'
import Fetch from '../Fetch'
import ClearableInput from '../ClearableInput'
import Icon from '../Icon'

class Select extends Component {

  constructor(props) {
    super()
    this.optionsWithProps = []
    this.title = null
    this.shouldComponentUpdate = shouldComponentUpdate
    this.state = {
      data: props.data || [],
      index: 0,
      value: 'value' in props ? props.value : props.defaultValue,
      searchValue: null
    }
  }

  componentWillMount() {
    this.optionsWithProps = this.getOptionsWithProps()
  }

  componentWillReceiveProps(nextProps) {
    const state = {
      searchValue: null
    }
    'value' in nextProps && (state.value = nextProps.value)
    'data' in nextProps && (state.data = nextProps.data)
    this.setState(state)
  }

  componentWillUpdate(nextProps, nextState) {
    debugger
    this.optionsWithProps = this.getOptionsWithProps(nextProps, nextState)
  }

  getOptionsWithProps(props, state) {
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
      this.optionsWithProps = optionsWithProps.map((option, i) => {
        return React.cloneElement(option, {
          active: index === i
        })
      })
      this.setState({ index })
    }
    if (key === 'Enter') {
      this.handleSelect(optionsWithProps[index].props.value)
    }
  }

  handleSearch(searchValue) {
    this.optionsWithProps = this.optionsWithProps.filter(option => {
      const { value, children } = option.props
      if (!value) return false
      return children.indexOf(searchValue) !== -1 || value.indexOf(searchValue) !== -1
    })
    this.setState({
      searchValue,
      index: 0
    })
  }

  handleDropToggle(open) {
    this.props.searchable && setTimeout(() => {
      open && this.refs.clearableInput.focus()  
    }, 0)
  }

  render() {
    
    const { list, searchValue, index } = this.state
    const { className, children, size, disabled, placeholder, searchable, url, ...other } = this.props

    const classNames = classnames(
      'bfd-select', 
      {
        'bfd-select-disabled': disabled,
        [`bfd-select-${size}`]: size
      },
      className
    )

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
            <Icon type="angle-down" className="bfd-select__caret" />
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
          <ul>{this.optionsWithProps}</ul>
        </DropdownMenu>
      </Dropdown>
    )
  }
}

Select.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  data: PropTypes.array,
  placeholder: PropTypes.string,
  searchable: PropTypes.bool,
  disabled: PropTypes.bool,
  size: PropTypes.string,
  url: PropTypes.string,
  render: PropTypes.func,
  defaultOption: PropTypes.element,
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