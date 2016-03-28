import React, { PropTypes } from 'react'
import 'bfd-bootstrap'

const contextTypes = {
  handleClose: PropTypes.func
}

function ModalHeader(props, context) {
  return (
    <div className="modal-header">
      <button type="button" className="close" onClick={context.handleClose}>
        <span>&times;</span>
      </button>
      {props.children}
    </div>
  )
}

ModalHeader.contextTypes = contextTypes

export default ModalHeader