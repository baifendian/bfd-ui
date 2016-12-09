/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react'
import { render } from 'react-dom'
import isPlainObject from 'lodash/isPlainObject'
import { Modal, ModalHeader, ModalBody } from '../Modal'
import Button from '../Button'
import './index.less'

class Confirm extends Component {

  options = {}

  handleConfirm() {
    this.options.onConfirm && this.options.onConfirm()
    this.close()
  }

  open() {
    this.forceUpdate()
    this.refs.modal.open()
  }

  close() {
    this.refs.modal.close()
  }

  render() {
    const { title, content, operation, okText, cancelText } = this.options
    return (
      <Modal className="bfd-confirm" ref="modal">
        <ModalHeader>
          <h4>{title}</h4>
        </ModalHeader>
        <ModalBody>
          <div className="bfd-confirm__message">{content}</div>
          <div className="bfd-confirm__operate">
            {operation ? operation : (
              <div>
                <Button onClick={::this.handleConfirm}>{okText}</Button>
                <Button type="minor" onClick={::this.close}>{cancelText}</Button>
              </div>
            )}
          </div>
        </ModalBody>
      </Modal>
    )
  }
}

let instance
const defaultOptions = {
  title: '确认提示',
  okText: '确定',
  cancelText: '取消'
}

/**
 * @public
 * @name confirm
 * @param  { ReactNode | Object } content 显示内容 | 配置项
 * @param  { function } [onConfirm] 确定后的回调
 * @description 确认提示，eg
 * ```js
 * confirm('确认删除吗？', () => console.log('确认'))
 * ```
 * 更多控制请使用配置项方式：
 * ```js
 * confirm({
 *   content: 'xxx', // 提示内容
 *   onConfirm: function() {}, // 确定后的回调，非自定义操作下使用
 *   operation: <Button>xxx</Button>, // 自定义操作逻辑，默认两个按钮：确认、取消
 *   title: 'xxx', // 提示框标题，默认`确认提示`，可全局配置
 *   okText: 'xxx', // 确定按钮文字，默认`确定`，可全局配置
 *   cancelText: 'xxx', // 取消按钮文字，默认`取消`，可全局配置
 * })
 * ```
 */
function confirm(content, onConfirm) {
  if (!instance) {
    const container = document.createElement('div')
    document.body.appendChild(container)
    instance = render(<Confirm />, container)
  }
  let options
  if (isPlainObject(content) && !React.isValidElement(content)) {
    options = content
  } else {
    options = { content, onConfirm }
  }
  instance.options = Object.assign({}, defaultOptions, options)
  instance.open()
}

/**
 * @public
 * @name confirm.close
 * @description 关闭确认提示
 */
confirm.close = () => {
  instance.close()
}

/**
 * @public
 * @name confirm.config
 * @param { Object } options
 * @description confirm 全局配置，配置项
 * ```js
 * {
 *   title: 'xxx', // 提示框标题，默认`确认提示`
 *   okText: 'xxx', // 确定按钮文字，默认`确定`
 *   cancelText: 'xxx', // 取消按钮文字，默认`取消`
 * }
 * ```
 */
confirm.config = options => {
  Object.assign(defaultOptions, options)
}

export default confirm
