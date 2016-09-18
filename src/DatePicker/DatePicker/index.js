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
import format from 'dateformat'
import Calendar from '../Calendar'
import { Dropdown, DropdownToggle, DropdownMenu } from '../../Dropdown'
import ClearableInput from '../../ClearableInput'
import './index.less'

class DatePicker extends Component {

  constructor(props) {
    super()
    this.state = {
      date: props.defaultDate || props.date
    }
  }

  componentWillReceiveProps(nextProps) {
    'date' in nextProps && this.setState({date: nextProps.date})
  }

  handleSelect(date) {
    this.setState({ date })
    this.refs.dropdown.close()
    this.props.onSelect && this.props.onSelect(date)
  }

  handleInput(date) {
    this.setState({ date })
    this.props.onSelect && this.props.onSelect(date)
  }

  render() {
    
    const { className, defaultDate, onSelect, min, max, start, end, ...other } = this.props
    const { date } = this.state

    delete other.date

    let value = ''
    let placeholder
    if (date) {
      value = format(date, 'yyyy-mm-dd')
    } else {
      placeholder = '请选择日期'
    }
    return (
      <Dropdown 
        ref="dropdown" 
        className={classnames('bfd-datepicker', className)} 
        {...other}
      >
        <DropdownToggle>
          <ClearableInput 
            placeholder={placeholder} 
            className="bfd-datepicker__input"
            value={value} 
            onChange={::this.handleInput} 
            readOnly 
          />
        </DropdownToggle>
        <DropdownMenu>
          <Calendar 
            date={date} 
            min={min} 
            max={max} 
            start={start} 
            end={end} 
            onSelect={::this.handleSelect} 
          />
        </DropdownMenu>
      </Dropdown>
    )
  }
}

DatePicker.propTypes = {

  // 指定日期
  date: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  
  // 初始化指定的日期（不可控）
  defaultDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  // 日期选择后的回调，参数为选中的日期时间戳
  onSelect: PropTypes.func,
  
  // 可选日期范围最小值
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  
  // 可选日期范围最大值
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  
  // 区间模式，日期区间开始值
  start: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  
  // 区间模式，日期区间结束值
  end: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  customProp({ date, onSelect }) {
    if (date && !onSelect) {
      return new Error('You provided a `date` prop without an `onSelect` handler')
    }
  }
}

export default DatePicker