import React from 'react'
import ClearableInput from 'c/ClearableInput'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

const code = `import ClearableInput from 'bfd-ui/lib/ClearableInput'

const App = React.createClass({
  render() {
    return <ClearableInput value="test" />
})`

export default React.createClass({
  render() {
    return (
      <div>
        <h1>可清空的输入框</h1>
        <Pre>{code}</Pre>
        <ClearableInput value="test"></ClearableInput>
        <Props>
          <Prop name="value" type="String">
            <p>输入框值</p>
          </Prop>
          <Prop name="size" type="String">
            <p>输入框高度尺寸，参考 Bootstrap input，可选值：lg, sm</p>
          </Prop>
          <Prop name="placeholder" type="String">
            <p>同 input placeholder</p>
          </Prop>
          <Prop name="onChange" type="Function">
            <p>输入框值改变后的回调，包括清空动作。参数为改变后的值</p>
          </Prop>
        </Props>
      </div>
    )
  }
})