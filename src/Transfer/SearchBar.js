/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule src/Transfer/SearchBar.js
 */

import React, { Component, PropTypes } from 'react'
import Icon from '../Icon'
import Input from '../Input'

class SearchBar extends Component {

  constructor(props) {
    super()
  }
  
  render() {
    return (
      <div>
        <Icon type="search" className="bfd-transfer__search" />
        <Input 
          className="bfd-transfer__input"
          placeholder="请输入搜索内容"
          ref="filterTextInput"
          onChange={::this.handleChange} />
      </div>
    )
  }

  handleChange() {
    const v = this.refs.filterTextInput.value
    this.props.onUserInput(v)
  }
}

export default SearchBar