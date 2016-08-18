import './index.less'
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

class Input extends Component {

  // @public
  focus() {
    this.refs.input.focus()
  }

  // @public
  select() {
    this.refs.input.select()
  }

  render() {
    const { className, size, ...other } = this.props
    const classNames = classnames(
      'bfd-input', 
      {
        [`bfd-input--${size}`]: size,
      },
      className
    )
    return <input ref="input" className={classNames} { ...other } />
  }
}

Input.propTypes = {
  // 尺寸，除默认外可选值 sm、lg
  size: PropTypes.string
}

export default Input