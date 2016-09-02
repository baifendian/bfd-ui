import React, { PropTypes } from 'react'
import classnames from 'classnames'
import './index.less'

const Markdown = props => {
  const { className, html, ...other } = props
  return (
    <div 
      className={classnames('markdown', className)}
      dangerouslySetInnerHTML={{__html: html}}
      {...other}
    />
  )
}

Markdown.propTypes = {
  html: PropTypes.string
}

export default Markdown