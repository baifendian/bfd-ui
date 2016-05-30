import React, { PropTypes } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu } from '../Dropdown'
import Option from '../Select2/Option'
import { CheckboxGroup, Checkbox } from '../Checkbox'
import classnames from 'classnames'
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

  handleRemove(valueSet, value, e) {
    e.stopPropagation()
    valueSet.delete(value)
    const values = [...valueSet]
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

  render() {
    const { className, children, disabled, ...other } = this.props
    const valueSet = new Set(this.state.values)
    const labels = []
    
    const childrenWithProps = React.Children.map(children, (child, i) => {
      const { value, children } = child.props
      if (valueSet.has(value)) {
        labels.push({
          value,
          label: children
        })
      }
      return <Checkbox value={value} block>{children}</Checkbox>
    })

    const isAll = labels.length === childrenWithProps.length
    
    let head
    if (labels.length) {
      if (isAll) {
        head = <div className="default-title">全部</div>
      } else {
        head = (
          <ul>
          {labels.map((item, i) => {
            return (
              <li key={i}>
                <span className="label-name">{item.label}</span>
                <span className="remove" onClick={e => {this.handleRemove(valueSet, item.value, e)}}>&times;</span>
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
        <DropdownToggle>{head}</DropdownToggle>
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
  customProp({ values, onChange }) {
    if (values && !onChange) {
      return new Error('You provided a `values` prop without an `onChange` handler')
    }
  }
}

export { MultipleSelect, Option }