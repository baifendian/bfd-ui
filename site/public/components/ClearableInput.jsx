import React from 'react'
import ClearableInput from 'c/ClearableInput'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

const code = `import ClearableInput from 'bfd-ui/lib/ClearableInput'

const App = React.createClass({
  render() {
    return <ClearableInput />
})`

export default React.createClass({
  render() {
    return (
      <div>
        <h1>可清空的输入框</h1>
        <Pre>{code}</Pre>
        <ClearableInput></ClearableInput>
        <Props>
          <Prop name="type" type="String">
            <p>输入框类型，同 input type，默认 text</p>
          </Prop>
          <Prop name="value" type="String">
            <p>输入框值</p>
          </Prop>
          <Prop name="size" type="string">
            <p>输入框高度尺寸，参考 Bootstrap input，可选值：lg, sm</p>
          </Prop>
          <Prop name="placeholder" type="string">
            <p>同 input placeholder</p>
          </Prop>
          <Prop name="inline" type="boolean">
            <p>是否为行内模式(display: inline-block)</p>
          </Prop>
          <Prop name="onChange" type="function">
            <p>输入框值改变后的回调，包括清空动作。参数为改变后的值</p>
          </Prop>
        </Props>
      </div>
    )
  }
})