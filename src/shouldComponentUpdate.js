/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule src/shouldComponentUpdate.js
 */

// ShadowEqual except function props.
function isEqual(source, target) {
  if (!source) return true
  return Object.keys(source).every(key => {
    let isEqual = true
    const prop = source[key]
    if (typeof prop !== 'function' && target[key] !== source[key]) {
      isEqual = false
    }
    return isEqual
  })
}

function shouldComponentUpdate(nextProps, nextState) {
  if (nextProps.children) return true
  return !(isEqual(nextProps, this.props) && isEqual(nextState, this.state))
}

export default shouldComponentUpdate