import React from 'react'
import { render } from 'react-dom'
import Pre from '../Pre.jsx'
import { Props, Prop } from '../Props.jsx'
import { Modal, ModalHeader, ModalBody } from 'c/modal/index.jsx'

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

// export default () => {
//   render(<App/>, document.getElementById('demo'))
// }

export default React.createClass({
  render() {
    return (
      <div>
        <h1>模态框</h1>
        <Pre>
{`import { Modal, ModalHeader, ModalBody } from 'c/modal/index.jsx'

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


const App = React.createClass({
  render() {
    return <App/>
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