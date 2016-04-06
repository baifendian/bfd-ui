import React from 'react'
import BubbleChart from 'c/BubbleChart'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

export default React.createClass({
  render() {
    return (
      <div>
        <h1>气泡图</h1>
        <Pre>
{`import BubbleChart from 'bfd-ui/lib/bubbleChart'

const App = React.createClass({
  render() {
    return <BubbleChart radiusMaker="x" name="name" value={{key:'x'}} url="/data/bubbleChart.json" />]
  }
})`}
        </Pre>

        <BubbleChart radiusMaker="x" name="name" value={{key:'x'}} url="/data/bubbleChart.json" />
        
        <Props>
          <Prop name="radiusMaker" type="String" required>
            <p>决定气泡大小的数据字段名</p>
          </Prop>
          <Prop name="name" type="String" required>
            <p>名称字段名，文字第一行</p>
          </Prop>
          <Prop name="value" type="Object" required>
            <p>值配置，文字第二行</p>
            <Pre>
{`{
  key: 'x', // 必填，值字段名
  format: '.2%' // 可选，格式化配置
}`}
            </Pre>
          </Prop>
          <Prop name="url" type="String" required>
            <p>数据源 URL，返回格式要求：</p>
            <Pre>
{`{
  "code": 200,
  "data": [{
    "x": 234,
    "name": "苹果"
  }, {
    "x": 499,
    "name": "华为"
  }]
}`}
            </Pre>
          </Prop>
        </Props>
      </div>
    )
  }
})