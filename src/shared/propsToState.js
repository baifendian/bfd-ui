/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

export default (nextProps, keys) => {
  const newState = {}
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    if (key in nextProps) {
      newState[key] = nextProps[key]
    }
  }
  return newState
}
