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
import classlist from 'classlist'
import Popover from '../Popover'
import DropdownToggle from './DropdownToggle'
import DropdownMenu from './DropdownMenu'

class Dropdown extends Component {

  static instances = []

  constructor(props) {
    super(props)
    this.handleBodyClick = () => {
      this.setState({open: false})
    }
    Dropdown.instances.push(this)
    this.state = {
      open: props.open || false
    }
  }

  componentDidMount() {
    this.popover = new Popover(::this.getPopoverProps)
    if (this.state.open) {
      this.popover.open()
    }
    window.addEventListener('click', this.handleBodyClick)
  }

  componentWillReceiveProps(nextProps) {
    'open' in nextProps && this.setState({open: nextProps.open})
  }

  componentDidUpdate() {
    this.popover.update()
    if (this.state.open) {
      Dropdown.instances.forEach(instance => {
        if (instance !== this) {
          instance.close()
        }
      })
    }
  }

  componentWillUnmount() {
    Dropdown.instances.splice(Dropdown.instances.indexOf(this), 1)
    this.popover.unmount()
    window.removeEventListener('click', this.handleBodyClick)
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
    this.state.open && this.setState({open: false})
  }

  getPopoverProps() {
    const {
      children, className, right, ...other
    } = this.DropdownMenu.props
    const triggerNode = ReactDOM.findDOMNode(this.toggle)

    // Will be deprecated
    if (right) {
      other.align = 'right'
    }

    if (this.props.aligned) {
      other.style = Object.assign(other.style || {}, {
        width: triggerNode.offsetWidth
      })
    }

    const props = {
      triggerNode,
      content: children,
      className: classnames('bfd-dropdown__popover', className),
      onClick: e => e.stopPropagation(),
      open: this.state.open,
      ...other
    }
    return props
  }

  render() {
    const { children, className, onToggle, disabled, direction, ...other } = this.props
    const { open } = this.state
    delete other.open

    React.Children.forEach(children, (child, i) => {
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
          ref: toggle => this.toggle = toggle,
          onClick: e => {
            e.stopPropagation()
            if (disabled) return
            const _open = !open
            this.setState({open: _open})
            onToggle && onToggle(_open)
          }
        })}
      </div>
    )
    return
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
