/**
 * Created by BFD_270 on 2016-02-19.
 */
import './main.css'
import 'bfd-bootstrap'
import React, {PropTypes} from 'react'
import Loading from '../Loading'
import classNames from 'classnames'
import Paging from '../paging/paging.jsx'
export default React.createClass( {
   getInitialState: function () {
      return {
         url:this.props.url,
         items: {
            totalList: [] ,
            totalPageNum: 0 ,
            currentPage: 1,
            refresh: false
         }
      }
   } ,
   onChange: function (params) {
      let url_ = this.props.url

      if(url_.indexOf('?')>-1){
         url_+="&"+params
      }else{
         url_+="?"+params
      }
      console.log(url_)
     this.setState({url:url_});
   } ,
   orderClick:function(column,i){
      if(column.order){
         if(this.refs[i].getAttribute('order')==null){
            this.refs[i].className = "sorting_asc"
            this.refs[i].setAttribute('order','asc')

            return
         }
         if(this.refs[i].getAttribute('order')=='asc'){
            this.refs[i].className = "sorting_desc"
            this.refs[i].setAttribute('order','desc')
            return
         }
         if(this.refs[i].getAttribute('order')=='desc'){
            this.refs[i].className = "sorting_asc"
            this.refs[i].setAttribute('order','asc')
         return
         }
         let key = column['key']

      }

   },
   handleSuccess: function ( data ) {
      console.log(data)
      this.setState( { items: data } )
   } ,
   refresh: function () {
      this.setState( { refresh: true } )
   } ,
   handleLoading: function () {
   } ,
   render: function () {
      let column = this.props.column
      let items = this.state.items.totalList;
      let totalPageNum = this.state.items.totalPageNum ,
        currentPage = this.state.items.currentPage,
        _this = this
      let url = this.state.url//?pageSize=13&currentPage=1
      if(url.indexOf('?')<0){
         if(url.indexOf('pageSize')<0){
            url+="?pageSize="+this.props.pageSize+"&currentPage="+this.state.items.currentPage
         }

      }else{
         url+="&pageSize="+this.props.pageSize+"&currentPage="+this.state.items.currentPage
      }

      return (
           <div>
              <Loading url={url} onSuccess={this.handleSuccess}></Loading>
              <div className="demo noborder">
                 <table className="table">
                    <thead>
                    <tr>{
                      column.map(function(head_column,i) {
                              return <th key={head_column['title']} ref={i} onClick={_this.orderClick.bind(_this,head_column,i)}    title={head_column['order']===true?head_column['title']+'排序':''} className={head_column['order']===true?'sorting':''} >{head_column['title']}</th>
                        }
                        )}</tr>
                    </thead>
                    <tbody>
                    {
                      items.map(function(item,j) {
                        return (<tr key={j}>{
                          column.map(function(columns,i){
                            for(let col in columns){
                              if(columns[col]=='operation'){
                                return <td key={String(i)+j}>{columns['render'](item,_this)}</td>
                                }else{
                                if(col==='key'){
                                  if(typeof columns['render'] === 'function'){
                                     return <td key={String(i)+j}> {columns['render'](item[columns[col]])} </td>
                                    }else{
                                     return <td key={String(i)+j}>{item[columns[col]]}</td>
                                    }
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
              </div>
              <div id="paging">
                 <Paging currentPage={currentPage} totalPageNum={totalPageNum} pageSize={this.props.pageSize}
                         onChange={this.onChange}></Paging>

              </div>
           </div>
      )
   }
} )
