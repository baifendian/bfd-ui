import React from 'react'
import { Link } from 'react-router'
import Center from 'public/Center'

export default () => {
  return (
    <div>
      <h1>generator-bfd</h1>
      <p>基于 yeoman 平台的项目前端生成器</p>
      <div style={{maxWidth: '600px'}}>
        <img 
          src={require('generator/screenshot.jpeg')} 
          style={{maxWidth: '100%'}} 
          alt="generator-bfd" 
        />
      </div>
      <p>
        <Link to="/scaffolding/workflow">工作流</Link>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/scaffolding/docs">文档</Link>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Link to="/scaffolding/changelog">更新日志</Link>
      </p>
    </div>
  )
}