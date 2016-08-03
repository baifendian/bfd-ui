import 'bfd-bootstrap'
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import classnames from 'classnames'
import Nav from './Nav'
import Icon from '../Icon'
import './NavItem.less'

const NavItem = React.createClass({

  getInitialState() {
    return {
      open: this.props.defaultOpen || false
    }
  },

  toggle(e) {
    this.setState({open: !this.state.open})
    e.preventDefault()
  },

  isActive(href, indexOnly) {
    return this.context.history.isActive(href, this.props.query, indexOnly)
  },

  handleClick(e) {
    this.props.onClick && this.props.onClick(e)
    this.context.nav.handleItemClick(this.props, e)
  },
  
  render() {
    
    const { children, icon, title, ...other } = this.props
    const baseURL = this.context.nav.props.href
    let open = this.state.open
    let href = baseURL + '/' + this.props.href
    let active
    
    href = href.replace(/\/\//g, '/').replace(/(.+)\/$/, '$1')
    active = this.isActive(href, href === baseURL)

    if (children && active) {
      open = true
    }

    let Toggle
    if (children) {
      Toggle = <Icon type="angle-right" />
    }

    let NavIcon
    if (icon) {
      NavIcon = <Icon type={icon} />
    }

    let Item
    if (children) {
      Item = <a href={href} onClick={this.toggle}>{NavIcon}{title}{Toggle}</a>
    } else {
      Item = <Link to={href} query={this.props.query}>{NavIcon}{title}{Toggle}</Link>
    }

    return (
      <li 
        onClick={this.handleClick} 
        className={classnames('bfd-nav-item', { open, active })} 
        {...other}
      >
        {Item}
        {children ? <Nav href={baseURL}>{children}</Nav> : null}
      </li>
    )
  }
})

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