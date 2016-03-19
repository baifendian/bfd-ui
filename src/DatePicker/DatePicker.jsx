import 'bfd-bootstrap'
import React, { PropTypes } from 'react'
import Calendar from './Calendar'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { Dropdown, DropdownToggle, DropdownMenu } from '../Dropdown'
import './less/datePicker.less'

const checkDateTime = PropTypes.oneOfType([PropTypes.string, PropTypes.number])

export default React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    date: checkDateTime,
    min: checkDateTime,
    max: checkDateTime,
    onSelect: PropTypes.func
  },

  getInitialState() {
    return {
      date: this.props.date || Date.now()
    }
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.date !== nextProps.date) {
      this.setState({
        date: nextProps.date,
      })
    }
  },

  handleSelect(date) {
    this.setState({ isOpen: false, date })
    this.props.onSelect && this.props.onSelect(date)
  },

  render() {
    return (
      <Dropdown className="bfd-datepicker">
        <DropdownToggle>
          <input type="text" className="form-control input-sm" value={new Date(this.state.date).toLocaleDateString()} readOnly/>
        </DropdownToggle>
        <DropdownMenu>
          <Calendar date={this.state.date} min={this.props.min} max={this.props.max} onSelect={this.handleSelect}></Calendar>
        </DropdownMenu>
      </Dropdown>
    )
  }
})