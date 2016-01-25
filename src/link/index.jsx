import React, {PropTypes} from 'react'
import Router from '../router'

export default React.createClass({

  propTypes: {
    // isOpen: PropTypes.bool.isRequired,
    // onClose: PropTypes.func.isRequired
  },
  
  handleClick(e) {
    e.preventDefault()
    Router.go(this.props.href)
  },

  render() {
    return (
      <a href={this.props.href} onClick={this.handleClick}>{this.props.children}</a>
    )
  }
})