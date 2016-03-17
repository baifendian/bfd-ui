import React from 'react'
import Pre from './Pre'

export default React.createClass({

  render() {
    return (
      <div className="guide">
        <p>主要介绍一个项目从零到上线的工作流，也是 bfd-ui 的最佳使用环境。</p>
        <h1>1、项目构建</h1>

        <p>项目生成器有助于快速产生一个项目的脚手架，同时避免的不同项目间结构的混乱。</p>
        
        <p>构建器基于 <a href="http://yeoman.io/" target="_blank">yeoman</a> 平台，如果本地没有全局安装，请先安装</p>
        
        <Pre lang="sh">{
`# 安装yeoman构建平台
$ npm install -g yo

# 安装百分点项目构建器
$ npm install -g generator-bfd`}</Pre>
        
        <p>接下来就可以生成一个新项目了，请自定义项目名，如 myapp</p>
        
        <Pre>{
`$ cd workspace

$ yo bfd myapp`}</Pre>

        <p>如果不定义项目名，则在当前文件夹下生成</p>
        
        <Pre>{
`$ cd myapp

$ yo bfd`}</Pre>

        <p>注意：生成后会自动安装 npm 依赖</p>

        <p>文件结构介绍：</p>

        <pre>{
`myapp
  |-- components/        各个页面组件
  |-- data/              模拟数据，接口 URL 定义为 /data/xxx.json  
  |-- less/              css 文件，这里统一用 less 预处理
  |-- app.jsx            入口文件，包含 App 组件及前端路由的定义
  |-- index.tpl          HTML 入口，采用模版形式的原因是可以动态生成不同后端语言下的模版
  |-- server.js          开发阶段服务环境，并处理 webpack 编译服务</Pre>
  |-- webpack.config.js  编译、打包配置`}</pre>

        <h1>2、开发</h1>

        <Pre lang="sh">{
`$ cd myapp

$ npm start`}</Pre>

        <p>到此为止，前端环境配置完成，戳 <a href="http://localhost:9000" target="_blabk">http://localhost:9000</a></p>

        <p>如果有多个项目或者 9000 端口已经被使用，可指定端口，如 4001</p>

        <Pre lang="sh">{
`$ npm start -p 4001`}</Pre>

        <p><b>开发阶段注意事项：</b></p>

        <p>1、不直接修改 index.html，请在 index.tpl 中修改，以便生成不同服务器环境下的模板文件</p>

        <p>2、数据接口请允许跨域（CORS），接口的命名规则见下方服务器配置，防止和单页面冲突。</p>

        <h1>3、部署测试/上线</h1>

        <h3>3.1、生成线上代码</h3>

        <Pre lang="sh">{
`$ cd myapp

$ npm run build`}</Pre>

        <p>完成后，myapp 下的文件发送给后台，如 Java web 项目下的 webapp 目录，使用 git、svn 方式更佳。</p>
        
        <h3>3.2、修改服务器配置（Java）</h3>
        
        <h5>3.2.1、配置数据接口匹配规则，防止和下面的单页面功能冲突。修改 web.xml，增加 servlet 节点</h5>
        
        <Pre lang="markup">{
`<servlet> 
  <servlet-name>dispatcher</servlet-name> 
  <servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class> 
  <init-param> 
    <param-name>contextConfigLocation</param-name> 
    <param-value>classpath*:/springmvc-context.xml</param-value> 
  </init-param> 
  <load-on-startup>1</load-on-startup> 
</servlet> 
<servlet-mapping> 
  <servlet-name>dispatcher</servlet-name> 
  <url-pattern>正则，用于拦截数据接口请求，eg：*.do</url-pattern> 
</servlet-mapping>`}</Pre>
        <h5>3.2.2、配置单页面功能，除数据接口外，所有 URL 均渲染 index.jsp。修改 web.xml，增加 servlet 节点并新增 DispatcherServlet</h5>
        <Pre lang="markup">{
`<servlet> 
  <servlet-name>webDispatcher</servlet-name> 
  <servlet-class>com.bfd.servlet.DispatcherServlet</servlet-class> 
  <load-on-startup>1</load-on-startup> 
</servlet> 
<servlet-mapping> 
  <servlet-name>webDispatcher</servlet-name> 
  <url-pattern>/</url-pattern> 
</servlet-mapping>`}</Pre>
        <Pre lang="java">{
`public class DispatcherServlet extends HttpServlet { 

  @Override 
  protected void doGet(HttpServletRequest req, HttpServletResponse resp) 
    throws ServletException, IOException { 
    doPost(req, resp); 
  } 

  @Override 
  protected void doPost(HttpServletRequest req, HttpServletResponse resp) 
    throws ServletException, IOException { 
    //TODO 设置项目和前端交互的固定信息，动态数据通过ajax请求获取。 
    req.getRequestDispatcher("/index.jsp").forward(req, resp); 
  } 
}`}</Pre>
      </div>
    )
  }
})