import 'bfd-bootstrap'
import React, {PropTypes} from 'react'

export default React.createClass({
  
  render() {
    return (
      <ul className="nav nav-pills nav-stacked">{this.props.children}</ul>
    )
  }
})