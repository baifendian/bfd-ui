import 'bfd-bootstrap'
import React, { PropTypes } from 'react'
import Calendar from './Calendar'
import classnames from 'classnames'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import DropDownMixin from '../DropDownMixin'
import './less/datePicker.less'

const checkDateTime = PropTypes.oneOfType([PropTypes.string, PropTypes.number])

export default React.createClass({

  mixins: [PureRenderMixin, DropDownMixin],

  propTypes: {
    date: checkDateTime,
    min: checkDateTime,
    max: checkDateTime,
    onSelect: PropTypes.func
  },

  getInitialState() {
    return {
      date: this.props.date
    }
  },

  componentWillReceiveProps(nextProps) {
    this.setState({
      date: nextProps.date,
    })
  },

  handleSelect(date) {
    this.setState({ isOpen: false, date })
    this.props.onSelect && this.props.onSelect(date)
  },

  render() {
    return (
      <div onClick={this.stopPropagation} className={classnames('bfd-datepicker dropdown', {open: this.state.isOpen})}>
        <div onClick={this.handleToggle}>
          <input type="text" className="form-control input-sm" value={new Date(this.state.date).toLocaleDateString()} readOnly/>
        </div>
        {
          this.state.isOpen ? (
          <div className="dropdown-menu">
            <Calendar date={this.state.date} min={this.props.min} max={this.props.max} onSelect={this.handleSelect}></Calendar>
          </div> ) : null
        }
      </div>
    )
  }
})