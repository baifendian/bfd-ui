@DataTableAutoData
```js
import DataTable from 'bfd/DataTable2'

class DataTableAutoData extends Component {

  constructor(props) {
    super()
    this.columns = [{
      title: '姓名',
      key: 'name',
      width: '20%'
    }, {
      title: '性别',
      render: item => item.sex ? '👨' : '👩',
      width: '15%'
    }, {
      title: '年龄',
      key: 'age',
      sortable: true,
      width: '15%'
    }, {
      title: '注册日期',
      key: 'joinDate',
      sortable: true,
      width: '30%'
    }, {
      title: '操作',
      render: () => <a href="">删除</a>,
      width: '20%'
    }]
    this.data = [{
      name: 'John',
      sex: 1,
      age: 21,
      joinDate: '2015-01-01'
    }, {
      name: 'David',
      sex: 1,
      age: 32,
      joinDate: '2015-02-01'
    }, {
      name: 'Lili',
      sex: 0,
      age: 28,
      joinDate: '2013-01-01'
    }, {
      name: 'Sala',
      sex: 0,
      age: 23,
      joinDate: '2015-07-01'
    }, {
      name: 'Tomas',
      sex: 1,
      age: 11,
      joinDate: '2017-01-01'
    }, {
      name: 'Oabama',
      sex: 1,
      age: 51,
      joinDate: '2017-01-01'
    }]
  }

  render() {
    return (
      <DataTable columns={this.columns} data={this.data} pageSize={5} />
    )
  }
}
```

## DataTable 属性

### ***columns** *`Array`*

列配置，具体字段说明：

- `*title` *`string|ReactElement`* 列头显示内容
- `key` *`string`* 数据对应的键名，关联 *sortKey*, 未定义 *render* 时按 `dataItem[key]` 值渲染
- `sortable`: *`boolean`* 是否开启排序功能，开启后必须定义 *key* 作为排序字段标识
- `width`: *`string`* 列宽，像素或者百分比
- `render`: *`function(dataItem, index, value)`* 自定义单元格渲染逻辑

例如：
```js
[{
  title: '姓名',
  key: 'name',
  width: '20%'
}, {
  title: '授权状态',
  render: dataItem => dataItem.authorised ? '已授权' : '未授权'
}]
```

### **data** *`Array`*

数据源，如果未指定 *totalCounts*，则按 `data.length` 大小自动分页

> 如果指定 *totalCounts*，即使 `data.length` 超过 *pageSize* 也不会自动分页

格式如下，`key` 与 *columns* 配置有关
```js
[{
  name: 'test',
  authorised: true
}]
```

### **url** *`string`*

数据源 url，适用于数据源是独立的接口，分页切换、排序都会动态发请求

> 这里的 *url* 不包括分页、排序等查询条件，组件内部会自动拼接，比如 *url* 指定为 `path/query.do`，最终发出的请求会变成 `path/query.do?start=0&limit=10`。如果这种 url 格式不满足，可用 *getUrl* 代替

返回的 JSON 格式：
```js
[{
  "totalCounts": 100, // 总条数
  "data": [{}] // 具体的数据，同 data 属性格式
}]
```
如果后台返回的格式无法满足，除定义 [xhr模块全局配置](xhr#success) 外，可自定义 *dataFilter* 过滤

### **getUrl** *`function(condition)`*

*url* 的替代方案，可自定义具体请求的 url，包括分页、排序等操作的请求。*condition* 是条件对象，包括当前页、排序等信息。用法如下：
```js
<DataTable getUrl={({ currentPage, pageSize }) => `path/user/${currentPage}/${pageSize}`} />
```



