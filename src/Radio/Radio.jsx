import React, { PropTypes } from 'react'
import classnames from 'classnames'
import RadioGroup from './RadioGroup'
import './less/radio.less'

function Radio(props, { radioGroup }) {

  if (!radioGroup) {
    throw new Error('you use `<Radio>` without `<RadioGroup>`')
  }

  const { className, disabled, value, children, ...other } = props
  const { ...inputProps } = { disabled, value }
  
  if (radioGroup.props.value) {
    inputProps.checked = value === radioGroup.props.value
  }
  
  return (
    <div className={classnames('bfd-radio radio-inline', className, { disabled })} {...other}>
      <label>
        <input name={'radio-' + radioGroup.radioName} type="radio" onChange={radioGroup.handleChange} {...inputProps} />
        <span className="status"></span>
        <span>{children}</span>
      </label>
    </div>
  )
}

Radio.propTypes = {
  value: PropTypes.string.isRequired,
  disabled: PropTypes.bool
}

Radio.contextTypes = {
  radioGroup: PropTypes.instanceOf(RadioGroup)
}

export default Radio