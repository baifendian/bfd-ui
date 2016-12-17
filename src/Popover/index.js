/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React from 'react'
import ReactDOM from 'react-dom'
import Popover from './Popover'

/**
 * @public
 * @name Popover(options)
 * @description 浮层类，例如：
 * ```js
 * const popover = new Popover({
 *   triggerNode: `DOMNode`, // 触发浮层是否开启
 *   triggerMode: 'click', // 触发方式，默认 `hover`
 *   open: true, // 是否打开，如果为 false 则不会创建 DOM 节点
 *   content: 'xxx', // 显示内容
 *   onOpen: () => {}, // 打开后的的回调
 *   onClose: () => {}, // 关闭后的的回调
 *   shouldOpen: () => {}, // 是否打开条件回调
 *   shouldClose: () => {}, // 是否关闭条件回调
 *   ...other // className 等原生 HTML 属性
 * })
 * ```
 * > onOpen、onClose 回调请勿执行 `popover.update`，以免多次渲染。另外，外部控制 open 状态（非 triggerNode 触发）情况下回调无效
 */
export default class {

  constructor(options) {
    this.makeTriggerable(options)
    this.options = options
  }

  makeTriggerable(options) {
    const { triggerNode, triggerMode = 'hover' } = options
    if (!triggerNode) return
    if (triggerMode === 'hover') {
      triggerNode.onmouseenter = () => {
        clearTimeout(this.closeTimer)
        this.openTimer = setTimeout(::this.open, Popover.LAZY_DURATION)
      }
      triggerNode.onmouseleave = () => {
        clearTimeout(this.openTimer)
        this.closeTimer = setTimeout(::this.close, Popover.LAZY_DURATION)
      }
    } else {
      triggerNode.onclick = e => {
        e.stopPropagation()
        this.toggle()
      }
    }
  }

  render(options) {
    if (!this.containerNode) {
      this.containerNode = document.createElement('div')
      document.body.appendChild(this.containerNode)
    }
    this.render = options => {
      options && Object.assign(this.options, options)
      this.isOpen = !!this.options.open
      const { onOpen, onClose, shouldOpen, shouldClose, ...other } = this.options
      ReactDOM.render(<Popover popover={this} {...other} />, this.containerNode)
    }
    this.render(options)
  }

  /**
   * @public
   * @name popover.update(options)
   * @description 更新浮层配置，一般在 componentDidUpdate 内执行。例如：
   * ```js
   * const popover = new Popover({
   *   triggerNode: `DOMNode`
   * })
   * popover.update({
   *   content: 'xxx'
   * })
   * ```
   */
  update(options) {
    this.makeTriggerable(options)
    if (!options.open && !this.isOpen) return
    this.render(options)
  }

  /**
   * @public
   * @name popover.open()
   * @description 打开浮层
   */
  open() {
    const { shouldOpen, onOpen } = this.options
    if (!this.isOpen && (!shouldOpen || shouldOpen())) {
      this.render({open: true})
      onOpen && onOpen()
    }
  }

  /**
   * @public
   * @name popover.close()
   * @description 关闭浮层
   */
  close() {
    const { shouldClose, onClose } = this.options
    if (this.isOpen && (!shouldClose || shouldClose())) {
      this.render({open: false})
      onClose && onClose()
    }
  }

  toggle() {
    this.isOpen ? this.close() : this.open()
  }

  /**
   * @public
   * @name popover.unmount()
   * @description 销毁浮层，triggerNode 所在的组件生命周期结束后手动调用
   */
  unmount() {
    if (this.containerNode) {
      ReactDOM.unmountComponentAtNode(this.containerNode)
      document.body.removeChild(this.containerNode)
      this.containerNode = null
    }
  }
}
