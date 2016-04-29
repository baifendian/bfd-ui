import React from 'react'
import { Form, FormItem } from 'c/Form2'
import FormInput from 'c/FormInput'
import { FormSelect, Option } from 'c/FormSelect'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

const FormDemo = React.createClass({

  getInitialState() {
    return {
      data: {}  
    }
  },

  handleChange(data) {
    this.setState({ data })
  },

  handleSave() {
    debugger
  },

  render() {
    return (
      <Form data={this.state.data} onChange={this.handleChange}>
        <FormItem label="用户名" name="name" help="5个字符以内">
          <FormInput></FormInput>
        </FormItem>
        <FormItem label="用户名" name="type" help="5个字符以内">
          <FormSelect style={{width: '200px'}}>
            <Option value="0">小米</Option>
            <Option value="1">苹果</Option>
          </FormSelect>
        </FormItem>
        <button type="button" className="btn btn-primary">保存</button>
      </Form>
    )
  }
})

export default () => {
  return (
    <FormDemo></FormDemo>
  )
}