import 'bfd-bootstrap'
import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import classnames from 'classnames'
import Icon from '../Icon'
import './index.less'

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
    const { className, children, ...other } = this.props
    return (
      <ul className={classnames('nav nav-pills nav-stacked bfd-nav', className)} {...other}>{children}</ul>
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
    let NavIcon
    let Item

    const { children, icon, title, ...other } = this.props

    let href = this.props.href || ''

    href = href.replace(/^\/|\/$/g, '')
    const paths = []
    baseURL && paths.push(baseURL)
    href && paths.push(href)
    href = '/' + paths.join('/')

    if (children) {
      Toggle = <Icon type="angle-right" />
    }
    if (icon) {
      NavIcon = <Icon type={icon} />
    }
    if (children) {
      Item = <a href={href} onClick={this.toggle}>{NavIcon}{title}{Toggle}</a>
    } else {
      Item = <Link to={href} query={this.props.query}>{NavIcon}{title}{Toggle}</Link>
    }

    const indexOnly = href === '/' + baseURL
    return (
      <li onClick={this.handleClick} className={classnames({open: this.state.isOpen, active: this.isActive(href, indexOnly)})} {...other}>
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