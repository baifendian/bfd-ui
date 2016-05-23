import React, { PropTypes } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu } from '../Dropdown'
import classnames from 'classnames'
import './Select.less'

const Select = React.createClass({

  getInitialState() {
    return {
      value: this.props.value || this.props.defaultValue
    }
  },

  componentWillReceiveProps(nextProps) {
    'value' in nextProps && this.setState({
      value: nextProps.value
    })  
  },

  render() {
    let label
    const { className, children, disabled, ...other } = this.props
    const childrenWithProps = React.Children.map(children, (child, i) => {
      const { value, children } = child.props
      let isActive = false
      if (this.state.value === value) {
        label = children
        isActive = true
      }
      return React.cloneElement(child, {
        active: isActive,
        onClick: () => {
          this.refs.dropdown.close()
          this.setState({ value })
          this.props.onChange && this.props.onChange(value)
        }
      })
    })
    return (
      <Dropdown ref="dropdown" className={classnames('bfd-select2', { disabled }, className)} disabled={disabled} {...other}>
        <DropdownToggle>
          <div className="title">{label}</div>
          <span className="caret"></span>
        </DropdownToggle>
        <DropdownMenu>
          <ul>{childrenWithProps}</ul>
        </DropdownMenu>
      </Dropdown>
    )
  }
})

Select.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  customProp({ value, onChange }) {
    if (value && !onChange) {
      return new Error('You provided a `value` prop without an `onChange` handler')
    }
  }
}

export default Select