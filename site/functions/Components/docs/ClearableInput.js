import React from 'react'
import { Link } from 'react-router'
import ClearableInput from 'bfd/ClearableInput'
import Pre from 'public/Pre'
import {
  Props,
  Prop
} from 'public/Props'

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
        <ClearableInput size="lg" />
        <Props>
          <Prop name="onChange" type="function">
            <p>输入框值改变后的回调，包括清空动作。参数为改变后的值</p>
          </Prop>
          <Prop name="onClear" type="function">
            <p>清空后的回调</p>
          </Prop>
          <Prop name="{ ...Input }">
            <p><Link to="/components/Input">Input</Link> 属性均支持</p>
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