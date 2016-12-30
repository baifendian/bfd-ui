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
import { Select, Option } from '../../Select'

const FormSelect = (props, context) => {
  const { children, className, onChange, ...other } = props
  const { form, formItem } = context
  other.value = form.getItemValue(formItem)
  other.onChange = value => {
    form.setItemValue(formItem, value)
    onChange && onChange(value)
  }
  return (
    <Select className={classnames('bfd-form-select', className)} {...other}>
      {children}
    </Select>
  )
}

FormSelect.contextTypes = {
  form: PropTypes.object.isRequired,
  formItem: PropTypes.object.isRequired
}

export { FormSelect, Option }
