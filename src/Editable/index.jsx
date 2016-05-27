import React, { PropTypes } from 'react'
import classnames from 'classnames'
import './index.less'

const Editable = React.createClass({

  getInitialState() {
    const value = 'value' in this.props ? this.props.value : this.props.defaultValue
    return {
      value,
      changedValue: value,
      isEditing: false
    }
  },

  componentWillReceiveProps(nextProps) {
    'value' in nextProps && this.setState({
      value: nextProps.value,
      changedValue: nextProps.value
    })  
  },

  handleEdit() {
    this.setState({
      isEditing: true
    }, () => {
      this.refs.input.focus()
    })
  },

  handleInput(e) {
    e.stopPropagation()
    this.setState({
      changedValue: e.target.value
    })
  },

  handleOk() {
    const state = {
      isEditing: false
    }
    const changedValue = this.state.changedValue
    if (changedValue !== this.state.value) {
      state.value = changedValue
      this.props.onChange && this.props.onChange(changedValue)
    }
    this.setState(state)
  },

  handleCancel() {
    this.setState({
      isEditing: false
    })
  },

  render() {
    const { className, ...other } = this.props
    const { isEditing, value, changedValue } = this.state
    return (
      <div className={classnames('bfd-editable', className)} {...other}>
      {isEditing ? (
        <div className="editing">
          <input ref="input" type="text" className="form-control" value={changedValue} onChange={this.handleInput} />
          <button type="button" onClick={this.handleOk}>
            <span className="ok glyphicon glyphicon-ok"></span>
          </button>
          <button type="button" onClick={this.handleCancel}>
            <span className="cancel glyphicon glyphicon-remove"></span>
          </button>
        </div>
      ) : (
        <div className="value" onClick={this.handleEdit}>{value}</div>
      )}
      </div>
    )
  }
})

Editable.propTypes = {
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  customProp({ value, onChange }) {
    if (value && !onChange) {
      return new Error('You provided a `value` prop without an `onChange` handler')
    }
  }
}

export default Editable