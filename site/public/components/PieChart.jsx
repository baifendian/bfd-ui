import React from 'react'
import { render } from 'react-dom'
import PieChart from 'c/PieChart/index.jsx'
import Pre from '../Pre.jsx'
import { Props, Prop } from '../Props.jsx'

export default React.createClass({
  render() {
    return (
      <div>
        <h1>饼图</h1>
			<Pre>
{`import PineChart from 'bfd-ui/lib/LineChart'

const App = React.createClass({
  render() {
    return  <PieChart name="访问来源" radius={{inner:0.75}} animation={{pie:2500,lineText:500}} tooltip={{enabled:true}} url="/data/pieChart.json" />
  }
})`}
			</Pre>

         <PieChart name="访问来源" radius={{inner:0.75}} animation={{pie:2500,lineText:500}} tooltip={{enabled:true}} url="/data/pieChart.json" />
        
        <Props>
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
>>>>>>> 5280957574961e4beaa08ebe0f3a3dcc1715f3db
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
