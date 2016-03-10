import React from 'react'
import { render } from 'react-dom'

import { Select ,Option} from 'c/Select/index.jsx'


const App = React.createClass({

  getInitialState() {
    return {      
      selected:'apple',
      selected2: ['apple','mi','samsung','huawei']
      }
    },

    handleChange(select,text) {
      console.log('value:' + select+',text:'+text);
      this.setState({ selected: select });
    },
    handleChange2(select,text){
      this.setState({ selected2: select });
    },

  render() {
    return (
      <div className="row">

        <div className="col-md-6">
          <h3>下拉框(单选)</h3>
          <Select selected={this.state.selected} onChange={this.handleChange}>
              <Option value="apple">苹果</Option>
              <Option value="mi">小米</Option>
              <Option value="samsung">三星</Option>
              <Option value="huawei">华为</Option>
          </Select>
        </div> 

        <div className="col-md-6">
          <h3>下拉框(多选)</h3>
          <Select selected={this.state.selected2} onChange={this.handleChange2} multiple>
              <Option value="apple">苹果</Option>
              <Option value="mi">小米</Option>
              <Option value="samsung">三星</Option>
              <Option value="huawei">华为</Option>
          </Select>
        </div>  
             
      </div>
    )
  }
  
});

export default () => {
  render (
  	  <App/>, document.getElementById('demo')
    )
}