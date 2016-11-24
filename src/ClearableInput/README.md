# 可清空的输入框 ClearableInput

@ClearableInputBasic
```js
import ClearableInput from 'bfd/ClearableInput'

const ClearableInputBasic = () => {
  return (
    <ClearableInput defaultValue="清除" />
  )
}
```

## \<ClearableInput /> 属性

### value、defaultValue、onChange、size、disabled、placeholder
与 [Input](Input) 属性相同
> 清空后也会触发 `onChange`

### onClear `function()`
清空后的回调


## \<ClearableInput /> 接口

### focus `function()`
同 `HTMLInputElement.focus()`

### select `function()`
同 `HTMLInputElement.select()`
