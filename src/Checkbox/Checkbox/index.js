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
import './index.less'

const Checkbox = props => {

  const {
    children, className, block, indeterminate, onClick, value, checked, defaultChecked,
    onChange, disabled, ...other
  } = props

  const inputProps = { value, checked, defaultChecked, onChange, disabled }

  const classNames = classnames('bfd-checkbox', {
    'bfd-checkbox--disabled': inputProps.disabled,
    'bfd-checkbox--block': block,
    'bfd-checkbox--indeterminate': indeterminate
  }, className)

  return (
    <label
      tabIndex={inputProps.disabled ? -1 : 0}
      className={classNames}
      onClick={e => {
        if (e.target.tagName === 'INPUT') {
          e.stopPropagation()
        } else {
          onClick && onClick(e)
        }
      }}
      {...other}
    >
      <input
        type="checkbox"
        className="bfd-checkbox__input"
        {...inputProps}
      />
      <span className="bfd-checkbox__status" />
      {children && <span className="bfd-checkbox__text">{children}</span>}
    </label>
  )
}

Checkbox.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  onChange: PropTypes.func,
  indeterminate: PropTypes.bool,
  disabled: PropTypes.bool,
  block: PropTypes.bool,
  customProp({ checked, onChange }) {
    if (checked && !onChange) {
      return new Error('You provided a `checked` prop without an `onChange` handler')
    }
  }
}

export default Checkbox
