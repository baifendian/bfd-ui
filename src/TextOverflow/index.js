/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React from 'react'
import classnames from 'classnames'
import warning from 'warning'
import tooltip from './tooltip'
import './index.less'

const TextOverflow = props => {

  const { children } = props

  if (process.env.NODE_ENV !== 'production') {
    warning(!children.length, 'Children should be single, check the children of TextOverflow')
  }

  let timer

  return React.cloneElement(children, {
    onMouseEnter: ({ target }) => {
      if (target.offsetWidth < target.scrollWidth) {
        timer = setTimeout(() => {
          tooltip(children.props.children, target)
        }, 200)
      }
    },
    onMouseLeave: () => {
      tooltip.close()
      clearTimeout(timer)
    },
    className: classnames(children.props.className, 'bfd-text-overflow')
  })
}

export default TextOverflow