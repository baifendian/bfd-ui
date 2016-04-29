import React, { PropTypes } from 'react'
import classnames from 'classnames'
import './index.less'

const FormTextarea = React.createClass({
  
  render() {

    const { className, children, ...other } = this.props
    const { form, formItem } = this.context
    const name = formItem.props.name
    const data = form.props.data[name]

    if (!formItem.props.multiple) {
      other.value = data
    } else {
      if (data instanceof Array) {
        other.value = data[formItem.multipleIndex]
      }
    }
    
    other.onChange = e => {
      const value = e.target.value
      const formData = form.props.data

      if (!formItem.props.multiple) {
        formData[name] = value
      } else {
        data instanceof Array || (formData[name] = [])
        formData[name][formItem.multipleIndex] = value
      }

      form.props.onChange && form.props.onChange(form.props.data)
      this.context.formItem.validate(value)
    }
    
    return <textarea className={classnames('form-control bfd-form-textarea', className)} {...other} />
  }
})

FormTextarea.contextTypes = {
  form: PropTypes.object,
  formItem: PropTypes.object
}

export default FormTextarea