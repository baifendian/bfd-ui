import React from 'react'
import { Link } from 'react-router'
import Pre from 'public/Pre'

export default React.createClass({
  render() {
    return (
      <div className="home">
        <h1>百分点 UI 组件库</h1>
        <blockquote>
          <footer>不仅仅是一个组件库，更是一种开发模式。</footer>
        </blockquote>

        <Pre>
{`import DatePicker from 'bfd-ui/lib/DatePicker'

const DatePickerDemo = React.createClass({
  
  handleSelect(date) {
    console.log(date)
  },

  render() {
    return <DatePicker onSelect={this.handleSelect} />
  }
})`}
        </Pre>

        <h2>如何开始</h2>
        
        <p>如果你对 Node.js、npm、React、webpack 等不熟悉，直接按 <Link to="/workflow">工作流</Link> 方式开始使用，各种环境、配置都不用操心了。</p>

        <p>如果已经有相关环境，想单独用组件库的话：</p>
        
        <Pre lang="sh">{`$ npm install bfd-ui --save`}</Pre>

        <p>webpack 额外配置</p>
        <Pre>
{`var autoprefixer = require('autoprefixer')
var config = {
  module: {
    loaders: [{
      test: /\\.(eot|woff|woff2|ttf|svg|png|jpg)(\\?v=[\\d\\.]+)?$/,
      loader: 'file?name=files/[hash].[ext]'
    }, {
      test: /\\.less$/,
      loader: 'style!css!less!postcss'
    }]
  },
  postcss: [autoprefixer({ browsers: ['last 3 versions'] })]
}
module.exports = config`}
        </Pre>

        <h2>浏览器支持</h2>
        <p>Chrome、Firefox、Safari、IE9+</p>

        <h2>特性</h2>
        <ol>
          <li>组件化开发，简单、清晰。</li>
          <li>基于 bootstrap、React、D3 等库，业务开发也更简单。</li>
          <li>集成数据可视化图表库，方便快速的制作各类报表系统。</li>
          <li>可根据业务需求补充各类组件，形成良性循环。</li>
          <li>按需使用，并非大而全的库。</li>
        </ol>
      </div>
    )
  }
})