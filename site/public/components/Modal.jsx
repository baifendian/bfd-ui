import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'c/Modal'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

export default React.createClass({

  getInitialState() {
    return {
      isOpen: false        
    }
  },

  handleClick() {
    this.setState({isOpen: true})
  },
  
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

  render() {
    return (
      <div>
        <button className="btn btn-primary" onClick={this.handleClick}>点击打开</button>
        <Modal isOpen={this.state.isOpen}>
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

        <button className="btn btn-primary" onClick={this.handleClick}>点击打开</button>
        <Modal isOpen={this.state.isOpen}>
          <ModalHeader>
            <h4 className="modal-title">test</h4>
          </ModalHeader>
          <ModalBody>
            dadasd
          </ModalBody>
        </Modal>
        
        <Props>
          <Prop name="isOpen" type="Boolean" required>
            <p>是否为打开状态</p>
          </Prop>
          <Prop name="onClose" type="Function">
            <p>关闭事件的回调函数</p>
          </Prop>
        </Props>
      </div>
    )
  }
})