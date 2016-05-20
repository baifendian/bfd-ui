import React, { PropTypes } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu } from '../Dropdown'
import Option from '../Select2/Option'
import classnames from 'classnames'
import './index.less'

const MultipleSelect = React.createClass({

  getInitialState() {
    return {
      values: this.props.defaultValues
    }
  },

  handleRemove(valueSet, value, e) {
    e.stopPropagation()
    this.removeValue(valueSet, value)
  },

  addValue(valueSet, value) {
    valueSet.add(value)
    this.update(valueSet)
  },

  removeValue(valueSet, value) {
    valueSet.delete(value)
    this.update(valueSet)
  },

  update(valueSet) {
    const values = [...valueSet]
    this.state.values && this.setState({ values })
    this.props.onChange && this.props.onChange(values)
  },

  render() {
    const { className, children, disabled, ...other } = this.props
    const valueSet = new Set(this.state.values || this.props.values || [])
    const labels = []
    const childrenWithProps = React.Children.map(children, (child, i) => {
      const { value, children } = child.props
      let isActive = false
      if (valueSet.has(value)) {
        labels.push({
          value,
          label: children
        })
        isActive = true
      }
      return React.cloneElement(child, {
        active: isActive,
        onClick: () => {
          if (isActive) {
            this.removeValue(valueSet, value)
          } else {
            this.addValue(valueSet, value)
          }
        }
      })
    })
    return (
      <Dropdown className={classnames('bfd-multiple-select', { disabled }, className)} disabled={disabled} {...other}>
        <DropdownToggle>
        {labels.length ? (
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
        ) : <div className="default-title">请选择</div>}
        </DropdownToggle>
        <DropdownMenu>
          <ul>{childrenWithProps}</ul>
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