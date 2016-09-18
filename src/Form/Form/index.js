/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

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

  /**
   * @public
   * @name this.refs.form.validate
   * @param  {object} [data] 验证的数据，默认验证表单当前的数据
   * @return {boolean} 成功/失败
   * @description 表单整体验证
   */
  validate(data) {
    data || (data = this.state.data)
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

  /**
   * @public
   * @name this.refs.form.save
   * @param  {object} [data] 提交的数据，默认提交表单当前的数据
   * @description 表单提交，提交地址为 action 属性, 默认提交 data 
   * 属性数据，可以自定义传入。发送请求前会进行表单验证, 提交成功会响应 onSuccess
   */
  save(data) {
    if (this.validate()) {
      if (process.env.NODE_ENV !== 'production') {
        warning(this.props.action, 'No `action` provided, check the Form component you save.')
      }
      this.submit && this.submit.toggleProcess(true)
      xhr({
        type: 'POST',
        url: this.props.action,
        data: data || this.state.data,
        success: data => {
          this.props.onSuccess && this.props.onSuccess(data)
        },
        complete: () => {
          this.submit && this.submit.toggleProcess(false)  
        }
      })
    }
  }

  handleSubmit(e) {
    e.preventDefault()
    this.props.onSubmit && this.props.onSubmit(this.state.data)
  }

  render() {

    const {
      children, className, data, defaultData, onChange, onSubmit, onSuccess, 
      rules, labelWidth, ...other
    } = this.props
    
    return (
      <form 
        onSubmit={::this.handleSubmit} 
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

  // 表单数据改变后的回调，参数为当前表单的数据
  onChange: PropTypes.func,

  // 表单验证规则，需要验证的 key 与 data 对象一一对应
  rules: PropTypes.object,

  // 表单 label 宽度，如果不需要 label，设置为 0 即可
  labelWidth: PropTypes.number,

  // 表单提交 URL，内部调用 xhr 模块
  action: PropTypes.string,

  // 成功后的回调，参数为服务器返回后的数据
  onSuccess: PropTypes.func,

  // 表单提交回调，参数为当前表单的数据，自定义提交后的行为，不会自动调用
  // save。不指定此属性，表单提交后自动调用 save
  onSubmit: PropTypes.func,

  customProp({ data, onChange }) {
    if (data && !onChange) {
      return new Error('You provided a `data` prop without an `onChange` handler')
    }
  }
}

export default Form