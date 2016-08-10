import './index.less'
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import DatePicker from '../DatePicker'

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
    const { className, onSelect, min, max, ...other } = this.props
    const { start, end } = this.state
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

export default DateRange