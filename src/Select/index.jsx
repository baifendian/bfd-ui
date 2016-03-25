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
					_arr.indexOf(value) != -1 ? _arr.splice(_arr.indexOf(value),1) :  _arr.push(value);
					this.setState({	arr: _arr });
					this.props.onChange(_arr);
				} else {
					this.props.onChange(value);         
				}
			}
		}
	},
	handleClick(){
		this.refs.select.close()
	},

	render() {	

		let sText = [];
		const { children,selected} = this.props;

		this.props.multiple ?
			children.length ? children.map(function(item, i) {
				selected.map(function(_item, _i) {
					if (item.props.value == _item) sText.push(item.props.children);
				})
			}) : (() => {
				selected == children.props.value ? sText.push(children.props.children) : sText = [];
			})() :
			children.length ?
			children.map(function(item, i) {
				if (selected == item.props.value) {
					sText.push(item.props.children);
				}
			}) : (() => {
				selected == children.props.value ? sText.push(children.props.children) : sText = [];
			})();			
		return (
			<Dropdown ref="select" className="bfd-select" disabled={this.state.disabled}>
		        <DropdownToggle>
		        	<div className="txt">{sText.join(',')}</div>
				  	<span className="caret bfd-caret"></span>
		        </DropdownToggle>
		        <DropdownMenu className="dropdown-menu">
		        	<ul onClick={this.handleClick}>
		        		{children}
		        	</ul>		          
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
		
		(selected instanceof Array) ?
		className = classNames({
			'active': (function() {
				let f = false;
				selected.map(function(item) {
					if (item == value) f = true;
				})
				return f;
			})()
		}):
		className = classNames({
			'active': selected == value
		});

		other.onClick = e => {
			const value = e.target.getAttribute('value');
			const text = e.target.innerHTML;
			this.context.setSelected(value, text);
		}
		return (
			<li {...other} className={className} value={value}> {children} </li>
		)
	}
})

export { Select , Option }