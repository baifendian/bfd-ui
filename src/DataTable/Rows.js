/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react'
import { Checkbox } from '../Checkbox'
import './main.less'
import '../table.less'
class Rows extends Component {

  constructor(props) {
    super(props)
    this.column = {}
    this.selectedRow = {}
  }

  componentWillMount() {
    this.column.primary = this.getPrimaryKey(this.props.column)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.rows !== nextProps.rows) {
      const selectRow = []
      nextProps.rows.map((item) => {
        if(this.column.primary) {
          if(this.column.primary && item.isSelect) {
            this.selectedRow[item[this.column.primary]] = item
          }
          if(this.selectedRow[item[this.column.primary]]) {
            item.isSelect = true
            selectRow.push(item)
            if(selectRow.length == nextProps.rows.length) {
              this.props.onCheckboxSelectAll && this.props.onCheckboxSelectAll(true)
            }
          }
        }
      })
    }
  }

  render() {
    const rows = this.props.rows
    const column = this.props.column
    const currentPage = this.props.currentPage || 1
    const pageSize = this.props.pageSize || 0
    
    return (
      <tbody>
      {
        rows.length > 0 ?
        rows.map((item, j) => {
          if(this.column.primary) {
            if(item.isSelect) {
              this.selectedRow[item[this.column.primary]] = item
            } else {
              delete this.selectedRow[item[this.column.primary]]
            }
          }
          
          const isSelect = item.isSelect || false
          const isDisabled = item.disabled || false
          const checkboxTd = this.props.onCheckboxSelect 
            ? <td><Checkbox disabled={isDisabled} checked={isSelect} onClick={::this.handleCheckboxClick} onChange={this.handleCheckboxChange.bind(this, item)}></Checkbox></td> 
            : null
          return (
            <tr key={j} onClick={this.handleRowClick.bind(this, item)}>
              {checkboxTd}
              {
                column.map((columns, i) => {
                  for (const col in columns) {
                    // 序号
                    if (columns[col] === 'sequence') {
                      return <td key={String(i) + j} >{((currentPage-1) * pageSize) + (j + 1)}</td>
                    }
                    // 操作
                    if (columns[col] == 'operation') {
                      return <td key={String( i ) + j}>{columns['render'](item, this)}</td>
                    }
                    // 正常非字段编辑列
                    if (columns[col]!=='operation' && columns[col]!=='sequence' && col=='key') {
                      const style = {display: columns.hide == true ? 'none' : ''}
                      if (typeof columns['render'] === 'function') {
                        return <td style={style} key={String(i) + j}>{columns['render'](item[columns[col]], item)}</td>
                      } else {
                        return <td style={style} key={String(i) + j}>{item[columns[col]]}</td>
                      }
                    }
                  }
                })
              }
            </tr>
          )
        }) : <tr><td colSpan="9"><div className="align-center" ref="nothingData" ></div>暂无数据!</td></tr>
      }
      </tbody>
    )
  }

  getPrimaryKey(column) {
    let key
    column.map(item => {
      if(item.primary === true) {
        key = item.key
      }
    })
    return key
  }

  handleCheckboxClick(event) {
    event.stopPropagation()
  }

  handleCheckboxChange(row) {
    const rowId = row[this.column.primary]
    row.isSelect = !row.isSelect
    if(row.isSelect) {
      this.selectedRow[rowId] = row
    } else {
      delete this.selectedRow[rowId]
    }

    const selectRow = []
    this.props.rows.map((item) => {
      if (item.isSelect) {
        selectRow.push(item)
      }
    })

    const selectedRow = []
    for(const p in this.selectedRow) {
      selectedRow.push(this.selectedRow[p])
    }

    this.setState({
      t: +new Date
    })

    this.props.onSelect(row.isSelect, row, selectRow, selectedRow)
  }

  handleRowClick(item) {
    this.props.onRowClick && this.props.onRowClick(item)
  }
}

export default Rows