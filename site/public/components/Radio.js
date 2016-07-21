import React from 'react'
import { RadioGroup, Radio } from 'c/Radio'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

const RadioGroupDemo = React.createClass({

  handleChange(value) {
    console.log(value)
  },

  render() {
    return (
      <RadioGroup defaultValue="mi" onChange={this.handleChange}>
        <Radio value="apple">苹果</Radio>
        <Radio value="mi">小米</Radio>
        <Radio value="samsung" disabled>三星</Radio>
      </RadioGroup>
    )
  }
})

const code = `import { RadioGroup, Radio } from 'bfd-ui/lib/Radio'

export default React.createClass({

  handleChange(value) {
    console.log(value)
  },

  render() {
    return (
      <RadioGroup defaultValue="mi" onChange={this.handleChange}>
        <Radio value="apple">苹果</Radio>
        <Radio value="mi">小米</Radio>
        <Radio value="samsung" disabled>三星</Radio>
      </RadioGroup>
    )
  }
})`

export default React.createClass({

  render() {
    return (
      <div>
        <h1>单选框 @hai.jiang</h1>
        <h2>RadioGroup</h2>
        <Pre>{code}</Pre>
        <RadioGroupDemo></RadioGroupDemo>
        <h2>Radio</h2>
        <Props>
          <Prop name="value" type="String | number" required>
            <p>值</p>
          </Prop>
          <Prop name="disabled" type="Boolean">
            <p>是否禁用</p>
          </Prop>
        </Props>
        <h2>RadioGroup</h2>
        <Props>
          <Prop name="value" type="String | number">
            <p>默认选中的值</p>
          </Prop>
          <Prop name="defaultValue" type="String | number">
            <p>默认选中的值</p>
          </Prop>
          <Prop name="onChange" type="Function">
            <p>切换选择后的回调，参数为选中的值</p>
          </Prop>
        </Props>
      </div>
    )
  }
})