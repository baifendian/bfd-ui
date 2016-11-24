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
import controlledPropValidator from '../_shared/propValidator/controlled'

class Dropdown extends Component {

  // Save all instances to close others when one opened.
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

  componentDidUpdate(prevProps, prevState) {
    prevState.open !== this.state.open && this.updateMenuState()
  }

  componentDidMount() {
    Dropdown.instances.push(this)
    window.addEventListener('click', this.handleBodyClick)
    this.$root = ReactDOM.findDOMNode(this)
    this.$menu = ReactDOM.findDOMNode(this.menu)
    this.$toggle = ReactDOM.findDOMNode(this.toggle)
    this.updateMenuState()
  }

  componentWillUnmount() {
    Dropdown.instances.splice(Dropdown.instances.indexOf(this), 1)
    window.removeEventListener('click', this.handleBodyClick)
  }

  updateMenuState() {
    if (this.state.open) {
      this.setPosition()
    } else {
      classlist(this.$root).remove(this.menuDirectionClassName)
    }
  }

  setPosition() {
    const menuHeight = parseInt(getComputedStyle(this.$menu).height, 10)
    const menuTop = this.$menu.getBoundingClientRect().top
    const toggleTop = this.$toggle.getBoundingClientRect().top
    if (menuHeight + menuTop > window.innerHeight && toggleTop - 8 > menuHeight) {
      this.menuDirectionClassName = 'bfd-dropdown--up'
    } else {
      this.menuDirectionClassName = 'bfd-dropdown--down'
    }
    classlist(this.$root).add(this.menuDirectionClassName)
  }

  /**
   * @public
   */
  open() {
    this.setState({open: true})
  }

  /**
   * @public
   */
  close() {
    this.state.open && this.setState({open: false})
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
  open: controlledPropValidator(PropTypes.bool, 'onToggle'),
  onToggle: PropTypes.func,
  disabled: PropTypes.bool
}

export default Dropdown
