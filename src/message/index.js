/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule src/message/index.js
 */

import './index.less'
import React, { Component } from 'react'
import { render } from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import warning from 'warning'
import classnames from 'classnames'
import Icon from '../Icon'

class Message extends Component {

  constructor() {
    super()
    this.state = {}
  }

  render() {
    const { show, type, message } = this.state
    return (
      <ReactCSSTransitionGroup transitionName="bfd-message--in" transitionEnterTimeout={200} transitionLeaveTimeout={150}>
        {show && (
          <div className={classnames('bfd-message', {[`bfd-message--${type}`]: type})}>
            <Icon 
              className="bfd-message__symbol" 
              type={type === 'success' ? 'check': 'warning'} 
            />
            {message}
          </div>
        )}
      </ReactCSSTransitionGroup>
    )
  }
}

let instance

const showMessage = (type, message, duration) => {
  if (__DEV__) {
    warning(typeof message === 'string' || (message && React.isValidElement(message)), '`message` should be `string` or `ReactElement`, check the first param of message.' + type)
  }
  if (!instance) {
    const container = document.createElement('div')
    document.body.appendChild(container)
    instance = render(<Message />, container)
  }
  if (!instance.state.show) {
    instance.setState({
      message,
      type,
      duration,
      show: true
    })
    setTimeout(() => {
      instance.setState({show: false})
    }, duration * 1000)
  }
}

const message = {

  /**
   * @public
   * @name message.success
   * @param  {string | element} message message 内容，支持 React 元素
   * @param  {number} [duration] 持续时间，单位毫秒
   * @description 成功信息，默认 2 秒后自动关闭
   */
  success(message, duration) {
    showMessage('success', message, duration = 2)
  },

  /**
   * @public
   * @name message.danger
   * @param  {string | element} message message 内容，支持 React 元素
   * @param  {number} [duration] 持续时间，单位毫秒
   * @description 失败信息，默认 3 秒后自动关闭
   */
  danger(message, duration) {
    showMessage('danger', message, duration = 3)
  },

  /**
   * @public
   * @name message.close
   * @description 关闭 message 信息
   */
  close() {
    instance && instance.setState({show: false})
  }
}

export default message