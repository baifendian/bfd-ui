import React, { PropTypes } from 'react'
import classnames from 'classnames'
import './datePicker.less'

export default React.createClass({

  propTypes: {
    date: PropTypes.string
  },

  getInitialState() {
    const { year, month, day } = this.getDetailDate(this.props.date)
    return {
      dayNames: ['日', '一', '二', '三', '四', '五', '六'],
      currentYear: year,
      currentMonth: month,
      year,
      month,
      day
    }
  },

  getDetailDate(date) {
    const d = date ? new Date(date) : new Date()
    return {
      year: d.getFullYear(),
      month: d.getMonth() + 1,
      day: d.getDate()
    }
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.date !== this.props.date) {
      const { year, month, day } = this.getDetailDate(nextProps.date)
      this.setState({
        currentYear: year,
        currentMonth: month,
        year,
        month,
        day
      })
    }
  },

  handleToggle(change, type) {
    const d = new Date(this.state.currentYear, this.state.currentMonth - 1)
    if (type === 'year') {
      d.setFullYear(d.getFullYear() + change)
      this.setState({currentYear: d.getFullYear()})
    } else {
      d.setMonth(d.getMonth() + change)
      this.setState({
        currentYear: d.getFullYear(),
        currentMonth: d.getMonth() + 1
      })
    }
  },

  handleDaySelect(target) {
    const { year, month, day } = target
    this.setState({ year, month, day })
  },

  render() {

    console.log('render')

    let d
    const days = []
    
    // 上月
    d = new Date(this.state.currentYear, this.state.currentMonth - 1, 1)
    let dayInWeek = d.getDay()
    if (dayInWeek) {
      d.setDate(0)
      const lastMonthDaysCount = d.getDate()
      for (let i = dayInWeek; i--; ) {
        days.push({
          year: d.getFullYear(),
          month: d.getMonth() + 1,
          day: lastMonthDaysCount - i,
          notThisMonth: true
        })
      }
    }

    // 本月
    d = new Date(this.state.currentYear, this.state.currentMonth, 0)
    const thisMonthDaysCount = d.getDate()
    for (let i = 0; i < thisMonthDaysCount; i++) {
      days.push({
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: i + 1
      })
    }

    // 下月
    d = new Date(this.state.currentYear, this.state.currentMonth, 1)
    for (let i = 0, len = 42 - days.length; i < len; i++) {
      days.push({
        year: d.getFullYear(),
        month: d.getMonth() + 1,
        day: i + 1,
        notThisMonth: true
      })
    }

    return (
      <div className="bfd-datepicker">
        <div className="datepicker-header">
          <div className="pull-left">
            <span className="toggle" onClick={this.handleToggle.bind(this, -1, 'year')}>«</span>
            <span className="toggle" onClick={this.handleToggle.bind(this, -1)}>‹</span>
          </div>
          <span className="result">{this.state.currentYear}年 {this.state.currentMonth}月</span>
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
                  const isActive = day.day === this.state.day
                    && day.month === this.state.month
                    && day.year === this.state.year
                  const className = classnames({exclude: day.notThisMonth, active: isActive})

                  return (
                    <td key={index}>
                      <span className={className} onClick={this.handleDaySelect.bind(this, day)}>{day.day}</span>
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