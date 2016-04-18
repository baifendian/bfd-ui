import 'bfd-bootstrap'
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'

const Nav = React.createClass({

  childContextTypes: {
    navItemClickHandle: PropTypes.func
  },

  getChildContext() {
    return {
      navItemClickHandle: (props, e) => {
        if (!this.context.navItemClickHandle) {
          this.props.onItemClick && this.props.onItemClick(props, e)
        } else {
          this.context.navItemClickHandle(props, e)
        }
      }
    }
  },

  contextTypes: {
    navItemClickHandle: PropTypes.func
  },
  
  render() {
    return (
      <ul {...this.props} className="nav nav-pills nav-stacked">{this.props.children}</ul>
    )
  }
})

const NavItem = React.createClass({

  contextTypes: {
    history: PropTypes.object.isRequired,
    navItemClickHandle: PropTypes.func
  },

  getInitialState() {
    return {
      // Todo: condition of isOpen
      isOpen: !!this.props.children
    }
  },

  toggle(e) {
    this.setState({isOpen: !this.state.isOpen})
    e.preventDefault()
  },

  isActive(indexOnly) {
    return this.context.history.isActive(this.props.href, this.props.query, indexOnly)
  },

  handleClick(e) {
    this.props.onClick && this.props.onClick(e)
    this.context.navItemClickHandle(this.props, e)
  },
  
  render() {

    let Toggle
    let Icon
    let Item

    const { children, icon, href, title, ...other } = this.props

    if (children) {
      Toggle = <span className="glyphicon glyphicon-menu-right"></span> 
    }
    if (icon) {
      Icon = <span className={'glyphicon glyphicon-' + icon}></span>
    }
    if (children) {
      Item = <a href={href} onClick={this.toggle}>{Icon}{title}{Toggle}</a>
    } else {
      Item = <Link to={href} query={this.props.query}>{Icon}{title}{Toggle}</Link>
    }

    const indexOnly = this.props.href === '/'
    return (
      <li {...other} onClick={this.handleClick} className={classNames({open: this.state.isOpen, active: this.isActive(indexOnly)})}>
        {Item}
        {this.props.children ? <Nav>{this.props.children}</Nav> : null}
      </li>
    )
  }
})

export { Nav, NavItem }