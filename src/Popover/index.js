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
    this.popoverNode = ReactDOM.findDOMNode(this)
    if (this.props.open) {
      this.positionClassNames = this.setPosition()
    }
  }

  componentDidUpdate() {
    if (this.positionClassNames) {
      classlist(this.popoverNode).remove(...this.positionClassNames.split(' '))
    }
    if (this.props.open) {
      this.positionClassNames = this.setPosition()
    }
  }

  getPosition(triggerRect, popoverRect, direction, align) {
    const [scrollTop, scrollLeft] = this.getDocumentScroll()
    const center = [
      triggerRect.left + triggerRect.width / 2 + scrollLeft,
      triggerRect.top + triggerRect.height / 2 + scrollTop
    ]
    const getAlignTick = horizontal => {
      const types = horizontal ? ['left', 'right'] : ['top', 'bottom']
      const axis = horizontal ? 0 : 1
      const size = horizontal ? 'width' : 'height'
      if (align === types[0]) {
        return center[axis] - triggerRect[size] / 2
      } else if (align === types[1]) {
        return center[axis] - popoverRect[size] + triggerRect[size] / 2
      } else {
        return center[axis] - popoverRect[size] / 2
      }
    }
    const positions = {
      up() {
        const top = center[1] - triggerRect.height / 2 - popoverRect.height
        return [getAlignTick(true), top]
      },
      down() {
        const top = center[1] + triggerRect.height / 2
        return [getAlignTick(true), top]
      },
      left() {
        const left = center[0] - triggerRect.width / 2 - popoverRect.width
        return [left, getAlignTick()]
      },
      right() {
        const left = center[0] + triggerRect.width / 2
        return [left, getAlignTick()]
      }
    }
    return positions[direction]()
  }

  getPositionClassNames(direction, align) {
    return classnames({
      [`bfd-popover--${direction}`]: true,
      [`bfd-popover--align-${align}`]: !!align
    })
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

  setPosition() {
    const { triggerNode, align } = this.props

    const triggerRect = triggerNode.getBoundingClientRect()
    let popoverRect = this.popoverNode.getBoundingClientRect()

    const direction = this.getComputedDirection(triggerRect, popoverRect)
    const positionClassNames = this.getPositionClassNames(direction, align)

    classlist(this.popoverNode).add(positionClassNames)
    popoverRect = this.popoverNode.getBoundingClientRect()
    const [left, top] = this.getPosition(triggerRect, popoverRect, direction, align)

    this.popoverNode.style.left = left + 'px'
    this.popoverNode.style.top = top + 'px'

    return positionClassNames
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
      <div className={classnames('bfd-popover', {
        'bfd-popover--open': open
      })}>
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
