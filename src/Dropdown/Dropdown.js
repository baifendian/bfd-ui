/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import Popover from '../Popover'
import DropdownToggle from './DropdownToggle'
import DropdownMenu from './DropdownMenu'

class Dropdown extends Component {

  constructor(props) {
    super()
    this.toggleFromPopover = false
    this.state = {
      open: props.open || false
    }
  }

  componentDidMount() {
    if (!this.props.disabled) {
      this.preparePopover()
    }
  }

  componentWillReceiveProps(nextProps) {
    'open' in nextProps && this.setState({open: nextProps.open})
  }

  componentDidUpdate() {
    if (!this.props.disabled && !this.toggleFromPopover) {
      if (this.popover) {
        this.popover.update(this.getPopoverOptions())
      } else {
        this.preparePopover()
        this.popover.update()
      }
    }
    this.toggleFromPopover = false
  }

  componentWillUnmount() {
    this.popover && this.popover.unmount()
  }

  preparePopover() {
    const { onToggle } = this.props
    this.triggerNode = ReactDOM.findDOMNode(this.toggle)
    this.popover = new Popover({
      triggerNode: this.triggerNode,
      triggerMode: 'click',
      onOpen: () => {
        this.toggleFromPopover = true
        this.open()
        onToggle && onToggle(true)
      },
      onClose: () => {
        this.toggleFromPopover = true
        this.close()
        onToggle && onToggle(false)
      },
      ...this.getPopoverOptions()
    })
  }

  getPopoverOptions() {
    const { children, className, right, ...other } = this.DropdownMenu.props
    // Will be deprecated
    if (right) {
      other.align = 'right'
    }
    if (this.props.aligned) {
      other.style = Object.assign(other.style || {}, {
        width: this.triggerNode.offsetWidth
      })
    }
    return {
      open: this.state.open,
      content: children,
      className: classnames('bfd-dropdown__popover', className),
      ...other
    }
  }

  /**
   * @public
   * @name this.refs.dropdown.open
   * @description 展开
   */
  open() {
    this.setState({open: true})
  }

  /**
   * @public
   * @name this.refs.dropdown.close
   * @description 收起
   */
  close() {
    this.setState({open: false})
  }

  render() {
    const { children, className, onToggle, disabled, direction, ...other } = this.props
    const { open } = this.state
    delete other.open

    React.Children.forEach(children, child => {
      if (child.type === DropdownToggle) {
        this.DropdownToggle = child
      } else if (child.type === DropdownMenu) {
        this.DropdownMenu = child
      }
    })

    return (
      <div className={classnames('bfd-dropdown', {
        'bfd-dropdown--open': open,
        'bfd-dropdown--disabled': disabled
      }, className)} {...other}
      >
        {React.cloneElement(this.DropdownToggle, {
          ref: toggle => this.toggle = toggle
        })}
      </div>
    )
  }
}

Dropdown.propTypes = {

  // 是否展开
  open: PropTypes.bool,

  // 切换 open 状态后的回调，参数为切换后的 open 状态
  onToggle: PropTypes.func,

  // 是否禁用
  disabled: PropTypes.bool,

  // DropdownToggle 与 DropdownMenu 宽度相同
  aligned: PropTypes.bool,

  customProp({ open, onToggle }) {
    if (open && !onToggle) {
      return new Error('You provided a `open` prop without an `onToggle` handler')
    }
  }
}

export default Dropdown
