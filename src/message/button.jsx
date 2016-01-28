import 'bfd-bootstrap'
import './main.css'
import React from 'react'
import classNames from 'classnames'

export default React.createClass({

  render() {
    return (
      <button className="btn btn-primary" onClick={this.props.onClick}>
        {this.props.children}
      </button>
    )
  }

})