import React, { PropTypes } from 'react'

const Radios = React.createClass({

  childContextTypes: {
    getValue: PropTypes.func,
    setValue: PropTypes.func
  },

  getChildContext() {
    return {
      getValue: () => this.props.value,
      setValue: e => {
        this.props.onChange(e)
      }
    }
  },
  
  render() {
    return <div className="radios">{this.props.children}</div>
  }
})

const Radio = React.createClass({

  contextTypes: {
    getValue: PropTypes.func,
    setValue: PropTypes.func
  },

  render() {
    return (
      <label className="radio-inline">
        <input type="radio" onChange={this.context.setValue} checked={this.props.value === this.context.getValue()} value={this.props.value}/>
        {this.props.children}
      </label>
    )
  }
})

export { Radios, Radio }