import React from 'react'
import { render } from 'react-dom'
import Modal from 'c/modal/index.jsx'
import ModalHeader from 'c/modalHeader/index.jsx'

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
          <ModalHeader onClose={this.handleClose}>
            <h1 className="modal-title">test</h1>
          </ModalHeader>
          <div className="modal-body">
            dadasd
          </div>
        </Modal>
      </div>
    )
  }
})

export default () => {
  render(<App/>, document.getElementById('demo'))
}