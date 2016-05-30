import React from 'react'
import Editable from 'c/Editable'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

const EditableDemo = React.createClass({
  render() {
    return (
      <Editable defaultValue="我可以修改哦" />
    )
  }
})

const code = `import Editable from 'bfd-ui/lib/Editable'

const EditableDemo = React.createClass({
  render() {
    return (
      <Editable defaultValue="我可以修改哦" />
    )
  }
})`

export default () => {
  return (
    <div>
      <h1>可编辑的 @hai.jiang</h1>
      <Pre>{code}</Pre>
      <EditableDemo />
      <h2>Editable</h2>
      <Props>
        <Prop name="value" type="string">
          <p>待编辑的值</p>
        </Prop>
        <Prop name="defaultValue" type="string">
          <p>待编辑的值</p>
        </Prop>
        <Prop name="onChange" type="function">
          <p>编辑完确定的回调，参数为修改后的值</p>
        </Prop>
      </Props>
    </div>
  )
}