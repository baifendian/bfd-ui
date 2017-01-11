/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

class EventPool {

  constructor() {
    this.pool = []
  }

  add(event) {
    if (typeof event === 'function') {
      this.pool.push(event)
    }
  }

  free() {
    const len = this.pool.length
    for (let i = 0; i < len; i++) {
      this.pool[i]()
    }
    this.pool.length = 0
  }
}

export default EventPool
