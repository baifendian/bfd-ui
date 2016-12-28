/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

export default function(validator, extendFn) {
  return function(...args) {
    const error = extendFn(...args)
    if (error) return new Error(args[2] + ': ' + error)
    return validator(...args)
  }
}
