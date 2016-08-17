import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { Select, Option } from '../../Select'
import formControlValue from '../formControlValue'

const FormSelect = (props, context) => {
  const { className, children, onChange, ...other } = props
  const control = formControlValue(context.form, context.formItem)
  other.value = control.get()
  other.onChange = value => {
    control.set(value)
    onChange && onChange(value)
  }
  return (
    <Select className={classnames('bfd-form-select', className)} {...other}>
      {children}
    </Select>
  )
}

FormSelect.contextTypes = {
  form: PropTypes.object,
  formItem: PropTypes.object
}

export { FormSelect, Option }