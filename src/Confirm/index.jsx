import React, { PropTypes } from 'react'
import { Modal, ModalHeader, ModalBody } from '../Modal'
import 'bfd-bootstrap'
import './main.less'

const propTypes = {
  open: PropTypes.bool
}

const Confirm = React.createClass({

  getInitialState() {
    return {
      isOpen: !!this.props.isOpen
    }
  },

  componentWillReceiveProps(nextProps) {
    'open' in nextProps && this.setState({isOpen: nextProps.open})  
  },

  handleClose() {
    this.setState({isOpen: false})
  },

  render() {
    return (
      <Modal className="bfd-confirm" open={this.props.open}>
        <ModalHeader handleClose={this.handleClose}>
          <div className="modal-title">确认提示</div>
        </ModalHeader>
        <ModalBody>
          <div>{this.props.children}</div>
          <div className="operate">
            <button type="button" className="btn btn-sm btn-default" onClick={this.handleClose}>取消</button>
            <button type="button" className="btn btn-sm btn-primary" onClick={this.props.onConfirm}>确定</button>
          </div>
        </ModalBody>
      </Modal>
    )
  }
})

Confirm.propTypes = propTypes

export default Confirm