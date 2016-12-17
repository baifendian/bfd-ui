import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import classlist from 'classlist'
import ToggleNode from '../../_shared/ToggleNode'
import CoordinateFactory from './CoordinateFactory'
import './index.less'

class Popover extends Component {

  static LAZY_DURATION = 150

  static lastOpenedPopover = null

  constructor(props) {
    super()
    if (props.triggerMode === 'click') {
      this.handleBodyClick = () => props.popover.close()
    }
  }

  componentDidMount() {
    this.popoverNode = ReactDOM.findDOMNode(this)
    this.toggleNode = new ToggleNode(
      this.popoverNode, 'bfd-popover--open', ::this.setPosition
    )
    if (this.props.open) {
      this.open()
    }
    this.handleBodyClick && window.addEventListener('click', this.handleBodyClick)
  }

  shouldComponentUpdate(nextProps) {
    return !!this.props.open || !!nextProps.open
  }

  componentDidUpdate(prevProps) {
    if (this.props.open) {
      prevProps.open ? this.setPosition() : this.open()
    } else {
      prevProps.open && this.close()
    }
  }

  componentWillUnmount() {
    this.handleBodyClick && window.removeEventListener('click', this.handleBodyClick)
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

    // Prevent accumulation
    if (this.positionClassNames) {
      classlist(this.popoverNode).remove(...this.positionClassNames.split(' '))
    }

    // Calculate elements size
    const triggerRect = triggerNode.getBoundingClientRect()
    let popoverRect = this.popoverNode.getBoundingClientRect()

    // Calculate direction with arrow and reCalculate popoverNode size
    const direction = this.getComputedDirection(triggerRect, popoverRect)
    this.setClassNamesByPosition(direction, align)
    popoverRect = this.popoverNode.getBoundingClientRect()

    this.setCoordinate(triggerRect, popoverRect, direction, align)
  }

  open() {
    this.toggleNode.open()
    if (Popover.lastOpenedPopover && Popover.lastOpenedPopover !== this) {
      Popover.lastOpenedPopover.props.popover.close()
    }
    Popover.lastOpenedPopover = this
  }

  close() {
    this.toggleNode.close()
  }

  render() {
    const {
      className, open, triggerNode, triggerMode, content, direction, popover, ...other
    } = this.props
    if (triggerMode === 'hover') {
      other.onMouseEnter = () => {
        clearTimeout(popover.closeTimer)
      }
      other.onMouseLeave = () => {
        popover.closeTimer = setTimeout(() => popover.close(), Popover.LAZY_DURATION)
      }
    } else {
      other.onClick = e => e.stopPropagation()
    }
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
  direction: 'up',
  triggerMode: 'hover'
}

Popover.propTypes = {
  triggerNode: (props, propName, componentName) => {
    if (props[propName] && props[propName] instanceof Element === false) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`, expected DOM Element.`
      )
    }
  },
  triggerMode: PropTypes.oneOf(['click', 'hover']),
  content: PropTypes.node,
  open: PropTypes.bool,
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),
  align: PropTypes.oneOf(['top', 'right', 'bottom', 'left', 'middle']),
  popover: PropTypes.object
}

export default Popover
