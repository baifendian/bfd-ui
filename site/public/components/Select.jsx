import React from 'react'
import { Select, Option } from 'c/Select'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

const render = (item, i) => {
  return <Option value={item.id}>{item.name}</Option>
}

const SelectDemo = React.createClass({
  render() {
    return (
      <Select>
        <Option>请选择</Option>
        <Option value="0">苹果</Option>
        <Option value="1">三星</Option>
        <Option value="2">小米</Option>
      </Select>
    )
  }
})

const code = `import { Select, Option } from 'bfd-ui/lib/Select'

export default React.createClass({
  render() {
    return (
      <Select>
        <Option>请选择</Option>
        <Option value="0">苹果</Option>
        <Option value="1">三星</Option>
        <Option value="2">小米</Option>
      </Select>
    )
  }
})`

export default () => {
  return (
    <div>
      <h1>选择列表 @hai.jiang</h1>
      <Pre>{code}</Pre>
      <SelectDemo />
      <h2>Select</h2>
      <Props>
        <Prop name="value" type="string | number">
          <p>选中的值</p>
        </Prop>
        <Prop name="defaultValue" type="string | number">
          <p>选中的值</p>
        </Prop>
        <Prop name="onChange" type="function">
          <p>切换选择后的回调，参数为选中的值</p>
        </Prop>
        <Prop name="placeholder" type="string">
          <p>无选项匹配时显示的内容</p>
        </Prop>
        <Prop name="disabled" type="boolean">
          <p>是否禁用</p>
        </Prop>
        <Prop name="size" type="string">
          <p>其他尺寸，可选值：lg</p>
        </Prop>
        <Prop name="url" type="string">
          <p>ajax 方式加载数据</p>
        </Prop>
        <Prop name="render" type="function">
          <p>使用 url 方式时，自定义 Option 渲染逻辑</p>
          <Pre>{`const render = item => <Option value={item.id}>{item.name}</Option>
<Select url="/api/list" render={render} />`}</Pre>
        </Prop>
        <Prop name="defaultOption" type="React element">
          <p>使用 url 方式时，自定义空值时的 Option</p>
          <Pre>{`<Select url="/api/list" defaultOption={<Option>请选择</Option>} />`}</Pre>
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