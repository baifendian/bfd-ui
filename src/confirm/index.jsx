import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import { Modal, ModalHeader, ModalBody } from '../Modal'
import classnames from 'classnames'
import 'bfd-bootstrap'
import './main.less'

const Confirm = React.createClass({

  getInitialState() {
    return {
      open: false
    }
  },
  
  onConfirm() {
    this.state.callback && this.state.callback()
    this.handleClose()
  },

  handleClose() {
    this.setState({open: false})
  },

  render() {
    const { open, message } = this.state
    return (
      <Modal className="bfd-confirm" open={open} handleClose={this.handleClose}>
        <ModalHeader handleClose={this.handleClose}>
          <h4 className="modal-title">确认提示</h4>
        </ModalHeader>
        <ModalBody>
          <div className="message">{message}</div>
          <div className="operate">
            <button type="button" className="btn btn-sm btn-default" onClick={this.handleClose}>取消</button>
            <button type="button" className="btn btn-sm btn-primary" onClick={this.onConfirm}>确定</button>
          </div>
        </ModalBody>
      </Modal>
    )
  }
})

let instance

function confirm(message, callback) {
  if (!instance) {
    const container = document.createElement('div')
    document.body.appendChild(container)
    instance = render(<Confirm />, container)
  }
  instance.setState({
    message,
    callback,
    open: true
  })
}

export default confirm