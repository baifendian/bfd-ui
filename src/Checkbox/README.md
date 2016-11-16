# 复选框 Checkbox

基本的 Checkbox，选中、半选中、不可用状态
@CheckboxBasic
```js
import Checkbox from 'bfd/Checkbox'

const CheckboxBasic = () => {
  return (
    <div>
      <Checkbox>选中</Checkbox>&nbsp;&nbsp;
      <Checkbox indeterminate>半选中</Checkbox>&nbsp;&nbsp;
      <Checkbox disabled>不可用</Checkbox>
    </div>
  )
}
```

基本的 CheckboxGroup
@CheckboxGroupBasic
```js
import Checkbox, { CheckboxGroup } from 'bfd/Checkbox'

const CheckboxGroupBasic = () => {
  return (
    <CheckboxGroup defaultSelects={['apple']} onChange={selects => console.log(selects)}>
      <Checkbox value="apple">苹果</Checkbox>
      <Checkbox value="samsung">三星</Checkbox>
      <Checkbox value="mi" disabled>小米</Checkbox>
    </CheckboxGroup>
  )
}
```

快速创建复选框组，针对 `value` 和显示内容相同时
@CheckboxGroupValues
```js
import { CheckboxGroup } from 'bfd/Checkbox'

const CheckboxGroupValues = () => {
  return (
    <CheckboxGroup values={['苹果', '三星', '小米']} />
  )
}
```

CheckboxGroup 垂直排列
@CheckboxGroupBlock
```js
import Checkbox, { CheckboxGroup } from 'bfd/Checkbox'

const CheckboxGroupBlock = () => {
  return (
    <CheckboxGroup block>
      <Checkbox value="apple">苹果</Checkbox>
      <Checkbox value="samsung">三星</Checkbox>
      <Checkbox value="mi">小米</Checkbox>
    </CheckboxGroup>
  )
}
```

全选功能
@CheckboxGroupToggleable
```js
import Checkbox, { CheckboxGroup } from 'bfd/Checkbox'

const CheckboxGroupToggleable = () => {
  return (
    <CheckboxGroup toggleable>
      <Checkbox value="apple">苹果</Checkbox>
      <Checkbox value="samsung">三星</Checkbox>
      <Checkbox value="mi">小米</Checkbox>
    </CheckboxGroup>
  )
}
```

## \<Checkbox /> 属性

### value `string|number`
复选框值，如果结合 ChecboxGroup 使用，与其选中的值相对应

### checked `boolean`
是否选中

### defaultChecked `boolean`
同 `checked`，不可控

### onChange `function(e)`
切换选中后的回调

### indeterminate `boolean`
是否半选中状态

### disabled `boolean`
是否禁用

### block `boolean`
是否块级布局

## \<CheckboxGroup /> 属性

### selects `Array`
选中的值，即 Checkbox `value` 的集合

### defaultSelects `Array`
同 `selects`，不可控

### onChange `function(newSelects)`
更改选择后的回调，参数为选中的值

### values `Array`
针对 Checkbox `value` 和显示内容相同时快速创建复选框组，无需单独声明 Checkbox。如:
```js
<CheckboxGroup values=['A', 'B', 'C'] />
```
相当于
```js
<CheckboxGroup>
  <Checkbox value="A">A</Checkbox>
  <Checkbox value="B">B</Checkbox>
  <Checkbox value="C">C</Checkbox>
</CheckboxGroup>
```

### block `boolean`
是否垂直排列

### toggleable `boolean`
是否开启全选功能
