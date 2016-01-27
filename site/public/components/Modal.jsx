import React from 'react'
import { render } from 'react-dom'
import Modal from 'c/modal/index.jsx'

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
          <Modal.Header onClose={this.handleClose}>
            <h4 className="modal-title">test</h4>
          </Modal.Header>
          <Modal.Body>
            dadasd
          </Modal.Body>
        </Modal>
      </div>
    )
  }
})

export default () => {
  render(<App/>, document.getElementById('demo'))
}