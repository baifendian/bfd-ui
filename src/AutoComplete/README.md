# 自动完成 AutoComplete

与 [Input](Input) 不同的是匹配项提示，可以更快的完成输入

@AutoCompleteBasic
```js
import AutoComplete from 'bfd/AutoComplete'

const AutoCompleteBasic = () => {
  return (
    <AutoComplete placeholder="输入关键词" source={['test', 'test2']} />
  )
}
```

## \<AutoComplete /> 属性

### *source `Array`
待搜索的数据源，例如
```js
['ActionScript', 'JavaScript']
```

### value、defaultValue、onChange、size、disabled、placeholder
与 [Input](Input) 属性相同
> 选择一条后也会触发 `onChange`
