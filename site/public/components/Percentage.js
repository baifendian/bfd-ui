import React from 'react'
import Percentage from 'c/Percentage'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

export default React.createClass({

  getInitialState() {
      return {
          percent: 90  
      };
  },
  
  render() {
    return (
      <div>
        <h1>环形百分比 @hai.jiang</h1>
        <Pre>
{`import Percentage from 'bfd-ui/lib/Percentage'

export default React.createClass({
  render() {
    return <Percentage percent={80} style={{width: '150px'}}></Percentage>
  }
})`}
        </Pre>

        <Percentage percent={80} style={{width: '150px'}}></Percentage>
        
        <Props>
          <Prop name="percent" type="number" required>
            <p>百分比值</p>
          </Prop>
          <Prop name="foreColor" type="string">
            <p>前景色</p>
          </Prop>
          <Prop name="backColor" type="string">
            <p>背景色</p>
          </Prop>
          <Prop name="textColor" type="string">
            <p>文字颜色</p>
          </Prop>
        </Props>
      </div>
    )
  }
})