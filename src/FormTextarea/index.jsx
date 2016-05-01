import React, { PropTypes } from 'react'
import classnames from 'classnames'
import formControlValue from '../formControlValue'
import './index.less'

const FormTextarea = React.createClass({
  
  render() {

    const { className, children, onChange, ...other } = this.props
    const control = formControlValue(this)
    other.value = control.get()
    
    other.onChange = e => {
      control.set(e.target.value)
      onChange && onChange(e)
    }
    
    return <textarea className={classnames('form-control bfd-form-textarea', className)} {...other} />
  }
})

FormTextarea.contextTypes = {
  form: PropTypes.object,
  formItem: PropTypes.object
}

export default FormTextarea