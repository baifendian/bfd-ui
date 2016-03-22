/**
 * 下拉触发组件
 */

import React, { PropTypes } from 'react'

export default React.createClass({

  contextTypes: {
    handleToggle: PropTypes.func
  },

  render() {
    return <div onClick={this.context.handleToggle}>{this.props.children}</div>
  }
})