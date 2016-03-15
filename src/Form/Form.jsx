
import React, { PropTypes } from 'react'
import classNames from 'classnames';

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

module.exports = Form;