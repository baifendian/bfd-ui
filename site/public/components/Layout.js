import React from 'react'
import { Row, Col } from 'c/Layout'
import Panel from '../Panel'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

const codeBasic = `import { Row, Col } from 'bfd-ui/lib/Layout'

const Basic = () => {
  return (
    <Row>
      <Col col="md-4" style={{backgroundColor: '#e3f2fd'}}>md-4</Col>
      <Col col="md-8" style={{backgroundColor: '#bbdefb'}}>md-8</Col>
    </Row>
  )
}`

const Basic = () => {
  return (
    <Row>
      <Col col="md-4" style={{backgroundColor: '#e3f2fd'}}>md-4</Col>
      <Col col="md-8" style={{backgroundColor: '#bbdefb'}}>md-8</Col>
    </Row>
  )
}

const codeGutter = `import { Row, Col } from 'bfd-ui/lib/Layout'

const Gutter = () => {
  return (
    <Row gutter>
      <Col col="md-4">
        <div style={{backgroundColor: '#e3f2fd'}}>md-4</div>
      </Col>
      <Col col="md-8">
        <div style={{backgroundColor: '#bbdefb'}}>md-4</div>
      </Col>
    </Row>
  )
}`

const Gutter = () => {
  return (
    <Row gutter>
      <Col col="md-4">
        <div style={{backgroundColor: '#e3f2fd'}}>md-4</div>
      </Col>
      <Col col="md-8">
        <div style={{backgroundColor: '#bbdefb'}}>md-4</div>
      </Col>
    </Row>
  )
}

const codeRight = `import { Row, Col } from 'bfd-ui/lib/Layout'

const Right = () => {
  return (
    <Row>
      <Col col="md-4" style={{backgroundColor: '#e3f2fd'}}>md-4</Col>
      <Col right style={{backgroundColor: '#bbdefb'}}>right</Col>
    </Row>
  )
}`

const Right = () => {
  return (
    <Row>
      <Col col="md-4" style={{backgroundColor: '#e3f2fd'}}>md-4</Col>
      <Col right style={{backgroundColor: '#bbdefb'}}>right</Col>
    </Row>
  )
}

export default () => {
  return (
    <div>
      <h1>布局 @hai.jiang</h1>
      <p>布局思路沿用 bootstrap 栅格系统，与 bootstrap 响应式布局用法一致</p>

      <Panel title="不带间隔" code={codeBasic}>
        <Basic />
      </Panel>

      <Panel title="带间隔" code={codeGutter}>
        <Gutter />
      </Panel>

      <Panel title="右浮动" code={codeRight}>
        <Right />
      </Panel>

      <h2>Row</h2>
      <Props>
        <Prop name="gutter" type="boolean">
          <p>是否带间隔</p>
        </Prop>
      </Props>

      <h2>Col</h2>
      <Props>
        <Prop name="col" type="string">
          <p>布局规则，支持响应式，详细参考 <a href="http://v3.bootcss.com/css/#grid-options" target="_blank">bootstrap</a> 布局用法</p>
          <Pre>{'<Col col="md-6 sm-8">hello</Col>'}</Pre>
        </Prop>
        <Prop name="right" type="boolean">
          <p>是否右浮动，右对齐时无需指定 col 属性</p>
        </Prop>
      </Props>
    </div>
  )
}