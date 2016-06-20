import React, { PropTypes } from 'react'
import 'bfd-bootstrap'

function ModalHeader({ children }, { modal }) {
  return (
    <div className="modal-header">
      <button type="button" className="close" onClick={modal.handleClose}>
        <span>&times;</span>
      </button>
      {children}
    </div>
  )
}

ModalHeader.contextTypes = {
  modal: PropTypes.object
}

export default ModalHeader