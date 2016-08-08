import './index.less'
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

class Input extends Component {
  render() {
    const { className, size, ...other } = this.props
    const classNames = classnames(
      'bfd-input', 
      {
        [`bfd-input--${size}`]: size,
      },
      className
    )
    return <input className={classNames} { ...other } />
  }
}

Input.propTypes = {
  size: PropTypes.string
}

export default Input