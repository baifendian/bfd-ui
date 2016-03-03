import React from 'react'
import { render } from 'react-dom'
import DataTable from 'c/dataTable/datatable.jsx'
import Paging from 'c/paging/paging.jsx'
var column = [
   {
      title: '姓名' ,
      order:true,
      render( text , i ){
         return <a href="#" onClick={function(){

    }}>{text}</a>
      } ,
      key: 'name'
   } ,
   {
      title: '年龄' ,
      key: 'age',
      order:true
   } ,
   {
      title: '身高' ,
      key: 'height' ,
      order:true,
      render( text ){
      return <a href="#">{text}</a>
      }
   } ,
   {
      title: '体重' ,
      key: 'weight',
      order:true
   } ,
   {
      title: '国家/地区' ,
      key: 'country'
   },{
     title: '学校',
      key:'school'
   },
   {
      title: '生日',
      key:'birthday',
      order:true
   },
   {
      title: '操作' ,
      /**
       *
       * @param columns  数据对象
       * @param obj      react 对象
       * @returns {XML}  返回dom对象
       */
      render( columns , obj ){
         return (<div className="icon">
      <span className="glyphicon glyphicon-search" onClick={
      function (){
      //todo
        //刷新列表
        obj.refresh()
      }
      }></span>
      <span className="glyphicon glyphicon-trash" onClick={
      function(){
      //todo
        //刷新列表
        obj.refresh()
      }
      }></span>
      <span className="glyphicon glyphicon-edit" onClick={
        function(){
        //todo
        //刷新列表
        obj.refresh()
        }

      }></span>
         </div>)
      } , key: 'operation'//注：operation 指定为操作选项和数据库内字段毫无关联，其他key 都必须与数据库内一致
   }
]
export default () => {




   //加载数据列表
   render ( <DataTable url="http://localhost:8081/getStudentList" pageSize={6}
                       column={column}/> , document.getElementById( 'demo' ) )
}