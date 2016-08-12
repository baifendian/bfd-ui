import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

class Nav extends Component {

  getChildContext() {
    return {
      nav: this
    }
  }

  handleItemClick(props, e) {
    if (!this.context.nav) {
      this.props.onItemClick && this.props.onItemClick(props, e)
    } else {
      this.context.nav.handleItemClick(props, e)
    }
  }
  
  render() {
    const { className, children, href, ...other } = this.props
    return (
      <ul className={classnames('bfd-nav', className)} {...other}>
        {children}
      </ul>
    )
  }
}

Nav.childContextTypes = {
  nav: PropTypes.instanceOf(Nav)
}

// Nested <Nav>
Nav.contextTypes = {
  nav: PropTypes.object
}

Nav.defaultProps = {
  href: ''
}

Nav.propTypes = {
  href: PropTypes.string,
  onItemClick: PropTypes.func
}

export default Nav