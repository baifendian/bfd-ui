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
    this.refs.input.focus()
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
        if (index === -1 || index === 0) index = options.length
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

    const { className, children, url, disabled, tagable, render, ...other } = this.props
    const placeholder = '请选择'
    const { searchValue, index } = this.state

    const OptionsMapper = {}

    let Options = this.optionsMap((child, i) => {
      if (!child) return
      const { value, children } = child.props
      OptionsMapper[value || children] = children
      return <Checkbox key={i} value={value || children} block>{children}</Checkbox>
    }) || []

    // 选中的标签
    const labels = []
    this.state.values.forEach(key => {
      if (OptionsMapper[key] || tagable) {
        labels.push({
          key,
          value: OptionsMapper[key] || key
        })
      }
    })
    
    // 搜索
    if (searchValue) {
      Options = Options.filter((child, i) => {
        return child && child.props.children.indexOf(searchValue) > -1
      })
      // 自定义输入(tagable)，并防止重复
      if (tagable && (!Options[0] || Options[0].props.children !== searchValue)) {
        Options.unshift(<Checkbox key={-1} value={searchValue} block>{searchValue}</Checkbox>)
      }
    }

    // 键盘上下切换绑定样式
    Options = Options.map((option, i) => {
      if (index !== i) {
        return option
      } else {
        return React.cloneElement(option, {
          className: classnames(option.className, 'active')
        })
      }
    })

    const valueSet = new Set(this.state.values)

    const isAll = Options.filter(Option => {
      return valueSet.has(Option.props.value)
    }).length === Options.length

    const isEmpty = !Options.length

    let inputSize
    if (labels.length) {
      inputSize = (searchValue || ' ').replace(/[\u4e00-\u9FA5]/g, '  ').length
    } else {
      inputSize = placeholder.length * 2
    }

    this.Options = Options
    this.valueSet = valueSet
    this.isAll = isAll

    const Header = (
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
            size={Math.min(inputSize, 45)}
            value={searchValue} 
            onChange={this.handleInput} 
            onKeyDown={this.handleKeyDown} 
            placeholder={labels.length ? '' : placeholder} />
        </li>
      </ul>
    )

    return (
      <Dropdown 
        onToggle={this.handleToggle} 
        className={classnames('bfd-multiple-select', { disabled }, className)} 
        disabled={disabled} 
        {...other}>
        <DropdownToggle>
          {
            url ?
            <Fetch url={url} onSuccess={this.handleLoad}>
              {Header}
            </Fetch> : 
            Header
          }
        </DropdownToggle>
        <DropdownMenu>
          {
            Options.length ? 
            <div>
              <CheckboxGroup selects={this.state.values} onChange={this.handleCheckboxGroupChange}>{Options}</CheckboxGroup>
              <Checkbox 
                className={classnames({active: this.state.index === Options.length})}
                checked={isAll} 
                block 
                onChange={this.handleToggleAll}>全选</Checkbox>
            </div> : 
            <div className="empty">无匹配选项</div>
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