/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

function getDocumentScroll() {
  const { documentElement, body } = document
  return [
    documentElement && documentElement.scrollTop || body.scrollTop,
    documentElement && documentElement.scrollLeft || body.scrollLeft
  ]
}

function CoordinateFactory(triggerRect, popoverRect, direction, align) {
  const [scrollTop, scrollLeft] = getDocumentScroll()
  const CF = CoordinateFactory
  CF.triggerRect = triggerRect
  CF.popoverRect = popoverRect
  CF.align = align
  CF.center = [
    triggerRect.left + triggerRect.width / 2 + scrollLeft,
    triggerRect.top + triggerRect.height / 2 + scrollTop
  ]
  return CF.coordinateMap[direction].call(CF)
}

Object.assign(CoordinateFactory, {

  triggerRect: null,

  popoverRect: null,

  align: null,

  center: null,

  getAlignPosition(horizontal) {
    const types = horizontal ? ['left', 'right'] : ['top', 'bottom']
    const axis = horizontal ? 0 : 1
    const size = horizontal ? 'width' : 'height'
    if (this.align === types[0]) {
      return this.center[axis] - this.triggerRect[size] / 2
    } else if (this.align === types[1]) {
      return this.center[axis] - this.popoverRect[size] + this.triggerRect[size] / 2
    } else {
      return this.center[axis] - this.popoverRect[size] / 2
    }
  },

  coordinateMap: {
    up() {
      const top = this.center[1] - this.triggerRect.height / 2 - this.popoverRect.height
      return [this.getAlignPosition(true), top]
    },
    down() {
      const top = this.center[1] + this.triggerRect.height / 2
      return [this.getAlignPosition(true), top]
    },
    left() {
      const left = this.center[0] - this.triggerRect.width / 2 - this.popoverRect.width
      return [left, this.getAlignPosition()]
    },
    right() {
      const left = this.center[0] + this.triggerRect.width / 2
      return [left, this.getAlignPosition()]
    }
  }
})

export default CoordinateFactory
