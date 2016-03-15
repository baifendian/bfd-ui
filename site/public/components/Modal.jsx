import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'c/Modal'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

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
        <button className="btn btn-primary" onClick={this.handleClick}>点击打开</button>
        <Modal isOpen={this.state.isOpen} onClose={this.handleClose}>
          <ModalHeader>
            <h4 className="modal-title">test</h4>
          </ModalHeader>
          <ModalBody>
            dadasd
          </ModalBody>
        </Modal>
      </div>
    )
  }
})

export default React.createClass({
  render() {
    return (
      <div>
        <h1>模态框</h1>
        <Pre>
{`import { Modal, ModalHeader, ModalBody } from 'bfd-ui/lib/Modal'

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
        <button className="btn btn-primary" onClick={this.handleClick}>点击打开</button>
        <Modal isOpen={this.state.isOpen} onClose={this.handleClose}>
          <ModalHeader>
            <h4 className="modal-title">test</h4>
          </ModalHeader>
          <ModalBody>
            dadasd
          </ModalBody>
        </Modal>
      </div>
    )
  }
})`}
        </Pre>

        <App/>
        
        <Props>
          <Prop name="isOpen" type="Boolean" desc="是否为打开状态"></Prop>
          <Prop name="onClose" type="Function" desc="关闭事件的回调函数"></Prop>
          <Prop name="onClose" type="Function" desc="同上"></Prop>
        </Props>
      </div>
    )
  }
})