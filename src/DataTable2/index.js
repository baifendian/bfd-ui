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
import invariant from 'invariant'
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
      `The response of ${url} should be be plain object.`
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
      Array.isArray(data),
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
    const { url, pagingDisabled, pageSize } = this.props
    const { currentPage, sortKey, sortType } = this.state
    if (this.props.getUrl) {
      return this.props.getUrl({ currentPage, pageSize, sortKey, sortType })
    }
    if (!url) return

    const query = Object.create(null)
    pagingDisabled || Object.assign(query, {
      start: this.getStart(),
      limit: pageSize
    })
    sortKey && Object.assign(query, { sortKey, sortType })

    const queryString = Object.keys(query).map(key => key + '=' + query[key]).join('&')
    let _url = url
    if (queryString) {
      const connector = _url.indexOf('?') === -1 ? '?' : '&'
      _url += connector + queryString
    }
    return _url
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
    const { columns, rowRender } = this.props
    if (rowRender) {
      return rowRender(item, i, columns)
    }
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
      pagingDisabled, sortKey, sortType, onSort, rowRender, ...other
    } = this.props
    const { currentPage, totalCounts, data } = this.state
    delete other.currentPage
    delete other.totalCounts
    delete other.data

    const currentPageData = this.getCurrentPageData()

    return (
      <Fetch
        className={classnames('bfd-datatable', className)}
        defaultHeight={70}
        url={this.getUrl()}
        onSuccess={::this.handleLoad}
        {...other}
      >
        <table className="bfd-table">
          <thead>
            <tr>{this.getTheads()}</tr>
          </thead>
          <tbody>
            {
              currentPageData.length ?
              currentPageData.map(::this.getRow) :
              <tr>
                <td colSpan={columns.length} className="bfd-datatable__empty">无数据</td>
              </tr>
            }
          </tbody>
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

  /**
   * 列配置
   * ```js
   * [{
   *   title: '姓名', // 列头显示内容，string/node
   *   key: 'name', // 数据对应的 key，用于排序、非 render 渲染
   *   sortable: true, // 是否开启排序功能
   *   width: '20%', // 列宽，像素／百分比
   *   render: (item, index, value) => item.authorised ? '已授权' : '未授权'
   * }]
   * ```
   */
  columns: PropTypes.array.isRequired,

  /**
   * 数据源，如果未指定 totalCounts，则根据 data.length 自动分页
   * ```js
   * [{
   *   name: '王XX',
   *   authorised: true
   * }]
   * ```
   */
  data: PropTypes.array,

  /**
   * url 数据源，这里的 url 不包括分页、排序等查询条件，组件内部会自动拼接，例如
   * 指定 path/query.do，最终组件内部处理后变成 path/query.do?start=0&limit=10
   * 也可以自定义 URL 规则，参见 `getUrl` 属性
   *
   * url 数据源模式 JSON 格式：
   * ```js
   * {
   *   totalCounts: 1200, // 没有则按上次请求返回的总条数分页或者根据 data.length 自动分页
   *   data: [{...}] // 同 data 属性格式
   * }
   * ```
   * 如果后台格式无法满足，可自定义 dataFilter 过滤
   * url 数据源模式，分页切换、排序都会动态发请求
   */
  url: PropTypes.string,

  /**
   * 如果组件内部拼装的 url 不满足需求，可自定义最终的 url
   * ```js
   * getUrl={condition => 'your url'}
   * ```
   */
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

  // 自定义 tbody 行渲染逻辑，参数(dataItem, index, columns)，返回 <tr>
  rowRender: PropTypes.func,

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
