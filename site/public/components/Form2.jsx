import React from 'react'
import { Form, FormItem } from 'c/Form2'
import FormInput from 'c/FormInput'
import FormTextarea from 'c/FormTextarea'
import { FormSelect, Option } from 'c/FormSelect'
import message from 'c/message'
import { DatePicker } from 'c/DatePicker'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

const FormDemo = React.createClass({

  getInitialState() {
    this.rules = {
      name(v) {
        if (!v) return '请填写用户群'
      }
    }
    return {
      data: {
        brand: 0
      }  
    }
  },

  handleChange(data) {
    this.setState({ data })
  },

  handleSave() {
    console.log(this.state.data)
    this.refs.form.save()
  },

  handleSuccess(data) {
    console.log(data)
    message.success('操作成功！')
  },

  render() {
    return (
      <Form ref="form" action="/api/form" data={this.state.data} rules={this.rules} onChange={this.handleChange} onSuccess={this.handleSuccess}>
        <FormItem label="用户群" required name="name" help="5个字符以内">
          <FormInput style={{width: '200px'}}></FormInput>
        </FormItem>
        <FormItem label="品牌偏好" name="brand">
          <FormSelect style={{width: '200px'}}>
            <Option>请选择</Option>
            <Option value="0">小米</Option>
            <Option value="1">苹果</Option>
          </FormSelect>
        </FormItem>
        <FormItem label="描述" name="desc" help="500个字符以内">
          <FormTextarea></FormTextarea>
        </FormItem>
        <button type="button" style={{marginLeft: '100px'}} className="btn btn-primary" onClick={this.handleSave}>保存</button>
      </Form>
    )
  }
})

const FormDemoCode = `import { Form, FormItem } from 'bfd-ui/lib/Form2'
import FormInput from 'bfd-ui/lib/FormInput'
import FormTextarea from 'bfd-ui/lib/FormTextarea'
import { FormSelect, Option } from 'bfd-ui/lib/FormSelect'
import message from 'bfd-ui/lib/message'

const FormDemo = React.createClass({

  getInitialState() {
    this.rules = {
      name(v) {
        if (!v) return '请填写用户群'
      }
    }
    return {
      data: {
        brand: 0
      }  
    }
  },

  handleChange(data) {
    this.setState({ data })
  },

  handleSave() {
    console.log(this.state.data)
    this.refs.form.save()
  },

  handleSuccess(data) {
    console.log(data)
    message.success('操作成功！')
  },

  render() {
    return (
      <Form ref="form" action="/api/form" data={this.state.data} rules={this.rules} onChange={this.handleChange} onSuccess={this.handleSuccess}>
        <FormItem label="用户群" required name="name" help="5个字符以内">
          <FormInput style={{width: '200px'}}></FormInput>
        </FormItem>
        <FormItem label="品牌偏好" name="brand">
          <FormSelect style={{width: '200px'}}>
            <Option>请选择</Option>
            <Option value="0">小米</Option>
            <Option value="1">苹果</Option>
          </FormSelect>
        </FormItem>
        <FormItem label="描述" name="desc" help="500个字符以内">
          <FormTextarea></FormTextarea>
        </FormItem>
        <button type="button" style={{marginLeft: '100px'}} className="btn btn-primary" onClick={this.handleSave}>保存</button>
      </Form>
    )
  }
})`

const FormCustomDemo = React.createClass({

  getInitialState() {
    this.rules = {
      date(v) {
        if (!v) return '日期不能为空'
        if (v > Date.now()) return '选择的日期不能大于今天'
      }
    }
    return {}
  },

  handleSelect(date) {
    this.refs.dateItem.validate(date)
    this.setState({ date })
  },

  handleSave() {
    this.refs.form.validate(this.state)
  },

  render() {
    return (
      <Form ref="form" rules={this.rules}>
        <FormItem ref="dateItem" label="选择日期" required name="date">
          <DatePicker style={{marginRight: '10px'}} date={this.state.date} onSelect={this.handleSelect} />
        </FormItem>
        <button type="button" style={{marginLeft: '100px'}} className="btn btn-primary" onClick={this.handleSave}>保存</button>
      </Form>
    )
  }
})

