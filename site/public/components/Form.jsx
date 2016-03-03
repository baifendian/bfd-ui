import React from 'react'
import { render } from 'react-dom'
import {LinkedStateMixin} from 'react-addons'
import Form from 'c/form/index.jsx'
import Checkbox from 'c/Checkbox/index.jsx'

const FormItem = Form.Item;
let validateDemo;
let Demo = React.createClass({
 
  mixins: [LinkedStateMixin],

  getInitialState() {
    return {     
      task: '',
      desc: '',
      train: '1',
      apple:true,
      orange:true,
      pear:false
    }
  },

  handleSubmit(e) {   
    const _validate = this.handleValidate(validateDemo);
    if(_validate){
      alert('表单验证通过');
      alert('收到表单值：' + JSON.stringify(this.state)); 
    }else{
       alert('表单验证失败');
    }
    e.preventDefault();
  },

  isValidate(o){
    validateDemo.push(o);    
  },

  handleValidate(arr){
    let flag = true;
    arr.map(function(item,i){     
      if(!item) flag = false;
    });
    return flag;
  },

  render() {
    
    const validates = [{
      validateVal: this.state.task,
      required: '请填写任务名称',
      handle: function() {
        return this.validateVal.length > 10 ? '字符长度不能超过10个' : 'success';
      }
    }, {
      validateVal: this.state.desc,
      handle: function() {
        return this.validateVal.length > 20 ? '字符长度不能超过20个' : 'success';
      }
    }, {
      validateVal: {
        apple: this.state.apple,
        orange: this.state.orange,
        pear: this.state.pear
      },
      required: '请设置字段',
      handle: function() {
        let count = 0;
        for (var k in this.validateVal) {
          if (this.validateVal[k]) count++;
        }
        return count < 2 ? '字段设置必须要设置2个或2个以上' : 'success';
      }
    }];
    validateDemo=[];

    return (
      <Form horizontal onSubmit={this.handleSubmit}>

        <FormItem label="任务名称：" labelCol={{ span: 2 }} wrapperCol={{ span: 4 }} required  validate={validates[0]} handleValidate={this.isValidate}>          
            <input type="text" className="form-control" valueLink={this.linkState('task')}/>         
        </FormItem>  

        <FormItem label="任务描述：" wrapperCol={{ span: 4 }} validate={validates[1]} handleValidate={this.isValidate}>          
            <textarea  rows="4" className="form-control" valueLink={this.linkState('desc')}/>          
        </FormItem> 

        <FormItem label="训练数据：" wrapperCol={{ span: 4 }} required>          
            <select className="form-control"  valueLink={this.linkState('train')}>
              <option value="0">--请选择数据所在路径--</option>
              <option value="1">test1</option>
              <option value="2">test2</option>
            </select>        
        </FormItem> 

        <FormItem label="字段设置：" wrapperCol={{ span: 4 }} required  validate={validates[2]} handleValidate={this.isValidate}>         
            <Checkbox checkedLink={this.linkState('apple')}>苹果</Checkbox>   
            <Checkbox checkedLink={this.linkState('orange')}>橙子</Checkbox> 
            <Checkbox checkedLink={this.linkState('pear')}>梨</Checkbox>                     
        </FormItem> 

        <FormItem wrapperCol={{offset:2 }}>         
            <button type="submit" className="btn btn-default">登录</button>         
        </FormItem>        

      </Form>
    );
  }

});

export default () => {
  render( <Demo/> , document.getElementById('demoForm'))
} 