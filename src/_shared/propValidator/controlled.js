/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

export default function(validator, callbackName = 'onChange') {
  return function(props, propName, componentName) {
    if (propName in props && !props[callbackName] && !props.disabled) {
      return new Error(
        `You provided a \`${propName}\` prop to \`${componentName}\` without an \`${callbackName}\` handler.`
      )
    }
    return validator(...arguments)
  }
}
