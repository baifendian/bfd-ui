import React from 'react'
import './version.less'

/**
 * 版本日志组件
 */
function Version(props) {
  return (
    <div className="version">
      <h1>v{props.version}<time>{props.date}</time></h1>
      <div>{props.children}</div>
    </div>
  )
}

export default Version