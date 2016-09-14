/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component, PropTypes } from 'react'
import Fetch from '../Fetch'
import Paging from '../Paging'
import FixTable from './FixTable'
import classnames from 'classnames'
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
                      return <td key={String(i) + j} >{(j + 1)}</td>
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
    event = event ? event : window.event
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

    this.setState({
      t: +new Date
    })

    this.props.onSelect(row.isSelect, row, selectRow)
  }

  handleCheckboxClick(event) {
    event = event ? event : window.event
    event.stopPropagation()
  }

  handleRowClick(item) {
    this.props.onRowClick && this.props.onRowClick(item)
  }
}

class FixedTable extends Component {

  constructor(props) {
    super()
    this.items = []
    this.state = {
      order: '',
      url: props.url || '',
      isSelectAll: false,
      items: {
        totalList: []
      }
    }
  }

  componentWillMount() {
    if (this.props.data) {
      this.setState({
        items: {
          totalList: this.props.data || []
        }
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.setState({
        items: nextProps.data,
        isSelectAll: false
      })
    }
  }

  render() {
    const self = this
    let url = this.props.url
    const { className, column, data, height, ...other } = this.props

    const checkboxTh = this.props.onCheckboxSelect ? <th><div><Checkbox checked={this.state.isSelectAll} onChange={::this.handleCheckboxAllChange}></Checkbox></div></th> : null
    return (
      <div style={{overflowY: 'auto', height: this.props.height + 'px'}}>
        <table className={classnames('bfd-fixedtable', className)} {...other} >
          <thead>
            <tr>
              {checkboxTh}
              {
                column.map ((head, i) => {
                  const style = {}
                  let orderClassName = ''
                  if(head.width) {
                    style.width = head.width
                  }
                  if(head.hide === true) {
                    style.display = 'none'
                  }
                  if(head['order'] === true) {
                    orderClassName = 'bfd-datatable--sorting'
                  } else if(head['order'] === 'asc') {
                    orderClassName = 'bfd-datatable--sorting_asc-default'
                  } else if(head['order'] === 'desc') {
                    orderClassName = 'bfd-datatable--sorting_desc-default'
                  }

                  return (
                    <th 
                      key={head['title']}
                      style={style}
                      onClick={self.orderClick.bind(self, head, i)}>
                      <div ref={i} style={style} title={head['order']===true ? head['title'] + '排序' : ''} className={orderClassName}>{head['title']}</div>
                    </th>
                  )
                })
              }
            </tr>
          </thead>

          <Rows 
            rows={this.state.items.totalList} 
            onRowClick={::this.handleRowClick}
            onSelect={::this.handleCheckboxChange}
            onCheckboxSelect={this.props.onCheckboxSelect}
            onCheckboxSelectAll={::this.setCheckboxAll}
            column={this.props.column}
          >
          </Rows>
        </table>
      </div>
    )
  }

  orderClick(column, i) {
    if (column.order) {
      const orderEl = this.refs[i]
      const orderElAttr = this.getOrderAttribute(i)
      if (orderElAttr == null || !orderElAttr) {
        if(column.order === true) {
          orderEl.className = 'bfd-datatable--sorting_asc'
          orderEl.setAttribute('order', 'asc')
          this.setState({
            order: '&key=' + column['key'] + '&sort=asc'
          })
          this.props.onOrder && this.props.onOrder(column['key'], 'asc')
        } else if(column.order === 'asc') {
          orderEl.className = 'bfd-datatable--sorting_asc'
          orderEl.setAttribute('order', 'asc')
          this.setState({
            order: '&key=' + column['key'] + '&sort=asc'
          })
          this.props.onOrder && this.props.onOrder(column['key'], 'asc')
        } else if(column.order === 'desc') {
          orderEl.className = 'bfd-datatable--sorting_desc'
          orderEl.setAttribute('order', 'desc')
          this.setState({
            order: '&key=' + column['key'] + '&sort=desc'
          })
          this.props.onOrder && this.props.onOrder(column['key'], 'desc')
        }
        return
      }
      if (orderElAttr == 'asc') {
        if(column.order === true) {
          this.refs[i].className = 'bfd-datatable--sorting_desc'
          this.refs[i].setAttribute('order', 'desc')
          this.setState({
            order: '&key=' + column['key'] + '&sort=desc'
          })
          this.props.onOrder && this.props.onOrder(column['key'], 'desc')
        } else if(column.order === 'asc') {
          this.refs[i].className = 'bfd-datatable--sorting_asc-default'
          this.refs[i].setAttribute('order', '')
          this.setState({
            order: '&key=' + column['key']
          })
          this.props.onOrder && this.props.onOrder(column['key'], '')
        }
        return
      }
      if (orderElAttr == 'desc') {
        if(column.order === true) {
          this.refs[i].className = 'bfd-datatable--sorting_asc'
          this.refs[i].setAttribute('order', 'asc')
          this.setState({
            order: '&key=' + column['key'] + '&sort=asc'
          })
          this.props.onOrder && this.props.onOrder(column['key'], 'asc')
        } else if(column.order === 'desc') {
          this.refs[i].className = 'bfd-datatable--sorting_desc-default'
          this.refs[i].setAttribute('order', '')
          this.setState({
            order: '&key=' + column['key']
          })
          this.props.onOrder && this.props.onOrder(column['key'], '')
        }
        return
      }
    }
  }

  getOrderAttribute(refName) {
    return this.refs[refName].getAttribute('order')
  }

  handleSuccess(data) {
    this.setState({
      items: data,
      isSelectAll: false
    })
  }

  handleCheckboxAllChange() {
    const isAll = !this.state.isSelectAll
    // const changeRows = []
    const rows = this.state.items.totalList
    rows.map((item) => {
      if (item.isSelect !== isAll && !item.disabled) {
        item.isSelect = isAll
        // changeRows.push(item)
      }
    })
    this.setCheckboxAll(isAll)
    const selectAllFn = this.props.onCheckboxSelect
    selectAllFn && selectAllFn(isAll ? rows : [])
  }

  setCheckboxAll(isAll) {
    this.setState({
      isSelectAll: isAll
    })
  }

  handleCheckboxChange(checked, row, rows) {
    const selectFn = this.props.onCheckboxSelect
    selectFn && selectFn(rows)
    if (!checked) {
      this.setState({
        isSelectAll: false
      })
    }
    if(rows.length == this.state.items.totalList.length) {
      this.setState({
        isSelectAll: true
      })
    }
  }

  handleRowClick(row) {
    this.props.onRowClick && this.props.onRowClick(row)
  }
}

FixedTable.propTypes = {

  /**
   * 数据表格表头列名称，目前支持的配置项如下：
   * ```js
   * [{
   *  title: '姓名', // 列头显示的文本
   *  key: 'name', // 映射数据字段名称
   *  primary: true, //主键标识，默认为false
   *  width: '20%', // 列宽度设置
   *  order: true, // 排序设置,true: 支持升序和降序，asc: 只支持升序，desc: 只支持降序，与onOrder事件并用
   *  // 列渲染的回调函数，可以自定义返回显示数据，text为默认的列值，item为当前行记录
   *  render: (text, item) => {
        return item.country + "/" + item.area
      }
   * },
   * ...
   * ]
   * ```
   */
  column: PropTypes.array.isRequired,

  // DataTable显示数据，一次性加载所有data数据！
  data: PropTypes.array.isRequired,

  // 表格高度
  height: PropTypes.number.isRequired,

  // 复选框点击事件，返回被选中的行记录
  onCheckboxSelect: PropTypes.func,

  // 行点击事件，返回被选中的行记录
  onRowClick: PropTypes.func,

  // 列名称点击排序事件，返回列名称和排序状态
  onOrder: PropTypes.func
}

export default FixedTable