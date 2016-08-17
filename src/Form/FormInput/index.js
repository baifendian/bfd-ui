import React, { PropTypes } from 'react'
import classnames from 'classnames'
import ClearableInput from '../../ClearableInput'
import formControlValue from '../formControlValue'

const FormInput = (props, context) => {
  const { className, children, onChange, ...other } = props
  const control = formControlValue(context.form, context.formItem)
  other.value = control.get()
  other.onChange = value => {
    control.set(value)
    onChange && onChange(value)
  }
  return <ClearableInput className={classnames('bfd-form-input', className)} {...other} />
}

FormInput.contextTypes = {
  form: PropTypes.object,
  formItem: PropTypes.object
}

export default FormInput