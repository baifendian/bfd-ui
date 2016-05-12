import React, { PropTypes } from 'react'
import classnames from 'classnames'
import 'bfd-bootstrap'
import './dropdown.less'


const propTypes = {
  disabled: PropTypes.bool
}

const childContextTypes = {
  handleToggle: PropTypes.func
}

const Dropdown = React.createClass({

  // 存储所有的组件实例，当前打开后，其他关闭
  instances: [],

  getInitialState() {
    return {
      isOpen: false
    }
  },

  getChildContext() {
    return {
      handleToggle: this.handleToggle
    }
  },

  open() {
    this.setState({isOpen: true})
  },

  close() {
    this.setState({isOpen: false})
  },

  handleToggle() {
    if (this.props.disabled) return
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
    window.addEventListener('mousedown', this.handleBodyClick)
  },

  componentWillUnmount() {
    this.instances.splice(this.instances.indexOf(this), 1)
    window.removeEventListener('mousedown', this.handleBodyClick)
  },

  render() {
    const { className, children, ...other } = this.props
    return (
      <div onMouseDown={this.stopPropagation} className={classnames('bfd-dropdown dropdown', className, {open: this.state.isOpen})} {...other}>{children}</div>
    )
  }
})

Dropdown.propTypes = propTypes
Dropdown.childContextTypes = childContextTypes

export default Dropdown