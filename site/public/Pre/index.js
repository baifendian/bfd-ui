import '../pre.less'
import React, { PropTypes } from 'react'
import classnames from 'classnames'
import beautify from 'code-beautify'

const Pre = props => {
  const { className, lang, transparent, children } = props
  const code = beautify(children, lang || 'js')
  return (
    <pre 
      className={classnames('pre', {'pre--transparent': transparent}, className)}
      dangerouslySetInnerHTML={{__html: code}}
    />
  )
}

Pre.propTypes = {
  lang: PropTypes.string,
  transparent: PropTypes.bool
}

export default Pre