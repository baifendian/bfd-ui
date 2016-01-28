import 'bfd-bootstrap'
import './main.css'
import React, {PropTypes} from 'react'
import classNames from 'classnames'


/**
 * Modal
 */
const Modal = React.createClass({

  propTypes: {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  },
  
  handleClick(e) {
    if (e.target.className.indexOf('modal-backdrop') !== -1) {
      this.props.onClose()
    }
  },

  render() {
    return (
      <div className={classNames('modal fade', {'in': this.props.isOpen}, this.props.className)}>
        <div className={classNames('modal-backdrop fade', {'in': this.props.isOpen})} onClick={this.handleClick}></div>
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
Modal.Header = React.createClass({

  propTypes: {
    onClose: PropTypes.func.isRequired
  },

  render() {
    return (
      <div className="modal-header">
        <button type="button" className="close" onClick={this.props.onClose}>
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
Modal.Body = React.createClass({

  render() {
    return (
      <div className="modal-body">
        {this.props.children}
      </div>
    )
  }
})

export default Modal