# 下拉选择 Select

## Demo

最基本的使用
@SelectBasic
```js
import { Select, Option } from 'bfd/Select'

const SelectBasic = () => {
  return (
    <Select>
      <Option>请选择</Option>
      <Option value="0">苹果</Option>
      <Option value="1">三星</Option>
      <Option value="2">小米</Option>
    </Select>
  )
}
```

data 数据源
@SelectData
```js
import { Select, Option } from 'bfd/Select'

const SelectData = () => {
  const data = [{
    id: 0,
    name: '苹果'
  }, {
    id: 1,
    name: '三星'
  }, {
    id: 2,
    name: '小米'
  }]
  return (
    <Select
      data={data}
      render={item => <Option value={item.id}>{item.name}</Option>}
      defaultOption={<Option>请选择</Option>}
    />
  )
}
```

url 数据
@SelectUrl
```js
import { Select, Option } from 'bfd/Select'

const SelectUrl = () => {
  return (
    <Select
      defaultValue={1}
      url="/data/select.json"
      render={item => <Option value={item.id}>{item.name}</Option>}
      defaultOption={<Option>请选择</Option>}
    />
  )
}
```

可搜索的
@SelectSearchable
```js
import { Select, Option } from 'bfd/Select'

const SelectSearchable = () => {
  return (
    <Select searchable>
      <Option>请选择</Option>
      <Option value="0">苹果</Option>
      <Option value="1">三星</Option>
      <Option value="2">小米</Option>
    </Select>
  )
}
```

禁用的
@SelectDisabled
```js
import { Select, Option } from 'bfd/Select'

const SelectDisabled = () => {
  return (
    <Select disabled>
      <Option>请选择</Option>
      <Option value="0">苹果</Option>
      <Option value="1">三星</Option>
      <Option value="2">小米</Option>
    </Select>
  )
}
```

## <Select /> 属性

### value `string|number`
选中的值，同 Option value 对应

### defaultValue `string|number`
同 `value`，不可控

### onChange `function(newValue)`
切换选择后的回调

### data `Array`
数据源，自动生成 Option，需结合 `render` 自定义 Option 渲染逻辑，例如 data:
```js
[{
  id: 0,
  name: 'test'
}, {
  id: 2,
  name: 'test'
}]
```
`render` 则定义为：
```js
function render(item) {
  return <Option value={item.id}>{item.name}</Option>
}
```

### url `string`
url 数据源，用法及返回的格式同 `data`

### dataFilter `function(response)`
针对 `url` 返回的格式不满足，可自己过滤

### render `function(dataItem, index)`
`data` 或 `url` 方式 Option 渲染逻辑，例如
```js
function render(item) {
  return <Option value={item.id}>{item.name}</Option>
}
```

### defaultOption `ReactElement`
默认的 Option，通常在 `data` 或 `url` 方式下使用，针对空值的渲染逻辑，如
```js
<Select url="path/list" defaultOption={<Option>请选择</Option>} />
```

### placeholder `number|string|ReactElement`
针对无 `value` 场景下显示的内容

### searchable `boolean`
是否可搜索，搜索范围为 Option 的 `value` 和 `children`

### disabled `boolean`
是否禁用

### size `string`
尺寸，同 [Input size](Input#size)
