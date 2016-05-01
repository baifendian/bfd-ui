import React, { PropTypes } from 'react'
import ClearableInput from '../ClearableInput'
import classnames from 'classnames'
import formControlValue from '../formControlValue'
import './index.less'

const FormInput = React.createClass({
  
  render() {

    const { className, children, onChange, ...other } = this.props
    const control = formControlValue(this)
    other.value = control.get()
    
    other.onChange = value => {
      control.set(value)
      onChange && onChange(value)
    }
    
    return <ClearableInput className={classnames('bfd-form-input', className)} {...other} />
  }
})

FormInput.contextTypes = {
  form: PropTypes.object,
  formItem: PropTypes.object
}

export default FormInput