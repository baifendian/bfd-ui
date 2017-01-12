/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { PropTypes, Component } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import PopoverContent from './PopoverContent'
import './index.less'

window.addEventListener('click', () => {
  const openedPopoverInContext = Popover[Popover.OPENED_POPOVER]
  openedPopoverInContext && openedPopoverInContext.close()
})

class Popover extends Component {

  static LAZY_DURATION = 150

  static OPENED_POPOVER = Symbol()

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
      if (prevState.open) {
        ReactDOM.findDOMNode(this.popoverContent).style.display = 'none'
      }
    }
  }

  componentWillUnmount() {
    if (this.containerNode) {
      ReactDOM.unmountComponentAtNode(this.containerNode)
      document.body.removeChild(this.containerNode)
    }
    const { openedPopoverInContext } = this
    if (openedPopoverInContext === this) {
      this.openedPopoverInContext = null
    }
  }

  // 当前 popover 所在的浮层（或全局）的打开的 popover，实现打开唯一性
  get openedPopoverInContext() {
    return (this.context.popoverContent || Popover)[Popover.OPENED_POPOVER]
  }

  set openedPopoverInContext(popover) {
    (this.context.popoverContent || Popover)[Popover.OPENED_POPOVER] = popover
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

      const { openedPopoverInContext } = this
      if (openedPopoverInContext && openedPopoverInContext !== this) {
        openedPopoverInContext.close()
      }
      this.openedPopoverInContext = this
    }
  }

  /**
   * @public
   * @name popover.close()
   * @description 关闭浮层
   */
  close() {
    if (!this.state.open) return
    const { shouldClose, onToggle } = this.props
    if (!shouldClose || shouldClose()) {
      this.setState({ open: false })
      onToggle && onToggle(false)

      if (this.openedPopoverInContext === this) {
        this.openedPopoverInContext = null
      }
      this.closeChildOpenedPopover()
    }
  }

  closeChildOpenedPopover() {
    const childOpenedPopover = this.popoverContent &&
      this.popoverContent[Popover.OPENED_POPOVER]
    childOpenedPopover && childOpenedPopover.close()
  }

  renderContent() {
    if (!this.containerNode) {
      this.containerNode = document.createElement('div')
      document.body.appendChild(this.containerNode)
    }
    const triggerNode = ReactDOM.findDOMNode(this)

    this.renderContent = () => {
      const {
        triggerMode, content, open, onToggle, shouldOpen,
        shouldClose, disabled, aligned, ...other
      } = this.props
      other.onClick = e => {
        e.stopPropagation()
        this.closeChildOpenedPopover()
      }
      if (triggerMode === 'hover') {
        other.onMouseEnter = () => {
          clearTimeout(this.closeTimer)
        }
        other.onMouseLeave = () => {
          this.closeTimer = setTimeout(() => this.close(), Popover.LAZY_DURATION)
        }
      }
      if (aligned) {
        other.style = Object.assign(other.style || {}, {
          width: triggerNode.offsetWidth
        })
      }
      ReactDOM.render((
        <PopoverContent
          ref={instance => this.popoverContent = instance}
          triggerNode={triggerNode}
          triggerMode={triggerMode}
          {...other}
        >
          {content}
        </PopoverContent>
      ), this.containerNode)
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
      } else {
        triggerProps.onClick = e => {
          e.stopPropagation()
          this[open ? 'close' : 'open']()
          children.props.onClick && children.props.onClick()
        }
      }
    }
    return React.cloneElement(children, triggerProps)
  }
}

Popover.contextTypes = {
  popoverContent: PropTypes.instanceOf(PopoverContent)
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
