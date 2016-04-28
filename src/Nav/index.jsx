import 'bfd-bootstrap'
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import classNames from 'classnames'

let baseURL

const Nav = React.createClass({

  getChildContext() {
    return {
      nav: this
    }
  },

  componentWillMount() {
    if (!this.context.nav) {
      const href = this.props.href
      baseURL = href ? href.replace(/^\/|\/$/g, '') : ''
    }
  },

  handleItemClick(props, e) {
    if (!this.context.nav) {
      this.props.onItemClick && this.props.onItemClick(props, e)
    } else {
      this.context.nav.handleItemClick(props, e)
    }
  },
  
  render() {
    return (
      <ul {...this.props} className="nav nav-pills nav-stacked">{this.props.children}</ul>
    )
  }
})

Nav.childContextTypes = {
  nav: PropTypes.instanceOf(Nav)
}

Nav.contextTypes = {
  nav: PropTypes.object
}

Nav.propTypes = {
  href: PropTypes.string,
  onItemClick: PropTypes.func
}


const NavItem = React.createClass({

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

  isActive(href, indexOnly) {
    return this.context.history.isActive(href, this.props.query, indexOnly)
  },

  handleClick(e) {
    this.props.onClick && this.props.onClick(e)
    this.context.nav.handleItemClick(this.props, e)
  },
  
  render() {

    let Toggle
    let Icon
    let Item

    const { children, icon, title, ...other } = this.props

    let href = this.props.href || ''

    href = href.replace(/^\/|\/$/g, '')
    const paths = []
    baseURL && paths.push(baseURL)
    href && paths.push(href)
    href = '/' + paths.join('/')

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

    const indexOnly = href === '/' + baseURL
    return (
      <li {...other} onClick={this.handleClick} className={classNames({open: this.state.isOpen, active: this.isActive(href, indexOnly)})}>
        {Item}
        {this.props.children ? <Nav>{this.props.children}</Nav> : null}
      </li>
    )
  }
})

NavItem.contextTypes = {
  history: PropTypes.object.isRequired,
  nav: PropTypes.object
}

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.string,
  title: PropTypes.string
}

export { Nav, NavItem }