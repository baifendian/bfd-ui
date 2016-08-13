import React from 'react'
import Switch from 'bfd/Switch'
import Pre from 'public/Pre'
import { Props, Prop } from 'public/Props'

const SwitchDemo = React.createClass({
  render() {
    return <Switch labelOn="打开" labelOff="关闭" />
  }
})

const code = `import Switch from 'bfd-ui/lib/Switch'

export default React.createClass({
  render() {
    return <Switch labelOn="打开" labelOff="关闭" />
  }
})`

export default () => {
  return (
    <div>
      <h1>开关 @hai.jiang</h1>
      <Pre>{code}</Pre>
      <SwitchDemo />
      <h2>Switch</h2>
      <Props>
        <Prop name="on" type="bool">
          <p>是否打开，默认关闭</p>
        </Prop>
        <Prop name="onChange" type="function">
          <p>切换开关后的回调，参数为是否打开</p>
        </Prop>
        <Prop name="labelOn" type="string | React element">
          <p>打开时显示的内容</p>
        </Prop>
        <Prop name="labelOff" type="string | React element">
          <p>关闭时显示的内容</p>
        </Prop>
      </Props>
    </div>
  )
}