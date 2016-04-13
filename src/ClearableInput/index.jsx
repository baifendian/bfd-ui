import React, { PropTypes } from 'react'
import classnames from 'classnames'
import './main.less'

const propTypes = {
  value: PropTypes.string,
  size: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func
}

const ClearableInput = React.createClass({

  getInitialState() {
    return {
      value: this.props.value  
    }
  },

  componentWillReceiveProps(nextProps) {
    'value' in this.props && this.setState({value: nextProps.value})  
  },

  handleClick() {
    this.setState({value: ''})
    this.props.onChange && this.props.onChange('')
  },

  handleChange(e) {
    const value = e.target.value
    this.setState({ value })
    this.props.onChange && this.props.onChange(value)
  },

  render() {
    const { size, placeholder, className, onChange, ...other } = this.props
    return (
      <div className={classnames('bfd-clearable-input', className)}>
        <input type="text" placeholder={placeholder} className={'form-control' + (size ? ' input-' + size : '')} value={this.state.value} onChange={this.handleChange} />
        { this.state.value ? <span className="clear glyphicon glyphicon-remove" onClick={this.handleClick}></span> : null }
      </div>
    )
  }
})

ClearableInput.propTypes = propTypes

export default ClearableInput