/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { PropTypes } from 'react'
import classnames from 'classnames'
import Button from '../Button'

const ModalHeader = (props, context) => {
  const { children, className, ...other } = props
  return (
    <div className={classnames('bfd-modal__modal-header', className)} {...other}>
      {children}
      <Button
        className="bfd-modal__modal-header-close"
        icon="remove"
        size="sm"
        type="inverse"
        transparent
        onClick={() => context.modalContent.props.close()}
      />
    </div>
  )
}

ModalHeader.contextTypes = {
  modalContent: PropTypes.object
}

export default ModalHeader
