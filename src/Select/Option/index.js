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
import TextOverflow from '../../TextOverflow'
import Icon from '../../Icon'
import './index.less'

const Option = props => {
  const { children, className, value, selected, active, ...other } = props
  const classNames = classnames(
    'bfd-select__option', 
    {
      'bfd-select__option--active': active,
      'bfd-select__option--selected': selected
    },
    className
  )
  return (
    <TextOverflow>
      <li className={classNames} {...other}>
        {children}
        {selected && <Icon type="check" className="bfd-select__option-icon--selected" />}
      </li>
    </TextOverflow>
  )
}

Option.propTypes = {

  // 值，与 Select value 对应，数据类型也要一致
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  selected: PropTypes.bool,
  active: PropTypes.bool
}

export default Option