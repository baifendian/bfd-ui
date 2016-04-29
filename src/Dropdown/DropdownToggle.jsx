/**
 * 下拉触发组件
 */
import React, { PropTypes } from 'react'

const contextTypes = {
  handleToggle: PropTypes.func
}

function DropdownToggle(props, context) {
  return <div className="dropdown-toggle" onClick={context.handleToggle}>{props.children}</div>
}

DropdownToggle.contextTypes = contextTypes

export default DropdownToggle