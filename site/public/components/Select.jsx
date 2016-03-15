import React from 'react'
import { Select, Option} from 'c/Select'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

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
          selected: 3
        }
      },

      handleChange(select,text) {
        this.setState({selected: select})
      },

      render() {
        return (
          <div className="col-md-6">
            <Select selected={this.state.selected} onChange={this.handleChange} multiple>
               <Option value="0">aaa</Option>
               <Option value="1">bbb</Option>
               <Option value="2">ccc</Option>
               <Option value="3">ddd</Option>
            </Select>
          </div> 
        )
      } 

    })    

    const App = React.createClass({
      render() {
        return <Demo/>
      }
    })
  `}
        </Pre>

        <App/>       
        <Props title="Select 属性">
          <Prop name="selected" desc="选中的值"></Prop>
          <Prop name="onChange" type="Function" desc="选择后的回调"></Prop>
          <Prop name="multiple" type="Boolean" desc="true表示可以多选，flase表示单选。默认为单选。"></Prop>
        </Props>        
        <Props title="Option 属性">
           <Prop name="value" desc="下拉框值"></Prop>
        </Props>
         
      </div>
    )
  }
})
