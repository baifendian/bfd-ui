import React from 'react'
import AutoComplete from 'c/AutoComplete'
import { Link } from 'react-router'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

const AutoCompleteDemo = React.createClass({
  render() {
    return <AutoComplete source={['test', 'test2']} />
  }
})

const code = `import AutoComplete from 'bfd-ui/lib/AutoComplete'

export default React.createClass({
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
        <Prop name="{ ...ClearableInput }">
          <p><Link to="/components/ClearableInput">ClearableInput</Link> 属性均支持</p>
        </Prop>
      </Props>
    </div>
  )
}