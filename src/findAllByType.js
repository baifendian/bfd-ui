/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule src/findAllByType.js
 */

import React from 'react'

function isArray(v) {
  return Object.prototype.toString.call(v) === '[object Array]'
}

const getDisplayName = (Comp) => {
  if (!Comp) {
    return ''
  }
  if (typeof Comp === 'string') {
    return Comp
  }

  return Comp.displayName || Comp.name || 'Component'
}
/*
 * Find and return all matched children by type. `type` can be a React element class or
 * string
 */
const findAllByType = (children, type) => {
  const result = []
  let types = []

  if (isArray(type)) {
    types = type.map(t => getDisplayName(t))
  } else {
    types = [getDisplayName(type)]
  }

  React.Children.forEach(children, child => {
    const childType = child && child.type && (child.type.displayName || child.type.name)
    if (types.indexOf(childType) !== -1) {
      result.push(child)
    }
  })

  return result
}

export default findAllByType