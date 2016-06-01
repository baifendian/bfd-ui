import React from 'react'
import AutoComplete from 'c/AutoComplete'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

const AutoCompleteDemo = React.createClass({
  render() {
    return <AutoComplete source={['test', 'test2']} disabled />
  }
})

const code = `import AutoComplete from 'bfd-ui/lib/AutoComplete'

const AutoCompleteDemo = React.createClass({
  render() {
    return <AutoComplete source={['test', 'test2']} />
  }
})`

export default () => {
  return (
    <div>
      <h1>自动完成 @hai.jiang</h1>
      <Pre>{code}</Pre>
      <AutoCompleteDemo />
      <h2>AutoComplete</h2>
      <Props>
        <Prop name="source" type="array" required>
          <p>数据源</p>
        </Prop>
        <Prop name="value" type="string">
          <p>输入框值</p>
        </Prop>
        <Prop name="defaultValue" type="string">
          <p>输入框值</p>
        </Prop>
        <Prop name="onChange" type="function">
          <p>输入框值改变后的回调，参数为改变后的值</p>
        </Prop>
        <p>input 其他属性均支持</p>
      </Props>
    </div>
  )
}