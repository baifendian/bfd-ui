/**
 * 语法高亮
 */

import React from 'react'
import beautify from 'code-beautify'

export default React.createClass({
  render() {
    const code = beautify(this.props.children, this.props.lang || 'js')
    return <pre style={{maxWidth:800}} dangerouslySetInnerHTML={{__html: code}}></pre>
  }
})