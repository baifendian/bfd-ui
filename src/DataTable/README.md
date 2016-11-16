# 数据表格 DataTable

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


