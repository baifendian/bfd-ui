/**
 * Created by BFD_270 on 2016-02-19.
 */
import './main.less'
import 'bfd-bootstrap'
import React, {PropTypes} from 'react'
import Loading from '../Loading'
import classNames from 'classnames'
import Paging from '../Paging'

export default React.createClass( {
   getInitialState: function () {
      return {
         order:'',
         url:this.props.url,
         items: {
            totalList: [] ,
            totalPageNum: 0 ,
            refresh: false,

         },
         currentPage: 1

      }
   } ,
   onChange: function (params,currentPage) {
      let url_ = this.props.url

      if(url_.indexOf('?')>-1){
         url_+="&"+params
      }else{
         url_+="?"+params
      }
      this.setState({currentPage:currentPage})
      this.setState({url:url_});
   } ,
   orderClick:function(column,i){
      if(column.order){

         if(this.refs[i].getAttribute('order')==null){
            this.refs[i].className = "sorting_asc"
            this.refs[i].setAttribute('order','asc')
            this.setState({order:"&key="+column['key']+"&sort=asc"})
            return
         }
         if(this.refs[i].getAttribute('order')=='asc'){
            this.refs[i].className = "sorting_desc"
            this.refs[i].setAttribute('order','desc')
            this.setState({order:"&key="+column['key']+"&sort=desc"})
            return
         }
         if(this.refs[i].getAttribute('order')=='desc'){
            this.refs[i].className = "sorting_asc"
            this.refs[i].setAttribute('order','asc')
            this.setState({order:"&key="+column['key']+"&sort=asc"})
            return
         }

      }

   },
   handleSuccess: function ( data ) {
      this.setState( { items: data } )
   } ,
   refresh: function () {
      this.setState( { refresh: true } )
   } ,
   render: function () {
      let column = this.props.column
      let items = this.state.items.totalList;
      let totalPageNum = this.state.items.totalPageNum ,
        currentPage = this.state.currentPage,
        _this = this,
        url = this.state.url,
        pageSize = parseInt(this.props.pageSize);
      if(url.indexOf('?')<0 && url.indexOf('pageSize')<0){

            url+="?pageSize="+this.props.pageSize+"&currentPage="+this.state.currentPage
      }else{

      }
      url+=this.state.order
      return (
           <div>
              <Loading url={url} onSuccess={this.handleSuccess}></Loading>
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
                              if(columns[col] === 'sequence'){
                                return <td key={String(i)+j}>{((currentPage-1)*pageSize)+(j+1)}</td>
                                }

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
              <div id="paging">
                 <Paging currentPage={currentPage} totalPageNum={totalPageNum} pageSize={this.props.pageSize}
                         onChange={this.onChange}></Paging>
              </div>
           </div>
      )
   }
} )
