import React from 'react'
import ClearableInput from 'c/ClearableInput'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

const code = `import ClearableInput from 'bfd-ui/lib/ClearableInput'

export default React.createClass({
  render() {
    return <ClearableInput />
})`

export default React.createClass({
  render() {
    return (
      <div>
        <h1>可清空的输入框 @hai.jiang</h1>
        <Pre>{code}</Pre>
        <ClearableInput />
        <Props>
          <Prop name="value" type="String">
            <p>输入框值</p>
          </Prop>
          <Prop name="defalutValue" type="String">
            <p>输入框值</p>
          </Prop>
          <Prop name="size" type="string">
            <p>输入框高度尺寸，参考 Bootstrap input，可选值：lg, sm</p>
          </Prop>
          <Prop name="inline" type="boolean">
            <p>是否为行内模式(display: inline-block)</p>
          </Prop>
          <Prop name="onChange" type="function">
            <p>输入框值改变后的回调，包括清空动作。参数为改变后的值</p>
          </Prop>
          <Prop name="onClear" type="function">
            <p>清空后的回调</p>
          </Prop>
          <Prop name="{ ...input }">
            <p>input 属性均支持</p>
          </Prop>
        </Props>
        <h3>组件方法</h3>
        <ul>
          <li>
            <p>
              <strong>focus()</strong>
            </p>
            <p>控制 input focus 行为</p>
          </li>
        </ul>
      </div>
    )
  }
})