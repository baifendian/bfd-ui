import React from 'react'
import ScatterPlot from 'c/ScatterPlot'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

export default React.createClass({
  render() {
    return (
      <div>
        <h1>散点图 @hai.jiang</h1>
        <p>与线图、柱状图不同的是，散点图可以多出一个维度，即散点的大小</p>
        <Pre>
{`import ScatterPlot from 'bfd-ui/lib/ScatterPlot'

const App = React.createClass({
  render() {
    return <ScatterPlot category="height" cols={{male:'男',female:'女'}} url="/data/scatterPlot.json" />
})`}
        </Pre>

        <ScatterPlot category="height" cols={{male: '男', female: '女'}} url="/data/scatterPlot.json" />
        
        <Props>
          <Prop name="cols" type="Object" desc="y轴字段配置（x轴字段单独指定），数据字段：中文名">
            <Pre>
{`{
  users: '用户数',
  sales: '销量'
}`}
            </Pre>
          </Prop>
          <Prop name="category" type="String" desc="x轴字段名" />
          <Prop name="yAxis" type="Object" desc="y轴相关配置">
            <Pre>
{`{ 
  // 格式化方式
  format: '%'
}`}
            </Pre>
          </Prop>
          <Prop name="tooltip" type="Object" desc="悬浮提示框配置">
            <Pre>
{`{ 
  // 禁用提示框，默认启用
  enabled: false
}`}
            </Pre>
          </Prop>
        </Props>
      </div>
    )
  }
})