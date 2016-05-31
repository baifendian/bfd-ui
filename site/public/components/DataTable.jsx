import React from 'react'
import DataTable from 'c/DataTable'
import Paging from 'c/Paging'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

export default React.createClass({
  getInitialState: function () {
    return {url: "../data/table.json"}
  },
  handleClick (item) {
   console.log(item)
  },

  onPageChange( page) {
    this.setState({url:"../data/table.json?num="+page})
  },

  render() {

    const column = [{
      title:'序号',
      key:'sequence'
    }, {
      title: '姓名',
      order: true,
      render: (text, item) => {
        return <a href="javascript:void(0);" onClick = { () => { this.handleClick(item) } } > { text } </a>
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
        return <a href="javascript:void(0);" onClick = { () => { this.handleClick(item) } } > { text } </a>
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
       * @param item  当前数据对象
       * @param component 当前
       * @returns {XML}  返回dom对象
       */
      render:(item, component)=>{
        return <a href = "javascript:void(0);" onClick = { () => { this.handleClick(item) } }>编辑</a>
      },
      key: 'operation'//注：operation 指定为操作选项和数据库内字段毫无关联，其他key 都必须与数据库内一致
    }]
    return (
      <div>
        <h1>DataTable&分页@houyi.li</h1>
        <Pre>
{
`
import DataTable from 'bfd-ui/lib/DataTable'
const App = React.createClass({
  /**
   * 定义初始化状态
   */
  getInitialState: function () {
    return { name: 'thomson'}
  },
  /**
   * 此回调方法是点击切换分页时触发，可以在此方法体内发送Ajax请求数据，来替代组件的url属性
   * @param page 当前页
   */
  onPageChange(page){
     //TODO
  },
  render() {
    return <DataTable url="" data={dataJson} onPageChange={this.onPageChange} showPage="true" column={column} howRow={ 13 }></DataTable>
  }
})`
}
        </Pre>
        <DataTable url = { this.state.url }   showPage = "true" data = ""  column = { column } howRow = { 8 } />
        <Props>
          <Prop name = "url" type="String" optional  children="要请求数据的服务端地址。"></Prop>
          <Prop name = "column" type="ArrayJson" required children = "数据表格表头列名，放在组件内部render()内"></Prop>
          <Pre>
            {
`
const column = [{
        //非数据操作字段
        title:'操作',
        /**
         *@param item  当前行的数据对象，数据类型为JSON格式{}
         */
        render: (text, item) => {
          return <a href="javascript:void(0);" onClick = { () => { this.handleClick(item) } } > { text } </a>
        },
        //render用于渲染特定的列 ， 例如操作列内的 查询、修改、删除显示等。
        {
          title: '体重',//列表标题
          key: 'weight',//数据库字段名
          order: true //是否排序 true为显示排序，false为不显示排序
        },

        {
          title:'序号',
          key:'sequence'//用于标记显示序号
        },

        {
        title: '姓名',
        order: true,
        /***
         * @param text 需要渲染的列名
         * @param item  当前行的数据对象，数据类型为JSON格式{}
         */
        render: function(text, item) {
          return <a href="javascript:void(0);" href="javascript:void(0);" onClick={function(){ () => { this.handleClick(item) } }>{text}</a>
        }
        ]
`
            }
          </Pre>
          <Prop name="howRow" type="Integer" optional children="每页需要显示的条数"></Prop>
          <Prop name="data" type="Array" optional children="DataTable显示数据，选填，url和data属性二者之间必须有一个，不必同时出现。data支持一次性查询多条数据传入data属性中，不需要点击一次分页再发送一次ajax请求，此功能根据业务需求使用！"></Prop>
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


          <Prop name="showPage" type="boolean" optional children="是否显示分页，true为显示，false为不显示,如果showPage设置为false，就要同时取消howRow每页显示多少条的设置"></Prop>
          <Prop name="onPageChange" type="Function" optional children="点击分页时回调函数，此回调方法是点击切换分页时触发，可以在此方法体内发送Ajax请求数据，来替代组件的url属性！注【如果组件加入此属性方法，则不可以再传入url属性】"></Prop>
          <Pre>
{
`
/**
 * 此回调方法是点击切换分页时触发，可以在此方法体内发送Ajax请求数据，来替代组件的url属性
 * @param page 鼠标点击时的当前页码
 */
 onPageChange(page){
   //TODO Ajax请求
 }
render() {
  return <DataTable url="" data={dataJson} onPageChange={this.onPageChange} showPage="true" column={column} howRow={ 10 }></DataTable>
}
`
}
          </Pre>
        </Props>
      </div>
    )
  }
})