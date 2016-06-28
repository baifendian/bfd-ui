import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'c/Modal'
import message from 'c/message'
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

export default React.createClass({

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
        <h1>模态框 @hai.jiang</h1>
        <Pre>{ModalDemoCode}</Pre>
        <ModalDemo></ModalDemo>
        <h2>Modal</h2>
        <Props>
          <Prop name="lock" type="boolean">
            <p>是否锁定，锁定后，点击遮罩层不会关闭 Modal</p>
          </Prop>
        </Props>
        <h3>组件方法</h3>
        <ul>
          <li>
            <p>
              <strong>open( )</strong>
            </p>
            <p>打开</p>
          </li>
          <li>
            <p>
              <strong>close( )</strong>
            </p>
            <p>关闭，支持回调参数</p>
            <Pre>{
`this.refs.modal.close(() => {
  message.success('保存成功!')
})`}
            </Pre>
          </li>
        </ul>
      </div>
    )
  }
})