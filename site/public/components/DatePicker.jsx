import React from 'react'
import Pre from '../Pre'
import { Props, Prop } from '../Props'
import DatePicker from 'c/DatePicker/DatePicker'
import DateRange from 'c/DatePicker/DateRange'

const DatePickerDemo = React.createClass({

  getInitialState() {
    return {
      date: '2016-01-01'
    }
  },

  handleSelect(date) {
    this.setState({ date })
  },

  render() {
    return <DatePicker date={this.state.date} onSelect={this.handleSelect} />
  }
})

const DatePickeDemoCode = `import DatePicker from 'bfd-ui/lib/DatePicker/DatePicker'

const DatePickerDemo = React.createClass({

  getInitialState() {
    return {
      date: '2016-02-03'
    }
  },

  handleSelect(date) {
    this.setState({ date })
  },

  render() {
    return <DatePicker date={this.state.date} onSelect={this.handleSelect} />
  }
})`

const DateRangeDemo = React.createClass({

  getInitialState() {
    return {
      start: '2016-01-01'
    }
  },

  handleSelect(start) {
    this.setState({ start })
  },

  render() {
    return <DateRange start={this.state.start} onSelect={this.handleSelect} />
  }
})

const DateRangeDemoCode = `import DateRange from 'bfd-ui/lib/DatePicker/DateRange'

const DateRangeDemo = React.createClass({

  getInitialState() {
    return {
      start: '2016-01-01'
    }
  },

  handleSelect(start) {
    this.setState({ start })
  },

  render() {
    return <DateRange start={this.state.start} onSelect={this.handleSelect} />
  }
})`

export default () => {
  return (
    <div>
      <h1>日期选择 @hai.jiang</h1>
      <h2>DatePicker</h2>
      <p>单选日期</p>
      <Pre>{DatePickeDemoCode}</Pre>
      <DatePickerDemo />
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
      <Pre>{DateRangeDemoCode}</Pre>
      <DateRangeDemo />
      <Props>
        <Prop name="start" type="Number | String">
          <p>开始日期，时间戳（毫秒）或者日期字符串（下同）</p>
          <p>默认今天</p>
        </Prop>
        <Prop name="end" type="Number | String">
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
          <p>选择后的回调，回调参数为选中日期 (start, end)</p>
        </Prop>
      </Props>
    </div>
  )
}