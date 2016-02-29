import React from 'react';
import classNames from 'classnames';

class FormGroup extends React.Component {

  renderLabel() {

    const props = this.props;
    const labelCol = props.labelCol;
    const required = props.required === undefined ? false : true;

    const className = classNames({
      [labelCol]: true,
      [`bfd-${props.prefixCls}-group-required`]: required,
    });

    return props.label ? (
      <label className={className} key="label">
        {props.label}
      </label>
    ) : null;
  }

  renderChildren() {
    const props = this.props;
    const children = React.Children.map(props.children, (child) => {
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

module.exports = FormGroup;