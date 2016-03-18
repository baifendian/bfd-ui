import React from 'react'
import Percentage from 'c/Percentage'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

export default React.createClass({
  
  render() {
    return (
      <div>
        <h1>环比图</h1>
        <Pre>
{`import Percentage from 'bfd-ui/lib/Percentage'

const App = React.createClass({
  render() {
    return <Percentage percent={80}></Percentage>
  }
})`}
        </Pre>

        <div style={{width:'200'}}>
          <Percentage percent={80}></Percentage>
        </div>
        
        <Props>
          <Prop name="percent" type="Number" required>
            <p>百分比值</p>
          </Prop>
          <Prop name="foreColor" type="String">
            <p>前景色</p>
          </Prop>
          <Prop name="backColor" type="String">
            <p>背景色</p>
          </Prop>
          <Prop name="textColor" type="String">
            <p>文字景色</p>
          </Prop>
        </Props>
      </div>
    )
  }
})