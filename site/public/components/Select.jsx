import React from 'react'
import { Select, Option} from 'c/Select'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

const App = React.createClass({

  getInitialState() {
    return {      
      selected:'apple',
      selected2: ['apple','mi'],
      selected3:'mi',
      }
    },

    handleChange(select,text) {
      //console.log('value:' + select+',text:'+text);
      this.setState({ selected: select });
    },
    handleChange2(select,text){
      this.setState({ selected2: select });
    },
    handleChange3(select,text){
      this.setState({ selected3: select });
    },

  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <h3>下拉框(单选)</h3>
          <Select selected={this.state.selected} onChange={this.handleChange}>
              <Option value="apple">苹果</Option>
              <Option value="mi">小米</Option>
              <Option value="samsung">三星</Option>
              <Option value="huawei">华为</Option>
          </Select>
        </div>
        <div className="col-md-4">
          <h3>下拉框(多选)</h3>
          <Select selected={this.state.selected2} onChange={this.handleChange2} multiple>
              <Option value="apple">苹果</Option>
              <Option value="mi">小米</Option>
              <Option value="samsung">三星</Option>
              <Option value="huawei">华为</Option>
          </Select>
        </div> 
        <div className="col-md-4">
          <h3>下拉框(disabled)</h3>
          <Select selected={this.state.selected3} onChange={this.handleChange3} disabled>
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


export default React.createClass({
  render() {
    return (
      <div>
        <h1>下拉框</h1>
        <Pre>
{`
import { Select ,Option} from 'bfd-ui/lib/Select'

const Demo = React.createClass({
  getInitialState() {
    return {      
      selected:'apple',
      selected2: ['apple','mi','samsung','huawei'],
      selected3:'mi',
      }
    },
    handleChange(select,text) {
      console.log('value:' + select+',text:'+text);
      this.setState({ selected: select });
    },
    handleChange2(select,text){
      this.setState({ selected2: select });
    },
    handleChange3(select,text){
      this.setState({ selected3: select });
    },
  render() {
    return (
      <div className="row">
        <div className="col-md-4">
          <h3>下拉框(单选)</h3>
          <Select selected={this.state.selected} onChange={this.handleChange}>
              <Option value="apple">苹果</Option>
              <Option value="mi">小米</Option>
              <Option value="samsung">三星</Option>
              <Option value="huawei">华为</Option>
          </Select>
        </div>
        <div className="col-md-4">
          <h3>下拉框(多选)</h3>
          <Select selected={this.state.selected2} onChange={this.handleChange2} multiple>
              <Option value="apple">苹果</Option>
              <Option value="mi">小米</Option>
              <Option value="samsung">三星</Option>
              <Option value="huawei">华为</Option>
          </Select>
        </div> 
        <div className="col-md-4">
          <h3>下拉框(disabled)</h3>
          <Select selected={this.state.selected3} onChange={this.handleChange3} disabled>
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
  const App = React.createClass({
    render() {
      return <Demo/>
    }
  })
`}
        </Pre>

        <App/>  

        <Props>
          <Prop name="selected" required>
            <p>选中的值</p>    
          </Prop>
          <Prop name="onChange" type="Function" required>
            <p>选择后的回调</p>    
          </Prop>
          <Prop name="multiple" type="Boolean">
            <p>true表示可以多选，flase表示单选。默认为单选。</p>    
          </Prop>
          <Prop name="disabled" type="Boolean">
            <p>true表示禁用，默认为false.</p>    
          </Prop>
          <Prop name="value" required>
            <p>下拉框值</p>    
          </Prop>
        </Props>    
         
      </div>
    )
  }
})
