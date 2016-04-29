import React, { PropTypes } from 'react'
import classnames from 'classnames'
import xhr from '../xhr'
import message from '../message'
import './Form.less'

const Form = React.createClass({

  getChildContext() {
    return {
      form: this
    }
  },

  componentWillMount() {
    this.multipleCounterMap = {}
  },

  componentWillUpdate() {
    this.multipleCounterMap = {}
  },

  validate() {
    const data = this.props.data
    let isValid = true
    this.formItems.forEach(formItem => {
      const { name, multiple } = formItem.props
      if (!multiple) {
        formItem.validate(data[name]) || (isValid = false)
      } else {
        data[name].forEach(value => {
          formItem.validate(value) || (isValid = false)
        })
      }
    })
    return isValid
  },

  handleSubmit(e) {
    e.preventDefault()
  },

  save() {
    if (this.validate()) {
      xhr({
        type: 'post',
        url: this.props.action,
        data: this.props.data,
        success: res => {
          this.props.onSuccess && this.props.onSuccess(res)
        }
      })
    }
  },

  render() {
    const { className, data, children, onChange, onSubmit, ...other } = this.props
    return <form onSubmit={this.handleSubmit} className={classnames('bfd-form', className)} {...other}>{children}</form>
  }
})

Form.childContextTypes = {
  form: PropTypes.instanceOf(Form)
}

Form.defaultProps = {
  labelWidth: 100
}

Form.propTypes = {
  rules: PropTypes.object,
  data: PropTypes.object,
  onChange: PropTypes.func,
  labelWidth: PropTypes.number,
  customProp({ data, onChange }) {
    if (data && !onChange) {
      return new Error('You provided a `data` prop without an `onChange` handler')
    }
  }
}

export default Form