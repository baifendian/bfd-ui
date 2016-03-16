import React from 'react'
import Pre from '../Pre'
import { Props, Prop } from '../Props'
import LineChart from 'c/LineChart'

const code = `import LineChart from 'bfd-ui/lib/LineChart'

const App = React.createClass({
  render() {
    return <LineChart category="date" cols={{x:'用户',y:'销量'}} url="/data/lineChart.json"/>
  }
})`

export default React.createClass({
  render() {
    return (
      <div>
        <h1>折线图</h1>
        <Pre>{code}</Pre>

        <LineChart category="date" cols={{x:'用户',y:'销量'}} url="/data/lineChart.json"/>
        
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
          <Prop name="url" type="String" required>
            <p>数据源URL，返回格式要求：</p>
            <Pre>
{`{
  "code": 200,
  "data": [{
    user: 100,
    sales: 3432,
    date: '2016-01-01'
  }]
}`}
            </Pre>
          </Prop>
        </Props>
      </div>
    )
  }
})