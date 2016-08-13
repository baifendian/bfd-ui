import React from 'react'
import { MultipleSelect, Option } from 'bfd/MultipleSelect'
import Pre from 'public/Pre'
import { Props, Prop } from 'public/Props'
import Panel from 'public/Demo'

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

const codeURLable = `import { MultipleSelect, Option } from 'bfd-ui/lib/MultipleSelect'

export default React.createClass({
  render() {
    return (
      <MultipleSelect 
        defaultValues={[1, 2]} 
        url="/data/MultipleSelect.json" 
        render={item => <Option value={item.id}>{item.name}</Option>} 
      />
    )
  }
})`

const URLable = React.createClass({
  render() {
    return (
      <MultipleSelect 
        defaultValues={[1, 2]} 
        url="/data/MultipleSelect.json" 
        render={item => <Option value={item.id}>{item.name}</Option>} />
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
      <MultipleSelect defaultValues={['质量好']} tagable onChange={this.handleChange}>
        <Option>质量好</Option>
        <Option>便宜</Option>
        <Option>外观漂亮</Option>
      </MultipleSelect>
    )
  }
})`

const Tagable = React.createClass({

  handleChange(values) {
    console.log(values)
  },

  render() {
    return (
      <MultipleSelect defaultValues={['质量好']} tagable onChange={this.handleChange}>
        <Option>质量好</Option>
        <Option>便宜</Option>
        <Option>外观漂亮</Option>
      </MultipleSelect>
    )
  }
})

export default () => {
  return (
    <div>
      <h1>多选列表 @hai.jiang</h1>

      <Panel title="基础功能" code={codeBasic}>
        <Basic />
      </Panel>

      <Panel title="自加载数据" code={codeURLable}>
        <p>很多时候，多选列表的数据源就是一个单独的接口</p>
        <URLable />
      </Panel>

      <Panel title="标签输入功能" code={codeTagable}>
        <p>当待选项没有时，可以自定义输入想要的选项</p>
        <Tagable />
      </Panel>
      
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
        <Prop name="data" type="array">
          <p>数据源</p>
        </Prop>
        <Prop name="url" type="string">
          <p>ajax 数据源</p>
        </Prop>
        <Prop name="render" type="function">
          <p>使用 data 或 url 方式时，自定义 Option 渲染逻辑</p>
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