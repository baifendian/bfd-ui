/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import './index.less'
import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import ToggleNode from '../_shared/ToggleNode'
import Icon from '../Icon'
import Button from '../Button'

class Message extends Component {

  constructor(props) {
    super()
    this.state = {
      open: props.open
    }
    this.prepareClose(props)
  }

  componentDidMount() {
    this.toggleNode = new ToggleNode(ReactDOM.findDOMNode(this), 'bfd-message--open')
    this.toggleNode.onClose = () => {
      this.props.onClose && this.props.onClose()
    }
    this.toggleNode.open()
  }

  componentWillReceiveProps(nextProps) {
    'open' in nextProps && this.setState({open: nextProps.open})
    this.prepareClose(nextProps)
  }

  componentDidUpdate() {
    this.toggleNode[this.state.open ? 'open' : 'close']()
  }

  prepareClose(props) {
    const { duration } = props
    duration && setTimeout(::this.handleClose, duration * 1000)
  }

  handleClose() {
    this.setState({open: false})
  }

  render() {
    const { type, message, duration } = this.props
    return (
      <div className={classnames('bfd-message', {[`bfd-message--${type}`]: type})}>
        <Icon
          className="bfd-message__symbol"
          type={type === 'success' ? 'check': 'warning'}
        />
        {message}
        {duration === 0 && (
          <Button
            className="bfd-message__remove"
            transparent
            icon="remove"
            onClick={::this.handleClose}
          />
        )}
      </div>
    )
  }
}

Message.propTypes = {
  type: PropTypes.oneOf(['success', 'danger']).isRequired,
  message: PropTypes.node.isRequired,
  duration: PropTypes.number,
  onClose: PropTypes.func,
  open: PropTypes.bool
}

let render = props => {
  const container = document.createElement('div')
  document.body.appendChild(container)

  let isOpen = false
  const messageQueue = []
  const handleClose = () => {
    isOpen = false
    const head = messageQueue[0] && messageQueue.shift()
    head && render(head)
  }

  render = nextProps => {
    props = Object.assign({}, props, nextProps)
    if (isOpen && props.open) {
      return messageQueue.push(props)
    }
    isOpen = props.open
    ReactDOM.render(<Message {...props} onClose={handleClose} />, container)
    props.open || handleClose()
  }
  render()
}

const message = {

  /**
   * @public
   * @name message.success
   * @param  {string | element} message message 内容，支持 React 元素
   * @param  {number} [duration] 持续时间，单位秒，为0时手动关闭
   * @description 成功信息，默认 2 秒后自动关闭
   */
  success(message, duration = 2) {
    render({
      message,
      duration,
      type: 'success',
      open: true
    })
  },

  /**
   * @public
   * @name message.danger
   * @param  {string | element} message message 内容，支持 React 元素
   * @param  {number} [duration] 持续时间，单位秒，为0时手动关闭
   * @description 失败信息，默认 3 秒后自动关闭
   */
  danger(message, duration = 3) {
    render({
      message,
      duration,
      type: 'danger',
      open: true
    })
  },

  /**
   * @public
   * @name message.close
   * @description 关闭当前 message
   */
  close() {
    render({open: false})
  }
}

export default message
