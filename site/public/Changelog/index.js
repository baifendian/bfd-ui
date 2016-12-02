import React from 'react'
import Markdown from 'public/Markdown'
import './index.less'

export default props => {
  return <Markdown className="changelog" html={props.html} />
}
