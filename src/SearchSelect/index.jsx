import './main.less'
import React, { PropTypes } from 'react'
import classNames from 'classnames';
import { Dropdown, DropdownToggle, DropdownMenu } from '../Dropdown'
import Fetch from '../Fetch'


const SearchSelect = React.createClass({ 

	getInitialState() {
		return {
			url: this.props.url,			
			data: [],
			searchData:[],
			result:[],
			type:null,
			selected:false,
			disabled:this.props.disabled,
		}
	},

	handleSuccess(data) {
		if(this.getType(data,'string')){
			this.setState({type:'string'});
		} 
		if(this.getType(data,'object')){
			this.setState({type:'object'});
		}
		this.setState({	data: data,	searchData: data });
	},

	getType(data, type) {
		let flag = true;
		data.map(function(item) {
			if (typeof item !== type) {
				flag = false;
			}
		})
		return flag;
	},
	
	handleChange(e) {			
		const array = this.state.data,
			keyword = e.target.value;
		let data = [];
		switch (this.state.type) {
			case 'string':
				array.map(function(item){
					if(item.indexOf(keyword) != -1){
						data.push(item);
					}
				});
				break;
			case 'object':
				array.map(function(item){
					if(item.value.indexOf(keyword) != -1){
						data.push(item);
					}
				});
				break;
			default:				
				break;
		}					
		this.setState({ searchData: data });						
	},

	handleClick(item) {		
		let arr = this.state.result;
		if (this.state.result.indexOf(item) == -1) arr.push(item);					
		this.state.result.length>0 ? this.setState({selected:true,disabled:true}) : this.setState({selected:false,disabled:false});
		this.props.onChange(arr);
		this.setState({result:arr});					
	},

	handleRemove(obj){	
		let arr = this.state.result;
			arr.splice(arr.indexOf(obj),1);
		if (arr.length == 0)  this.setState({selected:false,disabled:false});
		this.props.onChange(arr);
		this.setState({result:arr});				
	},
	render() {		
		const children = this.state.searchData.map(item => {			
			const classname = classNames({
				'active': this.state.result.indexOf(item) != -1
			});
			switch (this.state.type) {
				case 'string':
					return ( 
						<li value={item} key={item} onClick={this.handleClick.bind(this,item)} className={classname}> 
							{item} 
						</li> 
					);
					break;
				case 'object':
					return ( 
						<li value={item.key} key={item.key} onClick={this.handleClick.bind(this,item)} className={classname}> 
							{item.value} 
						</li> 
					);
					break;
				default:
					return null;
					break;
			}
		});
		const _result = this.state.result.map(item=>{				
			switch (this.state.type) {
				case 'string':
					return ( 
						<li value={item} key={item}>
							<i onClick={this.handleRemove.bind(this,item)} className="glyphicon glyphicon-remove"></i>
							{item}
						</li> 
					);
					break;
				case 'object':
					return ( 
						<li value={item.key} key={item.key}>
							<i onClick={this.handleRemove.bind(this,item)} className="glyphicon glyphicon-remove"></i>
							{item.value}
						</li> 
					);
					break;
				default:
					return null;
					break;
			}
		});	
		return (				
			<Dropdown ref="searchSelect" className="bfd-search-select" disabled={this.state.disabled}>
		        <DropdownToggle>
		        	{
		        	this.state.selected ? 
	        		  ( <ul className="form-control" style={{height:'100%'}}>{_result}</ul> ) :
	        		  ( <input onChange={this.handleChange} className="form-control" style={{boxShadow:'none'}}/> )
		        	}		        	
		        	<Fetch url={this.state.url} onSuccess={this.handleSuccess} delay={300}></Fetch>				       
		        </DropdownToggle>
		        <DropdownMenu>		        	
		        	<ul>{children}</ul>      
		        </DropdownMenu>
	    	</Dropdown>			
		);
	}
});

export { SearchSelect }