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
			flag:false
		}
	},	

	getChildContext() {
		return {
			getSelected: () => this.props.selected,
			setSelected: (value, text) => {
				this.props.onChange(value, text);
			}
		}
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

		let sText;
		const { children,selected} = this.props;
		children.map(function(item,i){			
			if(selected == item.props.value){
				sText = item.props.children;
			}
		});

		return (
			<div className="bfd-dropdown dropdown" onClick={this.handleClick}>
			  <div>
			     {sText}
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

		const {	children, value, ...other } = this.props;
		const className = classNames({
			'active': this.context.getSelected() == value
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