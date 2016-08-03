import React from 'react'
import BubbleChart from 'c/BubbleChart'
import Pre from '../Pre'
import { Props, Prop } from '../Props'
import Panel from '../Panel'
import Button from 'c/Button'

const codeBasic = `import Button from 'bfd-ui/lib/Button'

export default () => {
  return (
    <div>
      <Button type="default">默认</Button>
      <Button type="primary">主要</Button>
      <Button type="primary" size="sm">小尺寸</Button>
    </div>
  )
}
`

export default React.createClass({
  render() {
    return (
      <div>
        <h1>按钮 Button @hai.jiang</h1>
        <Pre>{`import Button from 'bfd-ui/lib/Button'

export default () => {
  return (
    <div>
      <Button>主要</Button>
      <Button type="minor">次要</Button>
      <Button type="danger">危险</Button>
      <Button icon="plus">带图标</Button>
      <Button icon="plus" />
      <Button icon="plus" size="sm" />
      <Button icon="plus" size="sm" transparent />
      <Button icon="plus" size="sm" type="minor" transparent />
      <Button icon="plus" circle />
      <Button icon="plus" size="sm" circle />
      <Button circle>赞</Button>
      <Button size="sm">小尺寸</Button>
      <Button disabled>禁用</Button>
    </div>
  )
}`}
        </Pre>
        <Button>主要</Button>
        <Button type="minor">次要</Button>
        <Button type="danger">危险</Button>
        <Button icon="plus">带图标</Button>
        <Button icon="plus" />
        <Button icon="plus" size="sm" />
        <Button icon="plus" size="sm" transparent />
        <Button icon="plus" size="sm" type="minor" transparent />
        <Button icon="plus" circle />
        <Button icon="plus" size="sm" circle />
        <Button circle>赞</Button>
        <Button size="sm">小尺寸</Button>
        <Button disabled>禁用</Button>

        <h2>Button</h2>
        <Props>
          <Prop name="type" type="string">
            <p>按钮类型，可选值: minor, danger, inverse（只针对 transparent 有效）</p>
          </Prop>
          <Prop name="size" type="string">
            <p>按钮尺寸，可选值：sm</p>
          </Prop>
          <Prop name="icon" type="string">
            <p>按钮图标，同 Icon type</p>
          </Prop>
          <Prop name="circle" type="boolean">
            <p>是否为圆形</p>
          </Prop>
          <Prop name="disabled" type="boolean">
            <p>是否禁用</p>
          </Prop>
          <Prop name="transparent" type="boolean">
            <p>背景是否为 transparent</p>
          </Prop>
        </Props>
      </div>
    )
  }
})