import './index.less'
import React, { PropTypes } from 'react'
import classnames from 'classnames'

const Markdown = props => {
  const { className, html } = props
  return (
    <div 
      className={classnames('markdown', className)}
      dangerouslySetInnerHTML={{__html: html}}
    />
  )
}

Markdown.propTypes = {
  html: PropTypes.string
}

export default Markdown