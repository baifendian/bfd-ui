/**
 * Created by BFD_270 on 2016-02-19.
 */
import  'bfd-bootstrap'
import  './main.less'
import  React from 'react'
import  Fetch from '../Fetch'
import Paging from '../Paging'

export default React.createClass( {
  getInitialState: function () {
    return {
      order: '',
      url: this.props.url,
      items: {
        totalList: [],
        totalPageNum: 0,
        refresh: false
      },
      currentPage: 1
    }
  },

  onChange: function (params, currentPage) {
    if( this.props.url ) {
      let url_ = this.props.url
      if(url_.indexOf('?') > -1 ) {
        url_ += '&' + params
      }else {
        url_ += '?' + params
      }
      this.setState( { currentPage: currentPage } )
      this.setState( { url: url_ } )
    }
  },

  onPageChange(page){
    this.props.onPageChange( page )
    this.setState({currentPage: page } )
  },

  orderClick:function(column, i){
    if(column.order ) {
      if(this.refs[i].getAttribute('order') == null ) {
        this.refs[i].className = 'sorting_asc'
        this.refs[i].setAttribute('order','asc')
        this.setState({order: '&key=' + column['key'] + '&sort=asc'})
        return
      }
      if(this.refs[i].getAttribute('order') == 'asc' ) {
        this.refs[i].className = 'sorting_desc'
        this.refs[i].setAttribute('order', 'desc')
        this.setState({order: '&key=' + column['key'] + '&sort=desc'})
        return
      }
      if(this.refs[i].getAttribute('order') == 'desc' ) {
        this.refs[i].className = 'sorting_asc'
        this.refs[i].setAttribute('order', 'asc')
        this.setState({order:'&key=' + column['key'] + '&sort=asc'})
        return
      }
    }
  },

  handleSuccess: function ( data ) {
    this.setState( { items: data } )
  },

  refresh: function () {
    this.setState( { refresh: true } )
  },

  render: function () {
    let column = this.props.column
    let items = []
    let totalPageNum = 0,
    currentPage = parseInt( this.state.currentPage ),
    _this = this,
    url = this.state.url,
    /****
     * 新增自动分页功能
     * @type {Number}
     */
    pageSize = parseInt( this.props.howRow )
    let data_ = this.props.data.totalList
    if( this.props.data) {
      if(this.props.data.totalPageNum){
        totalPageNum = this.props.data.totalPageNum
      }
      if(data_ && data_.length > 0 && typeof data_ === 'object' && data_.length > pageSize) {
        let start = currentPage === 1 ? currentPage -1 : ( currentPage-1 ) * pageSize
        let end = currentPage === 1 ? pageSize : start + pageSize
        items = data_.slice( start, end )
      }
    }
    if( url && url.indexOf('?') < 0 && url.indexOf('pageSize') < 0 ) {
      url += '?pageSize=' + this.props.pageSize + '&currentPage=' + this.state.currentPage
    }
    url += this.state.order
    return (
      <div>
        {
          this.props.url ? <Fetch url = { url } onSuccess = { this.handleSuccess } ></Fetch> : null
        }
        <table className = "table" >
          <thead>
            <tr>
              {
                column.map ( function ( head_column, i ) {
                  return <th key = { head_column['title'] } ref = { i } onClick = { _this.orderClick.bind( _this, head_column, i ) }    title = { head_column['order'] === true ? head_column['title'] + '排序' : '' } className = { head_column['order'] === true ? 'sorting' : '' } >{ head_column['title']}</th>
                })
              }
            </tr>
          </thead>
          <tbody>
            {
              items.map( function ( item, j ) {
                return (<tr key= { j } >
                  {
                    column.map(function(columns,i) {
                      for(let col in columns) {
                        //序号
                        if(columns[col] === 'sequence') {
                          return <td key = { String( i ) + j } > { (( currentPage-1) * pageSize ) + ( j + 1 ) }</td>
                        }
                        //操作
                        if(columns[col] == 'operation' ) {
                          return <td key = { String( i ) + j }> { columns['render'] ( item, _this ) } </td>
                        }
                        if(columns[col] !== 'operation' && columns[col] !== 'sequence' && col == 'key') {
                          if(typeof columns['render'] === 'function') {
                            return <td key = { String( i ) + j }> { columns['render'] ( item[columns[col]],item) } </td>
                          }else {
                            return <td key = { String( i ) + j }>{ item[columns[col]] }</td>
                          }
                        }
                      }
                    })
                  }
                </tr>)
              })
             }
          </tbody>
        </table>
        {
          this.props.showPage == 'true' ? <Paging currentPage = { currentPage } onPageChange = { this.onPageChange } totalPageNum = { totalPageNum } pageSize = { this.props.howRow } onChange = { this.onChange }></Paging> : ''
        }
      </div>
    )
  }
})
