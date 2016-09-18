import React from 'react'
import classnames from 'classnames'

const Panel = props => {
  const { children, className, ...other } = props
  return (
    <div className={classnames('bfd-panel', className)} {...other}>
      {children}
    </div>
  )
}

export default Panel