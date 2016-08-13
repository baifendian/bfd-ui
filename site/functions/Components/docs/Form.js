import React from 'react'
import { Form, FormItem } from 'bfd/Form'
import FormInput from 'bfd/FormInput'
import FormTextarea from 'bfd/FormTextarea'
import { FormSelect, Option } from 'bfd/FormSelect'
import message from 'bfd/message'
import { DatePicker } from 'bfd/DatePicker'
import Pre from 'public/Pre'
import { Props, Prop } from 'public/Props'
import Panel from 'public/Demo'

const codeBasic = `import { Form, FormItem } from 'bfd-ui/lib/Form'
import FormInput from 'bfd-ui/lib/FormInput'
import FormTextarea from 'bfd-ui/lib/FormTextarea'
import { FormSelect, Option } from 'bfd-ui/lib/FormSelect'
import message from 'bfd-ui/lib/message'

export default React.createClass({

  getInitialState() {
    this.rules = {
      name(v) {
        if (!v) return '请填写用户群'
      },
      date(v) {
        if (!v) return '日期不能为空'
      }
    }
    return {
      formData: {
        brand: 0
      }
    }
  },

  handleDateSelect(date) {
    const formData = this.state.formData
    formData.date = date
    this.setState({ formData })
  },

  handleSave() {
    console.log(this.state.formData)
    this.refs.form.save()
  },

  handleSuccess(res) {
    console.log(res)
    message.success('保存成功！')
  },

  render() {
    const { formData } = this.state
    return (
      <Form 
        ref="form" 
        action="/api/form" 
        data={formData} 
        rules={this.rules} 
        onSuccess={this.handleSuccess}
      >
        <FormItem label="用户群" required name="name" help="5个字符以内">
          <FormInput style={{width: '200px'}}></FormInput>
        </FormItem>
        <FormItem label="品牌偏好" name="brand">
          <FormSelect style={{width: '200px'}}>
            <Option>请选择</Option>
            <Option value={0}>小米</Option>
            <Option value={1}>苹果</Option>
          </FormSelect>
        </FormItem>
        <FormItem label="选择日期" required name="date">
          <DatePicker style={{marginRight: '10px'}} date={formData.date} onSelect={this.handleDateSelect} />
        </FormItem>
        <FormItem label="描述" name="desc" help="500个字符以内">
          <FormTextarea></FormTextarea>
        </FormItem>
        <button type="button" style={{marginLeft: '100px'}} className="btn btn-primary" onClick={this.handleSave}>保存</button>
      </Form>
    )
  }
})`

const Basic = React.createClass({

  getInitialState() {
    this.rules = {
      name(v) {
        if (!v) return '请填写用户群'
      },
      date(v) {
        if (!v) return '日期不能为空'
      }
    }
    return {
      formData: {
        brand: 0
      }
    }
  },

  handleDateSelect(date) {
    const formData = this.state.formData
    formData.date = date
    this.setState({ formData })
  },

  handleSave() {
    console.log(this.state.formData)
    this.refs.form.save()
  },

  handleSuccess(res) {
    console.log(res)
    message.success('操作成功！')
  },

  render() {
    const { formData } = this.state
    return (
      <Form 
        ref="form" 
        action="/api/form" 
        data={formData} 
        rules={this.rules} 
        onSuccess={this.handleSuccess}
      >
        <FormItem label="用户群" required name="name" help="5个字符以内">
          <FormInput style={{width: '200px'}}></FormInput>
        </FormItem>
        <FormItem label="品牌偏好" name="brand">
          <FormSelect style={{width: '200px'}}>
            <Option>请选择</Option>
            <Option value={0}>小米</Option>
            <Option value={1}>苹果</Option>
          </FormSelect>
        </FormItem>
        <FormItem label="选择日期" required name="date">
          <DatePicker style={{marginRight: '10px'}} date={formData.date} onSelect={this.handleDateSelect} />
        </FormItem>
        <FormItem label="描述" name="desc" help="500个字符以内">
          <FormTextarea></FormTextarea>
        </FormItem>
        <button type="button" style={{marginLeft: '100px'}} className="btn btn-primary" onClick={this.handleSave}>保存</button>
      </Form>
    )
  }
})

export default () => {
  return (
    <div>
      <h1>表单 @hai.jiang</h1>

      <Panel title="基础功能" code={codeBasic}>
        <Basic />
      </Panel>

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

      <h3>组件方法</h3>
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
        <Prop name="name" type="string" required>
          <p>关联的数据字段</p>
        </Prop>
        <Prop name="help" type="string">
          <p>帮助信息</p>
        </Prop>
        <Prop name="multiple" type="boolean">
          <p>是否为多条数据，默认单个。多个的话对应的数据应为数组</p>
        </Prop>
      </Props>
      <h3>组件方法</h3>
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