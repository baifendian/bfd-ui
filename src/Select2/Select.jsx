import React, { PropTypes } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu } from '../Dropdown'
import classnames from 'classnames'
import TextOverflow from '../TextOverflow'
import Fetch from '../Fetch'
import ClearableInput from '../ClearableInput'
import Icon from '../Icon'
import './Select.less'

const Select = React.createClass({

  getInitialState() {
    return {
      index: 0,
      value: 'value' in this.props ? this.props.value : this.props.defaultValue
    }
  },

  componentWillReceiveProps(nextProps) {
    'value' in nextProps && this.setState({
      value: nextProps.value
    })  
  },

  handleLoad(list) {
    this.setState({ list })
  },

  select(value) {
    this.refs.dropdown.close()
    this.setState({ value })
    this.props.onChange && this.props.onChange(value)
  },

  getOptionWithProps(child, i) {

    if (!child) return

    const { value, children } = child.props
    
    let isSelect
    if (this.state.value === value) {
      this.title = children
      isSelect = true
    }
    return React.cloneElement(child, {
      key: i,
      select: isSelect,
      onClick: this.select.bind(this, value)
    })
  },

  handleKeyDown(e) {
    const key = e.key
    let index = this.state.index
    const options = this.options
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
      this.select(options[index].props.value)
    }
  },

  handleSearch(searchValue) {
    this.setState({
      searchValue,
      index: 0
    })
  },

  handleDropToggle(open) {
    this.props.searchable && setTimeout(() => {
      open && this.refs.clearableInput.focus()  
    }, 0)
  },

  render() {
    const { className, children, disabled, size, placeholder, searchable, url, render, defaultOption, ...other } = this.props
    const { list, searchValue, index } = this.state

    let optionsWithProps
    if (url) {
      optionsWithProps = (list || []).map((item, i) => {
        return this.getOptionWithProps(render.call(this, item, i), i)
      })
    } else {
      optionsWithProps = React.Children.map(children, this.getOptionWithProps)
    }

    // 搜索过滤
    if (searchValue) {
      optionsWithProps = optionsWithProps.filter(option => {
        const { value, children } = option.props
        if (!value) return false
        return children.indexOf(searchValue) !== -1 || value.indexOf(searchValue) !== -1
      })
    }

    if (defaultOption && !searchValue) {
      optionsWithProps.unshift(this.getOptionWithProps(defaultOption, -1))
    }

    // 上下切换绑定样式
    if (searchable) {
      optionsWithProps = optionsWithProps.map((option, i) => {
        if (index !== i) {
          return option
        } else {
          return React.cloneElement(option, {
            className: classnames(option.className, 'active')
          }) 
        }
      })
    }

    this.options = optionsWithProps

    return (
      <Dropdown 
        ref="dropdown" 
        className={classnames('bfd-select2', { disabled }, className, size)} 
        disabled={disabled} 
        onToggle={this.handleDropToggle}
        {...other}
      >
        <DropdownToggle>
          <Fetch url={url} onSuccess={this.handleLoad}>
            <TextOverflow>
              <div className="title">{this.title || placeholder}</div>
            </TextOverflow>
            <Icon type="angle-down" className="icon-caret" />
          </Fetch>
        </DropdownToggle>
        <DropdownMenu>
          {searchable ? (
            <ClearableInput 
              ref="clearableInput"
              placeholder="请输入关键词搜索" 
              onChange={this.handleSearch} 
              onKeyDown={this.handleKeyDown}
            />
          ) : null}
          <ul>{optionsWithProps}</ul>
        </DropdownMenu>
      </Dropdown>
    )
  }
})

Select.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
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