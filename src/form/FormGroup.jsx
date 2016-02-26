import React from 'react';
import classNames from 'classnames';

class FormGroup extends React.Component { 

  getId() {
    return this.props.children.props && this.props.children.props.id;
  }

  getMeta() {
    return this.props.children.props && this.props.children.props.__meta;
  }

  isRequired() {
    if (this.context.form) {
      const meta = this.getMeta() || {};
      const validate = (meta.validate || []);

      return validate.filter((item) => !!item.rules).some((item) => {
        return item.rules.some((rule) => rule.required);
      });
    }
    return false;
  }

  renderLabel() {
    const props = this.props;
    const labelCol = props.labelCol;
    const required = props.required === undefined ?
      this.isRequired() :
      props.required;

    const className = classNames({
      [labelCol]: true,
      [`${props.prefixCls}-group-required`]: required,
    });

    return props.label ? (
      <label htmlFor={props.id || this.getId()} className={className} key="label">
        {props.label}
      </label>
    ) : null;
  }

  renderChildren() {
    const props = this.props;
    const children = React.Children.map(props.children, (child) => {
      if (typeof child.type === 'function' && !child.props.size) {
        return React.cloneElement(child, { size: 'large' });
      }

      return child;
    });
    return [
      this.renderLabel(),
      children,
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

FormGroup.propTypes = {
  prefixCls: React.PropTypes.string,
  label: React.PropTypes.node,
  labelCol: React.PropTypes.string, 
  className: React.PropTypes.string
};

FormGroup.defaultProps = {  
  prefixCls: 'form'
};

FormGroup.contextTypes = {
  form: React.PropTypes.object,
};

module.exports = FormGroup;