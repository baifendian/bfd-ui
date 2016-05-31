import React from 'react'
import { MultipleSelect, Option } from 'c/MultipleSelect'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

const render = (item, i) => {
  return <Option value={item.id}>{item.name}</Option>
}

const MultipleSelectDemo = React.createClass({
  render() {
    return (
      <MultipleSelect defaultValues={['0', '1']}>
        <Option value="0">苹果</Option>
        <Option value="1">三星</Option>
        <Option value="2">小米</Option>
      </MultipleSelect>
    )
  }
})

const code = `import { MultipleSelect, Option } from 'bfd-ui/lib/MultipleSelect'

const MultipleSelectDemo = React.createClass({
  render() {
    return (
      <MultipleSelect defaultValues={['0', '1']}>
        <Option value="0">苹果</Option>
        <Option value="1">三星</Option>
        <Option value="2">小米</Option>
      </MultipleSelect>
    )
  }
})`

export default () => {
  return (
    <div>
      <h1>多选列表 @hai.jiang</h1>
      <Pre>{code}</Pre>
      <MultipleSelectDemo />
      <h2>MultipleSelect</h2>
      <Props>
        <Prop name="values" type="array">
          <p>选中的值，需配合 onChange 使用</p>
        </Prop>
        <Prop name="defaultValues" type="array">
          <p>选中的值</p>
        </Prop>
        <Prop name="onChange" type="function">
          <p>切换选择后的回调，参数为选中的值</p>
        </Prop>
        <Prop name="url" type="string">
          <p>ajax 方式加载数据</p>
        </Prop>
        <Prop name="render" type="function">
          <p>使用 url 方式时，自定义 Option 渲染逻辑</p>
          <Pre>{`const render = item => <Option value={item.id}>{item.name}</Option>
<MultipleSelect url="/api/list" render={render} />`}</Pre>
        </Prop>
        <Prop name="disabled" type="boolean">
          <p>是否禁用</p>
        </Prop>
      </Props>
      <h2>Option</h2>
      <Props>
        <Prop name="value" type="string | number">
          <p>值</p>
        </Prop>
      </Props>
    </div>
  )
}