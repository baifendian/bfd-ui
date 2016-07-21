import React, { PropTypes } from 'react'
import classnames from 'classnames'
import './index.less'

const Switch = React.createClass({

  getInitialState() {
    return {
      on: this.props.on    
    }
  },

  componentWillReceiveProps(nextProps) {
    'on' in nextProps && this.setState({on: nextProps.on})  
  },

  handleChange(e) {
    e.stopPropagation()
    this.setState({on: e.target.checked})
    this.props.onChange && this.props.onChange(e.target.checked)
  },

  render() {
    const { className, labelOn, labelOff, ...other } = this.props
    const isOpen = this.state.on
    return (
      <label className={classnames('bfd-switch', className)} {...other}>
        <input type="checkbox" checked={isOpen} onChange={this.handleChange} />
        <span className="switch">{isOpen ? labelOn : labelOff}</span>
      </label>
    )
  }
})

Switch.propTypes = {
  on: PropTypes.bool,
  onChange: PropTypes.func,
  labelOn: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  labelOff: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  customProp({ on, onChange }) {
    if (on && !onChange) {
      return new Error('You provided a `on` prop without an `onChange` handler')
    }
  }
}

export default Switch