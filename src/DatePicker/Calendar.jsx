/**
 * 日历界面本身
 */
import React, { PropTypes } from 'react'
import classnames from 'classnames'
import getTimestrap from './getTimestrap'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './less/calendar.less'

const checkDateTime = PropTypes.oneOfType([PropTypes.string, PropTypes.number])

export default React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    date: checkDateTime,
    min: checkDateTime,
    max: checkDateTime,
    onSelect: PropTypes.func
  },

  getInitialState() {
    const d = this.props.date ? new Date(this.props.date) : new Date()
    return {
      year: d.getFullYear(),
      month: d.getMonth(),
      day: d.getDate()
    }
  },

  // 日期区间功能
  contextTypes: {
    getStart: PropTypes.func,
    getEnd: PropTypes.func
  },

  dayNames: ['日', '一', '二', '三', '四', '五', '六'],

  // 切换年月
  handleToggle(change, type) {
    const d = new Date(this.state.year, this.state.month)
    if (type === 'year') {
      d.setFullYear(d.getFullYear() + change)
      this.setState({year: d.getFullYear()})
    } else {
      d.setMonth(d.getMonth() + change)
      this.setState({
        year: d.getFullYear(),
        month: d.getMonth()
      })
    }
  },

  handleDaySelect(day) {
    this.setState(day)
    this.props.onSelect(new Date(day.year, day.month, day.day).setHours(0, 0, 0, 0))
  },

  disabledComparer() {
    const min = this.props.min && getTimestrap(this.props.min)
    const max = this.props.max && getTimestrap(this.props.max)
    if (min || max) {
      return day => {
        const timestrap = new Date(day.year, day.month, day.day).getTime()
        return timestrap < min || timestrap > max
      }
    } else {
      return () => false
    }
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
    d = new Date(this.state.year, this.state.month, 1)
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
    d = new Date(this.state.year, this.state.month + 1, 0)
    const thisMonthDaysCount = d.getDate()
    for (let i = 0; i < thisMonthDaysCount; i++) {
      days.push({
        year: d.getFullYear(),
        month: d.getMonth(),
        day: i + 1
      })
    }

    // 下月
    d = new Date(this.state.year, this.state.month + 1, 1)
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
    const getComparerResult = this.disabledComparer()
    return (
      <div className="bfd-calendar">
        <div className="calendar-header">
          <div className="pull-left">
            <span className="toggle" onClick={this.handleToggle.bind(this, -1, 'year')}>«</span>
            <span className="toggle" onClick={this.handleToggle.bind(this, -1)}>‹</span>
          </div>
          <span className="result">{this.state.year}年 {this.state.month + 1}月</span>
          <div className="pull-right">
            <span className="toggle" onClick={this.handleToggle.bind(this, 1)}>›</span>
            <span className="toggle" onClick={this.handleToggle.bind(this, 1, 'year')}>»</span>
          </div>
        </div>
        <table>
          <thead>
            <tr>{this.dayNames.map((name, i) => <th key={i}>{name}</th>)}</tr>
          </thead>
          <tbody>
            {Array(7).join(0).split('').map((v, i) => {
              return (
                <tr key={i}>{this.dayNames.map((name, j) => {
                  const index = i * 7 + j
                  const day = days[index]
                  return (
                    <td key={index}>
                      <button disabled={getComparerResult(day)} className={this.getDayClassNames(day)} onClick={this.handleDaySelect.bind(this, day)}>{day.day}</button>
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