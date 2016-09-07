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
import Tree from '../Tree'
import Checkbox from '../../Checkbox'
import './index.less'

class SelectTree extends Component {

  handleSelect(item, path, checked) {
    const data = this.refs.tree.updateData('set', ['data', ...path, 'checked'], checked)
    this.props.onSelect && this.props.onSelect(data, item, path, checked)
  }

  render() {
    const { className, onSelect, ...other } = this.props
    other.beforeNodeRender = (data, path) => {
      return (
        <Checkbox 
          checked={data.checked || false} 
          onChange={e => this.handleSelect(data, path, e.target.checked)} 
        />
      )
    }
    return (
      <Tree 
        ref="tree" 
        className={classnames('bfd-select-tree', className)} 
        {...other} 
      />
    ) 
  }
}

SelectTree.propTypes = {
  // 复选框勾选后的回调，参数为(data, item, path, checked)
  onSelect: PropTypes.func
}

export default SelectTree