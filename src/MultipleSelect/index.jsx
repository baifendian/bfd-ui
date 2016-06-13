import React, { PropTypes } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu } from '../Dropdown'
import Option from '../Select2/Option'
import { CheckboxGroup, Checkbox } from '../Checkbox'
import TextOverflow from '../TextOverflow'
import Fetch from '../Fetch'
import classnames from 'classnames'
import './index.less'

const MultipleSelect = React.createClass({

  getInitialState() {
    return {
      values: this.props.values || this.props.defaultValues || [],
      searchValue: '',
      index: -1
    }
  },

  componentWillReceiveProps(nextProps) {
    nextProps.values && this.setState({values: nextProps.values})  
  },

  componentDidUpdate() {
    this.refs.input.focus()
  },

  addValue(value) {
    this.valueSet.add(value)
    this.handleChange([...this.valueSet])
  },

  removeValue(value) {
    this.valueSet.delete(value)
    this.handleChange([...this.valueSet])
  },

  handleChange(values) {
    this.setState({ 
      values,
      searchValue: ''
    })
    this.props.onChange && this.props.onChange(values)
  },

  handleRemove(value, e) {
    e.stopPropagation()
    this.removeValue(value)
  },

  handleCheckboxGroupChange(values) {
    this.handleChange(values)
  },

  handleToggleAll(e) {
    e.stopPropagation()
    this.toggleAll(e.target.checked)
  },

  toggleAll(checked) {
    this.Options.forEach(Option => {
      this.valueSet[checked ? 'add' : 'delete'](Option.props.value)
    })
    this.handleChange([...this.valueSet])
  },

  handleLoad(list) {
    this.setState({ list })
  },

  handleToggle(isOpen) {
    if (isOpen) {
      this.refs.input.focus()
    } else {
      this.refs.input.blur()
    }
  },

  handleInput(e) {
    e.stopPropagation()
    const value = e.target.value
    this.setState({
      searchValue: value,
      index: 0
    })
  },

  handleKeyDown(e) {
    const key = e.key
    let index = this.state.index
    const options = this.Options
    if (key === 'ArrowDown' || key === 'ArrowUp') {
      if (key === 'ArrowDown') {
        index++
        if (index === options.length + 1) index = 0
      }
      if (key === 'ArrowUp') {
        e.preventDefault()
        if (index === -1 || index === 0) index = options.length - 1
        else index--
      }
      this.setState({
        index
      })
    }
    if (key === 'Enter' && index > -1) {
      if (index < options.length) {
        const value = options[index].props.value
        if (this.valueSet.has(value)) {
          this.removeValue(value)
        } else {
          this.addValue(value)
        }
      } else {
        this.toggleAll(!this.isAll)
      }
    }
    if (key === 'Backspace' && !this.state.searchValue) {
      const value = this.state.values.pop()
      value && this.removeValue(value)
    }
  },

  optionsMap(callback) {
    if (this.props.url) {
      return (this.state.list || []).map((item, i) => {
        return callback.call(this, this.props.render.call(this, item, i), i)
      })
    } else {
      return React.Children.map(this.props.children, callback)
    }
  },

  render() {
    const { className, children, url, tagable, render, ...other } = this.props
    const placeholder = '请选择'
    const searchValue = this.state.searchValue

    const OptionsMap = {}

    let Options = this.optionsMap((child, i) => {
      if (!child) return
      const { value, children } = child.props
      OptionsMap[value || children] = children
      return <Checkbox key={i} value={value || children} block>{children}</Checkbox>
    })

    const labels = this.state.values.map(key => {
      return {
        key: key,
        value: OptionsMap[key] || key
      }
    })
    
    // 搜索、自定义输入(tagable)
    
    if (searchValue) {
      Options = Options.filter((child, i) => {
        return child && child.props.children.indexOf(searchValue) > -1
      })
      // 防止重复
      if (tagable && (!Options[0] || Options[0].props.children !== searchValue)) {
        Options.unshift(<Checkbox key={-1} value={searchValue} block>{searchValue}</Checkbox>)
      }
    }

    // 键盘上下切换样式
    Options = Options.map((child, i) => {
      return React.cloneElement(child, {
        key: i,
        className: classnames(child.className, {active: this.state.index === i})
      })
    })

    const valueSet = new Set(this.state.values)

    const isAll = Options.filter(Option => {
      return valueSet.has(Option.props.value)
    }).length === Options.length

    const isEmpty = !Options.length

    let disabled = this.props.disabled
    if (isEmpty && !searchValue) disabled = true

    let inputSize
    if (labels.length) {
      inputSize = searchValue.length || 1
    } else {
      inputSize = placeholder.length
    }

    this.Options = Options
    this.valueSet = valueSet
    this.isAll = isAll

    return (
      <Dropdown 
        onToggle={this.handleToggle} 
        className={classnames('bfd-multiple-select', { disabled }, className)} 
        disabled={disabled} 
        {...other}>
        <DropdownToggle>
          <Fetch url={url} onSuccess={this.handleLoad}>
            <ul>
              {labels.map((item, i) => {
                return (
                  <li key={i} className="tag">
                    <TextOverflow>
                      <span className="label-name">{item.value}</span>
                    </TextOverflow>
                    <span className="remove" onClick={e => {this.handleRemove(item.key, e)}}>&times;</span>
                  </li>
                )
              })}
              <li>
                <input 
                  ref="input"
                  type="text"
                  style={{width: inputSize * 1.2 + 'em'}}
                  value={searchValue} 
                  onChange={this.handleInput} 
                  onKeyDown={this.handleKeyDown} 
                  placeholder={labels.length ? '' : placeholder} />
              </li>
            </ul>
          </Fetch>
        </DropdownToggle>
        <DropdownMenu>
          {
            isEmpty ? 
            <div className="empty">无匹配选项</div> : 
            <div>
              <CheckboxGroup selects={this.state.values} onChange={this.handleCheckboxGroupChange}>{Options}</CheckboxGroup>
              <Checkbox 
                className={classnames({active: this.state.index === Options.length})}
                checked={isAll} 
                block 
                onChange={this.handleToggleAll}>全选</Checkbox>
            </div>
          }
        </DropdownMenu>
      </Dropdown>
    )
  }
})

MultipleSelect.propTypes = {
  values: PropTypes.array,
  defaultValues: PropTypes.array,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  tagable: PropTypes.bool,
  url: PropTypes.string,
  render: PropTypes.func,
  customProp({ values, onChange, url, render }) {
    if (values && !onChange) {
      return new Error('You provided a `values` prop without an `onChange` handler')
    }
    if (url && !render) {
      return new Error('You provided a `url` prop without an `render` handler')
    }
  }
}

export { MultipleSelect, Option }