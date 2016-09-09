/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { PropTypes } from 'react'
import Button from '../Button'

const FormSubmit = (props, context) => {

  const { children, className, onClick, ...other } = props
  const form = context.form

  const handleClick = () => {
    onClick && onClick()
    if (form.props.onSubmit) {
      form.props.onSubmit(form.state.data)
    } else {
      form.save()
    }
  }
  return (
    <Button 
      style={{marginLeft: `${form.props.labelWidth}px`}} 
      onClick={handleClick}
      {...other}
    >
      {children}
    </Button>
  )
}

FormSubmit.contextTypes = {
  form: PropTypes.object
}

export default FormSubmit