import React, { PropTypes } from 'react'
import classnames from 'classnames'
import { Dropdown, DropdownToggle, DropdownMenu } from '../Dropdown'
import ClearableInput from '../ClearableInput'
import './index.less'

const AutoComplete = React.createClass({

  getInitialState() {
    return {
      isOpen: false,
      index: -1,
      value: this.props.defaultValue || this.props.value || '',
      result: []
    }
  },

  componentWillReceiveProps(nextProps) {
    'value' in nextProps && this.setState({value: nextProps.value})  
  },

  handleChange(value) {
    const state = { value }
    this.props.onChange && this.props.onChange(value)
    if (!value) {
      state.isOpen = false
      return this.setState(state)
    }
    const result = this.props.source.filter(item => item.indexOf(value) > -1)
    if (result.length) {
      result[-1] = value
      state.isOpen = true
      state.result = result
    } else {
      state.isOpen = false
    }
    state.index = -1
    this.setState(state)
  },

  handleSelect(value) {
    this.setState({
      value,
      isOpen: false
    })
    this.props.onChange && this.props.onChange(value)
  },

  handleKeyDown(e) {
    const input = e.target
    const code = e.keyCode
    if (this.state.isOpen) {
      let index = this.state.index
      const result = this.state.result
      if (code === 40 || code === 38) {
        if (code === 40) {
          index++
          if (index === result.length) index = -1
        }
        if (code === 38) {
          if (index === -1) index = result.length - 1
          else index--
        }
        const value = result[index]
        this.setState({
          index,
          value
        })
        this.props.onChange && this.props.onChange(value)
      }
      if (code === 13) {
        this.handleSelect(result[index])
      }
    }
  },

  render() {
    const { className, ...other } = this.props
    return (
      <Dropdown open={this.state.isOpen} className={classnames('bfd-auto-complete', className)}>
        <ClearableInput onKeyDown={this.handleKeyDown} value={this.state.value} onChange={this.handleChange} {...other} />
        <DropdownMenu>
          <ul className="result">
          {this.state.result.map((item, i) => <li className={classnames({active: this.state.index === i})} key={i} onClick={this.handleSelect.bind(this, item)}>{item}</li>)}
          </ul>
        </DropdownMenu>
      </Dropdown>
    )
  }
})

AutoComplete.propTypes = {
  source: PropTypes.array.isRequired,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  customProp({ value, onChange }) {
    if (value && !onChange) {
      return new Error('You provided a `value` prop without an `onChange` handler')
    }
  }
}

export default AutoComplete