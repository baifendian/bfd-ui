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

class Dropdown extends Component {

  // 存储所有的组件实例，当前打开后，其他关闭
  static instances = []

  constructor(props) {
    super()
    this.handleBodyClick = this.handleBodyClick.bind(this)
    this.state = {
      open: props.open || false
    }
  }

  getChildContext() {
    return {
      dropdown: this
    }
  }

  componentWillReceiveProps(nextProps) {
    'open' in nextProps && this.setState({open: nextProps.open})  
  }

  componentDidMount() {
    Dropdown.instances.push(this)
    window.addEventListener('click', this.handleBodyClick)
  }

  componentWillUnmount() {
    Dropdown.instances.splice(Dropdown.instances.indexOf(this), 1)
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
    this.setState({open: false})
  }

  handleToggle() {
    if (this.props.disabled) return
    this[this.state.open ? 'close' : 'open']()
    if (Dropdown.instances.length > 1) {
      Dropdown.instances.forEach(instance => {
        if (instance !== this) {
          // 关闭其他组件
          instance.close()
        }
      })
    }
    this.props.onToggle && this.props.onToggle(!this.state.open)
  }

  handleBodyClick() {
    this.close()
  }

  render() {
    
    const { open } = this.state
    const { children, className, onToggle, disabled, ...other } = this.props

    delete other.open

    const classNames = classnames('bfd-dropdown', {
      'bfd-dropdown--open': open,
      'bfd-dropdown--disabled': disabled
    }, className)

    return (
      <div 
        className={classnames(classNames)}
        onClick={e => e.stopPropagation()}  
        {...other}
      >
        {children}
      </div>
    )
  }
}

Dropdown.childContextTypes = {
  dropdown: PropTypes.instanceOf(Dropdown)
}

Dropdown.propTypes = {

  // 是否展开
  open: PropTypes.bool,

  // 切换 open 状态后的回调，参数为切换后的 open 状态
  onToggle: PropTypes.func,
  
  // 是否禁用
  disabled: PropTypes.bool,

  customProp({ open, onToggle }) {
    if (open && !onToggle) {
      return new Error('You provided a `open` prop without an `onToggle` handler')
    }
  }
}

export default Dropdown