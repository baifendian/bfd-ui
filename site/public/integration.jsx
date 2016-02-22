import React from 'react'
import Pre from './pre.jsx'

export default React.createClass({

  render() {
    return (
      <div className="guide">
        <h1>1、生成项目基础结构</h1>

        <p>项目生成器有助于快速产生一个项目的脚手架，同时避免的不同项目间结构的混乱。</p>
        
        <p>构建器基于 <a href="http://yeoman.io/" target="_blabk">yeoman</a> 平台，如果本地没有全局安装，请先安装</p>
        
        <Pre lang="shell">{
`# 安装yoeman构建平台
$ npm install -g yo

# 安装百分点项目构建器
$ npm install -g generator-bfd`}</Pre>
        
        <p>接下来就可以生成一个新项目了，请自定义项目名，如 myapp</p>
        
        <Pre>{
`$ cd workspace

$ yo bfd myapp`}</Pre>

        <p>注意：生成后会自动安装 npm 依赖</p>

        <h1>2、开发</h1>

        <Pre lang="shell">{
`$ cd myapp

$ npm start`}</Pre>

        <p>终于可以运行了，戳 <a href="http://localhost:9000" target="_blabk">http://localhost:9000</a></p>

        <h1>3、部署测试/上线</h1>

        <Pre lang="shell">{
`$ cd myapp

# OS X 系统
$ npm run build-mac
# windows 系统
$ npm run build-win`}</Pre>

      </div>
    )
  }
})