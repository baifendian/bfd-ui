import React, { PropTypes } from 'react'
import classnames from 'classnames'
import 'bfd-bootstrap'
import './dropdown.less'

const Dropdown = React.createClass({

  // 存储所有的组件实例，当前打开后，其他关闭
  instances: [],

  getInitialState() {
    return {
      isOpen: this.props.open || false
    }
  },

  getChildContext() {
    return {
      dropdown: this
    }
  },

  componentWillReceiveProps(nextProps) {
    'open' in nextProps && this.setState({isOpen: nextProps.open})  
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
    this.props.onToggle && this.props.onToggle(!this.state.isOpen)
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

  render() {
    const { className, children, ...other } = this.props

    delete other.onToggle
    delete other.open
    
    return (
      <div 
        className={classnames('bfd-dropdown dropdown', className, {open: this.state.isOpen})}
        onClick={this.stopPropagation}  
        {...other}
      >
        {children}
      </div>
    )
  }
})

Dropdown.childContextTypes = {
  dropdown: PropTypes.instanceOf(Dropdown)
}

Dropdown.propTypes = {
  disabled: PropTypes.bool,
  open: PropTypes.bool,
  onToggle: PropTypes.func
}

export default Dropdown