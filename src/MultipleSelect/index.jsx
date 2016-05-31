import React, { PropTypes } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu } from '../Dropdown'
import Option from '../Select2/Option'
import { CheckboxGroup, Checkbox } from '../Checkbox'
import classnames from 'classnames'
import Fetch from '../Fetch'
import './index.less'

const MultipleSelect = React.createClass({

  getInitialState() {
    return {
      values: this.props.values || this.props.defaultValues || []
    }
  },

  componentWillReceiveProps(nextProps) {
    nextProps.values && this.setState({values: nextProps.values})  
  },

  handleRemove(value, e) {
    e.stopPropagation()
    this.valueSet.delete(value)
    const values = [...this.valueSet]
    this.setState({ values })
    this.props.onChange && this.props.onChange(values)
  },

  handleChange(values) {
    this.setState({ values })
  },

  handleToggleAll(e) {
    e.stopPropagation()
    let values = []
    if (e.target.checked) {
      values = React.Children.map(this.props.children, child => {
        return child.props.value
      })
    }
    this.setState({ values })
  },

  getCheckboxWithProps(child, i) {
    if (!child) return
    const { value, children } = child.props
    if (this.valueSet.has(value)) {
      this.labels.push({
        value,
        label: children
      })
    }
    return <Checkbox key={i} value={value} block>{children}</Checkbox>
  },

  handleLoad(list) {
    this.setState({ list })
  },

  render() {
    const { className, children, url, render, disabled, ...other } = this.props
    
    this.valueSet = new Set(this.state.values)
    this.labels = []

    let childrenWithProps
    if (url) {
      childrenWithProps = (this.state.list || []).map((item, i) => {
        return this.getCheckboxWithProps(render.call(this, item, i), i)
      })
    } else {
      childrenWithProps = React.Children.map(children, this.getCheckboxWithProps)
    }

    const isAll = this.labels.length === childrenWithProps.length
    
    let head
    if (this.labels.length) {
      if (isAll) {
        head = <div className="default-title">全部</div>
      } else {
        head = (
          <ul>
          {this.labels.map((item, i) => {
            return (
              <li key={i}>
                <span className="label-name">{item.label}</span>
                <span className="remove" onClick={e => {this.handleRemove(item.value, e)}}>&times;</span>
              </li>
            )
          })}
          </ul>
        )
      }
    } else {
      head = <div className="default-title">请选择</div>
    }
    
    return (
      <Dropdown className={classnames('bfd-multiple-select', { disabled }, className)} disabled={disabled} {...other}>
        <DropdownToggle>
          <Fetch url={url} onSuccess={this.handleLoad}>{head}</Fetch>
        </DropdownToggle>
        <DropdownMenu>
          <Checkbox checked={isAll} onChange={this.handleToggleAll}>全选</Checkbox>
          <CheckboxGroup selects={this.state.values} onChange={this.handleChange}>{childrenWithProps}</CheckboxGroup>
        </DropdownMenu>
      </Dropdown>
    )
  }
})

MultipleSelect.propTypes = {
  values: PropTypes.array,
  defaultValues: PropTypes.array,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  url: PropTypes.string,
  render: PropTypes.func,
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