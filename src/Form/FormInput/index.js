/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { PropTypes } from 'react'
import classnames from 'classnames'
import ClearableInput from '../../ClearableInput'
import formControlValue from '../formControlValue'

const FormInput = (props, context) => {
  const { children, className, onChange, ...other } = props
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