import React from 'react'
import Pre from '../Pre'
import { Props, Prop } from '../Props'
import LineChart from 'c/LineChart'

const code = `import LineChart from 'bfd-ui/lib/LineChart'

const App = React.createClass({
  render() {
    return <LineChart style={{height:320}} category="date" cols={{x:'用户',y:'销量'}} url="/data/lineChart.json"/>
  }
})`

export default React.createClass({
  render() {
    return (
      <div>
        <h1>线图</h1>
        <Pre>{code}</Pre>
        
        <LineChart style={{height:320}} category="date" cols={{x:'用户',y:'销量'}} url="/data/lineChart.json" />
        
        <Props>
          <Prop name="cols" type="Object" required>
            <p>y轴字段配置，比如：</p>
            <Pre>
{`{
  user: '用户数', 
  sales: '销量'
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
            <p>数据源URL，返回格式要求：</p>
            <Pre>
{`{
  "code": 200,
  "message": "当code不是200时，message信息会展示到页面",
  "data": [{
    user: 100,
    sales: 3432,
    date: '2016-01-01'
  }]
}`}
            </Pre>
            <div className="alert alert-warning">url 和 data 属性至少提供一个</div>
          </Prop>
          <Prop name="data" type="Array">
            <p>数据源，格式要求：</p>
            <Pre>
{`[{
  user: 100,
  sales: 3432,
  date: '2016-01-01'
}]`}
            </Pre>
          </Prop>
        </Props>
      </div>
    )
  }
})