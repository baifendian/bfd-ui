/**
 * 下拉功能组件
 */

import React, { PropTypes } from 'react'
import classnames from 'classnames'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './dropdown.less'

export default React.createClass({

  // mixins: [PureRenderMixin],

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

  open() {
    this.setState({isOpen: true})
  },

  close() {
    this.setState({isOpen: false})
  },

  handleToggle() {
    this[this.state.isOpen ? 'close' : 'open']()
    if (this.instances.length > 1) {
      this.instances.forEach(instance => {
        if (instance !== this) {
          // 关闭其他组件
          instance.close()
        }
      })
    }
  },

  handleBodyClick() {
    this.close()
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

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.isOpen !== nextState.isOpen
  },

  render() {
    return (
      <div onClick={this.stopPropagation} className={classnames('bfd-dropdown dropdown', this.props.className, {open: this.state.isOpen})}>{this.props.children}</div>
    )
  }
})