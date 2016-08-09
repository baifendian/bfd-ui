import './index.less'
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import { Dropdown, DropdownToggle, DropdownMenu } from '../Dropdown'
import ClearableInput from '../ClearableInput'

class AutoComplete extends Component {

  constructor(props) {
    super()
    this.state = {
      open: false,
      index: -1,
      value: props.defaultValue || props.value || '',
      result: []
    }
  }

  componentWillReceiveProps(nextProps) {
    'value' in nextProps && this.setState({value: nextProps.value})  
  }

  handleChange(value) {
    const state = { value }
    if (!value) {
      state.open = false
      return this.setState(state)
    }
    const result = this.props.source.filter(item => item.indexOf(value) > -1)
    if (result.length) {
      result[-1] = value
      state.open = true
      state.result = result
    } else {
      state.open = false
    }
    state.index = -1
    this.setState(state)
  }

  handleSelect(value) {
    this.setState({
      value,
      open: false
    })
    this.props.onChange && this.props.onChange(value)
  }

  handleKeyDown(e) {
    const input = e.target
    const key = e.key
    if (this.state.open) {
      let index = this.state.index
      const result = this.state.result
      if (key === 'ArrowDown' || key === 'ArrowUp') {
        if (key === 'ArrowDown') {
          index++
          if (index === result.length) index = -1
        }
        if (key === 'ArrowUp') {
          e.preventDefault()
          if (index === -1) index = result.length - 1
          else index--
        }
        const value = result[index]
        this.setState({
          index,
          value
        })
      }
      if (key === 'Enter') {
        this.handleSelect(result[index])
        input.blur()
      }
    }
  }

  handleFocus() {
    if (!this.state.result.length) return
    this.setState({open: true})
  }

  render() {
    const { className, onFocus, onKeyDown, value, onChange, ...other } = this.props
    return (
      <Dropdown 
        open={this.state.open} 
        className={classnames('bfd-auto-complete', className)}
      >
        <ClearableInput 
          value={this.state.value}
          onFocus={this.handleFocus} 
          onKeyDown={this.handleKeyDown} 
          onChange={value => {
            this.handleChange(value)
            onChange && onChange(value)
          }}
          {...other} 
        />
        <DropdownMenu>
          <ul className="result">
          {this.state.result.map((item, i) => (
            <li 
              key={i}
              className={classnames({active: this.state.index === i})} 
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
  source: PropTypes.array.isRequired
}

export default AutoComplete