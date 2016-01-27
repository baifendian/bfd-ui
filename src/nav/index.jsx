import 'bfd-bootstrap'
import React, {PropTypes} from 'react'
import classNames from 'classnames'
import Router from '../router'
import Link from '../link/index.jsx'

const Nav = React.createClass({
  
  render() {
    return (
      <ul className="nav nav-pills nav-stacked">{this.props.children}</ul>
    )
  }
})

Nav.Item = React.createClass({

  getInitialState() {
    return {
      path: location.pathname,
      isOpen: !!this.props.children
    }
  },

  toggle(e) {
    this.setState({isOpen: !this.state.isOpen})
    e.preventDefault()
  },

  isActive() {
    if (this.props.href === '/') {
      return this.state.path === this.props.href
    }
    return this.state.path.indexOf(this.props.href) === 0
  },

  componentWillMount() {
    Router.onMatch(url => {
      this.setState({path: url})
    })  
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
      Item = <a href="" onClick={this.toggle}>{Icon}{this.props.title}{Toggle}</a>
    } else {
      Item = <Link href={this.props.href}>{Icon}{this.props.title}{Toggle}</Link>
    }
    return (
      <li className={classNames({open: this.state.isOpen, active: this.isActive()})}>
        {Item}
        {this.props.children}
      </li>
    )
  }
})

export default Nav