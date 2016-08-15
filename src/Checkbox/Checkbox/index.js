import './index.less'
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

class Checkbox extends Component {

  constructor(props) {
    super()
    this.state = {
      checked: props.defaultChecked || props.checked || false
    }
  }

  componentWillReceiveProps(nextProps) {
    'checked' in nextProps && this.setState({checked: nextProps.checked})  
  }

  handleChange(e) {
    e.stopPropagation()
    this.setState({checked: e.target.checked})
    this.props.onChange && this.props.onChange(e)
  }

  render() {

    const { className, value, disabled, block, children, ...other } = this.props
    
    const classNames = classnames('bfd-checkbox', {
      'bfd-checkbox--disabled': disabled,
      'bfd-checkbox--block': block
    }, className)
    
    return (
      <label className={classNames} {...other}>
        <input 
          type="checkbox" 
          className="bfd-checkbox__input"
          value={value} 
          checked={this.state.checked}
          disabled={disabled} 
          onChange={::this.handleChange}
        />
        <span className="bfd-checkbox__status" />
        {children && <span className="bfd-checkbox__text">{children}</span>}
      </label>
    )
  }
}

Checkbox.propTypes = {

  // 值
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  
  // 是否选中
  checked: PropTypes.bool,

  // 初始是否选中（不可控）
  defaultChecked: PropTypes.bool,

  // 切换选中后的回调，参数为 event 对象
  onChange: PropTypes.func,

  // 是否禁用
  disabled: PropTypes.bool,
  
  // 是否块级布局
  block: PropTypes.bool,
  
  customProp({ checked, onChange }) {
    if (checked && !onChange) {
      return new Error('You provided a `checked` prop without an `onChange` handler')
    }
  }
}

export default Checkbox