import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import classnames from 'classnames'
import Nav from './Nav'
import Icon from '../Icon'

class NavItem extends Component {

  constructor(props) {
    super()
    this.state = {
      open: props.defaultOpen || false
    }
  }

  toggle(e) {
    this.setState({open: !this.state.open})
    e.preventDefault()
  }

  isActive(href, indexOnly) {
    return this.context.history.isActive(href, this.props.query, indexOnly)
  }

  handleClick(e) {
    this.props.onClick && this.props.onClick(e)
    this.context.nav.handleItemClick(this.props, e)
  }
  
  render() {
    
    const { children, icon, title, ...other } = this.props
    const baseURL = this.context.nav.props.href
    let open = this.state.open
    let href = baseURL + '/' + this.props.href
    
    href = href.replace(/\/\//g, '/').replace(/(.+)\/$/, '$1')

    const active = this.isActive(href, href === baseURL)

    if (children && active) {
      open = true
    }

    const Toggle = children && <Icon type="angle-right" />
    const NavIcon = icon && <Icon type={icon} />

    const Item = children ?
      <a href={href} onClick={::this.toggle}>{NavIcon}{title}{Toggle}</a> :
      <Link to={href} query={this.props.query}>{NavIcon}{title}{Toggle}</Link>

    return (
      <li 
        onClick={::this.handleClick} 
        className={classnames('bfd-nav__item', { open, active })} 
        {...other}
      >
        {Item}
        {children ? <Nav href={baseURL}>{children}</Nav> : null}
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