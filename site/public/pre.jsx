import React from 'react'
import beautify from 'code-beautify'

export default React.createClass({
  render() {
    const code = beautify(this.props.children, this.props.lang)
    return <pre dangerouslySetInnerHTML={{__html: code}}></pre>
  }
})