/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule src/Modal/ModalHeader.js
 */

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