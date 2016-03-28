/**
 * 下拉框内容
 */
import React, { PropTypes } from 'react'
import 'bfd-bootstrap'

function DropdownMenu(props, context) {
  return <div className="dropdown-menu">{props.children}</div>
}

export default DropdownMenu