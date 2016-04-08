import 'bfd-bootstrap'
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'

const Nav = React.createClass({
  
  render() {
    return (
      <ul {...this.props} className="nav nav-pills nav-stacked">{this.props.children}</ul>
    )
  }
})

const NavItem = React.createClass({

  contextTypes: {
    history: PropTypes.object.isRequired
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
  
  render() {

    let Toggle
    let Icon
    let Item

    if (this.props.children) {
      Toggle = <span className="glyphicon glyphicon-menu-right"></span> 
    }
    if (this.props.icon) {
      Icon = <span className={'glyphicon glyphicon-' + this.props.icon}></span>
    }
    if (this.props.children) {
      Item = <a href={this.props.href} onClick={this.toggle}>{Icon}{this.props.title}{Toggle}</a>
    } else {
      Item = <Link to={this.props.href} query={this.props.query}>{Icon}{this.props.title}{Toggle}</Link>
    }

    const indexOnly = this.props.href === '/'
    return (
      <li {...this.props} className={classNames({open: this.state.isOpen, active: this.isActive(indexOnly)})}>
        {Item}
        {this.props.children ? <Nav>{this.props.children}</Nav> : null}
      </li>
    )
  }
})

export { Nav, NavItem }