import React from 'react'
import { MultipleSelect, Option } from 'c/MultipleSelect'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

// const render = (item, i) => {
//   return <Option value={item.id}>{item.name}</Option>
// }

const codeBasic = `import { MultipleSelect, Option } from 'bfd-ui/lib/MultipleSelect'

export default React.createClass({

  handleChange(values) {
    console.log(values)
  },

  render() {
    return (
      <MultipleSelect defaultValues={['1', '2']} onChange={this.handleChange}>
        <Option value="0">苹果</Option>
        <Option value="1">三星</Option>
        <Option value="2">小米</Option>
      </MultipleSelect>
    )
  }
})`

const Basic = React.createClass({

  handleChange(values) {
    console.log(values)
  },

  render() {
    return (
      <MultipleSelect defaultValues={['1', '2']} onChange={this.handleChange}>
        <Option value="0">苹果</Option>
        <Option value="1">三星</Option>
        <Option value="2">小米</Option>
      </MultipleSelect>
    )
  }
})


const Tagable = React.createClass({

  handleChange(values) {
    console.log(values)
  },

  render() {
    return (
      <MultipleSelect defaultValues={['便宜']} tagable onChange={this.handleChange}>
        <Option>质量好</Option>
        <Option>便宜</Option>
        <Option>外观漂亮</Option>
      </MultipleSelect>
    )
  }
})

const codeTagable = `import { MultipleSelect, Option } from 'bfd-ui/lib/MultipleSelect'

export default React.createClass({

  handleChange(values) {
    console.log(values)
  },

  render() {
    return (
      <MultipleSelect defaultValues={['便宜']} tagable onChange={this.handleChange}>
        <Option>质量好</Option>
        <Option>便宜</Option>
        <Option>外观漂亮</Option>
      </MultipleSelect>
    )
  }
})`

export default () => {
  return (
    <div>
      <h1>多选列表 @hai.jiang</h1>
      <h2>基础功能</h2>
      <Pre>{codeBasic}</Pre>
      <Basic />
      <h2>标签输入功能</h2>
      <Pre>{codeTagable}</Pre>
      <Tagable />
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
        <Prop name="tagable" type="boolean">
          <p>标签输入形式，支持自定义输入标签</p>
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