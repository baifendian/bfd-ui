import React from 'react'
import { Link } from 'react-router'
import Pre from './Pre'

export default React.createClass({
  render() {
    return (
      <div className="home">
        <h1>百分点 UI 组件库</h1>
        <blockquote>
          <footer>不仅仅是一个组件库，更是一种开发模式。</footer>
        </blockquote>

        <h2>安装</h2>
        <p>请先安装 NodeJS 平台 <a href="https://nodejs.org/en/">https://nodejs.org/en/</a></p>
        <p>NodeJS 安装后会自动安装 npm 包管理工具，接下来就可以安装组件库</p>
        <Pre lang="sh">{`$ npm install bfd-ui --save`}</Pre>

        <p>安装 webpack 编译打包环境</p>
        <Pre lang="sh">{`$ npm install webpack -g --save-dev`}</Pre>

        <p>webpack 环境配置</p>
        <Pre>
{`var autoprefixer = require('autoprefixer')
var config = {
  module: {
    loaders: [{
      test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
      loader: 'file?name=files/[hash].[ext]'
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.less$/,
      loader: 'style!css!less!postcss'
    }]
  },
  postcss: [autoprefixer({ browsers: ['last 3 versions'] })]
}
module.exports = config`}
        </Pre>

        <h2>使用</h2>
        <Pre>
{`import DatePicker from 'bfd-ui/lib/DatePicker'

ReactDOM.render(<DatePicker />, mountNode)`}
        </Pre>

        <h2>浏览器支持</h2>
        <p>Chrome、Firefox、Safari、IE9+</p>

        <h2>特性</h2>
        <ol>
          <li>基于 React 组件化的思想开发，简单、清晰。</li>
          <li>依赖 bfd-bootstrap、React、D3 等基础库，业务逻辑开发也变的简单。</li>
          <li>集成数据可视化图表库，方便快速的制作各类报表系统。</li>
          <li>可根据业务需求补充各类组件，形成良性循环。</li>
          <li>按需使用，并非大而全的库。</li>
          <li>自主开发，可控度高，弹性满足各类产品需求，形成公司的 UI 风格。</li>
        </ol>
      </div>
    )
  }
})