import React, { PropTypes } from 'react'
import classnames from 'classnames'
import Icon from '../Icon'
import './index.less'

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

  render() {
    const { size, inline, className, onChange, ...other } = this.props
    const value = this.state.value
    return (
      <div className={classnames('bfd-clearable-input', className, { inline })}>
        <input {...other} value={value} className={'form-control' + (size ? ' input-' + size : '')} onChange={this.handleInputChange} />
        {value && !other.disabled ? <Icon type="remove" className="clear" onClick={this.handleClear} /> : null}
      </div>
    )
  }
})

ClearableInput.propTypes = {
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  size: PropTypes.string,
  inline: PropTypes.bool,
  onChange: PropTypes.func,
  onClear: PropTypes.func,
  customProp({ value, onChange }) {
    if (value && !onChange) {
      return new Error('You provided a `value` prop without an `onChange` handler')
    }
  }
}

ClearableInput.defaultProps = {
  type: 'text'
}

export default ClearableInput