const FormCustomDemoCode = `import { Form, FormItem } from 'bfd-ui/lib/Form2'
import { DatePicker } from 'bfd-ui/lib/DatePicker'

const FormCustomDemo = React.createClass({

  getInitialState() {
    this.rules = {
      date(v) {
        if (!v) return '日期不能为空'
        if (v > Date.now()) return '选择的日期不能大于今天'
      }
    }
    return {}
  },

  handleSelect(date) {
    this.refs.dateItem.validate(date)
    this.setState({ date })
  },

  handleSave() {
    this.refs.form.validate(this.state)
  },

  render() {
    return (
      <Form ref="form" rules={this.rules}>
        <FormItem ref="dateItem" label="选择日期" required name="date">
          <DatePicker style={{marginRight: '10px'}} date={this.state.date} onSelect={this.handleSelect} />
        </FormItem>
        <button type="button" style={{marginLeft: '100px'}} className="btn btn-primary" onClick={this.handleSave}>保存</button>
      </Form>
    )
  }
})
`

export default () => {
  return (
    <div>
      <h1>表单</h1>
      <h3>1、最简单的用法</h3>
      <p>集成数据双向绑定、数据校验、服务器通信、提交状态处理、结果反馈等。</p>
      <Pre>{FormDemoCode}</Pre>
      <FormDemo></FormDemo>
      <h3>2、自定义表单域</h3>
      <p>提交的数据来源不仅仅是 input、select、textarea 等基础组件，设计形式千变万化，这个时候就需要手动绑定数据了</p>
      <Pre>{FormCustomDemoCode}</Pre>
      <FormCustomDemo></FormCustomDemo>
      <h2>Form</h2>
      <Props>
        <Prop name="data" type="object">
          <p>表单数据对象，rules 各属性 及 FormItem 的 name 值与其属性一一对应</p>
          <p>FormItem 如果声明为 multiple, 则 data 相应的属性值必须为数组, 形成对应关系</p>
        </Prop>
        <Prop name="onChange" type="function">
          <p>表单数据改变（用户输入）后的回调，参数为整个表单数据，让 Form 组件重绘</p>
        </Prop>
        <Prop name="rules" type="object">
          <p>表单验证规则，与 data 字段对应，返回非空字符串（错误提示信息）代表验证失败</p>
        </Prop>
        <Prop name="labelWidth" type="number">
          <p>label 的宽度，默认 100</p>
        </Prop>
        <Prop name="action" type="string">
          <p>POST 提交地址</p>
        </Prop>
        <Prop name="onSuccess" type="function">
          <p>提交成功后的回调，参数为服务器返回的 data 的值</p>
        </Prop>
      </Props>
      <h3>this.refs.form</h3>
      <ul>
        <li>
          <p>
            <strong>validate( [data] )</strong>
          </p>
          <p>表单整体验证，验证当前 DOM 节点上存在的 FormItem 关联的数据，默认验证 data 属性的数据，可以自定义传入。验证失败返回 false, 成功返回 true</p>
        </li>
        <li>
          <p>
            <strong>save( [data] )</strong>
          </p>
          <p>表单提交，提交地址为 action 属性, 默认提交 data 属性数据，可以自定义传入。发送请求前会进行表单验证, 提交成功会响应 onSuccess</p>
        </li>
      </ul>
      <hr/>
      <h2>FormItem</h2>
      <Props>
        <Prop name="label" type="string">
          <p>label 显示名称</p>
        </Prop>
        <Prop name="required" type="boolean">
          <p>是否必须，如果必须，则 label 前带 * 的标识</p>
        </Prop>
        <Prop name="name" type="string" rquired>
          <p>关联的数据字段</p>
        </Prop>
        <Prop name="help" type="string">
          <p>帮助信息</p>
        </Prop>
        <Prop name="multiple" type="boolean">
          <p>是否为多条数据，默认单个。多个的话对应的数据应为数组</p>
        </Prop>
      </Props>
      <h3>this.refs.formItem</h3>
      <ul>
        <li>
          <p>
            <strong>validate( data )</strong>
          </p>
          <p>验证 FormItem 自身, 数据手动传入。验证失败返回 false, 成功返回 true</p>
        </li>
      </ul>
    </div>
  )
}