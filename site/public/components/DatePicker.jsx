import React from 'react'
import Pre from '../Pre'
import { Props, Prop } from '../Props'
import DatePicker from 'c/DatePicker'

export default React.createClass({
  render() {
    return (
      <div>
        <h1>日期选择</h1>
        <Pre>
{`import DatePicker from 'bfd-ui/lib/DatePicker'

const App = React.createClass({
  render() {
    return <DatePicker/>
  }
})`}
        </Pre>

        <DatePicker/>
        
        <Props>
          <Prop name="date" type="Number" desc="时间戳，精确到毫秒，默认为客户端当前日期"></Prop>
          <Prop name="onSelect" type="Function" desc="选择后的回调，参数为选中日期的时间戳"></Prop>
        </Props>
      </div>
    )
  }
})