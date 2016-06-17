import React, { PropTypes } from 'react'
import classnames from 'classnames'
import './FormItem.less'

const FormItem = React.createClass({

  getInitialState() {
    return {
      error: null  
    }
  },

  getChildContext() {
    return {
      formItem: this
    }
  },

  componentWillMount() {
    this.context.form.addItem(this)
  },

  componentWillReceiveProps() {
    this.validate(this.context.form.props.data[this.props.name])
  },

  componentWillUnmount() {
    this.context.form.removeItem(this)
  },

  validate(value) {
    const rules = this.context.form.props.rules
    const rule = rules && rules[this.props.name]
    let isValid = true
    if (rule) {
      const error = rule(value)
      if (error && typeof error === 'string') {
        isValid = false
      }
      this.setState({ error })
    }
    return isValid
  },

  render() {
    const { error } = this.state
    const { name, multiple, required, help, label, className, children, ...other } = this.props
    const labelWidth = this.context.form.props.labelWidth

    let Help
    if (help) {
      Help = (
        <div className="tip help">
          <span className="glyphicon glyphicon-question-sign"></span>
          {help}
        </div>
      )
    }

    let Error
    if (error) {
      Error = (
        <div className="tip error">
          <span className="glyphicon glyphicon-exclamation-sign"></span>
          {error}
        </div>
      )
    }

    return (
      <div className={classnames('form-group bfd-form-item2', className, {'has-error': error})} {...other}>
        { label ? <div className={classnames('form-label', { required })} style={{width: labelWidth + 'px'}}>{label}：</div> : null }
        <div className="form-content" style={{marginLeft: labelWidth + 'px'}}>
          {children}
          {Error ? Error : Help}
        </div>
      </div>
    )
  }
})

FormItem.contextTypes = {
  form: PropTypes.object
}

FormItem.childContextTypes = {
  formItem: PropTypes.instanceOf(FormItem)
}

FormItem.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  required: PropTypes.bool,
  help: PropTypes.string,
  multiple: PropTypes.bool
}

export default FormItem