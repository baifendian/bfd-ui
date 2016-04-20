import React, { PropTypes } from 'react'
import DatePicker from './DatePicker'
import classnames from 'classnames'
import './less/dateRange.less'

const checkDateTime = PropTypes.oneOfType([PropTypes.string, PropTypes.number])

const propTypes = {
  start: checkDateTime,
  end: checkDateTime,
  min: checkDateTime,
  max: checkDateTime,
  onSelect: PropTypes.func,
  customProp({ start, end, onSelect }) {
    if ((start || end) && !onSelect) {
      return new Error('You provided a `start` or `end` prop without an `onSelect` handler')
    }
  }
}

const childContextTypes = {
  getStart: PropTypes.func,
  getEnd: PropTypes.func
}

const DateRange = React.createClass({

  getInitialState() {
    const state = {}
    if (!this.props.start) {
      state.start = new Date().setHours(0, 0, 0, 0)
    }
    if (!this.props.end) {
      state.end = new Date().setHours(0, 0, 0, 0)
    }
    return state
  },

  getChildContext() {
    return {
      getStart: () => this.getStart(),
      getEnd: () => this.getEnd()
    }
  },

  getStart() {
    return this.props.start || this.state.start
  },

  getEnd() {
    return this.props.end || this.state.end
  },

  handleSelect(type, date) {
    let range
    if (type === 'start') {
      this.state.start && this.setState({start: date})
      range = [date, this.getEnd()]
    } else {
      this.state.end && this.setState({end: date})
      range = [this.getStart(), date]
    }
    this.props.onSelect && this.props.onSelect.apply(this, range)
  },

  render() {
    const { className, onSelect, ...other } = this.props
    const start = this.getStart()
    const end = this.getEnd()
    return (
      <div className={classnames('bfd-daterange', className)} {...other}>
        <DatePicker date={start} min={this.props.min} max={end} onSelect={this.handleSelect.bind(this, 'start')} />
        <span className="seperator">至</span>
        <DatePicker date={end} min={start} max={this.props.max} onSelect={this.handleSelect.bind(this, 'end')} />
      </div>
    )
  }
})

DateRange.propTypes = propTypes
DateRange.childContextTypes = childContextTypes

export default DateRange