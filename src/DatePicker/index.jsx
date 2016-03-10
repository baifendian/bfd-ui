import 'bfd-bootstrap'
import React, { PropTypes } from 'react'
import DatePicker from './datePicker.jsx'
import classnames from 'classnames'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import BodyClickMixin from '../BodyClickMixin'

export default React.createClass({

  mixins: [PureRenderMixin, BodyClickMixin],

  propTypes: {
    date: PropTypes.string
  },

  getInitialState() {
    return {
      isOpen: false  
    }
  },

  handleFocus() {
    this.setState({isOpen: true})
  },

  handleBodyClick() {
    this.setState({isOpen: false})
  },

  render() {
    return (
      <div onClick={e => {e.stopPropagation()}}>
        <div className={classnames('dropdown', {open: this.state.isOpen})}>
          <div className="form-group">
            <input type="text" className="form-control input-sm" onClick={this.handleFocus} value={this.props.date} readOnly/>
            <span className="glyphicon glyphicon-calendar form-control-feedback"></span>
          </div>
          {
            this.state.isOpen ? (
            <div className="dropdown-menu">
              <DatePicker date={this.props.date}></DatePicker>
            </div> ) : null
          }
        </div>
      </div>
    )
  }
})