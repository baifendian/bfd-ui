import React, { PropTypes } from 'react'
import classnames from 'classnames'
import './less/calendar.less'

const checkDateTime = PropTypes.oneOfType([PropTypes.string, PropTypes.number])

const propTypes = {
  date: checkDateTime,
  min: checkDateTime,
  max: checkDateTime,
  onSelect: PropTypes.func
}

// For DateRange
const contextTypes = {
  getStart: PropTypes.func,
  getEnd: PropTypes.func
}

const Calendar = React.createClass({

  getInitialState() {
    const d = this.props.date ? new Date(this.props.date) : new Date()
    const year = d.getFullYear()
    const month = d.getMonth()
    const day = d.getDate()
    return {
      year,
      month,
      day,
      currentYear: year,
      currentMonth: month
    }
  },

  dayNames: ['日', '一', '二', '三', '四', '五', '六'],

  // 切换年月
  handleToggle(change, type) {
    const d = new Date(this.state.currentYear, this.state.currentMonth)
    if (type === 'year') {
      d.setFullYear(d.getFullYear() + change)
      this.setState({
        currentYear: d.getFullYear()
      })
    } else {
      d.setMonth(d.getMonth() + change)
      this.setState({
        currentYear: d.getFullYear(),
        currentMonth: d.getMonth()
      })
    }
  },

  handleDaySelect(date) {
    const { year, month, day } = date
    this.setState({
      year,
      month,
      day,
      currentYear: year,
      currentMonth: month
    })
    this.props.onSelect && this.props.onSelect(new Date(year, month, day).setHours(0, 0, 0, 0))
  },

  getZeroTimestrap(date) {
    return new Date(date).setHours(0, 0, 0, 0)
  },

  disabledComparer() {
    const min = this.props.min && this.getZeroTimestrap(this.props.min)
    const max = this.props.max && this.getZeroTimestrap(this.props.max)
    if (min || max) {
      return date => {
        const timestrap = new Date(date.year, date.month, date.day).getTime()
        return timestrap < min || timestrap > max
      }
    } else {
      return () => false
    }
  },

  // 样式高亮，是否是今天、开始、结束、区间内、当月外、日期范围外
  getDateClassNames(date, start, end) {
    const timestrap = new Date(date.year, date.month, date.day).getTime()
    const isStart = timestrap === start
    const isEnd = timestrap === end

    return classnames({
      today: timestrap === new Date().setHours(0, 0, 0, 0),
      exclude: date.notThisMonth,
      start: isStart,
      end: isEnd,
      active: timestrap === new Date(this.state.year, this.state.month, this.state.day).getTime() || isStart || isEnd,
      inside: timestrap > start && timestrap < end
    })
  },

  // 当前月各天的时间状态
  getDates() {
    let d
    const dates = []
    
    // 上月
    d = new Date(this.state.currentYear, this.state.currentMonth, 1)
    let dayInWeek = d.getDay()
    if (dayInWeek) {
      d.setDate(0)
      const lastMonthDaysCount = d.getDate()
      for (let i = dayInWeek; i--; ) {
        dates.push({
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
      dates.push({
        year: d.getFullYear(),
        month: d.getMonth(),
        day: i + 1
      })
    }

    // 下月
    d = new Date(this.state.currentYear, this.state.currentMonth + 1, 1)
    const _len = dates.length
    for (let i = 0, len = (_len <= 35 ? 35 : 42) - _len; i < len; i++) {
      dates.push({
        year: d.getFullYear(),
        month: d.getMonth(),
        day: i + 1,
        notThisMonth: true
      })
    }
    return dates
  },
  
  render() {
    const dates = this.getDates()
    const getComparerResult = this.disabledComparer()
    
    // DateRange
    let start, end
    if (this.context.getStart) {
      start = new Date(this.context.getStart()).setHours(0, 0, 0, 0)
      end = new Date(this.context.getEnd()).setHours(0, 0, 0, 0)
    }

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
            <tr>{this.dayNames.map((name, i) => <th key={i}>{name}</th>)}</tr>
          </thead>
          <tbody>
            {Array(dates.length / 7 + 1).join(0).split('').map((v, i) => {
              return (
                <tr key={i}>{this.dayNames.map((name, j) => {
                  const index = i * 7 + j
                  const date = dates[index]
                  return (
                    <td key={index}>
                      <button disabled={getComparerResult(date)} className={this.getDateClassNames(date, start, end)} onClick={this.handleDaySelect.bind(this, date)}>{date.day}</button>
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

Calendar.propTypes = propTypes
Calendar.contextTypes = contextTypes

export default Calendar