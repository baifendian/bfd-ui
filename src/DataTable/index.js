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
import classnames from 'classnames'
import { Checkbox } from '../Checkbox'
import Rows from './Rows'
import './main.less'
import '../table.less'

class DataTable extends Component {

  constructor(props) {
    super()
    this.items = []
    this.selectedRows = []
    this.state = {
      order: '',
      url: props.url || '',
      isSelectAll: false,
      items: {
        totalList: [],
        totalPageNum: 0,
        refresh: false,
        currentPage: 1
      },
      currentPage: props.currentPage || 1
    }
  }

  componentWillMount() {
    if (this.props.data) {
      this.setState({
        items: {
          totalList: this.props.data.totalList || [],
          totalPageNum: this.props.data.totalPageNum || 0,
          refresh: false,
          currentPage: this.props.data.currentPage || 1
        }
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data) {
      this.setState({
        items: nextProps.data,
        isSelectAll: false
      })
    }
  }

  render() {
    const self = this
    let url = this.props.url || ''
    const { className, column, howRow, data, showPage, onPageChange, onCheckboxSelect, onRowClick, onOrder, ...other } = this.props
    const currentPage = parseInt(this.state.currentPage),
      // 新增自动分页功能
      pageSize = parseInt(this.props.howRow)

    // 如果是传入url查询数据就附带参数查询
    if (url && url !== '') {
      if (url.indexOf('?') < 0) {
        if (this.props.showPage == 'true') {
          url += '?pageSize=' + pageSize + '&currentPage=' + this.state.currentPage
        }
      }
      if (url.indexOf('pageSize') < 0 && url.indexOf('currentPage') < 0 && url.indexOf('?') > -1) {
        url += '&pageSize=' + pageSize + '&currentPage=' + this.state.currentPage
      }
    }

    const checkboxTh = this.props.onCheckboxSelect ? <th><Checkbox checked={this.state.isSelectAll} onChange={::this.handleCheckboxAllChange}></Checkbox></th> : null

    return (
      <Fetch defaultHeight={100} url={url} onSuccess={::this.handleSuccess} >
        <table className={classnames('bfd-datatable', 'bfd-table', className)} {...other} >
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
                      ref={i}
                      style={style}
                      onClick={self.orderClick.bind(self, head, i)}
                      title={head['order']===true ? head['title'] + '排序' : ''} className={orderClassName}>
                      {head['title']}
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
            currentPage={this.state.items.currentPage || currentPage}
            pageSize={pageSize}
          >
          </Rows>
        </table>

        {
          this.state.items.totalList.length > 0
            ? this.props.showPage == 'true'
              ? (<Paging
                  currentPage={this.state.items.currentPage}
                  totalPageNum={this.state.items.totalPageNum}
                  pageSize={this.props.howRow}
                  onPageChange={::this.onPageChange}>
              </Paging>)
              : ''
            : ''
        }
      </Fetch>
    )
  }

  onPageChange(page) {
    if (this.props.onPageChange) {
      this.props.onPageChange(page)
    }
    this.setState({
      currentPage: page
    })
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

  refresh() {
    this.setState({
      refresh: true
    })
  }

  handleCheckboxAllChange() {
    const isAll = !this.state.isSelectAll
    const rows = this.state.items.totalList
    const key = this.getPrimaryKey(this.props.column)
    rows.map((item) => {
      if (item.isSelect !== isAll && !item.disabled) {
        item.isSelect = isAll
      }
      this.setCheckboxAll(isAll)
      let addFlag = true


      for(let i = 0, len = this.selectedRows.length; i < len; i++) {
        const row = this.selectedRows[i]
        if(key && row[key] == item[key]) {
          addFlag = false
          if(!isAll) {
            this.selectedRows.splice(i, 1)
          }
          break
        }
      }
      if(key && addFlag && isAll) {
        this.selectedRows.push(item)
      }
    })

    const selectAllFn = this.props.onCheckboxSelect
    selectAllFn && selectAllFn(isAll ? rows : [], this.selectedRows)
  }

  setCheckboxAll(isAll) {
    this.setState({
      isSelectAll: isAll
    })
  }

  handleCheckboxChange(checked, row, rows, selectedRows) {
    const selectFn = this.props.onCheckboxSelect
    this.selectedRows = selectedRows
    selectFn && selectFn(rows, selectedRows)
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

  getPrimaryKey(column) {
    let key
    column.map(item => {
      if(item.primary === true) {
        key = item.key
      }
    })
    return key
  }
}

DataTable.propTypes = {

  // 要请求数据的服务端地址。
  url: PropTypes.string,

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

  // 每页需要显示的条数
  howRow: PropTypes.number,

  // DataTable显示数据，选填，url和data属性二者之间必须有一个，不必同时出现。data支持一次性查询多条数据传入data属性中，不需要点击一次分页再发送一次ajax请求，此功能根据业务需求使用！
  data: PropTypes.object,

  // 是否显示分页，true为显示，false为不显示,如果showPage设置为false，就要同时取消howRow每页显示多少条的设置
  showPage: PropTypes.string,

  // 点击分页时回调函数，此回调方法是点击切换分页时触发，可以在此方法体内发送Ajax请求数据，来替代组件的url属性！注【如果组件加入此属性方法，则不可以再传入url属性】
  onPageChange: PropTypes.func,

  // 复选框点击事件，返回被选中的行记录（本页），如果在column中设置主键，此函数第二个参数为已选的行记录（跨页）
  onCheckboxSelect: PropTypes.func,

  // 行点击事件，返回被选中的行记录
  onRowClick: PropTypes.func,

  // 列名称点击排序事件，返回列名称和排序状态
  onOrder: PropTypes.func,

  customProp({ data, url }) {
    if (data && url) {
      return new Error('data属性和url属性不能同时使用！')
    }
  }
}

export default DataTable
