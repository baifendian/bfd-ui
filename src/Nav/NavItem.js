import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import classnames from 'classnames'
import Nav from './Nav'
import Icon from '../Icon'
import TextOverflow from '../TextOverflow'

class NavItem extends Component {

  constructor(props) {
    super()
    this.state = {
      href: null,
      open: props.defaultOpen || false,
      active: false
    }
  }

  getChildContext() {
    return {
      navItem: this
    }
  }

  componentWillMount() {
    this.prepareComponentState(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.prepareComponentState(nextProps)
  }

  prepareComponentState(props) {
    const href = this.getHref()
    const active = this.isActive(href)
    this.setState({ href, active })
  }

  getHref() {
    const { href, children } = this.props
    if (!href && children) return ''
    const baseURL = this.context.nav.props.href || ''
    let _href = baseURL + '/' + (href || '')
    return _href.replace(/\/+/g, '/').replace(/(.+)\/$/, '$1')
  }

  isActive(href) {
    if (this.isIndex(href)) {
      return href === (location.pathname || '/')
    } else {
      return href && location.href.indexOf(href) !== -1
    }
  }

  isIndex(href) {
    if (this.props.children) return false
    const baseURL = (this.context.nav.props.href || '').replace(/\//g, '')
    return baseURL === href.replace(/\//g, '')
  }

  toggle(e) {
    e.preventDefault()
    this.setState({open: !this.state.open})
  }

  handleClick(e) {
    this.props.onClick && this.props.onClick(e)
    !this.props.children && this.context.nav.handleItemClick(this.props, e)
  }
  
  render() {
    console.log('render')
    const { href, open, active } = this.state
    const { children, className, icon, title, ...other } = this.props

    delete other.href
    delete other.defaultOpen

    const NavIcon = icon && <Icon type={icon} className="bfd-nav__item-icon" />
    const Toggle = children && <Icon type="caret-right" className="bfd-nav__item-toggle" />

    const Item = children
      ? <a href={href} onClick={::this.toggle}>{NavIcon}{title}{Toggle}</a>
      : <Link to={href} query={this.props.query}>{NavIcon}{title}{Toggle}</Link>

    const classNames = classnames(
      'bfd-nav__item', 
      {
        'bfd-nav__item--open': open,
        'bfd-nav__item--active': active
      },
      className
    )

    // 收起状态时不再渲染子节点
    return (
      <li 
        onClick={::this.handleClick} 
        className={classNames}
        {...other}
      >
        {Item}
        {open && children && <ul>{children}</ul>}
      </li>
    )
  }
}

NavItem.childContextTypes = {
  navItem: PropTypes.instanceOf(NavItem)
}

NavItem.contextTypes = {
  history: PropTypes.object,
  nav: PropTypes.object,
  navItem: PropTypes.object
}

NavItem.propTypes = {

  // 当前菜单 href，非叶子节点也需要指定，与路由对应
  href: PropTypes.string,

  // 菜单图标，参考 Icon 组件 type 属性
  icon: PropTypes.string,

  // 菜单标题
  title: PropTypes.string,

  // 初始化是否展开（不可控），用于非叶子节点
  defaultOpen: PropTypes.bool
}

export default NavItem