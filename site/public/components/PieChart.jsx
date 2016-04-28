import React from 'react'
import PieChart from 'c/PieChart'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

export default React.createClass({
  render() {
    return (
      <div>
        <h1>饼图</h1>
        <Pre>
{
`import PieChart from 'bfd-ui/lib/PieChart'

const App = React.createClass({
  render() {
    return     <PieChart name="访问来源" 
                  legend={{
                    layout: 'horizontal',
                    align: 'bottom',
                    style:{
                      x:100,
                      y:10
                    }
                  }} 
                  colors={['red','yellow','blue','#000','green']}
                  radius={{inner:0.75}} 
                  animation={{pie:2500,lineText:500}}
                  tooltip={{enabled:true}} 
                  url="/data/pieChart.json"/>
  }
})`}
        </Pre>

        <PieChart name="访问来源" 
                  legend={{
                    layout: 'vertical',
                    align: 'left',
                    style:{
                      x:0,
                      y:100
                    }
                  }} 
                  
                  radius={{inner:0.75}} 
                  animation={{pie:2500,lineText:500}}
                  tooltip={{enabled:true}} 
                  url="/data/pieChart.json"/>
        
        <Props>
          <Prop name="name" type="String" required>
            <p>tooltip标题</p> 
          </Prop>
          <Prop name="colors" type="Array">
            <p>饼图颜色</p> 
          </Prop>
          <Prop name="legend" type="Object">
            <p>用于设定legend位置</p> 

                        <Pre>
{`{
 layout:'horizontal',//表示legend 的形状是水平还是垂直，'horizontal'表示水平 'vertical'表示垂直
 align:'bottom' ,    //表示legend的方位。可以有left right top bottom 四种
 style:{             //用于调整legend 的位置
  x:0,               //x表示水平方向
  y:0                //y表示垂直方向
 }
}`}
            </Pre>
          </Prop>
          <Prop name="radius" type="Object">
                <p>饼图的内圆半径比例</p> 

            <Pre>
{`{
    inner:0.75
}`}
            </Pre>
          </Prop>
          <Prop name="animation" type="Object">
            <p>饼图的动画时间参数</p> 
            <Pre>
{`{
    pie:2500,
    lineText:500
}`}
            </Pre>
          </Prop>
          <Prop name="tooltip" type="Object" desc="悬浮提示框配置">
            <p>悬浮提示框配置</p> 
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
