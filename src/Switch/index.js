import './index.less'
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

class Switch extends Component {

  constructor(props) {
    super()
    this.state = {
      on: props.on || props.defaultOn || false
    }
  }

  componentWillReceiveProps(nextProps) {
    'on' in nextProps && this.setState({on: nextProps.on})  
  }

  handleChange(e) {
    e.stopPropagation()
    this.setState({on: e.target.checked})
    this.props.onChange && this.props.onChange(e.target.checked)
  }

  render() {
    const { className, labelOn, labelOff, ...other } = this.props
    const { on } = this.state
    return (
      <label className={classnames('bfd-switch', className)} {...other}>
        <input type="checkbox" checked={on} onChange={::this.handleChange} />
        <span className="bfd-switch__text">{on ? labelOn : labelOff}</span>
      </label>
    )
  }
}

Switch.propTypes = {

  // 是否打开
  on: PropTypes.bool,

  // 初始化是否打开（不可控）
  defaultOn: PropTypes.bool,

  // 切换后的回调，参数为是否打开
  onChange: PropTypes.func,

  // 打开状态下显示的内容
  labelOn: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  
  // 关闭状态下显示的内容
  labelOff: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  
  customProp({ on, onChange }) {
    if (on && !onChange) {
      return new Error('You provided a `on` prop without an `onChange` handler')
    }
  }
}

export default Switch