/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import controlledPropValidator from '../_shared/propValidator/controlled'
import Input from '../Input'
import Button from '../Button'
import './index.less'

class Editable extends Component {

  constructor(props) {
    super()
    const value = 'value' in props ? props.value : props.defaultValue
    this.state = {
      value,
      changedValue: value || '',
      editing: props.defaultEditing || false
    }
  }

  componentWillReceiveProps(nextProps) {
    'value' in nextProps && this.setState({
      value: nextProps.value,
      changedValue: nextProps.value
    })
  }

  componentDidMount() {
    if (this.state.editing) {
      this.refs.input.select()
    }
  }

  handleEdit() {
    this.setState({
      editing: true
    }, () => {
      this.refs.input.select()
    })
  }

  handleInput(e) {
    e.stopPropagation()
    this.setState({
      changedValue: e.target.value
    })
  }

  handleOk() {
    const changedValue = this.state.changedValue
    this.setState({
      editing: false,
      value: changedValue
    })
    this.props.onChange && this.props.onChange(changedValue)
  }

  handleCancel() {
    this.setState({
      editing: false,
      changedValue: this.state.value
    })
    this.props.onCancel && this.props.onCancel()
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.handleOk()
    }
  }

  render() {

    const {
      className, defaultValue, onChange, onCancel, defaultEditing, ...other
    } = this.props
    const { editing, value, changedValue } = this.state

    delete other.value

    return (
      <div className={classnames('bfd-editable', className)} {...other}>
      {editing ? (
        <div className="bfd-editable__editing-container">
          <Input
            ref="input"
            value={changedValue}
            onChange={::this.handleInput}
            onKeyDown={::this.handleKeyDown}
          />
          <Button icon="check" onClick={::this.handleOk} />
          <Button icon="close" type="minor" onClick={::this.handleCancel} />
        </div>
      ) : (
        <div
          className="bfd-editable__normal-container"
          onClick={::this.handleEdit}
        >
          {value}
        </div>
      )}
      </div>
    )
  }
}

Editable.propTypes = {
  value: controlledPropValidator(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  onCancel: PropTypes.func,
  defaultEditing: PropTypes.bool
}

export default Editable
