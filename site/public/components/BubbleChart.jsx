import React from 'react'
import { render } from 'react-dom'
import Pre from '../Pre.jsx'
import { Props, Prop } from '../Props.jsx'
import BubbleChart from 'c/bubbleChart/index.jsx'
    
// export default () => {
//   render(<BubbleChart radiusMaker="x" name="name" value={{key:'x'}} url="/data/bubbleChart.json" />, document.getElementById('demo'))
// }

export default React.createClass({
  render() {
    return (
      <div>
      	<h1>气泡图</h1>
        <Pre>
{`import BubbleChart from 'bfd-ui/lib/bubbleChart'

const App = React.createClass({
  render() {
    return <BubbleChart radiusMaker="x" name="name" value={{key:'x'}} url="/data/bubbleChart.json" />
})`}
        </Pre>

        <BubbleChart radiusMaker="x" name="name" value={{key:'x'}} url="/data/bubbleChart.json" />
        
        <Props>
          <Prop name="url" type="String" desc="数据源，返回格式参考：">
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
          <Prop name="radiusMaker" type="String" desc="决定气泡大小的数据字段名"></Prop>
          <Prop name="name" type="String" desc="名称字段名，文字第一行"></Prop>
          <Prop name="value" type="Object" desc="值配置，文字第二行">
            <Pre>
{`{
  key: 'x', // 必填，值字段名
  format: '.2%' // 可选，格式化配置
}`}
            </Pre>
          </Prop>
        </Props>
      </div>
    )
  }
})