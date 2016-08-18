import './index.less'
import React, { Component, PropTypes } from 'react'
import { render } from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import warning from 'warning'
import classnames from 'classnames'
import Button from '../Button'

class Message extends Component {

  constructor() {
    super()
    this.state = {}
  }

  handleRemove() {
    this.setState({show: false})
    if (typeof this.state.duration === 'function') {
      this.state.duration()
    }
  }

  render() {
    const { show, type, message } = this.state
    return (
      <ReactCSSTransitionGroup transitionName="bfd-message--in" transitionEnterTimeout={200} transitionLeaveTimeout={150}>
        {show && (
          <div className={classnames('bfd-message', {[`bfd-message--${type}`]: type})}>
            {message}
            {type === 'danger' && (
              <Button
                transparent 
                icon="remove" 
                className="bfd-message__remove" 
                onClick={::this.handleRemove} 
              />
            )}
          </div>
        )}
      </ReactCSSTransitionGroup>
    )
  }
}

let instance

const showMessage = (type, message, duration = 2) => {
  if (process.env.NODE_ENV !== 'production') {
    warning(typeof message === 'string' || (message && React.isValidElement(message)), '`message` should be `string` or `ReactElement`, check the first param of message.' + type)
  }
  if (!instance) {
    const container = document.createElement('div')
    document.body.appendChild(container)
    instance = render(<Message />, container)
  }
  instance.state.show || instance.setState({
    message,
    type,
    duration,
    show: true
  })
  if (type !== 'danger') {
    setTimeout(() => {
      instance.setState({show: false})
    }, duration * 1000)
  }
}

const message = {

  /**
   * @public
   * @name message.success
   * @description 成功信息，默认 2 秒后自动关闭
   * @param  {string | element} message message 内容，支持 React 元素
   * @param  {number} [duration] 持续时间，单位毫秒
   */
  success(message, duration) {
    showMessage('success', message, duration)
  },

  /**
   * @public
   * @name message.danger
   * @description 危险/错误类信息，不会自动关闭
   * @param  {string | element} message message 内容，支持 React 元素
   * @param  {function} [onClose] 关闭后的回调
   */
  danger(message, onClose) {
    showMessage('danger', message, onClose)
  },

  /**
   * @public
   * @description 关闭 message 信息
   * @name message.close
   */
  close() {
    instance && instance.setState({show: false})
  }
}

export default message