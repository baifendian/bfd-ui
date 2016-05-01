import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { Select, Option } from '../Select2'
import formControlValue from '../formControlValue'
import './index.less'

const FormSelect = React.createClass({
  
  render() {

    const { className, children, onChange, ...other } = this.props
    const control = formControlValue(this)
    other.value = control.get()
    
    other.onChange = value => {
      control.set(value)
      onChange && onChange(value)
    }
    
    return <Select className={classnames('bfd-form-select', className)} {...other}>{children}</Select>
  }
})

FormSelect.contextTypes = {
  form: PropTypes.object,
  formItem: PropTypes.object
}

export { FormSelect, Option }