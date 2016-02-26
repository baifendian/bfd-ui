
import React from 'react'
import { render } from 'react-dom'
import Form from 'c/form/index.jsx'



const FormItem = Form.Item;
const FormGroup = Form.Group;

let Demo = React.createClass({
  handleSubmit(e) {
    e.preventDefault();
    console.log('收到表单值：', this.props.form.getFieldsValue());
  },

  render() {    
    console.log(this.props)
    const { getFieldProps } = this.props.form;
    return (
      <Form horizontal onSubmit={this.handleSubmit}>

        <FormGroup
          label="手机：" labelCol="col-md-2" required>
          <input type="text" placeholder="请输入手机"
            {...getFieldProps('tel')} />
        </FormGroup>     

        <button  type="submit">登录</button>
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