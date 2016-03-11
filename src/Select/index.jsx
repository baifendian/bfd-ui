import './main.less'
import React, { PropTypes } from 'react'
import classNames from 'classnames';
import PureRenderMixin from 'react-addons-pure-render-mixin'
import DropDownMixin from '../DropDownMixin'


const Select = React.createClass({ 

	mixins: [PureRenderMixin, DropDownMixin],

	childContextTypes: {
		getSelected: PropTypes.func,
		setSelected: PropTypes.func
	},

	getInitialState() {
		return {			
			arr:this.props.selected
		}
	},	

	getChildContext() {
			return {
				getSelected: () => this.props.selected,
				setSelected: (value, text) => {
					if (this.props.multiple) {
						let _arr = this.state.arr;						
						this.isInArray(value, _arr) ? _arr = this.removeObjInArr(value,_arr) :  _arr.push(value);
						this.setState({	arr: _arr });
						this.props.onChange(_arr);
					} else {
						this.props.onChange(value);
					}
				}
			}
		},

	isInArray(obj, arr) {
		var flag = false;
		arr.map(function(item, i) {
			if (item == obj) {
				flag = true;
			}
		})
		return flag;
	},

	removeObjInArr(obj,arr){
		let _arr=[];
		for(var k in arr){
			if(obj == arr[k]){
				continue;
			}
			_arr.push(arr[k]);
		}
		return _arr;
	},

	render() {	

		let sText = [];
		const { children,selected} = this.props;		
		this.props.multiple ?
			children.map(function(item, i) {
				selected.map(function(_item, _i) {
					if (item.props.value == _item) sText.push(item.props.children);
				})
			}) :
			children.map(function(item, i) {
				if (selected == item.props.value) {
					sText.push(item.props.children);
				}
			});


		return (
			<div onClick={this.stopPropagation} className={classNames('bfd-dropdown dropdown', {open: this.state.isOpen})}>
			  <div onClick={this.handleToggle}>
			     {sText.join(',')}
			    <span className="caret bfd-caret"></span>
			   {
          		this.state.isOpen ? (
			        <ul className="dropdown-menu bfd-menu">
				   		{children}
				 	</ul> ) : null
			    }
			  </div>
			</div>
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
			<li {...other}><a href="javascript:;"  value={value} className={className}>{children}</a></li>
		)
	}
})

export { Select , Option }