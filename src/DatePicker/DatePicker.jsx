import React, { PropTypes } from 'react'
import Calendar from './Calendar'
import { Dropdown, DropdownToggle, DropdownMenu } from '../Dropdown'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'
import classnames from 'classnames'
import 'bfd-bootstrap'
import './less/datePicker.less'

const DatePicker = React.createClass({

  getInitialState() {
    return this.props.date 
      ? null 
      : {
        date: Date.now() 
      }
  },

  shouldComponentUpdate,

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

const checkDateTime = PropTypes.oneOfType([PropTypes.string, PropTypes.number])

DatePicker.propTypes = {
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

export default DatePicker