import 'font-awesome/css/font-awesome.css'
import React, { PropTypes } from 'react'
import classnames from 'classnames'

const Icon = props => {
  const { className, type, ...other } = props
  return (
    <i className={classnames('bfd-icon fa', 'fa-' + type, className)} {...other}></i>
  )
}

Icon.propTypes = {
  // 图标类型，http://fontawesome.io/icons/
  type: PropTypes.string.isRequired
}

export default Icon