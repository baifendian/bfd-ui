import React, {
  Component
} from 'react'
import ButtonGroup from 'c/ButtonGroup'
import Button from 'c/Button'
import Panel from '../Panel'
import Pre from '../Pre'
import {
  Props,
  Prop
} from '../Props'
const codeBasic = `import ButtonGroup from 'bfd-ui/lib/ButtonGroup'
import Button from 'bfd-ui/lib/Button'

export default React.createClass({

  handleClick(value) {
    console.log(value)
  },

  render() {
    return (
      <ButtonGroup defaultValue="2" onClick={this.handleClick}>
        <Button value="1">按钮一</Button>
        <Button value="2">按钮二</Button>
        <Button value="3">按钮三</Button>
        <Button value="4">按钮四</Button>
        <Button value="5">按钮五</Button>
      </ButtonGroup>
    )
  }
})

`
class Basic extends Component {

  handleClick(value) {
    console.log(value)
  }

  render() {
    return (
      <ButtonGroup defaultValue="2" onClick={this.handleClick}>
        <Button value="1">按钮一</Button>
        <Button value="2">按钮二</Button>
        <Button value="3">按钮三</Button>
        <Button value="4">按钮四</Button>
        <Button value="5">按钮五</Button>
      </ButtonGroup>
    )
  }
}

export default () => {

  return (
    <div>
      <h1>按钮组 @tenglong.jiang</h1>
      <Panel title="基础功能" code={codeBasic}>
        <Basic />
      </Panel>
      <h2>ButtonGroup</h2>
      <Props>
        <Prop name="defalutValue" type="string | number">
          <p>默认值</p>
        </Prop>
        <Prop name="onClick" type="Function">
          <p>点击事件，参数返回被选中的值</p> 
        < /Prop>
      </Props>
    </div>
  )
}