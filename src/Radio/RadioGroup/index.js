/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { PropTypes } from 'react'
import classnames from 'classnames'
import './index.less'

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
    
    const { children, className, defaultValue, onChange, ...other } = this.props
    const { value } = this.state

    delete other.value

    const radiosWithProps = React.Children.map(children, (Radio, i) => {
      if (!Radio) return
      const _value = Radio.props.value
      return React.cloneElement(Radio, {
        key: i,
        checked: value === _value,
        onChange: e => {
          e.stopPropagation()
          this.handleChange(_value)
        }
      })
    })
    return (
      <div className={classnames('radios bfd-radio-group', className)} {...other}>
       {radiosWithProps}
      </div>
    ) 
  }
})

RadioGroup.propTypes = {

  // 选中的值
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  // 初始化时选中的值（不可控）
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  // 切换选择后的回调。参数为选中的值
  onChange: PropTypes.func,
  
  customProp(props) {
    if ('value' in props && !props.onChange) {
      return new Error('You provided a `value` prop without an `onChange` handler')
    }
  }
}

export default RadioGroup