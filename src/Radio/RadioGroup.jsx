import React, { PropTypes } from 'react'
import classnames from 'classnames'
import './less/radioGroup.less'

const RadioGroup = React.createClass({

  getChildContext() {
    return {
      radioGroup: this
    }
  },

  componentWillMount() {
    this.radioName = Math.random().toString(16).slice(2)
  },

  handleChange(e) {
    this.props.onChange && this.props.onChange(e.target.value)
  },
  
  render() {
    const { className, onChange, ...other } = this.props
    return <div className={classnames('radios bfd-radio-group', className)} {...other}>{this.props.children}</div>
  }
})

RadioGroup.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  customProp({ value, onChange }) {
    if (value && !onChange) {
      return new Error('You provided a `value` prop without an `onChange` handler')
    }
  }
}

RadioGroup.childContextTypes = {
  radioGroup: PropTypes.instanceOf(RadioGroup)
}

export default RadioGroup