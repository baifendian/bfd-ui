import React from 'react'
import Pre from '../Pre'
import { Props, Prop } from '../Props'
import { DatePicker, DateRange } from 'c/DatePicker'

export default React.createClass({

  handleSelect() {
    this.setState({aa: 1})
  },

  render() {
    return (
      <div>
        <h1>日期选择</h1>
        <h2>DatePicker</h2>
        <p>单选日期</p>
        <Pre>
{`import { DatePicker } from 'bfd-ui/lib/DatePicker'

const App = React.createClass({
  render() {
    return <DatePicker date="2016-02-03"/>
  }
})`}
        </Pre>

        <DatePicker date="2016-02-03" onSelect={this.handleSelect}/>
        
        <Props>
          <Prop name="date" type="Number | String">
            <p>当前日期，时间戳（毫秒）或者日期字符串（下同）</p>
            <p>默认今天</p>
          </Prop>
          <Prop name="min" type="Number | String">
            <p>最小日期</p>
            <p>默认不限制</p>
          </Prop>
          <Prop name="max" type="Number | String">
            <p>最大日期</p>
            <p>默认不限制</p>
          </Prop>
          <Prop name="onSelect" type="Function">
            <p>选择后的回调，回调参数为选中日期的时间戳</p>
          </Prop>
        </Props>

        <h2>DateRange</h2>
        <p>日期段选择</p>
        <Pre>
{`import { DateRange } from 'bfd-ui/lib/DatePicker'

const App = React.createClass({
  render() {
    return <DateRange start="2016-03-10"/>
  }
})`}
        </Pre>

        <div className="clearfix"></div>

        <DateRange start="2016-03-10"/>
        
        <Props>
          <Prop name="start" type="Number | String">
            <p>开始日期，时间戳（毫秒）或者日期字符串（下同）</p>
            <p>默认今天</p>
          </Prop>
          <Prop name="start" type="Number | String">
            <p>结束日期，时间戳（毫秒）或者日期字符串（下同）</p>
            <p>默认今天</p>
          </Prop>
          <Prop name="min" type="Number | String">
            <p>最小日期</p>
            <p>默认不限制</p>
          </Prop>
          <Prop name="max" type="Number | String">
            <p>最大日期</p>
            <p>默认不限制</p>
          </Prop>
          <Prop name="onSelect" type="Function">
            <p>选择后的回调，回调参数为选中日期的时间戳</p>
          </Prop>
        </Props>
      </div>
    )
  }
})