import React from 'react'
import Form from 'c/Form/index.jsx'
import { CheckboxGroup, Checkbox } from 'c/CheckboxGroup/index.jsx'
import { Select ,Option} from 'c/Select/index.jsx'
import Pre from '../Pre.jsx'
import { Props, Prop } from '../Props.jsx'

const FormItem = Form.Item;
let isSuccess;
let Demo = React.createClass({ 

  //初始化表单数据。
  getInitialState() {
    return { 
      isSubmit:false,    
      task: '',
      desc: '',
      train: ['apple','huawei'],
      fields: ['apple', 'mi']
    }
  },

  //submit按钮提交操作
  handleSubmit(e) {    
    this.setState({isSubmit:true}); 
    let o = this.state;
    delete o.isSubmit;
    this.ValidateStatus(isSuccess) ? console.log('表单验证通过：'+JSON.stringify(o)):console.log('表单验证失败');     
    e.preventDefault();
  },

  //获取验证是否通过状态，并存放到isSuccess数组中。
  isSuccess(flag){   
    isSuccess.push(flag);
  },

  //验证isSuccess数组中是否全部通过验证。
  ValidateStatus(arr) {
    let flag = true;
    arr.map(function(item, i) {
      if (!item) flag = false;
    });
    return flag;
  },

  /*
   *设置表单字段值。
   */
  taskChange(e){
    this.setState({task:e.target.value})
  },
  descCahnge(e){
     this.setState({desc:e.target.value})
  },
  fieldsChange(selects) {
    this.setState({ selects });
  },
  trainChange(selected,text){
    this.setState({ train:selected });
  },

  render() {   

    isSuccess = [];  
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
      
        <Form horizontal onSubmit={this.handleSubmit} isSuccess={this.isSuccess} sibmitStatus={this.state.isSubmit}>

          <FormItem label="任务名称：" validate={validates[0]} required>
            <input type="text" className="form-control" onChange={this.taskChange}/>        
          </FormItem>

          <FormItem label="任务描述："  validate={validates[1]}>
            <textarea  rows="4" className="form-control" onChange={this.descCahnge}/>        
          </FormItem>

          <FormItem label="训练数据：">
            <Select selected={this.state.train} onChange={this.trainChange} multiple>
              <Option value="apple">苹果</Option>
              <Option value="mi">小米</Option>
              <Option value="samsung">三星</Option>
              <Option value="huawei">华为</Option>
            </Select>
          </FormItem>

          <FormItem label="字段设置：" validate={validates[2]} required>
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

export default React.createClass({
  render() {
    return (
      <div>
        <h1>表单</h1>
        <Demo/>          
      </div>
    )
  }
})