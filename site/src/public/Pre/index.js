import './index.less'
import React from 'react'
import beautify from 'code-beautify'

export default props => {
  const code = beautify(props.children, props.lang || 'js')
  return <pre className="pre" dangerouslySetInnerHTML={{__html: code}}></pre>
}