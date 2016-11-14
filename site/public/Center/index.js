import './index.less'
import React from 'react'

const Center = props => {
  const { children, ...other } = props
  return <div className="center" {...other}>{children}</div>
}

export default Center
