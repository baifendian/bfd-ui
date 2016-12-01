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

    const {
      className, defaultDate, onSelect, min, max, start, end, captionRender, weekDayNames,
      placeholder, ...other
    } = this.props
    const { date } = this.state
    delete other.date

    const calendarProps = { date, min, max, start, end, captionRender, weekDayNames }

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
            value={date ? format(date, 'yyyy-mm-dd') : null}
            onChange={::this.handleInput}
            readOnly
          />
        </DropdownToggle>
        <DropdownMenu className="bfd-datepicker__popover">
          <Calendar
            onSelect={::this.handleSelect}
            {...calendarProps}
          />
        </DropdownMenu>
      </Dropdown>
    )
  }
}

DatePicker.defaultProps = {
  placeholder: '请选择日期'
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

  // placeholder，默认`请选择日期`
  placeholder: PropTypes.string,

  /**
   * 日历标题渲染逻辑，默认
   * ```js
   * function captionRender(state) {
   *   return `${state.currentYear}年 ${state.currentMonth + 1}月`
   * }
   * ```
   */
  captionRender: PropTypes.func,

  // 一周内各天的名称，默认`['一', '二', '三', '四', '五', '六', '日']`
  weekDayNames: PropTypes.array,

  customProp({ date, onSelect }) {
    if (date && !onSelect) {
      return new Error('You provided a `date` prop without an `onSelect` handler')
    }
  }
}

export default DatePicker
