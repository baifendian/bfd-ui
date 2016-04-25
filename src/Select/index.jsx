import './main.less'
import React, { PropTypes } from 'react'
import classNames from 'classnames';
import { Dropdown, DropdownToggle, DropdownMenu } from '../Dropdown'


const Select = React.createClass({ 	

	childContextTypes: {
		getSelected: PropTypes.func,
		setSelected: PropTypes.func
	},

	getInitialState() {
		return {		
			disabled:this.props.disabled,	
			arr:this.props.selected
		}
	},	

	getChildContext() {
		return {
			getSelected: () => this.props.selected,
			setSelected: (value, text) => {				
				if (this.props.multiple) {
					let _arr = this.state.arr;										
					_arr.indexOf(value) != -1 ? null :  _arr.push(value);
					this.setState({	arr: _arr });
					this.props.onChange(_arr);
				} else {
					this.props.onChange(value);         
				}
			}
		}
	},
	handleClick(){
		this.refs.select.close();		
	},

	remove(item, e) {
		let _arr = this.state.arr;
		_arr.indexOf(item.value) != -1 ? _arr.splice(_arr.indexOf(item.value), 1) : null;
		this.setState({	arr: _arr });
		this.props.onChange(_arr);
		if (e && e.stopPropagation) e.stopPropagation();
	},

	render() {	

		let sText = [];
		const { children,selected} = this.props;					

		this.props.multiple ?

			children.length > 1 ?
				children.map(function(item, i) {
					selected.map(function(_item, _i) {
						if (item.props.value == _item) sText.push({value:item.props.value,children:item.props.children});
					})
				}) : (() => {
					selected == children.props.value ? sText.push({value:children.props.value,children:children.props.children}) : sText = [];
				})() :

			children.length > 1 ?
				children.map(function(item, i) {
					if (selected == item.props.value) {
						sText.push({value:item.props.value,children:item.props.children})
					}
				}) : (() => {					
					selected == children.props.value ? sText.push({value:children.props.value,children:children.props.children}) : sText = [];
				})();	
			
			const stextChild = sText.map((item,i)=>{
				return (
					<li key={item.value} data-value={item.value}>
						
						<span>{item.children}</span>
						{
						   this.props.multiple ? <i className="glyphicon glyphicon-remove bfd-remove" onClick={this.remove.bind(this,item)}></i> : null
						}						
					</li>
				);
			});

		return (
			<Dropdown ref="select" className={classNames('bfd-select', {'bfd-select-disabled': this.state.disabled})} disabled={this.state.disabled}>
		        <DropdownToggle>
		        	<div className="txt">
		        		<ul className={classNames({'bfd-multiple':this.props.multiple},{'bfd-not-multiple':!this.props.multiple})}>{stextChild}</ul>		        		
		        	</div>
				  	<span className="caret bfd-caret"></span>
		        </DropdownToggle>
		        <DropdownMenu className="dropdown-menu">
		        	<ul  onClick={this.handleClick}>{children}</ul>		          
		        </DropdownMenu>
		    </Dropdown>
		);
	}  

});

const Option = React.createClass({ 

	contextTypes: {
		getSelected: PropTypes.func,
		setSelected: PropTypes.func
	},

	render(){	
		
		let className;
		const {	children, value, ...other } = this.props;  
	
    	const selected = this.context.getSelected();
		
		selected instanceof Array ?   
		className = classNames({
			'active': selected.indexOf(value) != -1
		}):
		className = classNames({
			'active': selected == value
		});

		other.onClick = e => {		
			const value = e.currentTarget.getAttribute('data-value');
			const text = e.currentTarget.innerHTML;	
			
			this.context.setSelected(value, text);		
		}
		
		return (
			<li {...other}  className={className} data-value={value}> {children} </li>
		)
	}
})

export { Select , Option }