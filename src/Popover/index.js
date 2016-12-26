import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import classlist from 'classlist'
import ToggleNode from '../_shared/ToggleNode'
import CoordinateFactory from './CoordinateFactory'
import './index.less'

window.addEventListener('click', () => {
  Popover.lastOpenedPopover && Popover.lastOpenedPopover.close()
})

class Popover extends Component {

  static LAZY_DURATION = 150

  static lastOpenedPopover = null

  constructor(props) {
    super()
    this.state = {
      open: props.open || false
    }
  }

  componentDidMount() {
    if (this.state.open) {
      this.renderContent()
    }
  }

  componentWillReceiveProps(nextProps) {
    'open' in nextProps && this.setState({open: nextProps.open})
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.open) {
      this.renderContent()
    } else {
      prevState.open && this.toggleContent.close()
    }
  }

  componentWillUnmount() {
    if (this.containerNode) {
      ReactDOM.unmountComponentAtNode(this.containerNode)
      document.body.removeChild(this.containerNode)
    }
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
    classlist(this.contentNode).add(this.positionClassNames)
  }

  setCoordinate(triggerRect, popoverRect, direction, align) {
    const [left, top] = CoordinateFactory(triggerRect, popoverRect, direction, align)
    this.contentNode.style.left = left + 'px'
    this.contentNode.style.top = top + 'px'
  }

  setPosition() {
    const { align } = this.props

    // Prevent accumulation
    if (this.positionClassNames) {
      classlist(this.contentNode).remove(...this.positionClassNames.split(' '))
    }

    // Calculate elements size
    const triggerRect = this.triggerNode.getBoundingClientRect()
    let popoverRect = this.contentNode.getBoundingClientRect()

    // Calculate direction with arrow and reCalculate contentNode size
    const direction = this.getComputedDirection(triggerRect, popoverRect)
    this.setClassNamesByPosition(direction, align)
    popoverRect = this.contentNode.getBoundingClientRect()

    this.setCoordinate(triggerRect, popoverRect, direction, align)
  }

  /**
   * @public
   * @name popover.open()
   * @description 打开浮层
   */
  open() {
    const { shouldOpen, onToggle } = this.props
    if (!shouldOpen || shouldOpen()) {
      this.setState({ open: true })
      onToggle && onToggle(true)

      if (Popover.lastOpenedPopover && Popover.lastOpenedPopover !== this) {
        Popover.lastOpenedPopover.close()
      }
      Popover.lastOpenedPopover = this
    }
  }

  /**
   * @public
   * @name popover.close()
   * @description 关闭浮层
   */
  close() {
    const { shouldClose, onToggle } = this.props
    if (!shouldClose || shouldClose()) {
      this.setState({ open: false })
      onToggle && onToggle(false)
    }
  }

  renderContent() {
    if (!this.containerNode) {
      this.containerNode = document.createElement('div')
      document.body.appendChild(this.containerNode)
    }
    this.triggerNode = ReactDOM.findDOMNode(this)

    this.renderContent = () => {
      const {
        className, triggerMode, content, direction, align, open, onToggle, shouldOpen,
        shouldClose, disabled, aligned, ...other
      } = this.props

      if (triggerMode === 'hover') {
        other.onMouseEnter = () => {
          clearTimeout(this.closeTimer)
        }
        other.onMouseLeave = () => {
          this.closeTimer = setTimeout(() => this.close(), Popover.LAZY_DURATION)
        }
      } else {
        other.onClick = e => e.stopPropagation()
      }

      if (aligned) {
        other.style = Object.assign(other.style || {}, {
          width: this.triggerNode.offsetWidth
        })
      }

      ReactDOM.render((
        <div className="bfd-popover" ref={node => {
          this.contentNode = node
        }}>
          <div className={classnames('bfd-popover__content', className)} {...other}>
            {content}
          </div>
        </div>
      ), this.containerNode, () => {
        if (!this.toggleContent) {
          this.toggleContent = new ToggleNode(
            this.contentNode, 'bfd-popover--open', ::this.setPosition
          )
        } else {
          this.toggleContent.setNode(this.contentNode)
        }
        this.toggleContent.open()
      })
    }
    this.renderContent()
  }

  render() {
    const { children, triggerMode, disabled } = this.props
    const { open } = this.state
    const triggerProps = {
      className: classnames(children.props.className, 'bfd-popover__trigger', {
        'bfd-popover__trigger--disabled': disabled
      })
    }
    if (!disabled) {
      triggerProps.onClick = e => {
        e.stopPropagation()
        if (triggerMode === 'click') {
          this[open ? 'close' : 'open']()
        }
        children.props.onClick && children.props.onClick()
      }

      if (triggerMode === 'hover') {
        triggerProps.onMouseEnter = () => {
          clearTimeout(this.closeTimer)
          this.openTimer = setTimeout(::this.open, Popover.LAZY_DURATION)
          children.props.onMouseEnter && children.props.onMouseEnter()
        }
        triggerProps.onMouseLeave = () => {
          clearTimeout(this.openTimer)
          this.closeTimer = setTimeout(::this.close, Popover.LAZY_DURATION)
          children.props.onMouseLeave && children.props.onMouseLeave()
        }
      }
    }
    return React.cloneElement(children, triggerProps)
  }
}

Popover.defaultProps = {
  direction: 'up',
  triggerMode: 'hover'
}

Popover.propTypes = {
  children: PropTypes.element.isRequired,
  triggerMode: PropTypes.oneOf(['click', 'hover']),
  content: PropTypes.node,
  direction: PropTypes.oneOf(['up', 'down', 'left', 'right']),
  align: PropTypes.oneOf(['top', 'right', 'bottom', 'left', 'middle']),
  open: PropTypes.bool,
  onToggle: PropTypes.func,
  shouldOpen: PropTypes.func,
  shouldClose: PropTypes.func,
  disabled: PropTypes.bool,
  aligned: PropTypes.bool
}

export default Popover
