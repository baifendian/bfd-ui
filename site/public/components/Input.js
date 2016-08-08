import React from 'react'
import Input from 'c/Input'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

export default () => {
  return (
    <div>
      <h1>输入框 Input @hai.jiang</h1>
      <Pre>{`import Input from 'bfd-ui/lib/Input'

export default () => {
  return (
    <div>
      <Input placeholder="小尺寸" size="sm" />
      <br/><br/>
      <Input placeholder="正常" />
      <br/><br/>
      <Input placeholder="大尺寸" size="lg" />
      <br/><br/>
      <Input placeholder="不可用" disabled />
    </div>
  )
}`}
      </Pre>

      <Input placeholder="小尺寸" size="sm" />
      <br/><br/>
      <Input placeholder="正常" />
      <br/><br/>
      <Input placeholder="大尺寸" size="lg" />
      <br/><br/>
      <Input placeholder="不可用" disabled />

      <h2>Input</h2>
      <Props>
        <Prop name="size" type="string">
          <p>按钮尺寸，可选值：sm, lg</p>
        </Prop>
        <Prop name="{...input}">
          <p>input 其它标签属性均支持</p>
        </Prop>
      </Props>
    </div>
  )
}