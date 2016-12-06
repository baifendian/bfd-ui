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
import ToggleNode from '../_shared/ToggleNode'
import CoordinateFactory from './CoordinateFactory'

class Popover extends Component {

  shouldComponentUpdate(nextProps) {
    return !!this.props.open || !!nextProps.open
  }

  componentDidMount() {
    this.popoverNode = ReactDOM.findDOMNode(this)
    this.toggleNode = new ToggleNode(
      this.popoverNode, 'bfd-popover--open', ::this.setPosition
    )
    if (this.props.open) {
      this.open()
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.open) {
      prevProps.open ? this.setPosition() : this.open()
    } else {
      prevProps.open && this.close()
    }
  }

  open() {
    this.toggleNode.open()
  }

  close() {
    this.toggleNode.close()
  }

  getComputedDirection(triggerRect, popoverRect) {
    let { direction } = this.props
    if (triggerRect.top < popoverRect.height) {
      direction = 'down'
    } else if (popoverRect.height + triggerRect.top + triggerRect.height > window.innerHeight) {
      direction = 'up'
    }
    return direction
  }

  setClassNamesByPosition(direction, align) {
    this.positionClassNames = classnames({
      [`bfd-popover--${direction}`]: true,
      [`bfd-popover--align-${align}`]: !!align
    })
    classlist(this.popoverNode).add(this.positionClassNames)
  }

  setCoordinate(triggerRect, popoverRect, direction, align) {
    const [left, top] = CoordinateFactory(triggerRect, popoverRect, direction, align)
    this.popoverNode.style.left = left + 'px'
    this.popoverNode.style.top = top + 'px'
  }

  setPosition() {
    const { triggerNode, align } = this.props

    if (this.positionClassNames) {
      classlist(this.popoverNode).remove(...this.positionClassNames.split(' '))
    }

    const triggerRect = triggerNode.getBoundingClientRect()
    let popoverRect = this.popoverNode.getBoundingClientRect()

    const direction = this.getComputedDirection(triggerRect, popoverRect)
    this.setClassNamesByPosition(direction, align)

    popoverRect = this.popoverNode.getBoundingClientRect()
    this.setCoordinate(triggerRect, popoverRect, direction, align)
  }

  render() {
    const { className, open, triggerNode, content, direction, ...other } = this.props
    return (
      <div className="bfd-popover">
        <div className={classnames('bfd-popover__content', className)} {...other}>
          {content}
        </div>
      </div>
    )
  }
}

Popover.defaultProps = {
  direction: 'up'
}

Popover.propTypes = {
  triggerNode: (props, propName, componentName) => {
    if (props[propName] && props[propName] instanceof Element === false) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`, expected DOM Element.`
      )
    }
  },
  content: PropTypes.node,
  open: PropTypes.bool,
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),
  align: PropTypes.oneOf(['top', 'right', 'bottom', 'left', 'middle'])
}

export default class {

  constructor(getProps) {
    this.getProps = getProps
  }

  render(props) {
    if (!this.containerNode) {
      this.containerNode = document.createElement('div')
      document.body.appendChild(this.containerNode)
    }
    this.render = props => {
      if (!this.props) {
        this.props = this.getProps()
      }
      props && Object.assign(this.props, props)
      this.isOpen = !!this.props.open
      ReactDOM.render(<Popover {...this.props} />, this.containerNode)
    }
    this.render(props)
  }

  update() {
    this.props = this.getProps()
    if (!this.props.open && !this.isOpen) return
    this.render()
  }

  open() {
    this.isOpen || this.render({open: true})
  }

  close() {
    this.isOpen && this.render({open: false})
  }

  toggle() {
    this.isOpen ? this.close() : this.open()
  }

  unmount() {
    if (this.containerNode) {
      document.body.removeChild(this.containerNode)
      this.containerNode = null
    }
  }
}
