import './index.less'
import React, { PropTypes } from 'react'
import classnames from 'classnames'

const Input = props => {
  const { className, size, ...other } = props
  const classNames = classnames(
    'bfd-input', 
    {
      [`bfd-input--${size}`]: size,
    },
    className
  )
  return <input className={classNames} { ...other } />
}

Input.propTypes = {
  size: PropTypes.string
}

export default Input