import React from 'react'
import { Form, FormItem } from 'c/Form'
import { CheckboxGroup, Checkbox } from 'c/Checkbox'
import { Select, Option} from 'c/Select'
import Pre from '../Pre'
import { Props, Prop } from '../Props'


let isSuccess;
const Demo = React.createClass({ 
  //初始化表单数据。
  getInitialState() {
    return { 
      validateState:false,        
      task: '',
      desc: '',
      train: ['apple','huawei'],
      fields: ['apple', 'mi']
    }
  },
  //submit按钮提交操作
  handleSubmit(e) { 
    this.setState({validateState:true}); 
    const obj = Form.handleData(this.state, isSuccess);
    if (obj.isPass) {    //验证通过
      console.log('表单验证通过');
      console.log(JSON.stringify(obj.data));
    } else {              //验证失败
      console.log('表单验证失败');
    }
    e.preventDefault();
  },

  //获取验证是否通过状态，并存放到isSuccess数组中。
  isSuccess(flag){   
    isSuccess.push(flag);
  },
  /*
   *设置表单字段值。
   */
  taskChange(e){
    this.setState({task:e.target.value});  
  },
  descCahnge(e){
     this.setState({desc:e.target.value});   
  },
  fieldsChange(selects) {
    this.setState({ selects});   
  },
  trainChange(selected,text){
    this.setState({ train:selected});  
  },

  render() {  

    isSuccess = [];  
    const validates = [
    {
      validateVal: this.state.task,
      handle: function() {
        let s;
        if (!this.validateVal) {
          s = '请填写任务名称请填写任务名称请填写任务名称请填写任务名称请填写任务名称请填写任务名称请填写任务名称';
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
        if (this.validateVal.length > 20) {
          s = '字符长度不能超过20个';
        } else {
          s = 'success'
        }
        return s;
      }
    }, {
      validateVal: this.state.fields,     
      handle: function() {
        let s;
        if (this.validateVal.length == 0) {
          s = '请设置字段';
        } else {
          s = 'success';
        }
        return s;
      }
    }];  

    return (        
      <div style={{border:'1px solid #ddd',padding:'20px 10px'}}>
        <Form horizontal onSubmit={this.handleSubmit} isSuccess={this.isSuccess} sibmitStatus={this.state.validateState}>              
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
      </div>            
    );
  }

});

let isSuccess2;
const Demo2 = React.createClass({ 

  //初始化表单数据。
  getInitialState() {
    return { 
      validateState:false,  
      username:'',
      tel:''
    }
  },

  //submit按钮提交操作
  handleSubmit(e) { 
    this.setState({validateState:true}); 
    const obj = Form.handleData(this.state, isSuccess2);
    if (obj.isPass) {    //验证通过
      console.log('表单验证通过');
      console.log(JSON.stringify(obj.data));
    } else {              //验证失败
      console.log('表单验证失败');
    }
    e.preventDefault();
  },

  //获取验证是否通过状态，并存放到isSuccess数组中。
  isSuccess(flag){   
    isSuccess2.push(flag);
  },

  /*
   *设置表单字段值。
   */
  usernameChange(e){
      this.setState({username:e.target.value}); 
  },
  telChange(e){
      this.setState({tel:e.target.value}); 
  },

  render() {   

    isSuccess2 = [];  
    const validates = [
    {
      validateVal: this.state.username,
      handle: function() {
        let s;
        if (!this.validateVal) {
          s = '请填写用户名请填写用户名请填写用户名请填写用户名请填写用户名请填写用户名请填写用户名请填写用户名';
        }else {
          s = 'success'
        }
        return s;
      }
    },{
      validateVal: this.state.tel,
      handle: function() {
        let s;
        if (!this.validateVal) {
          s = '请填写手机号';
        }else {
          s = 'success'
        }
        return s;
      }
    }];   

    return (        
      <div style={{border:'1px solid #ddd',padding:'20px 10px',marginTop:'40px'}}>
        <Form horizontal onSubmit={this.handleSubmit} isSuccess={this.isSuccess} sibmitStatus={this.state.validateState}>           
          <div className="row">
              <div className="col-md-6">
                 <FormItem label="用户名：" validate={validates[0]} inline required>
                  <input type="text" className="form-control" onChange={this.usernameChange}/>                      
                </FormItem>
              </div>
              <div className="col-md-6">
                <FormItem label="手机：" validate={validates[1]} inline required>
                  <input type="text" className="form-control"  onChange={this.telChange}/>        
                </FormItem>
              </div>                          
          </div>        
          <FormItem submit>
            <button type="submit" className="btn btn-default">登录</button>
          </FormItem>           
        </Form>
      </div>         
    );
  }

});




export default React.createClass({
  render() {
    return (
      <div>
        <h1>表单</h1>
        
        <Pre>
{`
import { Form, FormItem } from 'bfd-ui/lib/Form'
import { CheckboxGroup, Checkbox } from 'bfd-ui/lib/Checkbox'
import { Select ,Option} from 'bfd-ui/lib/Select'

let isSuccess;
const Demo = React.createClass({ 
  //初始化表单数据。
  getInitialState() {
    return { 
      validateState:false,        
      task: '',
      desc: '',
      train: ['apple','huawei'],
      fields: ['apple', 'mi']
    }
  },
  //submit按钮提交操作
  handleSubmit(e) { 
    this.setState({validateState:true}); 
    const obj = Form.handleData(this.state, isSuccess);
    if (obj.isPass) {    //验证通过
      console.log('表单验证通过');
      console.log(JSON.stringify(obj.data));
    } else {              //验证失败
      console.log('表单验证失败');
    }
    e.preventDefault();
  },
  //获取验证是否通过状态，并存放到isSuccess数组中。
  isSuccess(flag){   
    isSuccess.push(flag);
  },
  /*
   *设置表单字段值。
   */
  taskChange(e){
    this.setState({task:e.target.value});  
  },
  descCahnge(e){
     this.setState({desc:e.target.value});   
  },
  fieldsChange(selects) {
    this.setState({ selects});   
  },
  trainChange(selected,text){
    this.setState({ train:selected});  
  },
  render() {
    isSuccess = [];  
    const validates = [{
      validateVal: this.state.task,
      handle: function() {
        let s;
        if (!this.validateVal) {
          s = '请填写任务名称请填写任务名称请填写任务名称请填写任务名称请填写任务名称请填写任务名称请填写任务名称';
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
        if (this.validateVal.length > 20) {
          s = '字符长度不能超过20个';
        } else {
          s = 'success'
        }
        return s;
      }
    }, {
      validateVal: this.state.fields,     
      handle: function() {
        let s;
        if (this.validateVal.length == 0) {
          s = '请设置字段';
        } else {
          s = 'success';
        }
        return s;
      }
    }];  
    return (    
      <Form horizontal onSubmit={this.handleSubmit} isSuccess={this.isSuccess} sibmitStatus={this.state.validateState}>              
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




let isSuccess2;
const Demo2 = React.createClass({   
  getInitialState() {
    return { 
      validateState:false,  
      username:'',
      tel:''
    }
  }, 
  handleSubmit(e) { 
    this.setState({validateState:true}); 
    const obj = Form.handleData(this.state, isSuccess2);
    if (obj.isPass) {    //验证通过
      console.log('表单验证通过');
      console.log(JSON.stringify(obj.data));
    } else {              //验证失败
      console.log('表单验证失败');
    }
    e.preventDefault();
  },
  isSuccess(flag){   
    isSuccess2.push(flag);
  },  
  usernameChange(e){
      this.setState({username:e.target.value}); 
  },
  telChange(e){
      this.setState({tel:e.target.value}); 
  },
  render() {  
    isSuccess2 = [];  
    const validates = [{
      validateVal: this.state.username,
      handle: function() {
        let s;
        if (!this.validateVal) {
          s = '请填写用户名请填写用户名请填写用户名请填写用户名请填写用户名请填写用户名请填写用户名请填写用户名';
        }else {
          s = 'success'
        }
        return s;
      }
    },{
      validateVal: this.state.tel,
      handle: function() {
        let s;
        if (!this.validateVal) {
          s = '请填写手机号';
        }else {
          s = 'success'
        }
        return s;
      }
    }]; 
    return (     
      <Form horizontal onSubmit={this.handleSubmit} isSuccess={this.isSuccess} sibmitStatus={this.state.validateState}>           
        <div className="row">
            <div className="col-md-6">
               <FormItem label="用户名：" validate={validates[0]} inline required>
                <input type="text" className="form-control" onChange={this.usernameChange}/>                      
              </FormItem>
            </div>
            <div className="col-md-6">
              <FormItem label="手机：" validate={validates[1]} inline required>
                <input type="text" className="form-control"  onChange={this.telChange}/>        
              </FormItem>
            </div>                          
        </div>        
        <FormItem submit>
          <button type="submit" className="btn btn-default">登录</button>
        </FormItem>           
      </Form>           
    );
  }
});
`}
        </Pre>
        <h2>Form1</h2>
        <Demo/>  
        <h2>Form2</h2>
        <Demo2/> 
        <h3>Form 属性</h3>
        <Props>
          <Prop name="onSubmit" type="Function" required>
            <p>表单提交按钮</p>           
          </Prop>
          <Prop name="isSuccess" type="Function" required>
            <p>获取每个FormItem是否验证通过</p>
          </Prop>
          <Prop name="sibmitStatus" type="Boolean">
            <p>设置提交按钮状态。设置为true则一开始就验证，设置为false则点了提交按钮才验证。</p>            
          </Prop>
        </Props>
        <h3>FormItem 属性</h3>
        <Props>
          <Prop name="label" type="String" required>
            <p>表单字段名称</p>    
          </Prop>

          <Prop name="validate" type="Object" required>
            <p>验证条件</p>    
          </Prop>
          <Prop name="required" type="Boolean">
            <p>是否必须</p>    
          </Prop>
          <Prop name="inline" type="Boolean">
            <p>存在inline时表示FormItem是否可以在一排</p>    
          </Prop>
          <Prop name="submit" type="Boolean">
            <p>表示是submit提交按钮</p>    
          </Prop>
        </Props>

    </div>
    )
  }
})