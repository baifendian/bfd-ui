import React from 'react'
import { CheckboxGroup, Checkbox } from 'c/Checkbox'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

export default React.createClass({

  render() {
    return (
      <div>
        <h1>复选框</h1>
        <h2>Checkbox</h2>
        <p>单独使用，常见使用场景：是否全选、控制单一状态</p>
        <Pre>
{`import { Checkbox } from 'bfd-ui/lib/Checkbox'

const App = React.createClass({
  render() {
    return <Checkbox>选择</Checkbox>
  }
})`}
        </Pre>
        <Checkbox disabled>选择</Checkbox>
        <Props>
          <Prop name="checked" type="Boolean">
            <p>默认是否选中</p>
            <p>定义 checked 属性后需要定义 onChange 事件</p>
            <Pre>{`<Checkbox checked={this.state.isAll} onChange={this.toggle}>全选</Checkbox>`}</Pre>
            <p>由于 React 的限制，checked 不能固定死，否则无法切换选择状态，比如</p>
            <Pre>
{`<Checkbox checked onChange={this.toggle}>全选</Checkbox>
<Checkbox checked={false} onChange={this.toggle}>全选</Checkbox>`}
            </Pre>
          </Prop>
          <Prop name="onChange" type="Function">
            <p>切换选择后的回调</p>
          </Prop>
          <Prop name="disabled" type="Boolean">
            <p>是否禁用</p>
          </Prop>
          <Prop name="block" type="Boolean">
            <p>是否块模式，默认 inline 模式</p>
          </Prop>
        </Props>
        
        <h2>CheckboxGroup</h2>
        <p>复选框组，复选框的大部分使用场景</p>
        <p>针对 value 和 label 不同的情况，布局可灵活控制</p>
        <Pre>
{`import { CheckboxGroup, Checkbox } from 'bfd-ui/lib/Checkbox'

const App = React.createClass({
  render() {
    return (
      <CheckboxGroup>
        <Checkbox value="apple">苹果</Checkbox>
        <Checkbox value="mi">小米</Checkbox>
        <Checkbox value="samsung">三星</Checkbox>
        <Checkbox value="huawei">华为</Checkbox>
      </CheckboxGroup>
    )
  }
})`}
        </Pre>
        <CheckboxGroup selects={null}>
          <Checkbox value="apple">苹果</Checkbox>
          <Checkbox value="mi">小米</Checkbox>
          <Checkbox value="samsung">三星</Checkbox>
          <Checkbox value="huawei" disabled>华为</Checkbox>
        </CheckboxGroup>

        <br/>

        <p>value 和 label 相同，快速构建复选框组。且布局默认水平平铺</p>
        <Pre>
{`import { CheckboxGroup } from 'bfd-ui/lib/Checkbox'

const App = React.createClass({
  render() {
    return <CheckboxGroup values={['苹果','小米','三星','华为']}/>
  }
})`}
        </Pre>
        <CheckboxGroup values={['苹果','小米','三星','华为']}/>
        <Props>
          <Prop name="selects" type="Array">
            <p>默认选中的 value 集合</p>
          </Prop>
          <Prop name="values" type="Array">
            <p>针对 value 和 label 相同时快速创建复选框组，无需再调用 Checkbox</p>
          </Prop>
          <Prop name="onChange" type="Function">
            <p>切换选择后的回调，参数为选中的集合</p>
          </Prop>
          <Prop name="block" type="Boolean">
            <p>是否垂直布局，默认 inline 模式，如果手动声明 Checkbox，本属性无效，需要在 Checkbox 中指定</p>
          </Prop>
        </Props>
      </div>
    )
  }
})