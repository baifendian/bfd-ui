import React from 'react'
import { render } from 'react-dom'
import Pre from '../Pre'
import { Props, Prop } from '../Props'
import RadarChart from 'c/RadarChart'

const code = `import RadarChart from 'bfd-ui/lib/RadarChart'

const App = React.createClass({
  render() {
    return <RadarChart  url="/data/radarChart.json"/>
  }
})`

export default React.createClass({
  render() {
    return (
      <div>
        <h1>雷达图</h1>
        <Pre>{code}</Pre>

        <RadarChart url="/data/radarChart.json"/>
        
        <Props>
          <Prop name="w" type="number" required>
            <p>宽度:w</p>
            <Pre>
{`{
  w: 500, // Y字段值格式，默认千分符 's' 
}`}
            </Pre>
          </Prop>
          <Prop name="h" type="number" required>
            <p>高度:h</p>
            <Pre>
{`{
  h:550
}`}
            </Pre>
          </Prop>
      <Prop name="showLevels" type="boolean" default="true">
        <p>是否显示图形底部圆，默认是显示的</p>
        <Pre>
{`{
  showLevels:false
}`}
        </Pre>
      </Prop>
      <Prop name="showLevelsLabels" type="boolean" default="true">
        <p>是否显示LevelsLabels，默认是显示的</p>
        <Pre>
{`{
  showLevelsLabels:false
}`}
        </Pre>
      </Prop>
      <Prop name="showAxesLabels" type="boolean" default="true">
        <p>是否显示AxesLabels，默认是显示的</p>
        <Pre>
{`{
  showAxesLabels:false
}`}
        </Pre>
      </Prop>
      <Prop name="showAxes" type="boolean" default="true">
        <p>是否显示Axes，默认是显示的</p>
        <Pre>
{`{
    showAxes:false
}`}
        </Pre>
      </Prop>
      <Prop name="showLegend" type="boolean" default="true">
        <p>是否显示了legend，默认是显示的</p>
        <Pre>
{`{
  showLegend:false
}`}
        </Pre>
      </Prop>
      <Prop name="showVertices" type="boolean" default="true">
        <p>是否显示，默认是显示的</p>
        <Pre>
{`{
  showVertices:false
}`}
        </Pre>
      </Prop>
      <Prop name="showPolygon" type="boolean" default="true">
        <p>是否显示多边形区域，默认是显示的</p>
        <Pre>
{`{
  showPolygon:false
}`}
        </Pre>
      </Prop>
      <Prop name="polygonAreaOpacity: " type="Float" default="0.3">
        <p>设置多边形的区域的透明度，默认值0.3</p>
        <Pre>
{`{
  polygonAreaOpacity:0.3
}`}
    </Pre>
      </Prop>
      <Prop name="polygonStrokeOpacity" type="Float" default="1">
        <p>设置多边形的边线的透明度，[0,1]</p>
        <Pre>
{`{
  polygonStrokeOpacity:0.3
}`}
</Pre>
      </Prop>
      <Prop name="polygonPointSize" type="int" default="4">
        <p>设置多边形的点的透明度，4</p>
        <Pre>
{`{
  polygonPointSize:15
}`}
  </Pre>
      </Prop>
      <Prop name="translateX: " type="Int" default="150">
        <p>展示图形向右移动距离，默认150</p>
        <Pre>
{`{
  translateX:150
}`}
        </Pre>
      </Prop>
      <Prop name="translateY" type="Int" default="5">
        <p>展示图形向下移动距离，默认5</p>
        <Pre>
{`{
  translateY:5
}`}
        </Pre>
      </Prop>
      <Prop name="paddingX" type="Int" default=": 0">
        <p>水平的内边距设置，默认0</p>
        <Pre>
{`{
  paddingX:0
}`}
        </Pre>
      </Prop>
      <Prop name="paddingY" type="Int" default=": 0">
        <p>垂直内边距离，默认位0</p>
        <Pre>
{`{
  paddingY:0
}`}
        </Pre>
      </Prop>
      <Prop name="url" type="String" required>
            <p>数据源URL，返回格式要求：</p>
            <Pre>
{`{
  "code": 200,
  "title":"标题",
  "data": [[
      {axis: "华为", value:200},
      {axis: "苹果", value:200}.
      {axis: "小米", value:200}
    ],[
      {axis: "中兴", value:200},
      {axis: "oppo", value:200}.
      {axis: "锤子", value:50}
    ]
  ]
}`}
            </Pre>
          </Prop>
        </Props>
      </div>
    )
  }
})

