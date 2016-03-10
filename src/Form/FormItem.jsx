import React from 'react';
import classNames from 'classnames';

class FormItem extends React.Component {
 
  renderLabel() {
    const props = this.props;    
    const required = props.required === undefined ? false : true;     
    const className = classNames({      
      [`col-md-3 control-label`]: true,    
      [`bfd-${props.prefixCls}-group-required`]: required,
    });
    return props.label ? (
      <label className={className} key="label">
        {props.label}
      </label>
    ) : null;
  }

  renderWrapper(children){

    const props = this.props;    
    const className = classNames({
      ['col-md-5']: true,
      [`col-md-offset-3`]:!!props.submit
    });

    return (
      <div className={className} key="wrapper">
        {children}
      </div>
    );
  }

  renderError(){

    let validate;
    const props = this.props;   

    props.required ? validate = false : validate = true;

    if(props.validate){

      const cname = props.validate.span ? `col-md-${props.validate.span}` : 'col-md-3';
      let error;
      error = props.validate.handle();
      error == 'success' ? validate = true : validate = false;       
      this.context.setValidate(validate);     

      if (validate || !this.context.submitStatu()) return;
      
      return (
        <div className={cname} key="error" ref="bfdErr">
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

module.exports = FormItem;