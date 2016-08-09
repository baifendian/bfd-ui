import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import './checkbox.less'

class Checkbox extends Component {

  constructor(props) {
    super()
    this.state = {
      checked: props.defaultChecked || props.checked
    }
  }

  componentWillReceiveProps(nextProps) {
    'checked' in nextProps && this.setState({checked: nextProps.checked})  
  }

  handleChange(e) {
    e.stopPropagation()
    this.setState({checked: e.target.checked})
    this.props.onChange && this.props.onChange(e)
  }

  render() {

    const { className, value, disabled, block, children, ...other } = this.props
    
    const classNames = classnames('bfd-checkbox', {
      'bfd-checkbox--disabled': disabled,
      'bfd-checkbox--block': block
    }, className)
    
    return (
      <label className={classNames} {...other}>
        <input 
          type="checkbox" 
          className="bfd-checkbox__input"
          value={value} 
          checked={this.state.checked}
          disabled={disabled} 
          onChange={::this.handleChange}
        />
        <span className="bfd-checkbox__status" />
        {children && <span className="bfd-checkbox__text">{children}</span>}
      </label>
    )
  }
}

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