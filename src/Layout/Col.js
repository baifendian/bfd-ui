import './Col.less'
import React, { PropTypes } from 'react'
import classnames from 'classnames'

const Col = props => {
  const { children, className, col, left, right, ...other} = props
  const classNames = classnames(
    'bfd-col',
    col && col.split(' ').map(v => 'bfd-col--' + v),
    {
      'bfd-col--right': right
    },
    className
  )
  return <div className={classNames} {...other}>{children}</div>
}

Col.propTypes = {
  col: PropTypes.string,
  right: PropTypes.bool
}

export default Col