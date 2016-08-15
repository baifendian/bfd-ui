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
    const baseURL = this.context.nav.props.href
    const href = this.getHref(baseURL)
    if (this.props.children && this.isActive(href, href === baseURL)) {
      this.setState({open: true})
    }
  }

  toggle(e) {
    e.preventDefault()
    this.setState({open: !this.state.open})
  }

  isActive(href, indexOnly) {
    if (indexOnly && href === location.pathname) return true
    return location.href.indexOf(href) !== -1
    // history.isActive is expensive
    // return this.context.history.isActive(href, this.props.query, indexOnly)
  }

  handleClick(e) {
    this.props.onClick && this.props.onClick(e)
    !this.props.children && this.context.nav.handleItemClick(this.props, e)
  }

  getHref(baseURL) {
    let href = baseURL + '/' + this.props.href
    return href.replace(/\/\//g, '/').replace(/(.+)\/$/, '$1')
  }
  
  render() {

    const { open } = this.state
    const { children, className, icon, title, href, ...other } = this.props

    const baseURL = this.context.nav.props.href
    const _href = this.getHref(baseURL)
    const active = this.isActive(_href, _href === baseURL)

    const NavIcon = icon && <Icon type={icon} className="bfd-nav__icon" />
    const Toggle = children && <Icon type="angle-right" className="bfd-nav__icon-toggle" />

    const Item = children ?
      <a href={_href} onClick={::this.toggle}>{NavIcon}{title}{Toggle}</a> :
      <Link to={_href} query={this.props.query}>{NavIcon}{title}{Toggle}</Link>

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
        {open && children ? <Nav href={baseURL}>{children}</Nav> : null}
      </li>
    )
  }
}

NavItem.contextTypes = {
  history: PropTypes.object.isRequired,
  nav: PropTypes.object
}

NavItem.defaultProps = {
  href: ''
}

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string,
  defaultOpen: PropTypes.bool
}

export default NavItem