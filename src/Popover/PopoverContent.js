import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import classlist from 'classlist'
import ToggleNode from '../_shared/ToggleNode'
import CoordinateFactory from './CoordinateFactory'

class PopoverContent extends Component {

  getChildContext() {
    return {
      popoverContent: this
    }
  }

  componentDidMount() {
    this.rootNode = ReactDOM.findDOMNode(this)
    this.toggleContent = new ToggleNode(
      this.rootNode, 'bfd-popover--open', ::this.setPosition
    )
    this.toggleContent.open()
  }

  componentDidUpdate() {
    this.toggleContent.open()
  }

  getComputedDirection(triggerRect, popoverRect) {
    let { direction } = this.props
    if (direction === 'up' || direction === 'down') {
      if (triggerRect.top < popoverRect.height) {
        direction = 'down'
      } else if (popoverRect.height + triggerRect.top + triggerRect.height > window.innerHeight) {
        direction = 'up'
      }
    }
    return direction
  }

  getComputedAlign(direction) {
    const { align } = this.props
    if (align === 'middle') {
      return align
    }
    if (direction === 'up' || direction === 'down') {
      if (align === 'top' || align === 'bottom') {
        return 'middle'
      }
    } else {
      if (align === 'left' || align === 'right') {
        return 'middle'
      }
    }
  }

  setClassNamesByPosition(direction, align) {
    this.positionClassNames = classnames({
      [`bfd-popover--${direction}`]: true,
      [`bfd-popover--align-${align}`]: !!align
    })
    classlist(this.rootNode).add(this.positionClassNames)
  }

  setCoordinate(triggerRect, popoverRect, direction, align) {
    const [left, top] = CoordinateFactory(triggerRect, popoverRect, direction, align)
    this.rootNode.style.left = left + 'px'
    this.rootNode.style.top = top + 'px'
  }

  setPosition() {
    const { triggerNode } = this.props

    // Prevent accumulation
    if (this.positionClassNames) {
      classlist(this.rootNode).remove(...this.positionClassNames.split(' '))
    }

    // Calculate elements size
    const triggerRect = triggerNode.getBoundingClientRect()
    let popoverRect = this.rootNode.getBoundingClientRect()

    // Calculate direction with arrow and reCalculate contentNode size
    const direction = this.getComputedDirection(triggerRect, popoverRect)
    const align = this.getComputedAlign(direction)
    this.setClassNamesByPosition(direction, align)
    popoverRect = this.rootNode.getBoundingClientRect()

    this.setCoordinate(triggerRect, popoverRect, direction, align)
  }

  /**
   * @public
   */
  close() {
    this.toggleContent.close()
  }

  render() {
    const {
      children, className, popover, triggerNode, direction, align, ...other
    } = this.props
    return (
      <div className="bfd-popover">
        <div className={classnames('bfd-popover__content', className)} {...other}>
          {children}
        </div>
      </div>
    )
  }
}

PopoverContent.childContextTypes = {
  popoverContent: PropTypes.instanceOf(PopoverContent)
}

export default PopoverContent
