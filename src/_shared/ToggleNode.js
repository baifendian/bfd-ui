/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import classlist from 'classlist'

class ToggleNode {

  static END_EVENT = 'transitionend'

  constructor(node, openedClassName, reflowTrigger) {
    this.node = node
    this.openedClassName = openedClassName
    this.reflowTrigger = reflowTrigger || (() => {
      this.node.offsetWidth
    })
    this.node.style.display = 'none'
  }

  open() {
    this.node.style.display = 'block'
    this.reflowTrigger()
    classlist(this.node).add(this.openedClassName)
  }

  close() {
    classlist(this.node).remove(this.openedClassName)
    const onTransitionEnd = () => {
      this.node.style.display = 'none'
      this.node.removeEventListener(ToggleNode.END_EVENT, onTransitionEnd)
      this.onClose && this.onClose()
    }
    this.node.addEventListener(ToggleNode.END_EVENT, onTransitionEnd)
  }
}

export default ToggleNode
