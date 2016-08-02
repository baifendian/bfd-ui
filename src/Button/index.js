import React, { PropTypes } from 'react'
import classnames from 'classnames'
import Icon from '../Icon';
import './index.less'

const Button = props => {
  const { className, type, size, icon, circle, transparent, children, ...other } = props
  const classNames = classnames(
    'bfd-btn', 
    {
      [`bfd-btn--${type}`]: type,
      [`bfd-btn--${size}`]: size,
      'bfd-btn--circle': circle,
      'bfd-btn--icon': icon && !children,
      'bfd-btn--transparent': transparent
    },
    className
  )
  return (
    <button className={classNames} { ...other }>
      {icon && <Icon type={icon} />}
      {children}
    </button>
  ) 
}

Button.propTypes = {
  type: PropTypes.string,
  size: PropTypes.string,
  icon: PropTypes.string,
  circle: PropTypes.bool,
  transparent: PropTypes.bool,
}

export default Button