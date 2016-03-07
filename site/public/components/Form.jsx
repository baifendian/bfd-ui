import React from 'react'
import { render } from 'react-dom'
import {LinkedStateMixin} from 'react-addons'
import Form from 'c/Form/index.jsx'
import { CheckboxGroup, Checkbox } from 'c/CheckboxGroup/index.jsx'
import { Select ,Option} from 'c/Select/index.jsx'

const FormItem = Form.Item;
let validateDemo;
let Demo = React.createClass({
 
  mixins: [LinkedStateMixin],

  getInitialState() {
    return {
      task: '',
      desc: '',
      train: '1',
      fields: ['apple', 'mi']
    }
  },

  handleSubmit(e) {
    const _validate = this.getValidate(validateDemo);
    if (_validate) {
      alert('表单验证通过');
      alert('收到表单值：' + JSON.stringify(this.state));
    } else {
      alert('表单验证失败');
    }
    e.preventDefault();
  },

  handleValidate(o) {
    validateDemo.push(o);
  },

  getValidate(arr) {
    let flag = true;
    arr.map(function(item, i) {
      if (!item) flag = false;
    });
    return flag;
  },
  fieldsChange(selects) {
    this.setState({
      selects
    });
  },
  trainChange(selected,text){
    this.setState({ train:selected });
  },
  render() {    
    validateDemo = [];
    const validates = [{
      validateVal: this.state.task,
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
      handle: function() {
        let s;
        if (!this.validateVal && this.required) {
          s = this.required;
        } else if (this.validateVal.length > 20) {
          s = '字符长度不能超过20个';
        } else {
          s = 'success'
        }
        return s;
      }
    }, {
      validateVal: this.state.fields,
      required: '请设置字段',
      handle: function() {
        let s;
        if (this.validateVal.length == 0) {
          s = this.required;
        } else {
          s = 'success';
        }
        return s;
      }
    }];
   

    return (
      
        <Form horizontal onSubmit={this.handleSubmit}>

          <FormItem label="任务名称：" validate={validates[0]} handle={this.handleValidate} required>
            <input type="text" className="form-control" valueLink={this.linkState('task')}/>        
          </FormItem>

          <FormItem label="任务描述："  validate={validates[1]} handle={this.handleValidate}>
            <textarea  rows="4" className="form-control" valueLink={this.linkState('desc')}/>        
          </FormItem>

          <FormItem label="训练数据：" required>
            <Select selected={this.state.train} onChange={this.trainChange}>
              <Option value="0">aaa</Option>
              <Option value="1">bbb</Option>
              <Option value="2">ccc</Option>
              <Option value="3">ddd</Option>
            </Select>
          </FormItem>

          <FormItem label="字段设置：" validate={validates[2]} handle={this.handleValidate} required>
            <CheckboxGroup selects = {this.state.fields} onChange={this.fieldsChange}>
              <Checkbox value="apple">苹果</Checkbox>
              <Checkbox value="mi">小米</Checkbox>
              <Checkbox value="samsung">三星</Checkbox>
              <Checkbox value="huawei">华为</Checkbox>
            </CheckboxGroup>
          </FormItem>

          <FormItem submit>
            <button type="submit" className="btn btn-default">登录</button>
          </FormItem>

        </Form>
    );
  }

});

export default () => {
  render( <Demo/> , document.getElementById('demoForm'))
} 