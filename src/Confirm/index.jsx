import React, { PropTypes } from 'react'
import { Modal, ModalHeader, ModalBody } from '../Modal'
import classnames from 'classnames'
import 'bfd-bootstrap'
import './main.less'

const propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func
}

function Confirm(props) {

  function onConfirm() {
    props.onConfirm && props.onConfirm()
    props.handleClose()
  }

  const { className, children, ...other } = props

  return (
    <Modal className={classnames('bfd-confirm', className)} {...other}>
      <ModalHeader handleClose={other.handleClose}>
        <h4 className="modal-title">确认提示</h4>
      </ModalHeader>
      <ModalBody>
        <div className="message">{children}</div>
        <div className="operate">
          <button type="button" className="btn btn-sm btn-default" onClick={other.handleClose}>取消</button>
          <button type="button" className="btn btn-sm btn-primary" onClick={onConfirm}>确定</button>
        </div>
      </ModalBody>
    </Modal>
  )
}

Confirm.propTypes = propTypes

export default Confirm