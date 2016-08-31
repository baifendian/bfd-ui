import React, { Component } from 'react'
import { render } from 'react-dom'
import { Modal, ModalHeader, ModalBody } from '../Modal'
import warning from 'warning'
import Button from '../Button'
import './index.less'

class Confirm extends Component {

  constructor() {
    super()
    this.state = {
      message: null 
    }
  }
  
  onConfirm() {
    this.callback()
    this.close()
  }

  open() {
    this.refs.modal.open()
  }

  close() {
    this.refs.modal.close()
  }

  render() {
    return (
      <Modal className="bfd-confirm" ref="modal">
        <ModalHeader>
          <h4>确认提示</h4>
        </ModalHeader>
        <ModalBody>
          <div className="bfd-confirm__message">{this.state.message}</div>
          <div className="bfd-confirm__operate">
            <Button onClick={() => this.onConfirm()}>确定</Button>
            <Button type="minor" onClick={() => this.close()}>取消</Button>
          </div>
        </ModalBody>
      </Modal>
    )
  }
}

let instance

/**
 * @public
 * @name confirm
 * @param  {string | element} message 显示内容，支持 React 元素
 * @param  {function} callback 确定后的回调
 * @description 确认提示，确定后触发 callback
 */
function confirm(message, callback) {

  if (process.env.NODE_ENV !== 'production') {
    warning(typeof message === 'string' || (message && React.isValidElement(message)), '`message` should be `string` or `ReactElement`, check the first param of confirm')
    warning(typeof callback === 'function', '`callback` should be `function`, check the second param of confirm')
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