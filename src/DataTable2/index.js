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
import isPlainObject from 'lodash/isPlainObject'
import isNumber from 'lodash/isNumber'
import invariant from 'invariant'
import shouldComponentUpdate from '../shouldComponentUpdate'
import propsToState from '../shared/propsToState'
import Icon from '../Icon'
import Fetch from '../Fetch'
import Paging from '../Paging'
import '../table.less'
import './index.less'

class DataTable extends Component {

  constructor(props) {
    super()
    this.state = {
      currentPage: props.currentPage || 1,
      totalCounts: props.totalCounts,
      data: props.data || [],
      sortKey: props.sortKey,
      sortType: props.sortType || 'desc'
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState(propsToState(
      nextProps,
      ['data', 'totalCounts', 'currentPage', 'sortKey', 'sortType']
    ))
  }

  shouldComponentUpdate = shouldComponentUpdate

  handleSort(nextSortKey) {
    const { sortKey, sortType } = this.state
    let nextSortType
    if (sortKey === nextSortKey) {
      nextSortType = sortType === 'desc' ? 'asc' : 'desc'
    } else {
      nextSortType = 'desc'
    }
    this.setState({
      currentPage: 1,
      sortKey: nextSortKey,
      sortType: nextSortType
    })
    this.props.onPageChange && this.props.onPageChange(1)
    this.props.onSort && this.props.onSort(nextSortKey, nextSortType)
  }

  handleLoad(res = {}) {
    invariant(
      isPlainObject(res),
      `'DataTable' url data should be plain object, check the xhr response.`
    )
    const { dataFilter } = this.props
    if (dataFilter) {
      res = dataFilter(res)
      invariant(
        isPlainObject(res),
        '`DataTable` dataFilter should return plain object.'
      )
    }
    const { totalCounts } = res
    let { data } = res
    if (!data) {
      data = []
    }
    invariant(
      isNumber(totalCounts) && Array.isArray(data),
      `Invalid JSON for 'DataTable', check the xhr response or dataFilter. eg:
      {
        totalCounts: 1200,
        data: [{...}]
      }`
    )
    this.setState({ totalCounts, data })
  }

  handlePageChange(currentPage) {
    this.setState({ currentPage })
    this.props.onPageChange && this.props.onPageChange(currentPage)
  }

  getUrl() {
    if (this.props.getUrl) {
      const { pageSize } = this.props
      const { currentPage, sortKey, sortType } = this.state
      return this.props.getUrl({ currentPage, pageSize, sortKey, sortType })
    }
    let { url } = this.props
    if (!url) return

    const { pagingDisabled, pageSize } = this.props
    const { sortKey, sortType } = this.state

    const query = Object.create(null)
    pagingDisabled || Object.assign(query, {
      start: this.getStart(),
      limit: pageSize
    })
    sortKey && Object.assign(query, { sortKey, sortType })

    const queryString = Object.keys(query).map(key => key + '=' + query[key]).join('&')
    if (queryString) {
      const connector = url.indexOf('?') === -1 ? '?' : '&'
      url += connector + queryString
    }
    return url
  }

  getTheads() {
    const { columns } = this.props
    const { sortKey, sortType } = this.state
    const Theads = columns.map((item, i) => {
      const { title, sortable } = item
      let icon = sortable ? 'sort' : null
      if (sortable && item.key && item.key === sortKey) {
        icon += '-' + sortType
      }
      return (
        <th
          key={i}
          width={item.width}
          className={classnames({'bfd-datatable__th--sortable': sortable})}
          onClick={() => sortable && this.handleSort(item.key)}
        >
          {title}
          {sortable && <Icon className="bfd-datatable__sort-symbol" type={icon} />}
        </th>
      )
    })
    return Theads
  }

  getRow(item, i) {
    const { columns } = this.props
    const Tds = columns.map((column, j) => {
      const value = item[column.key]
      return <td key={j}>{column.render ? column.render(item, i, value) : value}</td>
    })
    return <tr key={i}>{Tds}</tr>
  }

  getCurrentPageData() {
    const { pagingDisabled, pageSize, url } = this.props
    const { totalCounts, data, sortKey, sortType } = this.state
    let renderData = data || []
    if (totalCounts || pagingDisabled) {
      return renderData
    }
    if (renderData.length) {
      // local paging
      if (sortKey && !url) {
        renderData = renderData.sort((a, b) => {
          if (sortType === 'desc') return a[sortKey] < b[sortKey]
          if (sortType === 'asc') return a[sortKey] > b[sortKey]
        })
      }
      const start = this.getStart()
      return renderData.slice(start, start + pageSize)
    }
    return renderData
  }

  getStart() {
    return (this.state.currentPage - 1) * this.props.pageSize
  }

  render() {
    const {
      className, columns, url, dataFilter, onPageChange, pageSize,
      pagingDisabled, sortKey, sortType, onSort, ...other
    } = this.props
    const { currentPage, totalCounts, data } = this.state
    delete other.currentPage
    delete other.totalCounts
    delete other.data

    return (
      <Fetch
        className={classnames('bfd-datatable', className)}
        defaultHeight={100}
        url={this.getUrl()}
        onSuccess={::this.handleLoad}
        {...other}
      >
        <table className="bfd-table">
          <thead>
            <tr>{this.getTheads()}</tr>
          </thead>
          <tbody>{this.getCurrentPageData().map(::this.getRow)}</tbody>
        </table>
        {pagingDisabled || (
          <Paging
            currentPage={currentPage}
            totalPageNum={totalCounts || data.length}
            pageSize={pageSize}
            onPageChange={::this.handlePageChange}
          />
        )}
      </Fetch>
    )
  }
}

DataTable.defaultProps = {
  pageSize: 10
}

DataTable.propTypes = {

  columns: PropTypes.array.isRequired,

  data: PropTypes.array,

  url: PropTypes.string,

  getUrl: PropTypes.func,

  // url 数据源格式过滤器，返回过滤后的数据
  dataFilter: PropTypes.func,

  // 当前页码，默认1，常用于条件改变后重置分页状态。url 数据源模式下请求参数会增加 start，currentPage 变化后会重新请求
  currentPage: PropTypes.number,

  // 切换分页后的回调，参数为当前页码
  onPageChange: PropTypes.func,

  // 每页显示的条数，默认10。url 数据源模式下请求参数会增加 limit ，pageSize 变化后会重新请求
  pageSize: PropTypes.number,

  // 总条数，用于 data 数据源模式下的分页计算，未指定则根据 data.length 自动分页
  totalCounts: PropTypes.number,

  // 是否禁用分页
  pagingDisabled: PropTypes.bool,

  // 当前排序字段。url 数据源模式下请求参数会增加 sortKey，sortKey 变化后会重新请求
  sortKey: PropTypes.string,

  // 当前排序类型，可选值：desc, asc, 默认 desc。url 数据源模式下请求参数会增加 sortType，sortType 变化后会重新请求
  sortType: PropTypes.string,

  // 排序后的回调，参数: sortKey, sortType
  onSort: PropTypes.func,

  customProp(props) {
    if (props.data && props.url) {
      return new Error('You can not use `data` and `url` at the same time.')
    }
    if (!props.data && !props.url) {
      return new Error('You should provide the `data` or `url` one of them.')
    }
    if (props.currentPage && !props.onPageChange) {
      return new Error(
        'You provide a `currentPage` prop without an `onPageChange` handler.'
      )
    }
    if (props.sortKey && !props.onSort) {
      return new Error('You provide a `sortKey` prop without an `onSort` handler.')
    }
  }
}

export default DataTable
