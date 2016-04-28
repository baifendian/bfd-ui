import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { Select, Option } from '../Select'
import './index.less'

const FormSelect = React.createClass({
  
  render() {

    const { className, children, ...other } = this.props
    const { form, formItem } = this.context
    const name = formItem.props.name
    const data = form.props.data[name]

    if (!formItem.props.multiple) {
      other.selected = data
    } else {
      if (data instanceof Array) {
        other.selected = data[formItem.multipleIndex]
      }
    }
    
    other.onChange = value => {
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
    
    return <Select className={classnames('bfd-form-select', className)} {...other}>{children}</Select>
  }
})

FormSelect.contextTypes = {
  form: PropTypes.object,
  formItem: PropTypes.object
}

export { FormSelect, Option }