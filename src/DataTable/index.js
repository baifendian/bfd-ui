/**
 * Created by BFD_270 on 2016-02-19.
 * Update by jiangtl on 2016-6-28.
 */
import 'bfd-bootstrap'
import React, {
  PropTypes
} from 'react'
import Fetch from '../Fetch'
import Paging from '../Paging'
import classnames from 'classnames'
import {
  Checkbox
} from '../Checkbox'
import './main.less'
const Rows = React.createClass({

  handleCheckboxChange(row) {
    row.isSelect = !row.isSelect
    this.setState({
      t: +new Date
    })

    const selectRow = []
    this.props.rows.map((item) => {
      if (item.isSelect) {
        selectRow.push(item)
      }
    })

    this.props.onSelect(row.isSelect, row, selectRow)
  },

  handleCheckboxClick(event) {
    event = event ? event : window.event
    event.stopPropagation()
  },

  handleRowClick(item) {
    this.props.onRowClick && this.props.onRowClick(item)
  },

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
          const isSelect = item.isSelect || false
          const isDisabled = item.disabled || false
          const checkboxTd = this.props.onCheckboxSelect 
            ? <td><Checkbox disabled={isDisabled} checked={isSelect} onClick={this.handleCheckboxClick} onChange={this.handleCheckboxChange.bind(this, item)}></Checkbox></td> 
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
                      if (typeof columns['render'] === 'function') {
                        return <td key={String(i) + j}>{columns['render'](item[columns[col]], item)}</td>
                      } else {
                        return <td key={String(i) + j}>{item[columns[col]]}</td>
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
})

export default React.createClass({
  items: [],
  propTypes: {
    data: PropTypes.object,
    url: PropTypes.string,
    customProp({
      data,
      url
    }) {
      if (data && url) {
        return new Error('data属性和url属性不能同时使用！')
      }
    }
  },
  getInitialState() {
    return {
      order: '',
      url: this.props.url || '',
      isSelectAll: false,
      items: {
        totalList: [],
        totalPageNum: 0,
        refresh: false,
        currentPage: 1
      },
      currentPage: this.props.currentPage || 1
    }
  },

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
  },

  onChange() {},

  onPageChange(page) {
    if (this.props.onPageChange) {
      this.props.onPageChange(page)
    }
    this.setState({
      currentPage: page
    })
  },

  orderClick(column, i) {
    if (column.order) {
      if (this.refs[i].getAttribute('order') == null) {
        this.refs[i].className = 'sorting_asc'
        this.refs[i].setAttribute('order', 'asc')
        this.setState({
          order: '&key=' + column['key'] + '&sort=asc'
        })
        this.props.onOrder && this.props.onOrder(column['key'], 'asc')
        return
      }
      if (this.refs[i].getAttribute('order') == 'asc') {
        this.refs[i].className = 'sorting_desc'
        this.refs[i].setAttribute('order', 'desc')
        this.setState({
          order: '&key=' + column['key'] + '&sort=desc'
        })
        this.props.onOrder && this.props.onOrder(column['key'], 'desc')
        return
      }
      if (this.refs[i].getAttribute('order') == 'desc') {
        this.refs[i].className = 'sorting_asc'
        this.refs[i].setAttribute('order', 'asc')
        this.setState({
          order: '&key=' + column['key'] + '&sort=asc'
        })
        this.props.onOrder && this.props.onOrder(column['key'], 'asc')
        return
      }
    }
  },

  handleSuccess(data) {
    this.setState({
      items: data
    })
  },

  refresh() {
    this.setState({
      refresh: true
    })
  },

  handleCheckboxAllChange() {
    console.log('-------------')
    const isAll = !this.state.isSelectAll
    console.log('1------')
    this.setState({
      isSelectAll: isAll
    })
    console.log('2------')
    const changeRows = []
    const rows = this.state.items.totalList
    rows.map((item) => {
      if (item.isSelect !== isAll && !item.disabled) {
        item.isSelect = isAll
        changeRows.push(item)
      }
    })

    const selectAllFn = this.props.onCheckboxSelect

    selectAllFn && selectAllFn(isAll ? rows : [])
  },

  handleCheckboxChange(checked, row, rows) {
    const selectFn = this.props.onCheckboxSelect
    selectFn && selectFn(rows)
    if (!checked) {
      this.setState({
        isSelectAll: false
      })
    }
  },

  handleRowClick(row) {
    this.props.onRowClick && this.props.onRowClick(row)
  },

  componentWillReceiveProps(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.setState({
        items: nextProps.data,
        isSelectAll: false
      })
    }
  },

  handleChange() {},

  render() {
    const self = this
    let url = this.props.url
    const {
      className,
      column,
      ...other
    } = this.props
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

    const checkboxTh = this.props.onCheckboxSelect ? <th><Checkbox checked={this.state.isSelectAll} onChange={this.handleCheckboxAllChange}></Checkbox></th> : null
    return (
      <div>
        {url != '' ? <Fetch url={url} onSuccess={this.handleSuccess} ></Fetch> : null}
        
        <table className={classnames('table', 'bfd-datatable', className)} {...other} >
          <thead>
            <tr>
              {checkboxTh}
              {
                column.map ((head, i) => {
                  const style = head.width ? {width: head.width} : {}
                  return (
                    <th 
                      key={head['title']}
                      ref={i}
                      style={style}
                      onClick={self.orderClick.bind(self, head, i)}
                      title={head['order']===true ? head['title'] + '排序' : ''} className={head['order']===true ? 'sorting' : ''}>
                      {head['title']}
                    </th>
                    )
                })
              }
            </tr>
          </thead>

          <Rows 
            rows={this.state.items.totalList} 
            onRowClick={this.handleRowClick}
            onSelect={this.handleCheckboxChange}
            onCheckboxSelect={this.props.onCheckboxSelect}
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
                  onPageChange={this.onPageChange} 
                  onChange={this.onChange}>
              </Paging>)
              : '' 
            : ''
        }
      </div>
    )
  }
})