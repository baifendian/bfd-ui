import React, { PropTypes } from 'react'
import classnames from 'classnames'
import './Col.less'

const Col = props => {
  const { children, className, col, ...other} = props
  return (
    <div className={classnames('bfd-col', col, className)} {...other}>
      {children}
    </div>
  )
}

Col.propTypes = {
  col: PropTypes.string   
}

export default Col