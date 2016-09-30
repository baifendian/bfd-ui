/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component, PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import classnames from 'classnames'

const scrollbarWidth = (() => {
  const scrollDiv = document.createElement('div')
  const body = document.body

  scrollDiv.className = 'bfd-modal--scrollbar-measure'
  body.appendChild(scrollDiv)
  const scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
  body.removeChild(scrollDiv)
  
  return scrollbarWidth
})()

class Modal extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: props.open || false
    }
  }

  getChildContext() {
    return {
      modal: this
    }
  }

  componentWillReceiveProps(nextProps) {
    'open' in nextProps && this.setState({open: nextProps.open})  
  }

  componentWillUpdate(nextProps, nextState) {
    const body = document.body
    const bodyClassName = body.className
    const bodyPaddingRight = parseInt(body.style.paddingRight, 10) || 0

    if (nextState.open && !this.state.open) {
      this.scrollbarWidth = body.scrollHeight > window.innerHeight ? scrollbarWidth : 0
      body.className = bodyClassName + ' bfd-modal--open'
      body.style.paddingRight = bodyPaddingRight + this.scrollbarWidth + 'px'
    } else if (!nextState.open && this.state.open) {
      setTimeout(() => {
        body.className = bodyClassName.replace(' bfd-modal--open', '')
        if (bodyPaddingRight) {
          body.style.paddingRight = bodyPaddingRight - this.scrollbarWidth + 'px'
        } else {
          body.style.paddingRight = ''
        }
      }, this.closeTimeout)
    }
  }

  closeTimeout = 150

  handleModalClick(e) {
    if (!this.props.lock && e.target.className === 'bfd-modal__modal') {
      this.close()  
    }
  }

  /**
   * @public
   * @name this.refs.modal.open
   * @description 打开模态框
   */
  open() {
    this.setState({open: true})
    this.props.onToggle && this.props.onToggle(true)
  }

  /**
   * @public
   * @name this.refs.modal.close
   * @param {function} [callback] 关闭后的回调，动画结束后执行
   * @description 关闭模态框
   */
  close(callback = this.props.onClose) {
    this.setState({open: false})
    this.props.onToggle && this.props.onToggle(false)
    callback && setTimeout(callback, this.closeTimeout)
  }

  render() {
    
    const { children, className, onToggle, lock, onClose, ...other } = this.props
    const { open } = this.state

    delete other.open

    return (
      <ReactCSSTransitionGroup 
        transitionName="bfd-modal--in" 
        transitionEnterTimeout={200} 
        transitionLeaveTimeout={this.closeTimeout}
      >
        {open && (
          <div className={classnames('bfd-modal', className)} {...other}>
            <div className="bfd-modal__backdrop"></div>
            <div className="bfd-modal__modal" onClick={::this.handleModalClick}>
              <div className="bfd-modal__modal-dialog">
                <div className="bfd-modal__modal-content">
                  {children}
                </div>
              </div>
            </div>
          </div>
        )}
      </ReactCSSTransitionGroup>
    )
  }
}

Modal.childContextTypes = {
  modal: PropTypes.instanceOf(Modal)
}

Modal.propTypes = {

  // 是否打开
  open: PropTypes.bool,

  // 切换 open 状态后的回调，参数为切换后的 open 状态，立刻执行，不会等到动画结束后
  onToggle: PropTypes.func,

  // 是否锁定，锁定后点击背景无法关闭
  lock: PropTypes.bool,

  // 关闭后的回调，动画结束后执行。如果 close 方法传入回调，则此属性不会触发
  onClose: PropTypes.func
}

export default Modal