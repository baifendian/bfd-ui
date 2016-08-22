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
      open: props.defaultOpen || false
    }
  }

  componentWillMount() {
    // 首次加载后，active 状态保持 open 状态
    const href = this.getHref()
    if (this.props.children && this.isActive(href, this.isIndex(href))) {
      this.setState({open: true})
    }
  }

  toggle(e) {
    e.preventDefault()
    this.setState({open: !this.state.open})
  }

  isIndex(href) {
    const baseURL = (this.context.nav.props.href || '').replace(/\//g, '')
    return baseURL === href.replace(/\//g, '')
  }

  isActive(href, indexOnly) {
    if (indexOnly) {
      return href === (location.pathname || '/')
    } else {
      return location.href.indexOf(href) !== -1
    }
    // history.isActive is expensive
    // return this.context.history.isActive(href, this.props.query, indexOnly)
  }

  handleClick(e) {
    this.props.onClick && this.props.onClick(e)
    !this.props.children && this.context.nav.handleItemClick(this.props, e)
  }

  getHref() {
    const baseURL = this.context.nav.props.href || ''
    let href = baseURL + '/' + (this.props.href || '')
    return href.replace(/\/+/g, '/').replace(/(.+)\/$/, '$1')
  }
  
  render() {

    const { open } = this.state
    const { children, className, icon, title, ...other } = this.props

    const href = this.getHref()
    const active = this.isActive(href, this.isIndex(href))

    const NavIcon = icon && <Icon type={icon} className="bfd-nav__item-icon" />
    const Toggle = children && <Icon type="angle-right" className="bfd-nav__item-toggle" />

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

NavItem.contextTypes = {
  nav: PropTypes.object
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