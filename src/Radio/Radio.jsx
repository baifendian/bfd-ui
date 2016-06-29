import React, { PropTypes } from 'react'
import classnames from 'classnames'
import './less/radio.less'

function Radio(props) {

  const { className, value, checked, disabled, onChange, children, ...other } = props
  const { ...inputProps } = { value, checked, disabled, onChange }
  
  return (
    <div 
      className={classnames('bfd-radio radio-inline', className, { disabled })} 
      {...other}
    >
      <label>
        <input type="radio" {...inputProps} />
        <span className="status"></span>
        <span>{children}</span>
      </label>
    </div>
  )
}

Radio.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  disabled: PropTypes.bool
}

export default Radio