import React, { PropTypes } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu } from '../Dropdown'
import classnames from 'classnames'
import TextOverflow from '../TextOverflow'
import Fetch from '../Fetch'
import './Select.less'

const Select = React.createClass({

  getInitialState() {
    return {
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

  getOptionWithProps(child, i) {

    if (!child) return

    const { value, children } = child.props

    // 搜索过滤
    const searchValue = this.state.searchValue
    if (searchValue) {
      if (children.indexOf(searchValue) === -1) return
    }
    
    let isActive = false
    if (this.state.value === value) {
      this.title = children
      isActive = true
    }
    return React.cloneElement(child, {
      key: i,
      active: isActive,
      onClick: () => {
        this.refs.dropdown.close()
        this.setState({ value })
        this.props.onChange && this.props.onChange(value)
      }
    })
  },

  handleSearch(e) {
    const searchValue = e.target.value
    this.setState({ searchValue })
  },

  render() {
    const { className, children, disabled, size, placeholder, searchable, url, render, defaultOption, ...other } = this.props

    let OptionsWithProps
    if (url) {
      OptionsWithProps = (this.state.list || []).map((item, i) => {
        return this.getOptionWithProps(render.call(this, item, i), i)
      })
      defaultOption && OptionsWithProps.unshift(this.getOptionWithProps(defaultOption, -1))
    } else {
      OptionsWithProps = React.Children.map(children, this.getOptionWithProps)
    }

    let Search
    if (searchable) {
      Search = (
        <div className="search-box">
          <input className="form-control" value={this.state.searchValue} onChange={this.handleSearch} />
          <span className="clear glyphicon glyphicon-remove" onClick={this.handleClear}></span>
        </div>
      )
    }

    return (
      <Dropdown ref="dropdown" className={classnames('bfd-select2', { disabled }, className, size)} disabled={disabled} {...other}>
        <DropdownToggle>
          <Fetch url={url} onSuccess={this.handleLoad}>
            <TextOverflow>
              <div className="title">{this.title || placeholder}</div>
            </TextOverflow>
            <span className="caret"></span>
          </Fetch>
        </DropdownToggle>
        <DropdownMenu>
          {Search}
          <ul>{OptionsWithProps}</ul>
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