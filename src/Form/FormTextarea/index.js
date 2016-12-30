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
import './index.less'

const FormTextarea = (props, context) => {
  const { children, className, onChange, ...other } = props
  const { form, formItem } = context
  let value = form.getItemValue(formItem)
  if (!value && value !== 0) {
    value = ''
  }
  other.value = value
  other.onChange = e => {
    form.setItemValue(formItem, e.target.value)
    onChange && onChange(e)
  }
  return <textarea className={classnames('bfd-form-textarea', className)} {...other} />
}

FormTextarea.contextTypes = {
  form: PropTypes.object.isRequired,
  formItem: PropTypes.object.isRequired
}

export default FormTextarea
