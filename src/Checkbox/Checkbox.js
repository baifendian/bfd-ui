import React, { PropTypes } from 'react'
import classnames from 'classnames'
import './less/checkbox.less'

const Checkbox = React.createClass({

  getInitialState() {
    return {
      checked: this.props.defaultChecked || this.props.checked || false   
    }
  },

  componentWillReceiveProps(nextProps) {
    'checked' in nextProps && this.setState({checked: nextProps.checked})  
  },

  handleChange(e) {
    e.stopPropagation()
    this.setState({checked: e.target.checked})
    this.props.onChange && this.props.onChange(e)
  },

  render() {
    const { className, value, disabled, block, children, ...other } = this.props
    return (
      <div 
        className={classnames('bfd-checkbox', {
            checkbox: block, 
            disabled: disabled,
            'checkbox-inline': !block
          }, className)} 
        {...other}
      >
        <label>
          <input 
            type="checkbox" 
            value={value} 
            checked={this.state.checked}
            disabled={disabled} 
            onChange={this.handleChange}
          />
          <span className="status"></span>
          {children ? <span>{children}</span> : null}
        </label>
      </div>
    )
  }
})

Checkbox.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  checked: PropTypes.bool,
  defaultChecked: PropTypes.bool,
  disabled: PropTypes.bool,
  onChange: PropTypes.func,
  block: PropTypes.bool,
  customProp(props) {
    if ('checked' in props && !props.onChange) {
      return new Error('You provided a `checked` prop without an `onChange` handler')
    }
  }
}

export default Checkbox