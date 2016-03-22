/**
 * 下拉框内容
 */

import React, { PropTypes } from 'react'

export default React.createClass({
  
  contextTypes: {
    isOpen: PropTypes.func
  },

  render() {
    return this.context.isOpen() ? <div className="dropdown-menu">{this.props.children}</div> : null
  }
})