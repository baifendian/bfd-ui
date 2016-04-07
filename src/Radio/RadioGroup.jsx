import React, { PropTypes } from 'react'
import './less/radioGroup.less'

const propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func
}

const childContextTypes = {
  value: PropTypes.string,
  setValue: PropTypes.func,
  radioName: PropTypes.string
}

const RadioGroup = React.createClass({

  getChildContext() {
    return {
      value: this.props.value,
      setValue: e => {
        this.props.onChange && this.props.onChange(e.target.value)
      },
      radioName: Math.random().toString(16).slice(2)
    }
  },
  
  render() {
    return <div className="radios bfd-radio-group">{this.props.children}</div>
  }
})

RadioGroup.propTypes = propTypes
RadioGroup.childContextTypes = childContextTypes

export default RadioGroup