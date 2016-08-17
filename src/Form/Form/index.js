import React, { Component, PropTypes } from 'react'
import update from 'react-update'
import classnames from 'classnames'
import warning from 'warning'
import xhr from '../../xhr'

class Form extends Component {

  constructor(props) {
    super()
    this.update = update.bind(this)
    // 存储 FormItem 实例，用于访问 FormItem
    this.items = []
    this.state = {
      data: props.data || props.defaultData
    }
  }

  componentWillReceiveProps({ data }) {
    data && this.setState({ data })
  }

  getChildContext() {
    return {
      form: this
    }
  }

  addItem(newItem) {
    if (newItem.props.multiple) {
      newItem.uuid = Math.random().toString(16).slice(2)
      this.multipleMap || (this.multipleMap = {})
      this.multipleMap[newItem.uuid] = this.items.filter(item => item.props.name === newItem.props.name).length
    }
    this.items.push(newItem)
  }

  removeItem(item) {
    if (item.props.multiple) {
      delete this.multipleMap[item.uuid]
      // Reset index
      const name = item.props.name
      this.items.filter(item => item.props.name === name).forEach((item, i) => {
        this.multipleMap[item.uuid] = i
      })
    }
    this.items.splice(this.items.indexOf(item), 1)
  }

  validate(data) {
    data || (data = this.props.data)
    let isValid = true
    this.items.forEach(formItem => {
      const { name, multiple } = formItem.props
      if (!multiple) {
        formItem.validate(data[name]) || (isValid = false)
      } else {
        const index = this.multipleMap[formItem.uuid]
        formItem.validate(data[name] && data[name][index]) || (isValid = false)
      }
    })
    return isValid
  }

  save(data) {
    if (this.validate()) {
      if (process.env.NODE_ENV !== 'production') {
        warning(this.props.action, 'No `action` provided, check the Form component you save.')
      }
      xhr({
        type: 'POST',
        url: this.props.action,
        data: data || this.props.data,
        success: data => {
          this.props.onSuccess && this.props.onSuccess(data)
        }
      })
    }
  }

  render() {
    const { className, data, children, onChange, onSubmit, ...other } = this.props
    return (
      <form 
        onSubmit={e => e.preventDefault()} 
        className={classnames('bfd-form', className)} 
        {...other}
      >
        {children}
      </form>
    )
  }
}

Form.childContextTypes = {
  form: PropTypes.instanceOf(Form)
}

Form.defaultProps = {
  labelWidth: 100
}

Form.propTypes = {

  // 表单数据源，作为表单验证时的数据对象、表单提交的数据源、FormInput、FormSelect、FormTextarea 等自动填充的数据源
  data: PropTypes.object,

  // 表单数据源（不可控），同 data
  defaultData: PropTypes.object,

  // 表单数据改变后的回调，参数为表单数据对象
  onChange: PropTypes.func,

  // 表单验证规则，需要验证的 key 与 data 对象一一对应
  rules: PropTypes.object,

  // 表单 label 宽度，如果不需要 label，设置为 0 即可
  labelWidth: PropTypes.number,

  // 表单提交 URL，内部调用 xhr 模块
  action: PropTypes.string,

  // 成功后的回调，参数为服务器返回后的数据
  onSuccess: PropTypes.func,

  customProp({ data, onChange }) {
    if (data && !onChange) {
      return new Error('You provided a `data` prop without an `onChange` handler')
    }
  }
}

export default Form