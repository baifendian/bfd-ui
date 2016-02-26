import 'bfd-bootstrap'
import './main.less'
import React, { PropTypes } from 'react'
import classNames from 'classnames'


/**
 * Modal
 */
const Modal = React.createClass({

  getInitialState() {
    return {
      isOpen: false     
    }
  },

  childContextTypes: {
    onClose: PropTypes.func
  },

  getChildContext() {
    return {
      onClose: () => {
        this.setState({isOpen: false})
      }
    }
  },
  
  handleClick(e) {
    if (e.target.className.indexOf('modal-backdrop') !== -1) {
      this.setState({isOpen: false})
    }
  },

  shouldComponentUpdate(nextProps) {
    if (nextProps.isOpen !== this.state.isOpen) {
      this.setState({isOpen: nextProps.isOpen})
      return false
    }
    return true
  },

  render() {
    return (
      <div className={classNames('modal fade', {'in': this.state.isOpen}, this.props.className)}>
        <div className={classNames('modal-backdrop fade', {'in': this.state.isOpen})} onClick={this.handleClick}></div>
        <div className="modal-dialog">
          <div className="modal-content">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
})


/**
 * ModalHeader
 */
const ModalHeader = React.createClass({

  contextTypes: {
    onClose: PropTypes.func,
  },

  render() {
    return (
      <div className="modal-header">
        <button type="button" className="close" onClick={this.context.onClose}>
          <span>&times;</span>
        </button>
        {this.props.children}
      </div>
    )
  }
})

/**
 * ModalBody
 */
const ModalBody = React.createClass({

  render() {
    return (
      <div className="modal-body">{this.props.children}</div>
    )
  }
})

export { Modal, ModalHeader, ModalBody }