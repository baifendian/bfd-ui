import './main.less'
import React, { PropTypes } from 'react'
import classNames from 'classnames';


const Select = React.createClass({ 

	childContextTypes: {
		getSelected: PropTypes.func,
		setSelected: PropTypes.func
	},

	getInitialState() {
		return {
			ishide: {display: 'none'},
			flag:false,
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

	componentDidMount() {
		window.addEventListener('click', this.windowClick);
	},
	
	windowClick(e) {			
		if (!this.state.flag && this.state.ishide.display == 'block') this.setState({ ishide: { display: 'none' } });			
		this.setState({	flag: false	});
	},

	handleClick(e) {
		const o = this.state.ishide;
		o.display == 'none' ? this.setState({ ishide: { display: 'block' }}) : this.setState({ishide: {display: 'none'}});	
		this.setState({flag:true});		
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
			<div className="bfd-dropdown dropdown" onClick={this.handleClick}>
			  <div>
			     {sText.join(',')}
			    <span className="caret bfd-caret"></span>
			  </div>
			  <ul className="dropdown-menu bfd-menu" style={this.state.ishide}>
			   		{children}
			  </ul>
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