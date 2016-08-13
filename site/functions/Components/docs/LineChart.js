import React from 'react'
import Pre from 'public/Pre'
import { Props, Prop } from 'public/Props'
import LineChart from 'bfd/LineChart'
import Warn from 'public/Warn'

const code = `import LineChart from 'bfd-ui/lib/LineChart'

export default React.createClass({
  render() {
    return（
      <LineChart 
        category="date" 
        cols={{x: '用户', y: '销量'}} 
        url="/data/lineChart.json"
      />
    ） 
  }
})`

export default React.createClass({
  render() {
    return (
      <div>
        <h1>线图 @hai.jiang</h1>
        <Warn>暂停维护，建议使用 Echarts webpack 方式</Warn>
        <Pre>{code}</Pre>
        
        <LineChart 
          category="date" 
          cols={{x: '用户', y: '销量'}} 
          url="/data/lineChart.json" 
        />
        
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
          <Prop name="colors" type="array">
            <p>线的颜色值，数组的形式按顺序配置</p>
          </Prop>
          <Prop name="yAxis" type="Object">
            <p>y轴相关配置</p>
            <Pre>
{`{
  /** 
   * Y字段值格式，默认千分符 's', 
   * 其他格式配置参考 https://github.com/d3/d3-format/blob/master/README.md#format 
   */ 
  format: '%', 
}`}
            </Pre>
          </Prop>
          <Prop name="url" type="String">
            <p>数据源URL，依赖 xhr 组件，返回格式：</p>
            <Pre>
{`
// 字段分别对应 cols 和 category 的配置
[{
  user: 100,
  sales: 3432,
  date: "2016-01-01"
}]
`}
            </Pre>
          </Prop>
          <Prop name="data" type="Array">
            <p>数据源，格式参考 url 属性</p>
            <Warn>url 和 data 属性至少提供一个</Warn>
          </Prop>
        </Props>
      </div>
    )
  }
})