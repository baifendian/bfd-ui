import 'bfd-bootstrap'
import React, { PropTypes } from 'react'
import DatePicker from './datePicker'
import classnames from 'classnames'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import DropDownMixin from '../DropDownMixin'
import './main.less'

export default React.createClass({

  mixins: [PureRenderMixin, DropDownMixin],

  propTypes: {
    date: PropTypes.number,
    onSelect: PropTypes.func
  },

  getInitialState() {
    return {
      date: this.props.date || new Date().getTime()
    }
  },

  componentWillReceiveProps(nextProps) {
    if (nextProps.date !== this.props.date) {
      this.setState({date: nextProps.date})
    }
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
            <DatePicker date={this.state.date} onSelect={this.handleSelect}></DatePicker>
          </div> ) : null
        }
      </div>
    )
  }
})