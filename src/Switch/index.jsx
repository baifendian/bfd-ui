import React, { PropTypes } from 'react'
import classnames from 'classnames'
import './index.less'

const Switch = React.createClass({

  handleChange(e) {
    e.stopPropagation()
    this.props.onChange && this.props.onChange(e.target.checked)
  },

  render() {
    const { className, ...other } = this.props
    return (
      <label className={classnames('bfd-switch', className)}>
        <input type="checkbox" checked={this.props.on} onChange={this.handleChange} />
        <span className="switch"></span>
      </label>
    )
  }
})

Switch.propTypes = {
  on: PropTypes.bool,
  onChange: PropTypes.func,
  customProp({ on, onChange }) {
    if (on && !onChange) {
      return new Error('You provided a `on` prop without an `onChange` handler')
    }
  }
}

export default Switch