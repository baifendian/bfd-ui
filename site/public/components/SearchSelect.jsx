import React from 'react'
import { SearchSelect } from 'c/SearchSelect'
import Pre from '../Pre'
import { Props, Prop } from '../Props'


export default React.createClass({

	getInitialState() {
			return {
				selected: []
			}
		},

	handleChange(result) {
		console.log(result);
		this.setState({	selected: result });
	},

  render() {
    return (
      <div style={{height:'500px'}}>
        <h1>查询组件框</h1>   
        <SearchSelect url="/data/searchSelect.json?search=" onChange={this.handleChange}></SearchSelect>        
      </div>
    )
  }
})
