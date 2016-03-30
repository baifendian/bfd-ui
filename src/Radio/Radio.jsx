import React, { PropTypes } from 'react'
import './less/radio.less'

const contextTypes = {
  value: PropTypes.func,
  setValue: PropTypes.func,
  radioName: PropTypes.string
}

const Radio = React.createClass({

  render() {
    const check = {}
    const value = this.context.value
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

Radio.contextTypes = contextTypes

export default Radio