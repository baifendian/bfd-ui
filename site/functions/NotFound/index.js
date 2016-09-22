import React from 'react'
import Button from 'bfd/Button'
import './index.less'

const NotFound = (props) => {
  return (
    <div className="not-found">
      <h1>404</h1>
      <p>您访问的页面不存在，也可能被移除了</p>
      <Button onClick={() => props.history.goBack()}>返回</Button>
    </div>
  )
}

export default NotFound