import 'bfd-bootstrap'
import './select.css'
import React from 'react'

export default React.createClass({

 getInitialState(){
 	return {
 		cname:'select',
 		items:this.props.list
 	}
 },

 handleClick(){ 	
 	const _cname = this.state.cname;
 	this.state.cname.indexOf('open') == -1 ? 
 	this.setState({
 			cname:'select open',
 			items:this.props.list
	}):
 	this.setState({
				cname:'select',
				items:this.props.list
	});
 },

 selectClick(opt){ 	
 
 	const temp = this.props.list;
 	for(var i=0;i<temp.length;i++){
 		if(temp[i].active) delete temp[i].active;
 		if(temp[i].opt == opt) temp[i].active = 'selected';
 	}
 	this.setState({
 		cname:'select',
 		items:temp
 	})
 },

  render() {
  	
  	let title = this.props.placeholder;
  	const self = this;
  	const list = this.state.items.map(function(item,i){
  		if(item.active == 'selected'){  			
  			title = item.value;
  		}  		
		return (
			<li key={item.opt} data-value={item.opt} onClick={self.selectClick.bind(self,item.opt)} className={item.active||''}>{item.value}</li>
			);
	});

    return (
      <div className={this.props.cname}>		
		<div className="u-content">
			<div className={this.state.cname}>
				<p onClick={this.handleClick}>{title}</p>
				<ul>
					{list}
				</ul>				
			</div>
		</div>
	</div>
    )
  }
})