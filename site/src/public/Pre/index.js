import './index.less'
import React, { PropTypes } from 'react'
import classnames from 'classnames'
import beautify from 'code-beautify'

const Pre = props => {
  const code = beautify(props.children, props.lang || 'js')
  return (
    <pre 
      className={classnames('pre', {'pre--transparent': props.transparent})}
      dangerouslySetInnerHTML={{__html: code}}
    />
  )
}

Pre.propTypes = {
  lang: PropTypes.string,
  transparent: PropTypes.bool
}

export default Pre