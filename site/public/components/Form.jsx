import React from 'react'
import { render } from 'react-dom'
import {LinkedStateMixin} from 'react-addons'
import Form from 'c/form/index.jsx'
import { CheckboxGroup, Checkbox } from 'c/CheckboxGroup/index.jsx'

const FormItem = Form.Item;
let validateDemo;
let Demo = React.createClass({
 
  mixins: [LinkedStateMixin],

  getInitialState() {
    return {     
      task: '',
      desc: '',
      train: '1',
      fields:['apple','mi']
    }
  },

  handleSubmit(e) {       
    const _validate = this.getValidate(validateDemo);
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

  getValidate(arr){
    let flag = true;
    arr.map(function(item,i){     
      if(!item) flag = false;
    });
    return flag;
  },
  fieldsChange(selects){
    this.setState({selects});
  },
  render() {    
    const validates = [{
      validateVal: this.state.task,
      span:4,
      required: '请填写任务名称',
      handle: function() {
        let s;
        if (!this.validateVal && this.required) {
          s = this.required;
        } else if (this.validateVal.length > 10) {
          s = '字符长度不能超过10个';
        } else {
          s = 'success'
        }
        return s;
      }
    }, {
      validateVal: this.state.desc,
      span:4,
      handle: function() {
        let s;
        if(!this.validateVal&&this.required){
          s = this.required;
        } else if(this.validateVal.length > 20 ) {
          s = '字符长度不能超过20个';
        }else{
          s = 'success'
        }
        return s;
      }
    },{
      validateVal: this.state.fields,
      required:'请设置字段',
      span:4,
      handle: function() {
        let s;
        if(this.validateVal.length == 0){
          s=this.required;
        }else{
          s = 'success';
        }
        return s;
      }
    }];
    validateDemo=[];

    return (
      <Form horizontal onSubmit={this.handleSubmit}>

        <FormItem label="任务名称：" labelCol={{ span: 2 }} wrapperCol={{ span: 6 }} validate={validates[0]} handleValidate={this.isValidate} required>          
            <input type="text" className="form-control" valueLink={this.linkState('task')}/>         
        </FormItem>  

        <FormItem label="任务描述：" wrapperCol={{ span: 6 }} validate={validates[1]} handleValidate={this.isValidate}>          
            <textarea  rows="4" className="form-control" valueLink={this.linkState('desc')}/>          
        </FormItem> 

        <FormItem label="训练数据：" wrapperCol={{ span: 6 }} required>          
            <select className="form-control"  valueLink={this.linkState('train')}>
              <option value="0">--请选择数据所在路径--</option>
              <option value="1">test1</option>
              <option value="2">test2</option>
            </select>        
        </FormItem>         

        <FormItem label="字段设置：" wrapperCol={{ span: 6 }} validate={validates[2]} handleValidate={this.isValidate} required>          
          <CheckboxGroup selects = {this.state.fields} onChange={this.fieldsChange}>
            <Checkbox value="apple">苹果</Checkbox>
            <Checkbox value="mi">小米</Checkbox>
            <Checkbox value="samsung">三星</Checkbox>
            <Checkbox value="huawei">华为</Checkbox>
          </CheckboxGroup>
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