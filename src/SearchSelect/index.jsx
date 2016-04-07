import './main.less'
import React, { PropTypes } from 'react'
import classNames from 'classnames';
import { Dropdown, DropdownToggle, DropdownMenu } from '../Dropdown'
import Fetch from '../Fetch'


const SearchSelect = React.createClass({ 

	getInitialState() {

		let o;
		const data = this.props.data;
		if(data && this.getType(data,'string')){
			o = 'string';
		} else if(data&&this.getType(data,'object')){
			o = 'object';
		}else{
			o=null;
		}

		return {

			data:this.props.data || [],
			searchData:this.props.data || [],
			result: this.props.selected,
			type: o,
			selected: !!this.props.selected.length,
			disabled: !!this.props.selected.length,
			value:''

		}
	},

	handleSuccess(data) {

		if(this.props.data) return;

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

	handleFocus(e){
		this.setState({disabled:false});
	},
	
	handleChange(e) {	

		const array = this.state.data,
			keyword = e.target.value;

		this.setState({value:keyword});

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

	handleClickLi(item){
		this.setState({disabled:true});
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
						<li value={item} key={item} onClick={this.handleClickLi}>
							<i onClick={this.handleRemove.bind(this,item)} className="glyphicon glyphicon-remove"></i>
							{item}
						</li> 
					);
					break;
				case 'object':
					return ( 
						<li value={item.key} key={item.key} onClick={this.handleClickLi}>
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

		_result.push(
				<li key="search-input" className="sh-li">
					<input onChange={this.handleChange} onFocus={this.handleFocus} className="sh-input" value={this.state.value}/>
				</li> );

		return (				
			<Dropdown ref="searchSelect" className="bfd-search-select" disabled={this.state.disabled}>
		        <DropdownToggle>
		        	{
		        	  this.state.selected ? 
	        		  ( <div><ul className="form-control s-s-u" >{_result}</ul></div> ) :
	        		  ( <input onChange={this.handleChange} onFocus={this.handleFocus} className="form-control"  value={this.state.value}/> )
		        	}
		        	{
		        	  this.props.url?<Fetch url={this.props.url} onSuccess={this.handleSuccess}></Fetch>:null
		        	}		        				       
		        </DropdownToggle>
		        <DropdownMenu>		        	
		        	<ul className="dropdown-menu-ul">{children}</ul>      
		        </DropdownMenu>
	    	</Dropdown>			
		);		
	}

});

export { SearchSelect }