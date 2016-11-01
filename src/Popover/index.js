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

  constructor(props) {
    super()
    this.state = props
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.show || nextState.show
  }

  componentDidMount() {
    this.rootNode = ReactDOM.findDOMNode(this)
    if (this.state.show) {
      this.directionClassName = this.setPosition()
    }
  }

  componentDidUpdate() {
    if (this.state.show) {
      this.directionClassName = this.setPosition()
    }
  }

  getRelativePositionByDirection(sourceNode, targetNode, direction) {
    const sourceRect = sourceNode.getBoundingClientRect()
    const targetRect = targetNode.getBoundingClientRect()
    const [scrollTop, scrollLeft] = this.getDocumentScroll()
    let left, top
    if (direction === 'up' || direction === 'down') {
      left = sourceRect.left + sourceRect.width / 2 - targetRect.width / 2 + scrollLeft
      if (direction === 'up') {
        top = sourceRect.top - targetRect.height + scrollTop
      } else {
        top = sourceRect.top + sourceRect.height + scrollTop
      }
    } else {
      top = sourceRect.top + sourceRect.height / 2 - targetRect.height / 2 + scrollTop
      if (direction === 'left') {
        left = sourceRect.left - targetRect.width + scrollLeft
      } else {
        left = sourceRect.left + sourceRect.width + scrollLeft
      }
    }
    return [left, top]
  }

  setPosition() {
    const { triggerNode } = this.state
    let { direction } = this.state

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

  updateState(state) {
    this.setState(state)
  }

  open() {
    this.setState({show: true})
  }

  close() {
    if (this.state.show) {
      classlist(this.rootNode).remove(this.directionClassName)
      this.setState({show: false})
    }
  }

  render() {
    const { className, triggerNode, direction, ...other } = this.props
    const { show, content } = this.state
    delete other.content
    return (
      <div
        className={classnames('bfd-popover', {
          'bfd-popover--show': show
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

  isMounted() {
    return !!this.popover
  }

  mount() {
    this.containerNode = document.createElement('div')
    document.body.appendChild(this.containerNode)
    this.popover = ReactDOM.render(<Popover {...this.props} />, this.containerNode)
  }

  unmount() {
    this.containerNode && document.body.removeChild(this.containerNode)
  }

  updateProps(nextProps) {
    Object.assign(this.props, nextProps)
    this.popover && this.popover.updateState(nextProps)
  }

  open() {
    if (!this.isMounted()) this.mount()
    this.popover.open()
    this.isOpen = true
  }

  close() {
    this.popover && this.popover.close()
    this.isOpen = false
  }

  toggle() {
    this[this.isOpen ? 'close' : 'open']()
  }
}
