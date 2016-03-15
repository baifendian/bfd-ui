/**
 * 日历界面本身
 */

import React, { PropTypes } from 'react'
import classnames from 'classnames'
import GetTimestrapMixin from './GetTimestrapMixin'
import './less/calendar.less'

const checkDateTime = PropTypes.oneOfType([PropTypes.string, PropTypes.number])

export default React.createClass({

  mixins: [GetTimestrapMixin],

  propTypes: {
    date: checkDateTime,
    min: checkDateTime,
    max: checkDateTime,
    onSelect: PropTypes.func
  },

  getInitialState() {
    const d = this.props.date ? new Date(this.props.date) : new Date()
    const year = d.getFullYear()
    const month = d.getMonth()
    const day = d.getDate()
    return {
      dayNames: ['日', '一', '二', '三', '四', '五', '六'],
      currentYear: year,
      currentMonth: month,
      year,
      month,
      day,
      min: this.props.min && this.getTimestrap(this.props.min),
      max: this.props.max && this.getTimestrap(this.props.max)
    }
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      min: this.props.min && this.getTimestrap(nextProps.min),
      max: this.props.max && this.getTimestrap(nextProps.max)
    })
  },

  // 日期区间功能
  contextTypes: {
    getStart: PropTypes.func,
    getEnd: PropTypes.func
  },

  // 切换年月
  handleToggle(change, type) {
    const d = new Date(this.state.currentYear, this.state.currentMonth)
    if (type === 'year') {
      d.setFullYear(d.getFullYear() + change)
      this.setState({currentYear: d.getFullYear()})
    } else {
      d.setMonth(d.getMonth() + change)
      this.setState({
        currentYear: d.getFullYear(),
        currentMonth: d.getMonth()
      })
    }
  },

  handleDaySelect(day) {
    this.setState(day)
    this.props.onSelect(new Date(day.year, day.month, day.day).getTime())
  },

  isDisabled(day) {
    if (this.state.min || this.state.max) {
      const timestrap = new Date(day.year, day.month, day.day).getTime()
      return timestrap < this.state.min || timestrap > this.state.max
    }
    return false
  },

  /**
   * 样式高亮，是否是今天、开始、结束、区间内、当月外、日期范围外
   */
  getDayClassNames(day) {
    const timestrap = new Date(day.year, day.month, day.day).getTime()

    let start, end
    if (this.context.getStart) {
      // DateRange
      start = this.context.getStart()
      end = this.context.getEnd()
    }

    const isStart = timestrap === start
    const isEnd = timestrap === end

    return classnames({
      today: timestrap === new Date().setHours(0, 0, 0, 0),
      exclude: day.notThisMonth,
      start: isStart,
      end: isEnd,
      active: timestrap === new Date(this.state.year, this.state.month, this.state.day).getTime() || isStart || isEnd,
      inside: timestrap > start && timestrap < end
    })
  },

  /**
   * 当前月各天的时间状态
   */
  getDays() {
    let d
    const days = []
    
    // 上月
    d = new Date(this.state.currentYear, this.state.currentMonth, 1)
    let dayInWeek = d.getDay()
    if (dayInWeek) {
      d.setDate(0)
      const lastMonthDaysCount = d.getDate()
      for (let i = dayInWeek; i--; ) {
        days.push({
          year: d.getFullYear(),
          month: d.getMonth(),
          day: lastMonthDaysCount - i,
          notThisMonth: true
        })
      }
    }

    // 本月
    d = new Date(this.state.currentYear, this.state.currentMonth + 1, 0)
    const thisMonthDaysCount = d.getDate()
    for (let i = 0; i < thisMonthDaysCount; i++) {
      days.push({
        year: d.getFullYear(),
        month: d.getMonth(),
        day: i + 1
      })
    }

    // 下月
    d = new Date(this.state.currentYear, this.state.currentMonth + 1, 1)
    for (let i = 0, len = 42 - days.length; i < len; i++) {
      days.push({
        year: d.getFullYear(),
        month: d.getMonth(),
        day: i + 1,
        notThisMonth: true
      })
    }
    return days
  },
  
  render() {
    const days = this.getDays()
    return (
      <div className="bfd-calendar">
        <div className="calendar-header">
          <div className="pull-left">
            <span className="toggle" onClick={this.handleToggle.bind(this, -1, 'year')}>«</span>
            <span className="toggle" onClick={this.handleToggle.bind(this, -1)}>‹</span>
          </div>
          <span className="result">{this.state.currentYear}年 {this.state.currentMonth + 1}月</span>
          <div className="pull-right">
            <span className="toggle" onClick={this.handleToggle.bind(this, 1)}>›</span>
            <span className="toggle" onClick={this.handleToggle.bind(this, 1, 'year')}>»</span>
          </div>
        </div>
        <table>
          <thead>
            <tr>{this.state.dayNames.map((name, i) => <th key={i}>{name}</th>)}</tr>
          </thead>
          <tbody>
            {Array(7).join(0).split('').map((v, i) => {
              return (
                <tr key={i}>{this.state.dayNames.map((name, j) => {
                  const index = i * 7 + j
                  const day = days[index]
                  return (
                    <td key={index}>
                      <button disabled={this.isDisabled(day)} className={this.getDayClassNames(day)} onClick={this.handleDaySelect.bind(this, day)}>{day.day}</button>
                    </td>
                  )
                })}</tr>
              ) 
            })}
          </tbody>
        </table>
      </div>
    )
  }
})