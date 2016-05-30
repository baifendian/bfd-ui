import React, { PropTypes } from 'react'
import classnames from 'classnames'
import './less/checkbox.less'

function Checkbox(props, { checkboxGroup }) {

  const { className, value, checked, disabled, children, block, onChange, ...other } = props
  const {...inputProps} = { value, checked, disabled, onChange }

  if (checkboxGroup) {

    const selects = checkboxGroup.getSelects()
    if (selects.length) {
      inputProps.checked = selects.indexOf(value) > -1
    }
    
    inputProps.onChange = e => {
      checkboxGroup[(e.target.checked ? 'add' : 'remove') + 'Select'](value)
    }
  }

  return (
    <div className={classnames('bfd-checkbox', {checkbox: block, 'checkbox-inline': !block, disabled: disabled}, className)} {...other}>
      <label>
        <input type="checkbox" {...inputProps} />
        <span className="status"></span>
        {children ? <span>{children}</span> : null}
      </label>
    </div>
  )
}

Checkbox.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  block: PropTypes.bool
}

Checkbox.contextTypes = {
  checkboxGroup: PropTypes.object
}

export default Checkbox