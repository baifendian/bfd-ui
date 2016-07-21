import React from 'react'
import Pre from '../Pre'
import { Props, Prop } from '../Props'
import Slider from 'c/Slider'


export default React.createClass({
  handleSliding(value) {
    console.log('sliding:', value);
  },
  handleSlid(value) {
    console.log('slid:', value);
  },
  render() {
    return (
      <div>
        <h1>拖动条 @tenglong.jiang</h1>
        <h2>Slider</h2>
        <Pre>
        {`
import Slider from 'bfd-ui/lib/Slider'

const App = React.createClass({
  handleSliding(value) {
    console.log('sliding:', value);
  },
  handleSlid(value) {
    console.log('slid:', value);
  },
  render() {    
    return <Slider defaultValue={10} tickValue={10} start={0} end={100} suffix="%" onSliding={this.handleSliding} onSlid={this.handleSlid} />
  }
})`
        }
        </Pre>
        <Slider defaultValue={10} tickValue={10} start={0} end={100} suffix="%" onSliding={this.handleSliding} onSlid={this.handleSlid} />
        <div className="clearfix"></div>
        <Props>
          <Prop name="defaultValue" type="String">
            <p>默认值</p>
          </Prop>
          <Prop name="tickValue" type="String">
            <p>标尺刻度数量，默认5</p>
          </Prop>
          <Prop name="start" type="String">
            <p>起始值，默认值为0</p>
          </Prop>
          <Prop name="end" type="String" required>
            <p>结束值</p>
          </Prop>
          <Prop name="suffix" type="String" required>
            <p>后缀</p>
          </Prop>
          <Prop name="onSliding" type="function" required>
            <p>滑块拖动进行时事件，value为拖动条当前值</p>
          </Prop>
          <Prop name="onSlid" type="function" required>
            <p>滑块拖动完成时事件，即鼠标抬起后执行，value为拖动条当前值</p>
          </Prop>
        </Props>
      </div>
    )
  }
}) 