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

const Row = props => {
  const { children, className, gutter, fluid, ...other} = props
  const classNames = classnames(
    'bfd-row', 
    {
      'bfd-row--gutter': gutter,
      'bfd-row--fluid': fluid
    },
    className
  )
  return (
    <div className={classNames} {...other}>
      {children}
    </div>
  )
}

Row.propTypes = {

  // 是否带间隔
  gutter: PropTypes.bool,   
  
  // 是否流式布局，按内容自适应自左向右布局
  fluid: PropTypes.bool   
}

export default Row