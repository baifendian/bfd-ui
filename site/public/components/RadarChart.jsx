import React from 'react'
import { render } from 'react-dom'
import Pre from '../Pre'
import { Props, Prop } from '../Props'
import RadarChart from 'c/RadarChart'

const code = `import RadarChart from 'bfd-ui/lib/RadarChart'

const App = React.createClass({
  render() {
    return <RadarChart  url="/data/radarChart.json"/>
  }
})`

export default React.createClass({
  render() {
    return (
      <div>
        <h1>雷达图</h1>
        <Pre>{code}</Pre>

        <RadarChart url="/data/radarChart.json"/>
        
        <Props>
          <Prop name="values" type="Object">
            <p>y轴相关配置</p>
            <Pre>
{`{
  format: '%', // Y字段值格式，默认千分符 's' 
}`}
            </Pre>
          </Prop>
          <Prop name="url" type="String" required>
            <p>数据源URL，返回格式要求：</p>
            <Pre>
{`{
  "code": 200,
  "title":"标题",
  "data": [[
    {axis: "华为", value:200},
    {axis: "苹果", value:200}.
    {axis: "小米", value:200}
    ],[
    {axis: "中兴", value:200},
    {axis: "oppo", value:200}.
    {axis: "锤子", value:50}
    ]
    ]
}`}
            </Pre>
          </Prop>
        </Props>
      </div>
    )
  }
})

