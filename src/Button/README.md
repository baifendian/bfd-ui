# 按钮 Button

## Demo

按钮类型
@ButtonType
```js
import Button from 'bfd/Button'

const ButtonType = () => {
  return (
    <div>
      <Button>默认</Button>
      <Button type="minor">次要</Button>
    </div>
  )
}
```

按钮尺寸
@ButtonSize
```js
import Button from 'bfd/Button'

const ButtonSize = () => {
  return (
    <div>
      <Button size="lg">大尺寸</Button>
      <Button>默认</Button>
      <Button size="sm">小尺寸</Button>
    </div>
  )
}
```

带图标的按钮
@ButtonIcon
```js
import Button from 'bfd/Button'

const ButtonIcon = () => {
  return (
    <div>
      <Button icon="plus">添加</Button>
      <Button icon="align-left" />
    </div>
  )
}
```

圆形按钮
@ButtonCircle
```js
import Button from 'bfd/Button'

const ButtonCircle = () => {
  return (
    <div>
      <Button icon="plus" circle />
      <Button circle>赞</Button>
    </div>
  )
}
```

背景透明，文字颜色继承父级
@ButtonTransparent
```js
import Button from 'bfd/Button'

const ButtonTransparent = () => {
  return (
    <div>
      <Button icon="plus" transparent />
      <Button icon="angle-double-down" transparent>代码</Button>
    </div>
  )
}
```

不可用的
@ButtonDisabled
```js
import Button from 'bfd/Button'

const ButtonDisabled = () => {
  return (
    <div>
      <Button disabled>不可用</Button>
      <Button icon="plus" disabled />
    </div>
  )
}
```


## <Button /> 属性

### type `string`
按钮类型，除默认外可选值：次要的 `minor`

### size `string`
按钮尺寸，除默认外可选值：小尺寸 `sm`, 大尺寸 `lg`

### icon `string`
按钮图标，同 [Icon type](Icon#type)

### circle `boolean`
是否为圆形

### transparent `boolean`
背景是否透明
