import React, { PropTypes } from 'react'
import classnames from 'classnames'
import xhr from '../xhr'
import message from '../message'
import warning from '../warning'
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

  validate(data) {
    data || (data = this.props.data)
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

  save(data) {
    if (this.validate()) {
      if (process.env.NODE_ENV !== 'production') {
        this.props.action || warning('No `action` provided, check the Form component you save.')
      }
      xhr({
        type: 'post',
        url: this.props.action,
        data: data || this.props.data,
        success: data => {
          this.props.onSuccess && this.props.onSuccess(data)
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
  data: PropTypes.object,
  onChange: PropTypes.func,
  rules: PropTypes.object,
  labelWidth: PropTypes.number,
  action: PropTypes.string,
  onSuccess: PropTypes.func,
  customProp({ data, onChange }) {
    if (data && !onChange) {
      return new Error('You provided a `data` prop without an `onChange` handler.')
    }
  }
}

export default Form