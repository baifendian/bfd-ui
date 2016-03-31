import './main.less'
import React, { PropTypes } from 'react'
import classNames from 'classnames';
/**
 *Form
 */
class Form extends React.Component { 

  getChildContext() {
    return {   
      submitStatu: () => {        
        return this.props.sibmitStatus
      },  
      setValidate: (flag) => {  
        this.props.isSuccess(flag);      
      }
    }
  }  

  render() {
    
    const { prefixCls, className } = this.props;
    const formClassName = classNames({
      'bfd-form':true,
      [className]: !!className,
      [`${prefixCls}-horizontal`]: this.props.horizontal,
      [`${prefixCls}-inline`]: this.props.inline,
    });
    
    return (
      <form {...this.props} className={formClassName}>
        {this.props.children}
      </form>
    );
  }
  
}

Form.handleData = function(state, isSuccess) {
  let obj = {};
  obj.isPass = !(isSuccess.indexOf(false) !== -1);
  if (state.validateState) delete state.validateState;
  obj.data = state;
  return obj;
};

Form.propTypes = {
  prefixCls: React.PropTypes.string,
  horizontal: React.PropTypes.bool,
  inline: React.PropTypes.bool, 
  children: React.PropTypes.any,
  onSubmit: React.PropTypes.func,
};

Form.childContextTypes = {  
  setValidate: React.PropTypes.func,
  submitStatu: React.PropTypes.func
};

Form.defaultProps = {
  prefixCls: 'form',
};

/**
 *FormItem 
 */
class FormItem extends React.Component {

   constructor(props){
        super(props);    
        this.state = {
          flagErr:false
        }
    }

  componentWillReceiveProps(nextProps){  
    if (nextProps.validate && nextProps.validate.handle() !== 'success' && this.context.submitStatu()) {
      this.setState({
        flagErr:true
      })
    } else {
      this.setState({
        flagErr:false
      })
    }
  }
 
  renderLabel() {

    const props = this.props;    
    const required = props.required === undefined ? false : true;     
    const className = classNames({      
      [`bfd-form-label control-label`]: true,    
      [`bfd-${props.prefixCls}-group-required`]: required,
    });

     return <label className={className} key="label">
        {props.label}
      </label>
    
  }

  renderWrapper(children){
    let flag = false;
    const props = this.props;    
    let validate = true;
    let error;    
    if (props.validate && props.inline) {
      error = props.validate.handle();
      error == 'success' ? validate = true : validate = false;
      this.context.setValidate(validate);
      if (!validate && this.context.submitStatu()) {
        flag = true;
      }
    }
    return (
      <div className="col-md-6" key="wrapper" >        
          {children}   
           {
            flag ? (       
              <div>
                <span className="form-control bfd-error">{error}</span>
              </div> ) : null
          }
      </div>
    );
  }

  renderError(){
    let validate = true;    
    const props = this.props; 
    if(props.validate && !props.inline){
      let error;        
      error = props.validate.handle();
      error == 'success' ? validate = true : validate = false;
      this.context.setValidate(validate); 
      if (validate || !this.context.submitStatu()) return;      
      return (
        <div className="col-md-3" key="error" ref="bfdErr">
          <span className="form-control bfd-error" style={{height:'auto'}}>{error}</span>
        </div>  
      )
    }
  }

  renderChildren() {
    const props = this.props;      
    const children = React.Children.map(props.children, (child) => {
      return child;
    });
    return [
      this.renderLabel(),
      this.renderWrapper(children),
      this.renderError()          
    ];
  }
  
  renderFormGroup(children) {
    const props = this.props;
    const prefixCls = props.prefixCls;
    const groupClassName = {
      'has-error':this.state.flagErr,
      [`${prefixCls}-group`]: true,
      [`${props.className}`]: !!props.className,
    };
    return (
      <div className={classNames(groupClassName)}>
        {children}
      </div>
    );
  }

  render() {
    const children = this.renderChildren();
    return this.renderFormGroup(children);
  }
}

FormItem.propTypes = {
  prefixCls: React.PropTypes.string,
  label: React.PropTypes.string,
  labelCol: React.PropTypes.object, 
  className: React.PropTypes.string
};

FormItem.contextTypes = {
  setValidate: React.PropTypes.func,
  submitStatu: React.PropTypes.func
};

FormItem.defaultProps = {  
  prefixCls: 'form'
};

export { Form,FormItem };