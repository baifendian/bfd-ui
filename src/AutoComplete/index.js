import './index.less'
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import { Dropdown, DropdownToggle, DropdownMenu } from '../Dropdown'
import ClearableInput from '../ClearableInput'

class AutoComplete extends Component {

  constructor(props) {
    super()
    this.result = []
    this.state = {
      open: false,
      index: -1,
      value: props.defaultValue || props.value || ''
    }
  }

  componentWillReceiveProps(nextProps) {
    'value' in nextProps && this.setState({value: nextProps.value})  
  }

  handleInput(value) {
    this.lastValue = value
    const state = { value }
    if (!value) {
      this.result = []
      state.open = false
      this.setState(state)
    } else {
      // reset tab index
      state.index = -1
      this.result = this.props.source.filter(item => item.indexOf(value) > -1)
      state.open = !!this.result.length
      this.setState(state)
    }
    this.props.onChange && this.props.onChange(value)
  }

  handleSelect(value) {
    this.setState({
      value,
      open: false
    })
    this.props.onChange && this.props.onChange(value)
  }

  handleKeyDown(e) {
    if (this.state.open) {
      const input = e.target
      const key = e.key
      const { result } = this
      let { index } = this.state
      if (key === 'ArrowDown' || key === 'ArrowUp') {
        if (key === 'ArrowDown') {
          if (index === result.length - 1) index = -1
          else index++
        }
        if (key === 'ArrowUp') {
          e.preventDefault()
          if (index === -1) index = result.length - 1
          else index--
        }
        this.setState({
          index, 
          value: result[index] || this.lastValue
        })
      }
      if (key === 'Enter') {
        this.handleSelect(result[index])
        input.blur()
      }
    }
  }

  handleFocus() {
    if (!this.result.length) return
    this.setState({open: true})
  }

  render() {
    const { open, index, value } = this.state
    const { className, onFocus, onKeyDown, onChange, ...other } = this.props
    return (
      <Dropdown 
        open={open} 
        className={classnames('bfd-auto-complete', className)}
      >
        <ClearableInput 
          value={value}
          onFocus={::this.handleFocus} 
          onKeyDown={::this.handleKeyDown} 
          onChange={::this.handleInput}
          {...other} 
        />
        <DropdownMenu>
          <ul className="bfd-auto-complete__result">
          {this.result.map((item, i) => (
            <li 
              key={i}
              className={classnames({'bfd-auto-complete__option--active': index === i})} 
              onClick={this.handleSelect.bind(this, item)}
            >
              {item}
            </li>
          ))}
          </ul>
        </DropdownMenu>
      </Dropdown>
    )
  }
}

AutoComplete.propTypes = {

  // 待搜索的数据源
  source: PropTypes.array.isRequired,

  // 输入框的值
  value: PropTypes.string,

  // 初始化输入框的值
  defaultValue: PropTypes.string,

  // 输入改变、选择后的回调，参数为当前输入框的值
  onChange: PropTypes.func,

  // 输入框大小，除默认外可选值：sm、lg
  size: PropTypes.string,

  // 是否禁用
  disabled: PropTypes.bool,

  // 同 input placeholder
  placeholder: PropTypes.string,

  customProp({ value, onChange, url, render }) {
    if (value && !onChange) {
      return new Error('You provided a `value` prop without an `onChange` handler')
    }
  }
}

export default AutoComplete