import React from 'react'
import Pre from '../Pre'
import { Props, Prop } from '../Props'
import StackedColumnChart from 'c/StackedColumnChart'

const code = `import StackedColumnChart from 'bfd-ui/lib/StackedColumnChart'

const App = React.createClass({
  render() {
    return <StackedColumnChart style={{height: 400}} category="name" cols={{x: '日环比新增', y: '系列环比新增'}} url="/data/columnChart.json"/>
  }
})`

const cols = {
  x: '日环比新增',
  y: '系列新增',
  z: '进店新增',
  a: '消费新增'
}

export default React.createClass({
  render() {
    return (
      <div>
        <h1>柱型图</h1>
        <Pre>{code}</Pre>
        
        <StackedColumnChart style={{height: 400}} category="name" cols={cols} url="/data/columnChart.json"  />
        
        <Props>
          <Prop name="cols" type="Object" required>
            <p>y轴字段配置，比如：</p>
            <Pre>
{`{
  x: '日环比新增', 
  y: '系列环比新增',
  z: '进店环比新增'
}`}
            </Pre>
          </Prop>
          <Prop name="category" type="String" required>
            <p>x轴字段名，比如 'date'</p>
          </Prop>
          <Prop name="yAxis" type="Object">
            <p>y轴相关配置</p>
            <Pre>
{`{
  format: '%', // Y字段值格式，默认千分符 's' 
}`}
            </Pre>
          </Prop>
          <Prop name="url" type="String">
            <p>数据源URL，data 格式要求数组，字段分别对应 cols 和 category</p>
            <Pre>
{`{
  "code": 200,
  "message": "当code不是200时，message信息会展示到页面",
  "data": [{
    x: 100,
    y: 3432,
    z: 660,
    name: "2016-01-01"
  }]
}`}
            </Pre>
          </Prop>
          <Prop name="data" type="Array">
            <p>数据源，格式与 url 方式返回的 data 格式一样</p>
            <Pre>
{`[{
  x: 100,
  y: 3432,
  z: 161,
  name: "2016-01-01"
}]`}
            </Pre>
            <div className="alert alert-warning">url 和 data 属性至少提供一个</div>
          </Prop>
        </Props>
      </div>
    )
  }
})