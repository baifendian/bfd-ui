import React from 'react'
import { Modal, ModalHeader, ModalBody } from 'c/Modal'
import Pre from '../Pre'

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

  handleClick() {
    this.refs.modal.open()
  },

  render() {
    return (
      <div>
        <button className="btn btn-primary" onClick={this.handleClick}>点击打开</button>
        <Modal ref="modal">
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
        <Modal ref="modal" isOpen={this.state.isOpen}>
          <ModalHeader>
            <h4 className="modal-title">test</h4>
          </ModalHeader>
          <ModalBody>
            dadasd
          </ModalBody>
        </Modal>
        
        <h2>Modal 实例接口</h2>
        <p>modal.open()</p>
        <p>modal.close()</p>
      </div>
    )
  }
})