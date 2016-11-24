# 确认提示 confirm

@ConfirmBasic
```js
import confirm from 'bfd/confirm'
import Button from 'bfd/Button'

const ConfirmBasic = () => {
  return (
    <Button onClick={() => {
      confirm('确认删除吗', () => {
        console.log(1)
      })
    }}>删除确认</Button>
  )
}
```

## confirm

### confirm `function(message, onConfirm)`
- `content: string|number|ReactElement` 提示框内容
- `onConfirm: function()` 确定后的回调
