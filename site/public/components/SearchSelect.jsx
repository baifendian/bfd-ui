import React from 'react'
import { SearchSelect } from 'c/SearchSelect'
import Pre from '../Pre'
import { Props, Prop } from '../Props'


const App = React.createClass({

	getInitialState() {
			return {
				selected: []
			}
		},

	handleChange(result) {		
		this.setState({	selected: result });
	},

  render() {
    //const data = ["小米1","小米2","小米3","小米4","三星1","三星2","三星3","三星4","乐视1","乐视2","乐视3"];
    const data = [{ "key": "mi1", "value": "小米1" },{ "key": "mi2", "value": "小米2" },{ "key": "mi3", "value": "小米3" },
                  { "key": "huawei", "value": "华为" }, { "key": "apple", "value": "苹果" },{ "key": "letv","value": "乐视" },
                  { "key": "samsung","value": "三星" }, { "key": "meizu", "value": "魅族" }, { "key": "lenove","value": "联想" },
                  {"key": "sony1","value": "索尼1" },{"key": "sony2","value": "索尼2" },{"key": "sony3","value": "索尼3" }];
    return (
        <SearchSelect data={data} url="/data/searchSelect.json" selected={this.state.selected}  onChange={this.handleChange}></SearchSelect>      
    )
  }
})


export default React.createClass({
  render() {
    return (
      <div>
        <h1>查询下拉框</h1>
        <Pre>
{`
import { SearchSelect } from 'bfd-ui/lib/SearchSelect'

const App = React.createClass({
	
  getInitialState() {
		return {
			selected: []
		}
	},

  handleChange(result) {		
		this.setState({	selected: result });
	},
  
   render() {
    //const data = ["小米1","小米2","小米3","小米4","三星1","三星2","三星3","三星4","乐视1","乐视2","乐视3"];    
    const data = [{ "key": "mi1", "value": "小米1" },{ "key": "mi2", "value": "小米2" },{ "key": "mi3", "value": "小米3" },
                  { "key": "huawei", "value": "华为" }, { "key": "apple", "value": "苹果" },{ "key": "letv","value": "乐视" },
                  { "key": "samsung","value": "三星" }, { "key": "meizu", "value": "魅族" }, { "key": "lenove","value": "联想" },
                  {"key": "sony1","value": "索尼1" },{"key": "sony2","value": "索尼2" },{"key": "sony3","value": "索尼3" }];
    return (
        <SearchSelect data={data}  selected={this.state.selected}  onChange={this.handleChange}></SearchSelect>      
    )
  }
})
`}
        </Pre>

        <App/>  

        <Props>
          <Prop name="Url Data" required>
            <p>返回数据格式</p>  
            <h5>键值对数据格式：</h5>
            <Pre>
          
{`
{
  "code": 200,
  "data": [{
    "key": "mi",
    "value": "小米"
  }, {
    "key": "huawei",
    "value": "华为"
  }, {
    "key": "apple",
    "value": "苹果"
  }, {
    "key": "letv",
    "value": "乐视"
  }, {
    "key": "samsung",
    "value": "三星"
  }, {
    "key": "meizu",
    "value": "魅族"
  }, {
    "key": "lenove",
    "value": "联想"
  }, {
    "key": "sony",
    "value": "索尼"
  }]
}
`}
            </Pre>  
            <h5>字符串数据格式：</h5>
            <Pre>
{`
{
  "code": 200,
  "data": ["小米1","小米2","小米3","小米4","三星1","三星2","三星3","三星4","乐视1","乐视2","乐视3"]
}
`}
            </Pre>  
          	</Prop>
          	<Prop name="url" required>
            	<p>请求接口</p>  
          	</Prop>
            <Prop name="data" required>
              <p>下拉框数据</p>  
            </Prop>
            <Prop name="selected" required>
              <p>选中的值</p>  
            </Prop>
         	  <Prop name="onChange" type="Function" required>
            	<p>选择后的回调</p>    
          	</Prop>

            </Props>    
             
          </div>
    )
  }
})
