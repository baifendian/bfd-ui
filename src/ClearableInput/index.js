import './index.less'
import React, { PropTypes } from 'react'
import classnames from 'classnames'
import Input from '../Input'
import Icon from '../Icon'

const ClearableInput = React.createClass({

  getInitialState() {
    return {
      value: this.props.defaultValue || this.props.value || ''
    }
  },

  componentWillReceiveProps(nextProps) {
    'value' in nextProps && this.setState({value: nextProps.value})
  },

  handleClear(e) {
    e.stopPropagation()
    this.props.onClear && this.props.onClear()
    this.handleChange('')
  },

  handleInputChange(e) {
    e.stopPropagation()
    this.handleChange(e.target.value)
  },

  handleChange(value) {
    this.setState({ value })
    this.props.onChange && this.props.onChange(value)
  },

  focus() {
    this.refs.input.focus()
  },

  render() {
    const { size, className, onChange, ...other } = this.props
    const value = this.state.value
    return (
      <div className={classnames('bfd-clearable-input', className)}>
        <Input 
          ref="input"
          value={value} 
          onChange={this.handleInputChange} 
          {...other} 
        />
        {
          value && !other.disabled ? 
          <Icon type="remove" className="clear" onClick={this.handleClear} /> : 
          null
        }
      </div>
    )
  }
})

ClearableInput.propTypes = {
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  size: PropTypes.string,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  customProp({ value, onChange }) {
    if (value && !onChange) {
      return new Error('You provided a `value` prop without an `onChange` handler')
    }
  }
}

export default ClearableInput