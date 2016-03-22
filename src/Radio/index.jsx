import React, { PropTypes } from 'react'
import './main.less'

const RadioGroup = React.createClass({

  propTypes: {
    value: PropTypes.string,
    onChange: PropTypes.func
  },

  childContextTypes: {
    getValue: PropTypes.func,
    setValue: PropTypes.func,
    radioName: PropTypes.string
  },

  getChildContext() {
    return {
      getValue: () => this.props.value,
      setValue: e => {
        this.props.onChange && this.props.onChange(e.target.value)
      },
      radioName: Math.random().toString(16).slice(2)
    }
  },
  
  render() {
    return <div className="radios">{this.props.children}</div>
  }
})

const Radio = React.createClass({

  contextTypes: {
    getValue: PropTypes.func,
    setValue: PropTypes.func,
    radioName: PropTypes.string
  },

  render() {
    const check = {}
    const value = this.context.getValue()
    if (value) {
      check.checked = this.props.value === value
    }
    return (
      <div className="bfd-radio radio-inline">
        <label>
          <input name={'radio-' + this.context.radioName} type="radio" onChange={this.context.setValue} {...check} value={this.props.value}/>
          <span className="status"></span>
          {this.props.children}
        </label>
      </div>
    )
  }
})

export { RadioGroup, Radio }