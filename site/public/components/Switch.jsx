import React from 'react'
import Switch from 'c/Switch'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

const SwitchDemo = React.createClass({
  render() {
    return <Switch />
  }
})

const code = `import Switch from 'bfd-ui/lib/Switch'

export default React.createClass({
  render() {
    return <Switch />
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
          <p>切换开关后的回调，参数为是否开关</p>
        </Prop>
      </Props>
    </div>
  )
}