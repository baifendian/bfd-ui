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
import DatePicker from '../DatePicker'
import './index.less'

class DateRange extends Component {

  constructor(props) {
    super()
    this.state = {
      start: props.defaultStart || props.start,
      end: props.defaultEnd || props.end
    }
  }

  componentWillReceiveProps(nextProps) {
    'start' in nextProps && this.setState({start: nextProps.start})  
    'end' in nextProps && this.setState({end: nextProps.end})  
  }

  handleSelect(type, date) {
    let range
    if (type === 'start') {
      this.setState({start: date})
      range = [date, this.state.end]
    } else {
      this.setState({end: date})
      range = [this.state.start, date]
    }
    this.props.onSelect && this.props.onSelect.apply(this, range)
  }

  render() {
    
    const { start, end } = this.state
    const { className, defaultStart, defaultEnd, onSelect, min, max, ...other } = this.props
    
    delete other.start
    delete other.end

    return (
      <div className={classnames('bfd-daterange', className)} {...other}>
        <DatePicker 
          date={start} 
          min={min} 
          max={end}
          start={start} 
          end={end}
          onSelect={this.handleSelect.bind(this, 'start')} 
        />
        <span className="bfd-daterange__seperator">至</span>
        <DatePicker 
          date={end} 
          min={start} 
          max={max}
          start={start} 
          end={end}
          onSelect={this.handleSelect.bind(this, 'end')} 
        />
      </div>
    )
  }
}

DateRange.propTypes = {

  // 指定开始日期
  start: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  
  // 初始化指定的开始日期（不可控）
  defaultStart: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  // 指定结束日期
  end: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  
  // 初始化指定的结束日期（不可控）
  defaultEnd: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  // 日期选择后的回调，参数分别为开始、结束时间
  onSelect: PropTypes.func,
  
  // 可选日期范围最小值
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  
  // 可选日期范围最大值
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  customProp({ start, end, onSelect }) {
    if ((start || end) && !onSelect) {
      return new Error('You provided a `start` or `end` prop without an `onSelect` handler')
    }
  }
}

export default DateRange