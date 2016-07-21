import React, { PropTypes } from 'react'
import 'bfd-bootstrap'
import classnames from 'classnames'
import './index.less'

const Button = props => {
  const { className, type, size, children, ...other } = props
  return (
    <button 
      className={classnames('bfd-btn btn', 'btn-' + type, {['btn-' + size]: size}, className)}
      { ...other }
    >{children}</button>
  ) 
}

Button.defaultProps = {
  type: 'default'
}

Button.propTypes = {
  type: PropTypes.string,
  size: PropTypes.string
}

export default Button