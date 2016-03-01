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

        <p>开发阶段前后端分离，AJAX 请求可能涉及到跨域问题，后台接口请做修改来允许跨域请求</p>

        <Pre lang="shell">{
`$ cd myapp

$ npm start`}</Pre>

        <p>终于可以运行了，戳 <a href="http://localhost:9000" target="_blabk">http://localhost:9000</a></p>

        <h1>3、部署测试/上线</h1>

        <h3>3.1、生成线上代码</h3>

        <Pre lang="shell">{
`$ cd myapp

# OS X 系统
$ npm run build-mac
# windows 系统
$ npm run build-win`}</Pre>
        
        <h3>3.2、修改服务器配置</h3>
        <p>如果是 Java web 项目</p>
        <ol>
          <li>修改 index.html 为 index.jsp（以 jsp 为例，其他模版相同）</li>
          <li>修改
            <Pre lang="shell">{
`$ cd myapp

# OS X 系统
$ npm run build-mac
# windows 系统
$ npm run build-win`}</Pre>
          </li>
        </ol>
        <p>如果是 Django 项目</p>
      </div>
    )
  }
})