/**
 * 下拉触发组件
 */

import React, { PropTypes } from 'react'

export default React.createClass({

  contextTypes: {
    handleToggle: PropTypes.func
  },

  render() {
    return <div className="bfd-dropdown-toggle" onClick={this.context.handleToggle}>{this.props.children}</div>
  }
})