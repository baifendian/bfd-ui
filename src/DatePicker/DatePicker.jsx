import 'bfd-bootstrap'
import React, { PropTypes } from 'react'
import Calendar from './Calendar'
import { Dropdown, DropdownToggle, DropdownMenu } from '../Dropdown'
import classnames from 'classnames'
import './less/datePicker.less'

const checkDateTime = PropTypes.oneOfType([PropTypes.string, PropTypes.number])

const propTypes = {
  date: checkDateTime,
  min: checkDateTime,
  max: checkDateTime,
  onSelect: PropTypes.func,
  customProp({ date, onSelect }) {
    if (date && !onSelect) {
      return new Error('You provided a `date` prop without an `onSelect` handler')
    }
  }
}

const DatePicker = React.createClass({

  getInitialState() {
    return this.props.date 
      ? null 
      : {
        date: Date.now() 
      }
  },

  handleSelect(date) {
    this.state && this.setState({ date })
    this.refs.dropdown.close()
    this.props.onSelect && this.props.onSelect(date)
  },

  render() {
    const { className, onSelect, ...other } = this.props
    const date = this.props.date || this.state.date
    return (
      <Dropdown ref="dropdown" className={classnames('bfd-datepicker', className)} {...other}>
        <DropdownToggle>
          <input type="text" className="form-control input-sm" value={new Date(date).toLocaleDateString()} readOnly />
        </DropdownToggle>
        <DropdownMenu>
          <Calendar date={date} min={this.props.min} max={this.props.max} onSelect={this.handleSelect} />
        </DropdownMenu>
      </Dropdown>
    )
  }
})

DatePicker.propTypes = propTypes

export default DatePicker