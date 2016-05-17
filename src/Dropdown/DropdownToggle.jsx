/**
 * 下拉触发组件
 */
import React, { PropTypes } from 'react'

function DropdownToggle(props, { dropdown }) {
  return <div className="dropdown-toggle" onClick={dropdown.handleToggle}>{props.children}</div>
}

DropdownToggle.contextTypes = {
  dropdown: PropTypes.object
}

export default DropdownToggle