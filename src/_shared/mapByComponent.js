/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React from 'react'

export default (children, Component, callback) => {
  const result = []
  React.Children.forEach(children, (child, i) => {
    if (child.type === Component) {
      result.push(callback(child, i))
    }
  })
  return result
}
