import React from 'react'
import classnames from 'classnames'

const DropdownMenu = props => {
  const { className, children, ...other } = props
  return (
    <div className={classnames('bfd-dropdown__menu', className)} {...other}>{children}</div>
  )
}

export default DropdownMenu