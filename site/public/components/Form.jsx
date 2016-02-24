
import React from 'react'
import { render } from 'react-dom'
import Form from 'c/form/index.jsx'
import Input from 'c/input/index.jsx'
import Button from 'c/button/index.jsx'

const FormItem = Form.Item;

let Demo = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    console.log('收到表单值：', this.props.form.getFieldsValue());
  },

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <Form inline onSubmit={this.handleSubmit}>
        <FormItem
          label="账户：">
          <Input placeholder="请输入账户名"
            {...getFieldProps('userName')} />
        </FormItem>
        <FormItem
          label="密码：">
          <Input type="password" placeholder="请输入密码"
            {...getFieldProps('password')} />
        </FormItem>

        <Button type="primary" htmlType="submit">登录</Button>
      </Form>
    );
  }
});

Demo = Form.create()(Demo);

export default () => { 
	render(         
		<Demo />,document.getElementById('demoForm')
		)
}