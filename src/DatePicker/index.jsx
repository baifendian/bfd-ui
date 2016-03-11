import 'bfd-bootstrap'
import React, { PropTypes } from 'react'
import DatePicker from './datePicker.jsx'
import classnames from 'classnames'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import DropDownMixin from '../DropDownMixin'

export default React.createClass({

  mixins: [PureRenderMixin, DropDownMixin],

  propTypes: {
    date: PropTypes.string
  },
  
  render() {
    return (
      <div onClick={this.stopPropagation} className={classnames('dropdown', {open: this.state.isOpen})}>
        <div className="form-group" onClick={this.handleToggle}>
          <input type="text" className="form-control input-sm" value={this.props.date} readOnly/>
          <span className="glyphicon glyphicon-calendar form-control-feedback"></span>
        </div>
        {
          this.state.isOpen ? (
          <div className="dropdown-menu">
            <DatePicker date={this.props.date}></DatePicker>
          </div> ) : null
        }
      </div>
    )
  }
})