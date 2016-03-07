import React from 'react'
import { render } from 'react-dom'

import { Select ,Option} from 'c/select/index.jsx'



const App = React.createClass({

  getInitialState() {
      return {
        selected: 3
      }
    },

    handleChange(select,text) {
      console.log('value:' + select+',text:'+text);
      this.setState({
        selected: select
      });
    },

  render() {
    return (
      <div className="row">
        <div className="col-md-6">
          <Select selected={this.state.selected} onChange={this.handleChange}>
            <Option value="0">aaa</Option>
            <Option value="1">bbb</Option>
            <Option value="2">ccc</Option>
            <Option value="3">ddd</Option>
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