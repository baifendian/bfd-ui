import React, { PropTypes } from 'react'
import classnames from 'classnames'

const DropdownToggle = (props, context) => {
  const { className, children, ...other } = props
  const { dropdown } = context
  return (
    <div 
      className={classnames('bfd-dropdown__toggle', className)}
      onClick={() => dropdown.handleToggle()}
      {...other}
    >
      {children}
    </div>
  )
}

DropdownToggle.contextTypes = {
  dropdown: PropTypes.object
}

export default DropdownToggle