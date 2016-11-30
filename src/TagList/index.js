/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component, PropTypes } from 'react'
import TextOverflow from '../TextOverflow'
import Button from '../Button'
import './index.less'

class TagList extends Component {

  focus() {
    this.refs.input.focus()
  }

  blur() {
    this.refs.input.blur()
  }

  render() {

    const {
      labels, placeholder, inputValue, onRemove, onInput, onInputKeyChange, inputable,
      disabled
    } = this.props

    const inputSize = ((labels.length ? inputValue : placeholder) || ' ')
      .replace(/[\u4e00-\u9FA5]/g, '  ').length

    return (
      <ul className="bfd-tag-list">
        {labels.map(item => {
          return (
            <li key={item.value} className="bfd-tag-list__item">
              <TextOverflow>
                <span className="bfd-tag-list__label">{item.label}</span>
              </TextOverflow>
              <Button
                icon="remove"
                transparent
                size="sm"
                onClick={e => {
                  e.stopPropagation()
                  onRemove(item.value)
                }}
              />
            </li>
          )
        })}
        <li>
          <input
            type="text"
            ref="input"
            readOnly={!inputable}
            disabled={disabled}
            value={inputValue}
            size={Math.min(inputSize, 45)}
            onChange={e => onInput(e.target.value)}
            onKeyDown={e => onInputKeyChange(e)}
            placeholder={labels.length ? '' : placeholder} />
        </li>
      </ul>
    )
  }
}

TagList.propTypes = {
  labels: PropTypes.array.isRequired,
  placeholder: PropTypes.string,
  onRemove: PropTypes.func,
  inputable: PropTypes.bool,
  disabled: PropTypes.bool,
  inputValue: PropTypes.string,
  onInput: PropTypes.func,
  onInputKeyChange: PropTypes.func
}

export default TagList
