import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'c/Modal'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

const ModalDemo = React.createClass({
  getInitialState() {
    return {
      isOpen: false 
    }
  },

  handleOpen() {
    this.setState({isOpen: true})
  },

  handleClose() {
    this.setState({isOpen: false})
  },

  render() {
    return (
      <div>
        <button className="btn btn-primary" onClick={this.handleOpen}>点击打开</button>
        <Modal open={this.state.isOpen} handleClose={this.handleClose}>
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

  getInitialState() {
    return {
      isOpen: false 
    }
  },

  handleClick() {
    this.setState({isOpen: true})
  },

  handleClose() {
    this.setState({isOpen: false})
  },

  render() {
    return (
      <div>
        <button className="btn btn-primary" onClick={this.handleOpen}>点击打开</button>
        <Modal open={this.state.isOpen} handleClose={this.handleClose}>
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
        <h2>Modal</h2>
        <Props>
          <Prop name="open" type="boolean">
            <p>是否打开，默认关闭</p>
          </Prop>
          <Prop name="handleClose" type="fucntion">
            <p>关闭动作的处理，用来同步 isOpen 的状态</p>
          </Prop>
        </Props>
      </div>
    )
  }
})