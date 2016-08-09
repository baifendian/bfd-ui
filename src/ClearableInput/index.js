import './index.less'
import React, { PropTypes } from 'react'
import classnames from 'classnames'
import Input from '../Input'
import Button from '../Button'

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

  // @public
  focus() {
    this.refs.input.focus()
  },

  render() {
    const { className, onChange, ...other } = this.props
    const value = this.state.value
    return (
      <div className={classnames('bfd-clearable-input', className)}>
        <Input 
          ref="input"
          value={value} 
          onChange={this.handleInputChange} 
          {...other} 
        />
        {value && !other.disabled && (
          <Button 
            icon="remove" 
            type="minor"
            transparent
            className="bfd-clearable-input__clear" 
            onClick={this.handleClear} 
          />
        )}
      </div>
    )
  }
})

ClearableInput.propTypes = {
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  customProp({ value, onChange }) {
    if (value && !onChange) {
      return new Error('You provided a `value` prop without an `onChange` handler')
    }
  }
}

export default ClearableInput