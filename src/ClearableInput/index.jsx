import React, { PropTypes } from 'react'
import classnames from 'classnames'
import './index.less'

const ClearableInput = React.createClass({

  getInitialState() {
    return {
      value: ''
    }
  },

  handleClear() {
    'value' in this.props || this.setState({value: ''})
    this.props.onChange && this.props.onChange('')
  },

  handleChange(e) {
    e.stopPropagation()
    const value = e.target.value
    'value' in this.props || this.setState({ value })
    this.props.onChange && this.props.onChange(value)
  },

  render() {
    const { size, placeholder, type, className, onChange, ...other } = this.props
    const value = this.props.value || this.state.value
    const { ...inputProps } = { placeholder, type, value}
    return (
      <div className={classnames('bfd-clearable-input', className, {inline: this.props.inline})} {...other}>
        <input {...inputProps} className={'form-control' + (size ? ' input-' + size : '')} onChange={this.handleChange} />
        {value ? <span className="clear glyphicon glyphicon-remove" onClick={this.handleClear}></span> : null}
      </div>
    )
  }
})

ClearableInput.propTypes = {
  value: PropTypes.string,
  size: PropTypes.string,
  placeholder: PropTypes.string,
  inline: PropTypes.bool,
  onChange: PropTypes.func,
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