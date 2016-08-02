import React, { PropTypes } from 'react'
import Button from '../Button'

const ModalHeader = (props, { modal }) => {
  return (
    <div className="bfd-modal__modal-header">
      {props.children}
      <Button 
        className="bfd-modal__modal-header-close"
        icon="remove" 
        size="sm" 
        type="inverse"
        transparent 
        onClick={() => modal.close()}
      />
    </div>
  )
}

ModalHeader.contextTypes = {
  modal: PropTypes.object
}

ModalHeader.propTypes = {
  onClose: PropTypes.func
}

export default ModalHeader