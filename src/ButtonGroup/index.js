/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { PropTypes, Component } from 'react'
import classnames from 'classnames'
import invariant from 'invariant'
import mapByComponent from '../_shared/mapByComponent'
import Button from '../Button'
import './index.less'

class ButtonGroup extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: 'value' in props ? props.value : props.defaultValue
    }
  }

  componentWillReceiveProps(nextProps) {
    'value' in nextProps && this.setState({
      value: nextProps.value
    })
  }

  handleButtonClick(value) {
    this.setState({ value })
    this.props.onChange && this.props.onChange(value)
  }

  render() {
    const { className, children, value, defaultValue, ...other } = this.props
    return (
      <div className={classnames('bfd-button-group', className)} {...other}>
        {mapByComponent(children, Button, child => {
          const { value } = child.props
          invariant(
            value || value === 0,
            `You should provide 'value' prop for 'Button' when you use 'ButtonGroup'.`
          )
          return React.cloneElement(child, {
            key: value,
            type: value === this.state.value ? '' : 'minor',
            onClick: () => {
              this.handleButtonClick(value)
            }
          })
        })}
      </div>
    )
  }
}

ButtonGroup.propTypes = {
  value(props) {
    if ('value' in props && !props.onChange) {
      return new Error('You provided a `value` prop without an `onChange` handler')
    }
    return PropTypes.oneOfType([PropTypes.string, PropTypes.number])(false, ...arguments)
  },
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func
}

export default ButtonGroup
