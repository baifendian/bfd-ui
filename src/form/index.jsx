import 'bfd-bootstrap'
import React from 'react'

const Form = React.createClass({  
  render() {
    return (
      <form className="form-horizontal">{this.props.children}</form>
    )
  }
})

Form.Item = React.createClass({ 
  render() {
    return (
      <div className="form-group">
      <label className="col-sm-2 control-label"><i style={{color:'red',padding:'0px 4px'}}>{this.props.reqire}</i>{this.props.label}</label>       
          {this.props.children}      
      </div>
    )
  }
})

export default Form