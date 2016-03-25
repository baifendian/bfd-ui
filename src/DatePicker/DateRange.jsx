import React, { PropTypes } from 'react'
import DatePicker from './DatePicker'
import GetTimestrapMixin from './GetTimestrapMixin'
import './less/dateRange.less'

const checkDateTime = PropTypes.oneOfType([PropTypes.string, PropTypes.number])

export default React.createClass({

  mixins: [GetTimestrapMixin],

  propTypes: {
    start: checkDateTime,
    end: checkDateTime,
    min: checkDateTime,
    max: checkDateTime,
    onSelect: PropTypes.func
  },

  getInitialState() {
    return {
      start: this.getTimestrap(this.props.start),
      end: this.getTimestrap(this.props.end)
    }
  },

  componentWillReceiveProps(nextProps) {
    const state = {}
    if ('start' in nextProps) {
      state.start = this.getTimestrap(nextProps.start)
    }
    if ('end' in nextProps) {
      state.end = this.getTimestrap(nextProps.end)
    }
    this.setState(state)
  },

  childContextTypes: {
    getStart: PropTypes.func,
    getEnd: PropTypes.func
  },

  getChildContext() {
    return {
      getStart: () => this.state.start,
      getEnd: () => this.state.end
    }
  },

  handleSelect(type, date) {
    this.setState({[type]: date})
    let range
    if (type === 'start') {
      range = [date, this.state.end]
    } else {
      range = [this.state.start, date]
    }
    this.onSelect && this.onSelect.apply(this, range)
  },

  render() {
    return (
      <div className="bfd-daterange clearfix">
        <DatePicker date={this.state.start} min={this.props.min} max={this.state.end} onSelect={this.handleSelect.bind(this, 'start')} />
        <span className="seperator">至</span>
        <DatePicker date={this.state.end} min={this.state.start} max={this.props.max} onSelect={this.handleSelect.bind(this, 'end')} />
      </div>
    )
  }
})