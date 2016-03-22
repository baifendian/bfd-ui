/**
 * 下拉功能组件
 */

import React, { PropTypes } from 'react'
import classnames from 'classnames'
import './dropdown.less'

export default React.createClass({

  // 存储所有的组件实例，当前打开后，其他关闭
  instances: [],

  getInitialState() {
    return {
      isOpen: false
    }
  },

  childContextTypes: {
    handleToggle: PropTypes.func,
    isOpen: PropTypes.func
  },

  getChildContext() {
    return {
      handleToggle: this.handleToggle,
      isOpen: () => this.state.isOpen
    }
  },

  handleToggle() {
    this.setState({isOpen: !this.state.isOpen})
    if (this.instances.length > 1) {
      this.instances.forEach(instance => {
        if (instance !== this) {
          // 关闭其他组件
          instance.setState({isOpen: false})
        }
      })
    }
  },

  handleBodyClick() {
    this.setState({isOpen: false})
  },

  stopPropagation(e) {
    e.stopPropagation()
  },

  componentDidMount() {
    this.instances.push(this)
    window.addEventListener('click', this.handleBodyClick)
  },

  componentWillUnmount() {
    this.instances.splice(this.instances.indexOf(this), 1)
    window.removeEventListener('click', this.handleBodyClick)
  },

  render() {
    return (
      <div onClick={this.stopPropagation} className={classnames('bfd-dropdown dropdown', this.props.className, {open: this.state.isOpen})}>{this.props.children}</div>
    )
  }
})