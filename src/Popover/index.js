/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import './index.less'
import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import classlist from 'classlist'

class Popover extends Component {

  shouldComponentUpdate(nextProps) {
    return !!this.props.open || !!nextProps.open
  }

  componentDidMount() {
    this.rootNode = ReactDOM.findDOMNode(this)
    if (this.props.open) {
      this.directionClassName = this.setPosition()
    }
  }

  componentDidUpdate() {
    if (this.props.open) {
      this.directionClassName = this.setPosition()
    } else {
      classlist(this.rootNode).remove(this.directionClassName)
    }
  }

  getRelativePositionByDirection(sourceNode, targetNode, direction) {
    const sourceRect = sourceNode.getBoundingClientRect()
    const targetRect = targetNode.getBoundingClientRect()
    const [scrollTop, scrollLeft] = this.getDocumentScroll()
    const relativeDistance = [
      sourceRect.width / 2 + targetRect.width / 2,
      sourceRect.height / 2 + targetRect.height / 2
    ]
    const center = [
      sourceRect.left + relativeDistance[0] - targetRect.width + scrollLeft,
      sourceRect.top + relativeDistance[1] - targetRect.height + scrollTop
    ]
    const directionHandles = {
      up: () => [center[0], center[1] - relativeDistance[1]],
      down: () => [center[0], center[1] + relativeDistance[1]],
      left: () => [center[0] - relativeDistance[0], center[1]],
      right: () => [center[0] + relativeDistance[0], center[1]]
    }
    return directionHandles[direction]()
  }

  setPosition() {
    const { triggerNode } = this.props
    let { direction } = this.props

    const rootNodeRect = this.rootNode.getBoundingClientRect()
    const triggerRect = triggerNode.getBoundingClientRect()

    if (!direction) {
      if (triggerRect.top > rootNodeRect.height) {
        direction = 'up'
      } else {
        direction = 'down'
      }
    }

    const [left, top] = this.getRelativePositionByDirection(triggerNode, this.rootNode, direction)
    this.rootNode.style.left = left + 'px'
    this.rootNode.style.top = top + 'px'

    const directionClassName = `bfd-popover--${direction}`
    classlist(this.rootNode).add(directionClassName)
    return directionClassName
  }

  getDocumentScroll() {
    const { documentElement, body } = document
    return [
      documentElement && documentElement.scrollTop || body.scrollTop,
      documentElement && documentElement.scrollLeft || body.scrollLeft
    ]
  }

  render() {
    const { className, open, triggerNode, content, direction, ...other } = this.props
    return (
      <div
        className={classnames('bfd-popover', {
          'bfd-popover--open': open
        }, className)}
        {...other}
      >
        <div className="bfd-popover__content">{content}</div>
      </div>
    )
  }
}

Popover.propTypes = {
  triggerNode: (props, propName, componentName) => {
    if (props[propName] instanceof Element === false) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`, expected DOM Element.`
      )
    }
  },
  content: PropTypes.node,
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right'])
}

export default class {

  constructor(props) {
    this.props = props
  }

  render(props) {
    Object.assign(this.props, props)
    if (!this.containerNode) {
      this.containerNode = document.createElement('div')
      document.body.appendChild(this.containerNode)
    }
    ReactDOM.render(<Popover {...this.props} />, this.containerNode)
  }

  open() {
    this.isOpen = true
    this.render({open: true})
  }

  close() {
    this.isOpen = false
    this.render({open: false})
  }

  toggle() {
    this.isOpen ? this.close() : this.open()
  }

  unmount() {
    this.containerNode && document.body.removeChild(this.containerNode)
  }
}
