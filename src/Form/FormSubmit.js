/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import Button from '../Button'
import Spinner from '../Spinner'

class FormSubmit extends Component {

  constructor(props, context) {
    super()
    const { form } = context
    form.submit = this
    this.state = {
      process: false
    }
  }

  handleClick() {
    const { onClick } = this.props
    const { form } = this.context
    onClick && onClick()
    if (form.props.onSubmit) {
      form.props.onSubmit(form.state.data)
    } else {
      form.save()
    }
  }

  /**
   * @public
   * @name toggleProcess
   * @param  {boolean} process 是否切换到处理中模式
   * @description 控制按钮状态是否为处理中，用于表单提交成功前的等待提醒，
   * 调用 Form save 方法且表单验证通过后自动调用该接口
   */
  toggleProcess(process) {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.setState({ process })
    }, process ? 150 : 0)
  }

  render() {
    const { children, className, onClick, ...other } = this.props
    const { process } = this.state
    const { form } = this.context
    return (
      <Button
        style={{marginLeft: `${form.props.labelWidth}px`}}
        className={classnames('bfd-form-submit'), className}
        onClick={::this.handleClick}
        disabled={process}
        {...other}
      >
        {process ? <Spinner height={20} /> : children}
      </Button>
    )
  }
}

FormSubmit.contextTypes = {
  form: PropTypes.object
}

export default FormSubmit
