import 'font-awesome/css/font-awesome.css'
import React, { PropTypes } from 'react'
import classnames from 'classnames'
import './index.less'

const Icon = React.createClass({
  render() {
    const { className, type, ...other } = this.props
    return (
      <i className={classnames('bfd-icon fa', 'fa-' + type, className)} {...other}></i>
    )
  }
})

Icon.propTypes = {
  type: PropTypes.string.isRequired
}

export default Icon