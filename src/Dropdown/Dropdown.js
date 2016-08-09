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

  open() {
    this.setState({open: true})
  }

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
    const { className, children, ...other } = this.props
    return (
      <div 
        className={classnames('bfd-dropdown', {'bfd-dropdown--open': open}, className)}
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
  disabled: PropTypes.bool,
  open: PropTypes.bool,
  onToggle: PropTypes.func
}

export default Dropdown