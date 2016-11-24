# 数据表格 DataTable

> 建议使用 [DataTable2](DataTable2)

@DataTableBasic
```js
import DataTable from 'bfd/DataTable'

class DataTableBasic extends Component {

  constructor(props) {
    super()
    this.state = {
      url: "/api/table",
      column: [{
        title: '序号',
        key: 'sequence'
      },{
        primary: true,
        title: 'ID',
        key: 'id',
        hide: true
      }, {
        title: '姓名',
        order: true,
        width: '100px',
        render: (text, item, index) => {
          return <a href="javascript:void(0);" onClick={this.handleClick.bind(this, item)}>{text}</a>
        },
        key: 'name'
      }, {
        title: '年龄',
        key: 'age',
        order: 'desc'
      }, {
        title: '国家/地区',
        key: 'country',
        width: '20%',
        render: (text, item, index) => {
          return item.country + "/" + item.area
        }
      }, {
        title: '注册日期',
        key: 'regdate',
        order: 'asc'
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
  }

  handleClick(item, event) {
    event = event ? event : window.event;
    event.stopPropagation();
    console.log(item)
  }

  onPageChange(page) {
    this.setState({
      url: "/api/table"
    })
  }

  handleCheckboxSelect(selectedRows, allSelectedRows) {
    console.log('rows:', selectedRows)
    console.log('all:', allSelectedRows)
  }

  handleRowClick(row) {
    console.log('rowclick', row)
  }

  handleOrder(name, sort) {
    console.log(name, sort)
  }

  render() {
    return (
      <DataTable
        url={this.state.url}
        onPageChange={::this.onPageChange}
        showPage="true"
        column={this.state.column}
        howRow={10}
        onRowClick={::this.handleRowClick}
        onOrder={::this.handleOrder}
        onCheckboxSelect={::this.handleCheckboxSelect}
      />
    )
  }
}
```

## \<DataTable /> 属性

### *column `Array`
数据表格表头列名称，目前支持的配置项如下：
- `*title: number|string|ReactElement` 列头显示内容
- `key: string` 映射数据字段名称
- `primary: boolean` 是否为主键
- `order: boolean|string` 是否开启排序功能，设置为字符串（desc或asc）则进入排序状态
- `width: string` 列宽，像素或者百分比
- `render: function(value, dataItem, index)` 自定义单元格渲染逻辑

### howRow `number`
每页需要显示的条数

### data `object`
DataTable显示数据，选填，url和data属性二者之间必须有一个，不必同时出现。data支持一次性查询多条数据传入data属性中，不需要点击一次分页再发送一次ajax请求，此功能根据业务需求使用！
格式如下：
```js
{
  totalList: [{...}], // 数据 List
  currentPage: 1, // 当前页
  totalPageNum: 300 // 总条数
}
```

### url `string`
要请求数据的服务端地址，返回格式同 `data`

### showPage `boolean`
是否显示分页，true为显示，false为不显示,如果showPage设置为false，就要同时取消howRow每页显示多少条的设置

### onPageChange `function(newPage)`
点击分页时回调函数，此回调方法是点击切换分页时触发，可以在此方法体内发送Ajax请求数据，来替代组件的url属性！
> 如果组件加入此属性方法，则不可以再传入url属性

### onCheckboxSelect `function(selectedRows)`
复选框点击事件，返回被选中的行记录（本页），如果在column中设置主键，此函数第二个参数为已选的行记录（跨页）

### onRowClick `function(selectedRow)`
行点击事件，返回被选中的行记录

### onOrder `function(sortKey, sortType)`
列名称点击排序事件，返回列名称和排序状态

### hideGo `boolean`
是否隐藏页面跳转功能
