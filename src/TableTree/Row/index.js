/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React from 'react'
import classnames from 'classnames'
import Button from '../../Button'
import './index.less'

const Row = props => {
  const { data, onChange, hidden, path, columns } = props
  const hasChildren = data.children && data.children.length
  const classNames = classnames('bfd-table-tree__row', {
    'bfd-table-tree__row--hidden': hidden,
    'bfd-table-tree__row--open': data.open
  })
  return (
    <tr className={classNames}>
      <td>
        <div 
          className="bfd-table-tree__node" 
          style={{marginLeft: (path.length - 1) / 2 * 20 + 'px'}}>
          <Button 
            style={{visibility: hasChildren ? 'visible' : 'hidden'}}
            className="bfd-table-tree__node-toggle"
            icon="caret-right" 
            size="sm"
            transparent
            onClick={() => onChange('set', [...path, 'open'], !data.open)} 
          />
          <div className="bfd-table-tree__node-content">
            {columns[0].render ? columns[0].render(data, path) : data[columns[0].key]}
          </div>
        </div>
      </td>
      {columns.slice(1).map((column, i) => {
        return (
          <td key={i}>{column.render ? column.render(data, path) : data[column.key]}</td>
        )
      })}
    </tr>
  )
}

export default Row