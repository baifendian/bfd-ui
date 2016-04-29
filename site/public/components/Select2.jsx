import React from 'react'
import { Select, Option } from 'c/Select2'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

const SelectDemo = React.createClass({

  getInitialState() {
    return {
      value: 1
    }
  },

  handleChange(value) {
    this.setState({ value })
  },

  render() {
    return (
      <Select value={this.state.value} onChange={this.handleChange}>
        <Option>请选择</Option>
        <Option value="1">苹果</Option>
        <Option value="2">三星</Option>
      </Select>
    )
  }
})

const SelectDemoCode = `import { Select, Option } from 'bfd-ui/lib/Select2'

const SelectDemo = React.createClass({

  getInitialState() {
    return {
      value: 1
    }
  },

  handleChange(value) {
    this.setState({ value })
  },

  render() {
    return (
      <Select value={this.state.value} onChange={this.handleChange}>
        <Option>请选择</Option>
        <Option value="1">苹果</Option>
        <Option value="2">三星</Option>
      </Select>
    )
  }
})`

export default () => {
  return (
    <div>
      <h1>选择列表</h1>
      <Pre>{SelectDemoCode}</Pre>
      <SelectDemo></SelectDemo>
      <h2>Select</h2>
      <Props>
        <Prop name="value" type="string | number">
          <p>选中的值</p>
        </Prop>
        <Prop name="onChange" type="function">
          <p>切换选择后的回调，参数为选中的值</p>
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