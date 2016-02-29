import React from 'react'
import { render } from 'react-dom'
import {LinkedStateMixin} from 'react-addons'
import Form from 'c/form/index.jsx'
import Checkbox from 'c/Checkbox/index.jsx'

const FormItem = Form.Item;
const FormGroup = Form.Group;

let Demo = React.createClass({
 
  mixins: [LinkedStateMixin],

  getInitialState() {
    return {
      tel: '',
      desc: '',
      train: '1',
      field1: 'true'
    };
  },

  handleSubmit(e) {
    e.preventDefault();
    console.log('收到表单值：' + JSON.stringify(this.state));
  },

  render() {
    
    return (
      <Form horizontal onSubmit={this.handleSubmit}>

        <FormGroup label="手机：" labelCol="col-md-2 control-label" required>
          <div className="col-sm-4">
            <input type="text" className="form-control" valueLink={this.linkState('tel')}/>
          </div>
        </FormGroup>  

        <FormGroup label="任务描述：" labelCol="col-md-2 control-label">
          <div className="col-sm-4">
            <textarea  rows="4" className="form-control" valueLink={this.linkState('desc')}/>            
          </div>
        </FormGroup> 

        <FormGroup label="训练数据：" labelCol="col-md-2 control-label" required>
          <div className="col-sm-4">  
            <select className="form-control"  valueLink={this.linkState('train')}>
              <option value="0">--请选择数据所在路径--</option>
              <option value="1">test1</option>
              <option value="2">test2</option>
            </select>        
          </div>
        </FormGroup> 

        <FormGroup label="字段设置：" labelCol="col-md-2 control-label">
          <div className="col-sm-4">
            <Checkbox checkedLink={this.linkState('field1')}>苹果</Checkbox>           
          </div>
        </FormGroup> 

        <FormGroup>
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-default">登录</button>
          </div>
        </FormGroup>        

      </Form>
    );
  }
});

export default () => {
  render( <Demo/> , document.getElementById('demoForm'))
} 