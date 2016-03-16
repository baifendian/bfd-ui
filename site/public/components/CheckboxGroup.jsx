import React from 'react'
import { CheckboxGroup, Checkbox } from 'c/CheckboxGroup'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

const App = React.createClass({

  getInitialState() {
    return {
      selects: ['apple', 'samsung']
    }
  },

  handleChange(selects) {
    this.setState({selects})
  },

  render() {
    return (
      <div>
        <h5>单独使用</h5>
        <Checkbox onChange={e => {alert(e.target.checked)}}>选择</Checkbox>

        <h5>复选框组，针对 value 和 label 不同的情况，布局可灵活控制</h5>
        <CheckboxGroup selects={this.state.selects} onChange={this.handleChange}>
          <Checkbox value="apple">苹果</Checkbox>
          <Checkbox value="mi">小米</Checkbox>
          <Checkbox value="samsung">三星</Checkbox>
          <Checkbox value="huawei">华为</Checkbox>
        </CheckboxGroup>
        
        <h5>复选框组, value 和 label 相同，且布局默认水平平铺</h5>
        <CheckboxGroup selects={this.state.selects} values={['apple','mi','samsung','huawei']}  onChange={this.handleChange}/>
      </div>
    )
  }
})

export default React.createClass({
  render() {
    return (
      <div>
        <h1>多选框</h1>
        <Pre>
{`import { CheckboxGroup, Checkbox } from 'bfd-ui/lib/CheckboxGroup'

const App = React.createClass({

  getInitialState() {
    return {
      selects: ['apple', 'samsung']
    }
  },

  handleChange(selects) {
    this.setState({selects})
  },

  render() {
    return (
      <div>
        <h5>单独使用</h5>
        <Checkbox onChange={e => {alert(e.target.checked)}}>选择</Checkbox>

        <h5>复选框组，针对 value 和 label 不同的情况，布局可灵活控制</h5>
        <CheckboxGroup selects={this.state.selects} onChange={this.handleChange}>
          <Checkbox value="apple">苹果</Checkbox>
          <Checkbox value="mi">小米</Checkbox>
          <Checkbox value="samsung">三星</Checkbox>
          <Checkbox value="huawei">华为</Checkbox>
        </CheckboxGroup>
        
        <h5>复选框组, value 和 label 相同，且布局默认水平平铺</h5>
        <CheckboxGroup selects={this.state.selects} values={['apple','mi','samsung','huawei']}  onChange={this.handleChange}/>
      </div>
    )
  }
})`}
        </Pre>

        <App/>
        
        <Props>
          <Prop name="selects" type="Array" desc="选中的值集合"></Prop>
          <Prop name="values" type="Array" desc="快速创建 value 和 label 相同的复选框组"></Prop>
          <Prop name="onChange" type="Function" desc="选择后的回调"></Prop>
          <Prop name="value" type="Atring" desc="复选框值"></Prop>
        </Props>
      </div>
    )
  }
})