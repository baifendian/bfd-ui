import React from 'react'
import { Select, Option } from 'c/Select2'
import AjaxSelect from 'c/AjaxSelect'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

const MySelect = AjaxSelect(Select)

const render = (item, i) => {
  return <Option key={i} value={item.id}>{item.name}</Option>
}
const MySelectDemo = React.createClass({
  render() {
    return <MySelect defaultValue={1} render={render} url="/data/ajaxSelect.json" />
  }
})

const code = `import { Select, Option } from 'bfd-ui/lib/Select2'
import AjaxSelect from 'bfd-ui/lib/AjaxSelect'

const MySelect = AjaxSelect(Select)

const render = (item, i) => {
  return <Option key={i} value={item.id}>{item.name}</Option>
}

const MySelectDemo = React.createClass({
  render() {
    return <MySelect defaultValue={1} render={render} url="/data/ajaxSelect.json" />
  }
})`

export default () => {
  return (
    <div>
      <h1>AJAX 选择列表（高阶组件）</h1>
      <Pre>{code}</Pre>
      <MySelectDemo />
      <h2>AjaxSelect()</h2>
      Select 的扩展
      <Props>
        <Prop name="url" type="string" required>
          <p>选中的值</p>
        </Prop>
        <Prop name="render" type="function" required>
          <p>Option 渲染逻辑</p>
        </Prop>
        <Prop name="defaultOption" type="react element">
          <p>默认 Option，通常用于空值</p>
          <Pre>{`<MySelect defaultOption={<Option key="-1">请选择</Option>} />`}</Pre>
        </Prop>
      </Props>
    </div>
  )
}