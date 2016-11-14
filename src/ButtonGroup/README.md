# 按钮组 ButtonGroup

## Demo

@ButtonGroupBasic
```js
import ButtonGroup from 'bfd/ButtonGroup'
import Button from 'bfd/Button'

class ButtonGroupBasic extends Component {

  render() {
    return (
      <ButtonGroup defaultValue="2" onChange={newValue => console.log(newValue)}>
        <Button value="1">按钮一</Button>
        <Button value="2">按钮二</Button>
        <Button value="3">按钮三</Button>
        <Button value="4">按钮四</Button>
        <Button value="5">按钮五</Button>
      </ButtonGroup>
    )
  }
}
```

### <ButtonGroup /> 属性

###
