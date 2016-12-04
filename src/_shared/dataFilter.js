/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import invariant from 'invariant'

export default (instance, response) => {
  if (instance.props.dataFilter) {
    response = instance.props.dataFilter(response)
    invariant(
      !!response,
      `\`dataFilter\` should return a new data, check the \`dataFilter\` of \`${instance.constructor.name}\`.`
    )
  }
  return response
}
