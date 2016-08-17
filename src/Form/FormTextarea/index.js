import './index.less'
import React, { PropTypes } from 'react'
import classnames from 'classnames'
import formControlValue from '../formControlValue'

const FormTextarea = (props, context) => {
  const { className, children, onChange, ...other } = props
  const control = formControlValue(context.form, context.formItem)
  other.value = control.get()
  other.onChange = e => {
    control.set(e.target.value)
    onChange && onChange(e)
  }
  return <textarea className={classnames('bfd-form-textarea', className)} {...other} />
}

FormTextarea.contextTypes = {
  form: PropTypes.object,
  formItem: PropTypes.object
}

export default FormTextarea