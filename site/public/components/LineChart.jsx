import React from 'react'
import Pre from '../Pre.jsx'
import { Props, Prop } from '../Props.jsx'
import LineChart from 'c/LineChart/index.jsx'

export default React.createClass({
  render() {
    return (
      <div>
        <h1>折线图</h1>
        <Pre>
{`import LineChart from 'bfd-ui/lib/LineChart'

const App = React.createClass({
  render() {
    return <LineChart category="date" cols={{x:'用户',y:'销量'}} url="/data/lineChart.json"/>
  }
})`}
        </Pre>

        <LineChart category="date" cols={{x:'用户',y:'销量'}} url="/data/lineChart.json"/>
        
        <Props>
          <Prop name="cols" type="Object" desc="y轴字段配置（x轴字段单独指定），数据字段：中文名">
            <Pre>
{`{
  users: '用户数',
  sales: '销量'
}`}
            </Pre>
          </Prop>
          <Prop name="category" type="String" desc="x轴字段名"></Prop>
          <Prop name="yAxis" type="Object" desc="y轴相关配置">
            <Pre>
{`{ 
  format: '%' // 格式化方式
}`}
            </Pre>
          </Prop>
        </Props>
      </div>
    )
  }
})