import './main.less'
import React, { PropTypes } from 'react'
import classNames from 'classnames';
import { Dropdown, DropdownToggle, DropdownMenu } from '../Dropdown'
import Loading from '../Loading'


const SearchSelect = React.createClass({ 

	getInitialState() {
		return {
			url: this.props.url,
			data: [],
			result:[],
			selected:false,
			disabled:this.props.disabled,
		}
	},
	
	handleChange(e) {		
		this.setState({
			url: this.props.url + e.target.value
		})
	},

	handleClick(item) {
		let arr = this.state.result;
		if (this.state.result.indexOf(item) == -1) arr.push(item);					
		this.state.result.length>0 ? this.setState({selected:true,disabled:true}) : this.setState({selected:false,disabled:false});
		this.props.onChange(arr);
		this.setState({result:arr});		
	},

	handleRemove(obj){		
		let arr = [];		
		this.state.result.forEach(item => {
        	if(obj.key !== item.key)
			arr.push(item);
      	});
		if (arr.length == 0)  this.setState({selected:false,disabled:false});
		this.props.onChange(arr);
		this.setState({result:arr});		
	},

	handleSuccess(data) {
		this.setState({	data });	
	},

	render() {
		const children = this.state.data.map(item => {			
			const classname = classNames({
				'active': this.state.result.indexOf(item) != -1
			});
			return ( 
				<li value={item.key} key={item.key} onClick={this.handleClick.bind(this,item)} className={classname}> 
					{item.value} 
				</li> 
			);
		});
		const _result = this.state.result.map(item=>{
			return ( 
				<li value={item.key} key={item.key}>
					<i onClick={this.handleRemove.bind(this,item)} className="glyphicon glyphicon-remove"></i>
					{item.value}
				</li> 
			);
		})
		return (				
			<Dropdown ref="searchSelect" className="bfd-search-select" disabled={this.state.disabled}>
		        <DropdownToggle>
		        	{
		        	this.state.selected ? 
	        		  ( <ul className="form-control" style={{height:'100%'}}>{_result}</ul> ) :
	        		  ( <input onChange={this.handleChange} className="form-control" style={{boxShadow:'none'}}/> )
		        	}		        	
		        	<Loading url={this.state.url} onSuccess={this.handleSuccess} delay={300}></Loading>				       
		        </DropdownToggle>
		        <DropdownMenu>		        	
		        	<ul>{children}</ul>      
		        </DropdownMenu>
	    	</Dropdown>			
		);
	}
});

export { SearchSelect }