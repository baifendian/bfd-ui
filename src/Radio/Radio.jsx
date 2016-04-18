import React, { PropTypes } from 'react'
import classnames from 'classnames'
import './less/radio.less'

const propTypes = {
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool
}

const contextTypes = {
  value: PropTypes.string,
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
    const { children, ...others } = this.props
    return (
      <div className={classnames('bfd-radio radio-inline', {disabled: this.props.disabled})}>
        <label>
          <input name={`radio-${this.context.radioName}`} type="radio" onChange={this.context.setValue} {...check} {...others} />
          <span className="status"></span>
          <span>{children}</span>
        </label>
      </div>
    )
  }
})

Radio.propTypes = propTypes
Radio.contextTypes = contextTypes

export default Radio