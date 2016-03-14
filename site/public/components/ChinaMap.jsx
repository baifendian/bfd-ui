import React from 'react'
import { render } from 'react-dom'
import Pre from '../Pre.jsx'
import { Props, Prop } from '../Props.jsx'
import ChinaMap from 'c/chinaMap/index.jsx'

// export default () => {
//   render(<ChinaMap/>, document.getElementById('demo'))
// }

export default React.createClass({
  render() {
    return (
      <div>
      	<h1>中国地图</h1>
        <Pre>
{`import ChinaMap from 'bfd-ui/lib/chinaMap'

const App = React.createClass({
  render() {
    return <ChinaMap/>
})`}
        </Pre>

        <ChinaMap/>
        
        <Props>
          <Prop name="radiusMaker" type="String" desc="决定气泡大小的数据纬度">
            <Pre>
{`var a = 1`}
            </Pre>
          </Prop>
          <Prop name="content" type="String" desc="气泡文字内容"></Prop>
          <Prop name="color" type="String" desc="颜色值"></Prop>
          <Prop name="data" type="Array" desc="二维格式数据">
            <Pre>
{`[{
	users: 234,
	name: 'A',
	}, {
	users: 499,
	name: 'B'
}]`}
            </Pre>
          </Prop>
        </Props>
      </div>
    )
  }
})