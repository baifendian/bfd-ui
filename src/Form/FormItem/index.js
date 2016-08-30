import './index.less'
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import Icon from '../../Icon'

class FormItem extends Component {

  constructor(props) {
    super()
    this.state = {
      error: null
    }
  }

  getChildContext() {
    return {
      formItem: this
    }
  }

  componentWillMount() {
    this.context.form.addItem(this)
  }

  componentWillUnmount() {
    this.context.form.removeItem(this)
  }

  /**
   * @public
   * @name this.refs.form.validate
   * @param  {*} value 待验证字段的数据
   * @return {boolean} 成功/失败
   * @description 单个字段验证
   */
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
  }

  render() {
    const { error } = this.state
    const { name, multiple, required, help, label, className, children, ...other } = this.props
    const labelWidth = this.context.form.props.labelWidth

    const Help = help && (
      <div className="bfd-form__item-tip">
        <Icon type="question-circle" />
        {help}
      </div>
    )

    const Error = error && (
      <div className="bfd-form__item-tip">
        <Icon type="info-circle" />
        {error}
      </div>
    )

    const classNames = classnames('bfd-form__item', {
      'bfd-form__item--error': error
    }, className)

    return (
      <div className={classNames} {...other} fluid>
        {label && (
          <div 
            className={classnames('bfd-form__item-label', {
              'bfd-form__item-label--required': required
            })} 
            style={{width: `${labelWidth}px`}}
          >
            {label}：
          </div>
        )}
        <div style={{marginLeft: `${labelWidth}px`}}>
          {children}
          {Error || Help}
        </div>
      </div>
    )
  }
}

FormItem.contextTypes = {
  form: PropTypes.object
}

// For formControlValue
FormItem.childContextTypes = {
  formItem: PropTypes.instanceOf(FormItem)
}

FormItem.propTypes = {

  // label 显示内容
  label: PropTypes.string,

  // 表单数据 key，与 data、rules 对应
  name: PropTypes.string.isRequired,

  // 是否必填，label 显示上的区别
  required: PropTypes.bool,

  // 提示信息
  help: PropTypes.string,

  // 是否多条，针对某些字段为数组的场景
  multiple: PropTypes.bool
}

export default FormItem