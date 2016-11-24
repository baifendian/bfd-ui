/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import { Modal, ModalHeader, ModalBody } from '../Modal'
import Button from '../Button'
import './index.less'

class Confirm extends Component {

  constructor(props) {
    super(props)
    this.state = {
      open: true
    }
  }

  componentWillReceiveProps() {
    this.setState({open: true})
  }

  close() {
    this.setState({open: false})
  }

  handleConfirm() {
    this.props.onConfirm && this.props.onConfirm()
    this.close()
  }

  handleCancel() {
    this.close()
  }

  render() {
    const { open } = this.state
    const { content } = this.props
    return (
      <Modal className="bfd-confirm" open={open}>
        <ModalHeader>
          <h4>确认提示</h4>
        </ModalHeader>
        <ModalBody>
          <div className="bfd-confirm__message">{content}</div>
          <div className="bfd-confirm__operate">
            <Button onClick={::this.handleConfirm}>确定</Button>
            <Button type="minor" onClick={::this.handleCancel}>取消</Button>
          </div>
        </ModalBody>
      </Modal>
    )
  }
}

Confirm.propTypes = {
  content: PropTypes.node.isRequired,
  onConfirm: PropTypes.func
}

let render = function(props) {
  const container = document.createElement('div')
  document.body.appendChild(container)
  render = function(props) {
    ReactDOM.render(<Confirm {...props} />, container)
  }
  render(props)
}

export default function(content, onConfirm) {
  render({ content, onConfirm })
}
