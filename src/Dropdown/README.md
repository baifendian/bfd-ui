# 下拉 Dropdown

@DropdownBasic
```js
import { Dropdown, DropdownToggle, DropdownMenu } from 'bfd/Dropdown'
import Button from 'bfd/Button'

const DropdownBasic = () => {
  return (
    <Dropdown>
      <DropdownToggle>
        <Button>展开</Button>
      </DropdownToggle>
      <DropdownMenu>
        Nullam quis risus eget urna mollis
        ornare vel eu leo. Cum sociis natoque
        penatibus et magnis dis parturient montes
      </DropdownMenu>
    </Dropdown>
  )
}
```

## \<Dropdown /> 属性

### open `boolean`
是否展开

### onToggle `function(isOpen)`
展开或收起后的回调

### disabled `boolean`
是否禁用


## \<Dropdown /> 接口

### open `function()`
展开

### close `function()`
收起


## \<DropdownMenu /> 属性

### right `boolean`
是否右对齐
