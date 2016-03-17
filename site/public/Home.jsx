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
        <h2>优势</h2>
        <ol>
          <li>基于 React 组件化的思想开发，简单、清晰。</li>
          <li>依赖 bfd-bootstrap、React、D3 等基础库，业务逻辑开发也变的简单。</li>
          <li>集成数据可视化图表库，方便快速的制作各类报表系统。</li>
          <li>可根据业务需求补充各类组件，形成良性循环。</li>
          <li>按需使用，并非大而全的库。</li>
          <li>自主开发，可控度高，弹性满足各类产品需求，形成公司的 UI 风格。</li>
        </ol>

        <h2>安装</h2>
        <Pre lang="sh">{`$ npm install --save bfd-ui`}</Pre>

        <h2>使用</h2>
        <Pre>
{`import DatePicker from 'bfd-ui/lib/DatePicker'

ReactDOM.render(<DatePicker date="2016-01-01"/>, mountNode)`}
        </Pre>
      </div>
    )
  }
})