import React from 'react'
import DataTable from 'c/DataTable'
import Paging from 'c/Paging'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

const column = [{
  title:'序号',
  key:'sequence'
}, {
  title: '姓名',
  order: true,
  render(text, i) {
    return <a href="#">{text}</a>
  },
  key: 'name'
}, {
  title: '年龄',
  key: 'age',
  order: true
}, {
  title: '身高',
  key: 'height',
  order: true,
  render(text) {
    return <a href="#">{text}</a>
  }
}, {
  title: '体重',
  key: 'weight',
  order: true
}, {
  title: '国家/地区',
  key: 'country'
}, {
  title: '学校',
  key: 'school'
}, {
  title: '生日',
  key: 'birthday',
  order: true
}, {
  title: '操作',
  /**
   *
   * @param item  当前数据对象
   * @param component 当前
   * @returns {XML}  返回dom对象
   */
  render(item, component){
    return <span className="glyphicon glyphicon-edit"></span>
  },
  key: 'operation'//注：operation 指定为操作选项和数据库内字段毫无关联，其他key 都必须与数据库内一致
}]


export default React.createClass({
   onPageChange(page){

   }
  ,
  render() {

    const dataJson = {
      "totalList" : [ {
        "id" : "1",
        "name" : "张三",
        "age" : "11",
        "country" : "中国",
        "height" : "185cm",
        "weight" : "65kg",
        "school" : "六安一中",
        "birthday" : "1990-03-16"
      }, {
        "id" : "10",
        "name" : "张柏仁--",
        "age" : "23",
        "country" : "美国",
        "height" : "170cm",
        "weight" : "60kg",
        "school" : "斯坦福大学",
        "birthday" : "2016-03-02"
      }, {
        "id" : "11",
        "name" : "黄冬冬",
        "age" : "25",
        "country" : "英国",
        "height" : "168cm",
        "weight" : "64kg",
        "school" : "剑桥大学",
        "birthday" : "2016-03-07"
      }],
      "currentPage" : 1,
      "totalPageNum" : 500
    }
    return (
      <div>
        <h1>DataTable&分页</h1>
        <Pre>
{`import DataTable from 'bfd-ui/lib/DataTable'

const column = [{
  title:'序号',
  key:'sequence'
}, {
  title: '姓名',
  order: true,
  render(text, i) {
    return <a href="#"></a>
  },
  key: 'name'
}, {
  title: '年龄',
  key: 'age',
  order: true
}, {
  title: '身高',
  key: 'height',
  order: true,
  render(text) {
    return <a href="#">{text}</a>
  }
}, {
  title: '体重',
  key: 'weight',
  order: true
}, {
  title: '国家/地区',
  key: 'country'
}, {
  title: '学校',
  key: 'school'
}, {
  title: '生日',
  key: 'birthday',
  order: true
}, {
  title: '操作',
  /**
   *
   * @param item  当前数据对象
   * @param component 当前
   * @returns {XML}  返回dom对象
   */
  render(item, component){
    return <span className="glyphicon glyphicon-edit"></span>
  },
  key: 'operation'//注：operation 指定为操作选项和数据库内字段毫无关联，其他key 都必须与数据库内一致
}]

const App = React.createClass({
  render() {
    return <DataTable url="" data={dataJson} onPageChange={this.onPageChange} column={column} howRow={10} />
  }
})`}
        </Pre>

        <DataTable data={dataJson} onPageChange={this.onPageChange}  column={column} howRow={3} />
        
        <Props>
          <Prop name = "url" type="String" optional  type="要请求数据的服务端地址"></Prop>
          <Prop name = "column" type="ArrayJson" required type = "数据表格表头列名"></Prop>
          <Prop name="howRow" type="Integer" required type="每页需要显示的条数"></Prop>
          <Prop name="data" type="Array" optional type="DataTable显示数据，选填，url和data属性二者之间必须有一个，不必同时出现"></Prop>
          <Prop name="onPageChange" type="Function" optional type="点击分页时回调函数， ">
            <Pre>
{`

  const dataJson = {
    totalList:[], //表格数据
    "currentPage" : 1,//当前页
    "totalPageNum" : 500//总页数

  }
  {
  title:'操作',
  render(){
    return (<div className="icon">
             <span className="glyphicon glyphicon-search" ></span>
             <span className="glyphicon glyphicon-trash"></span>
             <span className="glyphicon glyphicon-edit"></span>
            </div>)
  }
  //render用于渲染特定的列 ， 例如操作列内的 查询、修改、删除显示等。

  {
  title: '体重',//列表标题
   key: 'weight',//数据库字段名
   order: true //是否排序 true为显示排序，false为不显示排序
  }
  {
  title:'序号',
  key:'sequence'//用于标记显示序号
  }
  //非数据操作字段
  {
  title:'操作',
  key:'operation'
}`}
            </Pre>
          </Prop>
        </Props>
      </div>
    )
  }
})