import React, { PropTypes } from 'react'
import 'bfd-bootstrap'

function ModalHeader(props) {
  return (
    <div className="modal-header">
      <button type="button" className="close" onClick={props.onClose}>
        <span>&times;</span>
      </button>
      {props.children}
    </div>
  )
}

ModalHeader.propTypes = {
  onClose: PropTypes.func
}

export default ModalHeader