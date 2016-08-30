import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

class Nav extends Component {

  getChildContext() {
    return {
      nav: this
    }
  }

  handleItemClick(props, e) {
    this.props.onItemClick && this.props.onItemClick(props, e)
  }
  
  render() {
    const { className, children, ...other } = this.props

    delete other.href
    delete other.onItemClick

    return (
      <div className={classnames('bfd-nav', className)} {...other}>
        <ul>{children}</ul>
      </div>
    )
  }
}

Nav.childContextTypes = {
  nav: PropTypes.instanceOf(Nav)
}

Nav.propTypes = {

  // 所有 NavItem 的基础 href
  href: PropTypes.string,

  // 叶子节点 NavItem 点击事件，参数为当前 NavItem 的 props 以及 event 对象
  onItemClick: PropTypes.func
}

export default Nav