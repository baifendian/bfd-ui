import React, { PropTypes } from 'react'
import Calendar from './Calendar'
import { Dropdown, DropdownToggle, DropdownMenu } from '../Dropdown'
import ClearableInput from '../ClearableInput'
import classnames from 'classnames'
import format from 'dateformat'
import 'bfd-bootstrap'
import './less/datePicker.less'

const DatePicker = React.createClass({

  getInitialState() {
    return {
      date: this.props.defaultDate || this.props.date
    }
  },

  componentWillReceiveProps(nextProps) {
    'date' in nextProps && this.setState({date: nextProps.date})
  },

  handleSelect(date) {
    this.setState({ date })
    this.refs.dropdown.close()
    this.props.onSelect && this.props.onSelect(date)
  },

  handleInput(date) {
    this.setState({ date })
    this.props.onSelect && this.props.onSelect(date)
  },

  render() {
    const { className, onSelect, ...other } = this.props
    const date = this.state.date
    let value
    let placeholder
    if (date) {
      value = format(date, 'yyyy-mm-dd')
    } else {
      placeholder = '请选择日期'
    }
    return (
      <Dropdown ref="dropdown" className={classnames('bfd-datepicker', className)} {...other}>
        <DropdownToggle>
          <ClearableInput type="text" placeholder={placeholder} value={value} onChange={this.handleInput} readOnly />
        </DropdownToggle>
        <DropdownMenu>
          <Calendar date={date} min={this.props.min} max={this.props.max} onSelect={this.handleSelect} />
        </DropdownMenu>
      </Dropdown>
    )
  }
})

const checkDateTime = PropTypes.oneOfType([PropTypes.string, PropTypes.number])

DatePicker.propTypes = {
  date: checkDateTime,
  defaultDate: checkDateTime,
  min: checkDateTime,
  max: checkDateTime,
  onSelect: PropTypes.func,
  customProp({ date, onSelect }) {
    if (date && !onSelect) {
      return new Error('You provided a `date` prop without an `onSelect` handler')
    }
  }
}

export default DatePicker