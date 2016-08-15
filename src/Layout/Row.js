import React, { PropTypes } from 'react'
import classnames from 'classnames'
import './Row.less'

const Row = props => {
  const { children, className, gutter, fluid, ...other} = props
  const classNames = classnames(
    'bfd-row', 
    {
      'bfd-row--gutter': gutter,
      'bfd-row--fluid': fluid
    },
    className
  )
  return (
    <div className={classNames} {...other}>
      {children}
    </div>
  )
}

Row.propTypes = {
  gutter: PropTypes.bool,   
  fluid: PropTypes.bool   
}

export default Row