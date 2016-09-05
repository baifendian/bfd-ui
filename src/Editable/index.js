/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule src/Editable/index.js
 */

import './index.less'
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import Input from '../Input'
import Button from '../Button'

class Editable extends Component {

  constructor(props) {
    super()
    const value = 'value' in props ? props.value : props.defaultValue
    this.state = {
      value,
      changedValue: value,
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
      this.refs.input.focus()
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
      editing: false
    })
    this.props.onCancel && this.props.onCancel()
  }

  handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.handleOk()
    }
  }

  render() {
    const { className, ...other } = this.props
    const { editing, value, changedValue } = this.state
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

  // 待编辑的值
  value: PropTypes.string,
  
  // 初始化待编辑的值（不可控）
  defaultValue: PropTypes.string,

  // 确定后的回调，参数为当前值
  onChange: PropTypes.func,

  // 取消后的回调
  onCancel: PropTypes.func,

  // 初始化时是否处于编辑状态（不可控）
  defaultEditing: PropTypes.bool,

  customProp({ value, onChange }) {
    if (value && !onChange) {
      return new Error('You provided a `value` prop without an `onChange` handler')
    }
  }
}

export default Editable