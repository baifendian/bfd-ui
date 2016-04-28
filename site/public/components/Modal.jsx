import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'c/Modal'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

const ModalDemo = React.createClass({

  handleOpen() {
    this.refs.modal.open()
  },

  render() {
    return (
      <div>
        <button className="btn btn-primary" onClick={this.handleOpen}>点击打开</button>
        <Modal ref="modal">
          <ModalHeader>
            <h4 className="modal-title">test</h4>
          </ModalHeader>
          <ModalBody>
            内容
          </ModalBody>
        </Modal>
      </div>
    )
  }
})

const ModalDemoCode = `import { Modal, ModalHeader, ModalBody } from 'bfd-ui/lib/Modal'

const App = React.createClass({

  handleOpen() {
    this.refs.modal.open()
  },

  render() {
    return (
      <div>
        <button className="btn btn-primary" onClick={this.handleOpen}>点击打开</button>
        <Modal ref="modal">
          <ModalHeader>
            <h4 className="modal-title">test</h4>
          </ModalHeader>
          <ModalBody>
            内容
          </ModalBody>
        </Modal>
      </div>
    )
  }
})`

export default React.createClass({
  render() {
    return (
      <div>
        <h1>模态框</h1>
        <Pre>{ModalDemoCode}</Pre>
        <ModalDemo></ModalDemo>
        <h2>refs.modal</h2>
        <Props>
          <Prop name="open" type="function">
            <p>打开</p>
          </Prop>
          <Prop name="close" type="function">
            <p>关闭</p>
          </Prop>
        </Props>
      </div>
    )
  }
})