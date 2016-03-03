import 'bfd-bootstrap'
import React from 'react'


const container = {   
	border: '1px solid #ddd',
    maxHeight: '120px',
    padding: '10px 10px 0px 10px',   
    overflowY: 'auto',
    overflowX: 'hidden'
}


export default React.createClass({

  render() {  	

    return (
    	<div style={container}>
    		<div className="row" style={{marginBottom:'10px'}}>
    			<div className="col-sm-12">全部</div>
    		</div>
    		<div className="row" style={{marginBottom:'10px'}}>
    			<div className="col-sm-6">test1</div>
    			<div className="col-sm-6">test2</div>
    		</div>
    		<div className="row" style={{marginBottom:'10px'}}>
    			<div className="col-sm-6">test3</div>
    			<div className="col-sm-6">test4</div>	
    		</div>
    	</div>
    )
  }
})