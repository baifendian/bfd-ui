import React from 'react';
import classNames from 'classnames';

class FormItem extends React.Component {
 
  renderLabel() {
    const props = this.props;
    let _offset = '';
    const required = props.required === undefined ? false : true;
    const labelSpan = props.labelCol && props.labelCol.span ? `col-md-${props.labelCol.span}` : 'col-md-2';
    if (props.labelCol && props.labelCol.offset) _offset = `col-md-offset-${props.labelCol.offset}`;
    const className = classNames({
      [labelSpan]: true,
      [`control-label`]: true,
      [_offset]:props.labelCol && props.labelCol.offset,
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
    let _offset = '';
    const wrapperSpan = props.wrapperCol && props.wrapperCol.span ? `col-md-${props.wrapperCol.span}` : 'col-md-10';
    if (props.wrapperCol && props.wrapperCol.offset) _offset = `col-md-offset-${props.wrapperCol.offset}`;
    const className = classNames({
      [wrapperSpan]: true,
      [_offset]:props.wrapperCol && props.wrapperCol.offset
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
      const cname = props.validate.span ? `col-md-${props.validate.span}` : 'col-md-2';
      let error;
      error = props.validate.handle();
      error == 'success' ? validate = true : validate = false;      
      props.handleValidate(validate);
      if (validate) return;
      return (
        <div className={cname} key="error">
          <span className="form-control bfd-error">{error}</span>
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

FormItem.defaultProps = {  
  prefixCls: 'form'
};

module.exports = FormItem;