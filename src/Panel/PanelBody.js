import React from 'react'
import classnames from 'classnames'

const PanelBody = props => {
  const { children, className, ...other } = props
  return (
    <div className={classnames('bfd-panel__body', className)} {...other}>
      {children}
    </div>
  )
}

export default PanelBody