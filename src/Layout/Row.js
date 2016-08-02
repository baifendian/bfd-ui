import React, { PropTypes } from 'react'
import classnames from 'classnames'
import './Row.less'

const Row = props => {
  const { children, gutter, className, ...other} = props
  return (
    <div className={classnames('bfd-row', { gutter }, className)} {...other}>
      {children}
    </div>
  )
}

Row.propTypes = {
  gutter: PropTypes.bool   
}

export default Row