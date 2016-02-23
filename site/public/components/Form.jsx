
import React from 'react'
import { render } from 'react-dom'
import Form from 'c/form/index.jsx'
import Select from 'c/form/select.jsx'
import CheckBox from 'c/form/checkBoxComponent.jsx'

const FormItem = Form.Item

const err = {
    textAlign: 'left',
    backgroundColor: '#FBDECF',
    height: '34px',
    margin: '0 16px',
    color: '#B94B45'
}

const selectList = [{opt:'test',value:'/user/local/spark/crossSelling/Imedcalsell test'},
                    {opt:'test2',value:'/user/local/spark/crossSelling/Imedcalsell test2'}];

export default () => {
	render(         
		<Form>
			<FormItem label="任务名称:" reqire="*">				
        <div className="col-sm-4">
          <input type="text" className="form-control"/>
        </div>
        <div className="col-sm-4 control-label" style={err}>
          1-5个字符，中英文，数字
        </div>
			</FormItem>

      <FormItem label="任务描述:">       
        <div className="col-sm-4">
          <textarea className="form-control"/>
        </div>        
      </FormItem>

      <FormItem label="训练数据:" reqire="*">       
        <Select list={selectList} cname="col-sm-4" placeholder="--请选择数据所在的路径--"></Select>        
      </FormItem>

      <FormItem label="字段设置:">       
        <div className="col-sm-4">
            <CheckBox></CheckBox>
        </div>        
      </FormItem>



      </Form>,document.getElementById('demoForm')
		)
}