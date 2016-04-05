/**
 * 下拉框内容
 */
import React from 'react'
import 'bfd-bootstrap'

function DropdownMenu(props) {
  return <div className="dropdown-menu">{props.children}</div>
}

export default DropdownMenu