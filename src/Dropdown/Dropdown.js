/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import controlledPropValidator from '../_shared/propValidator/controlled'
import Popover from '../Popover'
import DropdownToggle from './DropdownToggle'
import DropdownMenu from './DropdownMenu'

class Dropdown extends Component {

  constructor(props) {
    super()
    this.state = {
      open: props.open || false
    }
  }

  componentWillReceiveProps(nextProps) {
    'open' in nextProps && this.setState({open: nextProps.open})
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

  handleToggle(open) {
    this.setState({ open })
    this.props.onToggle && this.props.onToggle(open)
  }

  render() {
    const { children, className, onToggle, disabled, aligned, ...other } = this.props
    const { open } = this.state
    delete other.open

    React.Children.forEach(children, child => {
      if (child.type === DropdownToggle) {
        this.DropdownToggle = child
      } else if (child.type === DropdownMenu) {
        this.DropdownMenu = child
      }
    })

    const { right, ...menuProps } = this.DropdownMenu.props
    menuProps.className = classnames('bfd-dropdown__popover', menuProps.className)
    if (right) {
      menuProps.align = 'right'
    }

    return (
      <div className={classnames('bfd-dropdown', {
        'bfd-dropdown--open': open
      }, className)} {...other}
      >
        <Popover
          triggerMode="click"
          open={open}
          onToggle={::this.handleToggle}
          content={menuProps.children}
          disabled={disabled}
          aligned={aligned}
          {...menuProps}
        >
          {this.DropdownToggle}
        </Popover>
      </div>
    )
  }
}

Dropdown.propTypes = {

  // 是否展开
  open: controlledPropValidator(PropTypes.bool, 'onToggle'),

  // 切换 open 状态后的回调，参数为切换后的 open 状态
  onToggle: PropTypes.func,

  // 是否禁用
  disabled: PropTypes.bool,

  // DropdownToggle 与 DropdownMenu 宽度相同
  aligned: PropTypes.bool
}

export default Dropdown
