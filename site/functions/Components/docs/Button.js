import React from 'react'
import { Row, Col } from 'bfd/Layout'
import Button from 'bfd/Button'
import Pre from 'public/Pre'
import Warn from 'public/Warn'
import { Props, Prop } from 'public/Props'
import Demo from 'public/Demo'

const ButtonType = () => {
  return (
    <div>
      <Button>默认</Button>
      <Button type="minor">次要</Button>
    </div>
  )
}
const codeButtonType = `import Button from 'bfd/Button'

const ButtonType = () => {
  return (
    <div>
      <Button>默认</Button>
      <Button type="minor">次要</Button>
    </div>
  )
}`


const ButtonSize = () => {
  return (
    <div>
      <Button size="lg">大尺寸</Button>
      <Button>默认</Button>
      <Button size="sm">小尺寸</Button>
    </div>
  )
}
const codeButtonSize = `import Button from 'bfd/Button'

const ButtonSize = () => {
  return (
    <div>
      <Button size="lg">大尺寸</Button>
      <Button>默认</Button>
      <Button size="sm">小尺寸</Button>
    </div>
  )
}`


const ButtonIcon = () => {
  return (
    <div>
      <Button icon="plus">添加</Button>
      <Button icon="align-left" />
    </div>
  )
}
const codeButtonIcon = `import Button from 'bfd/Button'

const ButtonIcon = () => {
  return (
    <div>
      <Button icon="plus">添加</Button>
      <Button icon="align-left" />
    </div>
  )
}`


const ButtonCircle = () => {
  return (
    <div>
      <Button icon="plus" circle />
      <Button circle>赞</Button>
    </div>
  )
}
const codeButtonCircle = `import Button from 'bfd/Button'

const ButtonCircle = () => {
  return (
    <div>
      <Button icon="plus" circle />
      <Button circle>赞</Button>
    </div>
  )
}`


const ButtonTransparent = () => {
  return (
    <div>
      <Button icon="plus" transparent />
      <Button icon="angle-double-down" transparent>代码</Button>
    </div>
  )
}
const codeButtonTransparent = `import Button from 'bfd/Button'

const ButtonTransparent = () => {
  return (
    <div>
      <Button icon="plus" transparent />
      <Button icon="angle-double-down" transparent>代码</Button>
    </div>
  )
}`


const ButtonInverse = () => {
  return (
    <div style={{backgroundColor: '#42a5f5'}}>
      <Button type="inverse" icon="remove" transparent />
    </div>
  )
}
const codeButtonInverse = `import Button from 'bfd/Button'

const ButtonInverse = () => {
  return (
    <div style={{backgroundColor: '#42a5f5'}}>
      <Button type="inverse" icon="remove" transparent />
    </div>
  )
}`


const ButtonDisabled = () => {
  return (
    <div>
      <Button disabled>不可用</Button>
      <Button icon="plus" disabled />
    </div>
  )
}
const codeButtonDisabled = `import Button from 'bfd/Button'

const ButtonInverse = () => {
  return (
    <div>
      <Button disabled>不可用</Button>
      <Button icon="plus" disabled />
    </div>
  )
}`

export default () => {
  return (
    <div>
      <Row gutter>
        <Col col="md-6">
          <Demo title="按钮类型" code={codeButtonType} desc="inverse 类型参考反色按钮 DEMO">
            <ButtonType />
          </Demo>
          <Demo title="图标按钮" code={codeButtonIcon} desc="自定义图标位置请单独使用 Icon 组件">
            <ButtonIcon />
          </Demo>
          <Demo title="透明背景" code={codeButtonTransparent}>
            <ButtonTransparent />
          </Demo>
          <Demo title="不可用的" code={codeButtonDisabled}>
            <ButtonDisabled />
          </Demo>
        </Col>
        <Col col="md-6">
          <Demo title="按钮尺寸" code={codeButtonSize}>
            <ButtonSize />
          </Demo>
          <Demo title="圆形按钮" code={codeButtonCircle}>
            <ButtonCircle />
          </Demo>
          <Demo title="反色按钮" code={codeButtonInverse} desc="针对深色背景的场景">
            <ButtonInverse />
          </Demo>
        </Col>
      </Row>

      <Props tag="Button">
        <Prop name="type" type="string">
          <p>按钮类型，可选值: minor, inverse，inverse 仅针对 transparent 模式时有效</p>
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
        <Prop name="transparent" type="boolean">
          <p>背景是否为 transparent</p>
        </Prop>
        <Prop name="{...button}">
          <p>button 其它标签属性均支持</p>
        </Prop>
      </Props>
    </div>
  )
}