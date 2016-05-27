import React, { PropTypes } from 'react'
import { render } from 'react-dom'
import { Modal, ModalHeader, ModalBody } from '../Modal'
import warning from '../warning'
import classnames from 'classnames'
import 'bfd-bootstrap'
import './main.less'

const Confirm = React.createClass({

  getInitialState() {
    return {
      message: null  
    }
  },
  
  onConfirm() {
    this.callback()
    this.close()
  },

  open() {
    this.refs.modal.open()
  },

  close() {
    this.refs.modal.close()
  },

  render() {
    return (
      <Modal className="bfd-confirm" ref="modal">
        <ModalHeader>
          <h4 className="modal-title">确认提示</h4>
        </ModalHeader>
        <ModalBody>
          <div className="message">{this.state.message}</div>
          <div className="operate">
            <button type="button" className="btn btn-sm btn-default" onClick={this.close}>取消</button>
            <button type="button" className="btn btn-sm btn-primary" onClick={this.onConfirm}>确定</button>
          </div>
        </ModalBody>
      </Modal>
    )
  }
})

let instance

function confirm(message, callback) {

  if (process.env.NODE_ENV !== 'production') {
    if (typeof message !== 'string' && !(message && React.isValidElement(message))) {
      warning('`message` should be `string` or `ReactElement`, check the first param of confirm')
    }
    if (typeof callback !== 'function') {
      warning('`callback` should be `function`, check the second param of confirm')
    }
  }

  if (!instance) {
    const container = document.createElement('div')
    document.body.appendChild(container)
    instance = render(<Confirm />, container)
  }

  instance.callback = callback
  instance.setState({ message })
  instance.open()
}

export default confirm