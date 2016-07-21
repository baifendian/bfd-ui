import React from 'react'
import DataTable from 'c/DataTable'
import SearchInput from 'c/SearchInput'
import Paging from 'c/Paging'
import Pre from '../Pre'
import {
  Props,
  Prop
} from '../Props'

export default React.createClass({
  getInitialState: function() {
    return {
      url: "../data/table.json",
      column: [{
        title: '序号',
        key: 'sequence'
      }, {
        title: '姓名',
        order: true,
        width: '100px',
        render: (text, item) => {
          return <a href="javascript:void(0);" onClick={this.handleClick.bind(this, item)}>{text}</a>
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
        render: (text, item) => {
          return <a href="javascript:void(0);" onClick = {this.handleClick.bind(this, item)} > { text } </a>
        }
      }, {
        title: '体重',
        key: 'weight',
        order: true
      }, {
        title: '国家/地区',
        key: 'country',
        width: '15%'
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
         * @param item  当前数据对象
         * @param component 当前
         * @returns {XML}  返回dom对象
         */
        render: (item, component) => {
          return <a href = "javascript:void(0);" onClick = {this.handleClick.bind(this, item)}>编辑</a>
        },
        key: 'operation' //注：operation 指定为操作选项和数据库内字段毫无关联，其他key 都必须与数据库内一致
      }]
    }
  },
  handleClick(item, event) {
    event = event ? event : window.event;
    event.stopPropagation();
    console.log(item)
  },
  handleSearch(data) {

  },
  onPageChange(page) {
    this.setState({
      url: "../data/table.json?num=" + page
    })
  },
  handleCheckboxSelect(selectedRows) {
    console.log('rows:', selectedRows)
  },
  handleRowClick(row) {
    console.log('rowclick', row)
  },
  render() {

    return (
      <div>
        <h1>DataTable&分页@tenglong.jiang</h1>
        <Pre>
{
`
import DataTable from 'bfd-ui/lib/DataTable'
const App = React.createClass({
  /**
   * 定义初始化状态
   */
  getInitialState: function () {
    return {url: "../data/table.json",
      column: [{
        title:'序号',
        key:'sequence'
      }, {
        title: '姓名',
        order: true,
        width: '100px',
        render: (text, item) => {
          return <a href="javascript:void(0);" onClick={this.handleClick.bind(this, item)}>{text}</a>
        },
        key: 'name'
      }, {
        title: '年龄',
        key: 'age',
        order: true
      }, {
        title: '体重',
        key: 'weight',
        order: true
      }, {
        title: '国家/地区',
        key: 'country',
        width: '15%'
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
         * @param item  当前数据对象
         * @param component 当前
         * @returns {XML}  返回dom对象
         */
        render:(item, component)=> {
          return <a href = "javascript:void(0);" onClick = {this.handleClick.bind(this, item)}>编辑</a>
        },
        key: 'operation'//注：operation 指定为操作选项和数据库内字段毫无关联，其他key 都必须与数据库内一致
      }]
    }
  },
  /**
   * 列自定义点击事件
   * @param item 行数据
   */
  handleClick(item, event) {
    event = event ? event : window.event;
    event.stopPropagation();
    console.log(item)
  },
  /**
   * 此回调方法是点击切换分页时触发，可以在此方法体内发送Ajax请求数据，来替代组件的url属性
   * @param page 当前页
   */
  onPageChange(page) {
     //TODO
  },
  handleCheckboxSelect(selectedRows) {
    console.log('rows:', selectedRows)
  },
  handleRowClick(row) {
    console.log('rowclick', row)
  },
  render() {
    
    return 
      <DataTable 
        url={this.state.url} 
        onPageChange={this.onPageChange} 
        showPage="true" 
        column={this.state.column} 
        howRow={8}
        onRowClick={this.handleRowClick}
        onCheckboxSelect={this.handleCheckboxSelect} >
      </DataTable>
  }
})`
}
        </Pre>
        <DataTable 
          url={this.state.url}
          showPage="true"
          column={this.state.column}
          howRow={8}
          onRowClick={this.handleRowClick}
          onCheckboxSelect={this.handleCheckboxSelect}
        />
        <Props>
          <Prop name = "url" type="String" optional  children="要请求数据的服务端地址。"></Prop>
          <Prop name = "column" type="ArrayJson" required children = "数据表格表头列名称">
          <Pre>
            {
`
[
  {
    title: '姓名',  //列的名称
    key: 'name',  //数据库对应的属性字段
    width: '100px', //列宽度，同时支持百分比
   /**
    * 此方法是用于渲染自定义样式的列
    * @param text 渲染的列名称
    * @param item 当前对象
    * @returns {XML}  返回dom对象
    */
    render: ( text, item ) => {
      return <a href="javascript:void(0);" onClick = { () => { this.handleClick(item) } } > { text } </a>
    }
  }
]
`
            }
          </Pre>
          </Prop>
          
          <Prop name="howRow" type="Integer" optional children="每页需要显示的条数"></Prop>
          <Prop name="data" type="Array" optional children="DataTable显示数据，选填，url和data属性二者之间必须有一个，不必同时出现。data支持一次性查询多条数据传入data属性中，不需要点击一次分页再发送一次ajax请求，此功能根据业务需求使用！">
<Pre>
{
`const data = {
  "totalList": [], //表格数据
  "currentPage": 1, //当前页 【注：升级版本可省略currentPage，只有在每次点击分页需要发送ajax请求返回时才需要此字段】
  "totalPageNum": 500 //总条数
}
`
}
          </Pre>

          </Prop>
          

          <Prop name="showPage" type="boolean" optional children="是否显示分页，true为显示，false为不显示,如果showPage设置为false，就要同时取消howRow每页显示多少条的设置"></Prop>
          <Prop name="onPageChange" type="Function" optional children="点击分页时回调函数，此回调方法是点击切换分页时触发，可以在此方法体内发送Ajax请求数据，来替代组件的url属性！注【如果组件加入此属性方法，则不可以再传入url属性】">
<Pre>
{
`
/**
 * 此回调方法是点击切换分页时触发，可以在此方法体内发送Ajax请求数据，来替代组件的url属性
 * @param page 鼠标点击时的当前页码
 */
 onPageChange (page) {
   //TODO Ajax请求
 },

 render() {
   return <DataTable url="this.state.url" data={dataJson} onPageChange={this.onPageChange} showPage="true" column={this.state.column} howRow={ 10 }></DataTable>
 }
`
}
          </Pre>
          </Prop>
          
          <Prop name="onCheckboxSelect" type="Function" optional children="复选框点击事件，返回被选中的行记录"></Prop>
          <Prop name="onRowClick" type="Function" optional children="行点击事件，返回被选中的行记录"></Prop>
        </Props>
      </div>
    )
  }
})