import React from 'react'
import ButtonGroup from 'bfd/ButtonGroup'
import Button from 'bfd/Button'
import Panel from 'public/Demo'
import Pre from 'public/Pre'
import {
  Props,
  Prop
} from 'public/Props'

const codeBasic = `import ButtonGroup from 'bfd-ui/lib/ButtonGroup'
import Button from 'bfd-ui/lib/Button'

export default React.createClass({

  handleChange(value) {
    console.log(value)
  },

  render() {
    return (
      <ButtonGroup defaultValue="2" onChange={this.handleChange}>
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
const Basic = React.createClass({

  handleChange(value) {
    console.log(value)
  },

  render() {
    return (
      <ButtonGroup defaultValue="2" onChange={this.handleChange}>
        <Button value="1">按钮一</Button>
        <Button value="2">按钮二</Button>
        <Button value="3">按钮三</Button>
        <Button value="4">按钮四</Button>
        <Button value="5">按钮五</Button>
      </ButtonGroup>
    )
  }
})

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
        <Prop name="onChange" type="Function">
          <p>选中事件，参数返回被选中的值</p> 
        < /Prop>
      </Props>
    </div>
  )
}