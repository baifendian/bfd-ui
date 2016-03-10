import React from 'react'
import Pre from '../Pre.jsx'
import { Props, Prop } from '../Props.jsx'
import DatePicker from 'c/DatePicker/index.jsx'

export default React.createClass({
  render() {
    return (
      <div>
        <h1>日期选择</h1>
        <Pre>
{`import LineChart from 'bfd-ui/lib/LineChart'

const App = React.createClass({
  render() {
    return <LineChart category="date" cols={{x:'用户',y:'销量'}} url="/data/lineChart.json"/>
  }
})`}
        </Pre>

        <DatePicker date="2016-01-01"/>
        
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