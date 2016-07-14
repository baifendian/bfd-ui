import React, { PropTypes } from 'react'
import classnames from 'classnames'
import './less/radioGroup.less'

const RadioGroup = React.createClass({

  getInitialState() {
    return {
      value: this.props.defaultValue || this.props.value       
    }
  },

  componentWillReceiveProps(nextProps) {
    'value' in nextProps && this.setState({value: nextProps.value})  
  },

  handleChange(value) {
    this.setState({ value })
    this.props.onChange && this.props.onChange(value)
  },
  
  render() {
    const { className, children, onChange, ...other } = this.props
    const radiosWithProps = React.Children.map(children, (Radio, i) => {
      if (!Radio) return
      const value = Radio.props.value
      return React.cloneElement(Radio, {
        key: i,
        checked: this.state.value === value,
        onChange: e => {
          e.stopPropagation()
          this.handleChange(value)
        }
      })
    })
    return (
      <div 
        className={classnames('radios bfd-radio-group', className)} 
        {...other}
      >
       {radiosWithProps}
      </div>
    ) 
  }
})

RadioGroup.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  customProp(props) {
    if ('value' in props && !props.onChange) {
      return new Error('You provided a `value` prop without an `onChange` handler')
    }
  }
}

export default RadioGroup