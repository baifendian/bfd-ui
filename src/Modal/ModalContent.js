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
import classlist from 'classlist'

class ModalContent extends Component {

  constructor(props) {
    super(props)
    this.relativeValue = 0
  }

  getChildContext() {
    return {
      modalContent: this
    }
  }

  backUp() {
    this.relativeValue += 20
    this.transform()
    const { modalContent } = this.props.modal.context
    if (modalContent) {
      modalContent.backUp()
    }
  }

  goForward() {
    this.relativeValue -= 20
    this.transform()
    const { modalContent } = this.props.modal.context
    if (modalContent) {
      modalContent.goForward()
    }
  }

  transform() {
    this.modalNode.style.transform = `translateY(-${this.relativeValue}px)`
  }

  handleModalClick(e) {
    if (e.target.className === 'bfd-modal__modal') {
      if (!this.props.lock) {
        this.props.close()
      } else {
        const LOCK_CLASSNAME = 'bfd-modal__modal-dialog--lock'
        const END_EVENT = 'animationend'
        classlist(this.modalNode).add(LOCK_CLASSNAME)
        const onAnimationEnd = () => {
          this.modalNode.removeEventListener(END_EVENT, onAnimationEnd)
          classlist(this.modalNode).remove(LOCK_CLASSNAME)
        }
        this.modalNode.addEventListener(END_EVENT, onAnimationEnd)
      }
    }
  }

  render() {
    const { children, className, lock, size, ...other } = this.props
    return (
      <div className={classnames('bfd-modal', {
        [`bfd-modal--${size}`]: size
      }, className)} {...other}>
        <div className="bfd-modal__backdrop"></div>
        <div
          className="bfd-modal__modal"
          onClick={::this.handleModalClick}
        >
          <div className="bfd-modal__modal-dialog" ref={node => this.modalNode = node}>
            <div className="bfd-modal__modal-content">
              {children}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

ModalContent.childContextTypes = {
  modalContent: PropTypes.instanceOf(ModalContent)
}

export default ModalContent
