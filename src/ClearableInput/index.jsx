import React, { PropTypes } from 'react'
import classnames from 'classnames'
import './main.less'

const propTypes = {
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
    const { size, placeholder, className, ...other } = this.props
    const value = this.props.value || this.state.value
    return (
      <div className={classnames('bfd-clearable-input', className, {inline: this.props.inline})} {...other}>
        <input type="text" placeholder={placeholder} className={'form-control' + (size ? ' input-' + size : '')} value={value} onChange={this.handleChange} />
        {value ? <span className="clear glyphicon glyphicon-remove" onClick={this.handleClear}></span> : null}
      </div>
    )
  }
})

ClearableInput.propTypes = propTypes

export default ClearableInput