import React from 'react'
import { CheckboxGroup, Checkbox } from 'c/Checkbox'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

const CheckboxDemoCode = `import { Checkbox } from 'bfd-ui/lib/Checkbox'

export default React.createClass({

  handleChange({ target }) {
    console.log(target.checked, target.value)
  },

  render() {
    return <Checkbox onChange={this.handleChange}>选择</Checkbox>
  }
})`

const CheckboxDemo = React.createClass({

  handleChange({ target }) {
    console.log(target.checked, target.value)
  },

  render() {
    return <Checkbox onChange={this.handleChange}>选择</Checkbox>
  }
})

const CheckboxGroupDemoCode = `import { CheckboxGroup, Checkbox } from 'bfd-ui/lib/Checkbox'

export default React.createClass({
  
  handleChange(selects) {
    console.log(selects)
  },

  render() {
    return (
      <CheckboxGroup onChange={this.handleChange}>
        <Checkbox value="apple">苹果</Checkbox>
        <Checkbox value="mi">小米</Checkbox>
        <Checkbox value="samsung">三星</Checkbox>
        <Checkbox value="huawei" disabled>华为</Checkbox>
      </CheckboxGroup>
    )
  }
})`

const CheckboxGroupDemo = React.createClass({

  handleChange(selects) {
    console.log(selects)
  },

  render() {
    return (
      <CheckboxGroup onChange={this.handleChange}>
        <Checkbox value="apple">苹果</Checkbox>
        <Checkbox value="mi">小米</Checkbox>
        <Checkbox value="samsung">三星</Checkbox>
        <Checkbox value="huawei" disabled>华为</Checkbox>
      </CheckboxGroup>
    )
  }
})


const ShortlyCheckboxGroupDemoCode = `import { CheckboxGroup } from 'bfd-ui/lib/Checkbox'

export default React.createClass({
  
  getInitialState() {
    return {
      values: ['苹果', '小米', '三星', '华为']
    }
  },

  render() {
    return <CheckboxGroup values={this.state.values}/>
  }
})`

const ShortlyCheckboxGroupDemo = React.createClass({

  getInitialState() {
    return {
      values: ['苹果', '小米', '三星', '华为']
    }
  },

  render() {
    return <CheckboxGroup values={this.state.values} />
  }
})

export default React.createClass({

  render() {
    return (
      <div>
        <h1>复选框 @hai.jiang</h1>
        <p>单独使用，常见使用场景：是否全选、控制单一状态</p>
        <Pre>{CheckboxDemoCode}</Pre>
        <CheckboxDemo></CheckboxDemo>

        <h2>Checkbox</h2>
        <Props>
          <Prop name="value" type="string | number">
            <p>值</p>
          </Prop>
          <Prop name="checked" type="boolean">
            <p>是否选中</p>
          </Prop>
          <Prop name="defaultChecked" type="boolean">
            <p>是否选中</p>
          </Prop>
          <Prop name="onChange" type="function">
            <p>切换选择后的回调，参数为 event 对象</p>
          </Prop>
          <Prop name="disabled" type="boolean">
            <p>是否禁用</p>
          </Prop>
          <Prop name="block" type="boolean">
            <p>是否块模式，默认 inline 模式</p>
          </Prop>
        </Props>
        
        <p>复选框组，复选框的大部分使用场景</p>
        <p>针对 value 和 label 不同的情况，布局可灵活控制</p>
        <Pre>{CheckboxGroupDemoCode}</Pre>
        <CheckboxGroupDemo></CheckboxGroupDemo>
        <br/>
        <p>value 和 label 相同，快速构建复选框组。且布局默认水平平铺</p>
        <Pre>{ShortlyCheckboxGroupDemoCode}</Pre>
        <ShortlyCheckboxGroupDemo></ShortlyCheckboxGroupDemo>

        <h2>CheckboxGroup</h2>
        <Props>
          <Prop name="selects" type="array">
            <p>默认选中的 value 集合</p>
          </Prop>
          <Prop name="values" type="array">
            <p>针对 value 和 label 相同时快速创建复选框组，无需再调用 Checkbox</p>
          </Prop>
          <Prop name="onChange" type="function">
            <p>切换选择后的回调，参数为选中的集合</p>
          </Prop>
          <Prop name="block" type="boolean">
            <p>是否垂直布局，默认 inline 模式</p>
          </Prop>
          <Prop name="toggleable" type="boolean">
            <p>是否开启全选功能，默认关闭</p>
          </Prop>
        </Props>
      </div>
    )
  }
})