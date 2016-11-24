# 可编辑的 Editable

@EditableBasic
```js
import Editable from 'bfd/Editable'

const EditableBasic = () => {
  return (
    <Editable defaultValue="点击修改" />
  )
}
```

## \<Editable /> 属性

### value `string|number`
待编辑的值

### defaultValue `string|number`
同 `value`，不可控

### onChange `function(newValue)`
确定后的回调

### onCancel `function()`
取消后的回调

### defaultEditing `boolean`
是否处于编辑状态，不可控　
