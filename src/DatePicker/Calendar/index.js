/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import shouldComponentUpdate from '../../shouldComponentUpdate'
import Button from '../../Button'
import './index.less'

class Calendar extends Component {

  static dayNames = ['一', '二', '三', '四', '五', '六', '日']

  constructor(props) {
    super()
    this.state = this.getDateState(props.date)
  }

  componentWillReceiveProps(nextProps) {
    'date' in nextProps && this.setState(this.getDateState(nextProps.date))
  }

  shouldComponentUpdate = shouldComponentUpdate

  getDateState(date) {
    const d = date ? new Date(date) : new Date()
    const year = d.getFullYear()
    const month = d.getMonth()
    const day = d.getDate()
    return {
      // 选中的年月日
      year: date ? year : null,
      month: date ? month : null,
      day: date ? day : null,
      // 切换后的年月
      currentYear: year,
      currentMonth: month
    }
  }

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
  }

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
  }

  getZeroTimestrap(date) {
    return new Date(date).setHours(0, 0, 0, 0)
  }

  disabledComparer() {
    const { min, max } = this.props
    const _min = min && this.getZeroTimestrap(min)
    const _max = max && this.getZeroTimestrap(max)
    if (_min || _max) {
      return date => {
        const timestrap = new Date(date.year, date.month, date.day).getTime()
        return timestrap < _min || timestrap > _max
      }
    } else {
      return () => false
    }
  }

  // 样式高亮，是否是今天、开始、结束、区间内、当月外、日期范围外
  getDateClassNames(date, start, end) {

    const { year, month, day } = this.state
    const timestrap = new Date(date.year, date.month, date.day).getTime()
    const isStart = timestrap === start
    const isEnd = timestrap === end
    const prefix = 'bfd-calendar__day--'
    
    return classnames('bfd-calendar__day', {
      [`${prefix}today`]: timestrap === new Date().setHours(0, 0, 0, 0),
      [`${prefix}exclude`]: date.notThisMonth,
      [`${prefix}start`]: isStart,
      [`${prefix}end`]: isEnd,
      [`${prefix}active`]: timestrap === new Date(year, month, day).getTime(),
      [`${prefix}inside`]: start && end ? timestrap > start && timestrap < end : false
    })
  }

  // 当前月各天的时间状态
  getDates() {
    const { currentYear, currentMonth } = this.state
    const dates = []
    let d

    // 上月
    d = new Date(currentYear, currentMonth, 1)
    const dayInWeek = d.getDay() || 7
    if (dayInWeek > 1) {
      d.setDate(0)
      const lastMonthDaysCount = d.getDate()
      for (let i = dayInWeek - 1; i--; ) {
        dates.push({
          year: d.getFullYear(),
          month: d.getMonth(),
          day: lastMonthDaysCount - i,
          notThisMonth: true
        })
      }
    }

    // 本月
    d = new Date(currentYear, currentMonth + 1, 0)
    const thisMonthDaysCount = d.getDate()
    for (let i = 0; i < thisMonthDaysCount; i++) {
      dates.push({
        year: d.getFullYear(),
        month: d.getMonth(),
        day: i + 1
      })
    }

    // 下月
    d = new Date(currentYear, currentMonth + 1, 1)
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
  }
  
  render() {

    const { currentYear, currentMonth } = this.state
    const { start, end } = this.props
    
    const dates = this.getDates()
    const getComparerResult = this.disabledComparer()

    let _start, _end
    start && (_start = new Date(start).setHours(0, 0, 0, 0) || 0)
    end && (_end = new Date(end).setHours(0, 0, 0, 0) || 0)

    return (
      <div className="bfd-calendar">
        <div className="bfd-calendar__header">
          <div className="bfd-calendar__header-left">
            <Button 
              size="sm"
              icon="angle-double-left"
              transparent
              onClick={this.handleToggle.bind(this, -1, 'year')}
            />
            <Button 
              size="sm"
              icon="angle-left"
              transparent
              onClick={this.handleToggle.bind(this, -1)}
            />
          </div>
          <span className="bfd-calendar__result">
            {currentYear}年 {currentMonth + 1}月
          </span>
          <div className="bfd-calendar__header-right">
            <Button 
              size="sm"
              icon="angle-right"
              transparent
              onClick={this.handleToggle.bind(this, 1)}
            />
            <Button 
              size="sm"
              icon="angle-double-right"
              transparent
              onClick={this.handleToggle.bind(this, 1, 'year')}
            />
          </div>
        </div>
        <table>
          <thead>
            <tr>{Calendar.dayNames.map((name, i) => <th key={i}>{name}</th>)}</tr>
          </thead>
          <tbody>
            {Array(dates.length / 7 + 1).join(0).split('').map((v, i) => {
              return (
                <tr key={i}>{Calendar.dayNames.map((name, j) => {
                  const index = i * 7 + j
                  const date = dates[index]
                  return (
                    <td key={index}>
                      <button 
                        disabled={getComparerResult(date)} 
                        className={this.getDateClassNames(date, _start, _end)} 
                        onClick={this.handleDaySelect.bind(this, date)}
                      >
                        {date.day}
                      </button>
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
}

const checkDateTime = PropTypes.oneOfType([PropTypes.string, PropTypes.number])

Calendar.propTypes = {
  date: checkDateTime,
  min: checkDateTime,
  max: checkDateTime,
  start: checkDateTime,
  end: checkDateTime,
  onSelect: PropTypes.func
}

export default Calendar