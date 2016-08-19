import React, { PropTypes } from 'react'
import DatePicker from './DatePicker'
import classnames from 'classnames'
import './less/dateRange.less'

const DateRange = React.createClass({

  getInitialState() {
    return {
      start: this.props.defaultStart || this.props.start,
      end: this.props.defaultEnd || this.props.end
    }
  },

  getChildContext() {
    return {
      dateRange: this
    }
  },

  componentWillReceiveProps(nextProps) {
    'start' in nextProps && this.setState({start: nextProps.start})  
    'end' in nextProps && this.setState({end: nextProps.end})  
  },

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
  },

  render() {
    const { className, min, max, ...other } = this.props

    delete other.start
    delete other.defaultStart
    delete other.end
    delete other.defaultEnd
    delete other.onSelect

    const { start, end } = this.state
    return (
      <div className={classnames('bfd-daterange', className)} {...other}>
        <DatePicker date={start} min={min} max={end} onSelect={this.handleSelect.bind(this, 'start')} />
        <span className="seperator">至</span>
        <DatePicker date={end} min={start} max={max} onSelect={this.handleSelect.bind(this, 'end')} />
      </div>
    )
  }
})

const checkDateTime = PropTypes.oneOfType([PropTypes.string, PropTypes.number])

DateRange.propTypes = {
  start: checkDateTime,
  defaultStart: checkDateTime,
  end: checkDateTime,
  defaultEnd: checkDateTime,
  min: checkDateTime,
  max: checkDateTime,
  onSelect: PropTypes.func,
  customProp({ start, end, onSelect }) {
    if ((start || end) && !onSelect) {
      return new Error('You provided a `start` or `end` prop without an `onSelect` handler')
    }
  }
}

DateRange.childContextTypes = {
  dateRange: PropTypes.instanceOf(DateRange)
}

export default DateRange