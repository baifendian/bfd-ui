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

function CoordinateFactory(triggerNode, popoverNode, direction, align) {
  const [scrollTop, scrollLeft] = getDocumentScroll()
  const CF = CoordinateFactory

  CF.triggerRect = triggerNode.getBoundingClientRect()
  CF.popoverRect = popoverNode.getBoundingClientRect()
  CF.direction = CF.getComputedDirection(direction)
  CF.align = CF.getComputedAlign(align)
  CF.center = [
    CF.triggerRect.left + CF.triggerRect.width / 2 + scrollLeft,
    CF.triggerRect.top + CF.triggerRect.height / 2 + scrollTop
  ]

  const [left, top] = CF.coordinateMap[CF.direction].call(CF)
  popoverNode.style.left = left + 'px'
  popoverNode.style.top = top + 'px'

  return [CF.direction, CF.align]
}

Object.assign(CoordinateFactory, {

  triggerRect: null,

  popoverRect: null,

  align: null,

  center: null,

  getComputedDirection(direction) {
    const { triggerRect, popoverRect } = this
    if (direction === 'up' || direction === 'down') {
      if (triggerRect.top < popoverRect.height) {
        direction = 'down'
      } else if (popoverRect.height + triggerRect.top + triggerRect.height > window.innerHeight) {
        direction = 'up'
      }
    }
    return direction
  },

  getComputedAlign(align) {
    if (align === 'middle') {
      return align
    }
    if (this.direction === 'up' || this.direction === 'down') {
      if (align === 'top' || align === 'bottom') {
        return 'middle'
      }
    } else {
      if (align === 'left' || align === 'right') {
        return 'middle'
      }
    }
    return align
  },

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
