import React from 'react'
import { render } from 'react-dom'
import Pre from '../Pre.jsx'
import { Props, Prop } from '../Props.jsx'
import PieChart from 'c/PieChart/index.jsx'


// export default () => {
//   render(
//     <PieChart name="访问来源" radius={{inner:0.75}} animation={{pie:2500,lineText:500}} tooltip={{enabled:true}} url="/data/pieChart.json" />, 
//         document.getElementById('demo')
//     )
// }


export default React.createClass({
  render() {
    return (
      <div>
      	<h1>饼图</h1>
        <Pre>
{`import PieChart from 'bfd-ui/lib/PieChart'

const App = React.createClass({
  render() {
    return <PieChart name="访问来源" radius={{inner:0.75}} animation={{pie:2500,lineText:500}} tooltip={{enabled:true}} url="/data/pieChart.json" />
  }
})`}
        </Pre>

        <PieChart name="访问来源" radius={{inner:0.75}} animation={{pie:2500,lineText:500}} tooltip={{enabled:true}} url="/data/pieChart.json" />
        <Props>
          <Prop name="data" type="Object" desc="二维数据格式">
            <Pre>
{`{
  code: 200,           
  data:[        
    {value:335, name:'直接访问'},
    {value:310, name:'邮件营销'},
    {value:234, name:'联盟广告'},
    {value:135, name:'视频广告'},
    {value:848, name:'搜索引擎'},
    {value:348, name:'百分点'}
  ]
}`}
            </Pre>
          </Prop>
          <Prop name="name" type="String" desc="tooltip标题"></Prop>
          <Prop name="radius" type="Object" desc="饼图的内圆半径比例">
            <Pre>
{`{
  inner:0.75
}`}
            </Pre>
          </Prop>
          <Prop name="animation" type="Object" desc="饼图的动画时间参数">
            <Pre>
{`{
  pie:2500,
  lineText:500
}`}
            </Pre>
          </Prop>
          <Prop name="tooltip" type="Object" desc="悬浮提示框配置">
            <Pre>
{`{
 //禁用提示框，默认启用
 enabled:true
}`}
            </Pre>
          </Prop>
        </Props>
      </div>
    )
  }
})