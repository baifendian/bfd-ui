import React, { PropTypes } from 'react'
import classnames from 'classnames'

const PanelHeader = props => {
  const { children, className, ...other } = props
  return (
    <div className={classnames('bfd-panel__header', className)} {...other}>
      {children}
    </div>
  )
}

export default PanelHeader