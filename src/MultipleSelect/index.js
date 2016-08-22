import './index.less'
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import shouldComponentUpdate from '../shouldComponentUpdate'
import { Dropdown, DropdownToggle, DropdownMenu } from '../Dropdown'
import Option from '../Select/Option'
import { CheckboxGroup, Checkbox } from '../Checkbox'
import TextOverflow from '../TextOverflow'
import Fetch from '../Fetch'
import Button from '../Button'
import action from './action'

class MultipleSelect extends Component {

  constructor(props) {
    super()
    this.options = []
    this.state = {
      data: props.data || [],
      values: props.values || props.defaultValues || [],
      searchValue: '',
      index: -1
    }
  }

  componentWillReceiveProps(nextProps) {
    nextProps.values && this.setState({values: nextProps.values})  
  }

  shouldComponentUpdate: shouldComponentUpdate

  change(values) {
    this.setState({ 
      values,
      searchValue: ''
    })
    this.refs.input.focus()
    this.props.onChange && this.props.onChange(values)
  }

  toggleAll(checked) {
    this.options.forEach(option => {
      this.valueSet[checked ? 'add' : 'delete'](option.props.value)
    })
    this.change([...this.valueSet])
  }

  addValue(value) {
    this.valueSet.add(value)
    this.change([...this.valueSet])
  }

  removeValue(value) {
    this.valueSet.delete(value)
    this.change([...this.valueSet])
  }

  traverseOptions(callback) {
    const { children, render } = this.props
    if (children) {
      React.Children.forEach(children, (option, i) => {
        if (!option) return
        callback(option, i)
      })
    } else {
      this.state.data.forEach((item, i) => {
        callback(render.call(this, item, i), i)
      })
    }
  }

  getCheckbox(value, children) {
    return (
      <Checkbox 
        block
        value={value}
        checked={this.valueSet.has(value)}
        onChange={action.handleOptionCheck.bind(this, value)}
      >
        {children}
      </Checkbox>
    )
  }

  // 选中的标签
  getLabels(optionsMapper) {
    const labels = []
    this.state.values.forEach(key => {
      if (optionsMapper[key] || this.props.tagable) {
        labels.push({
          key,
          value: optionsMapper[key] || key
        })
      }
    })
    return labels
  }

  // 上下切换
  getWrapperOptions(options) {
    return options.map((option, i) => {
      return (
        <li key={i} className={classnames({
          'bfd-multiple-select__option--active': this.state.index === i
        })}>
          {option}
        </li>
      )
    })
  }

  render() {

    const { className, children, url, disabled, tagable, ...other } = this.props
    const placeholder = '请选择'
    const { searchValue, index, values } = this.state
    const valueSet = this.valueSet = new Set(values)
    const optionsMapper = {}
    const options = []

    this.traverseOptions((option, i) => {
      const { value, children } = option.props
      optionsMapper[value || children] = children
      // 搜索过滤
      const { searchValue } = this.state
      if (searchValue && children.indexOf(searchValue) === -1 
          && (String(value) ? String(value).indexOf(searchValue) === -1 : true)) {
        return
      }
      options.push(this.getCheckbox(value || children, children))
    })

    // 自定义标签模式，防止重复
    if (tagable && searchValue && (!options[0] || options[0].props.children !== searchValue)) {
      options.unshift(this.getCheckbox(searchValue, searchValue))
    }

    const labels = this.getLabels(optionsMapper)
    const wrapperOptions = this.getWrapperOptions(options)
    const isAll = options.filter(option => !valueSet.has(option.props.value)).length === 0

    let inputSize
    if (labels.length) {
      inputSize = (searchValue || ' ').replace(/[\u4e00-\u9FA5]/g, '  ').length
    } else {
      inputSize = placeholder.length * 2
    }

    this.options = options
    this.isAll = isAll

    const Header = (
      <ul>
        {labels.map((item, i) => {
          return (
            <li key={i} className="bfd-multiple-select__tag">
              <TextOverflow>
                <span className="bfd-multiple-select__tag-name">{item.value}</span>
              </TextOverflow>
              <Button 
                icon="remove" 
                transparent 
                size="sm" 
                onClick={action.handleLabelRemove.bind(this, item.key)}
              />
            </li>
          )
        })}
        <li>
          <input 
            ref="input"
            type="text"
            size={Math.min(inputSize, 45)}
            value={searchValue} 
            onChange={action.handleInput.bind(this)} 
            onKeyDown={action.handleKeyDown.bind(this)} 
            placeholder={labels.length ? '' : placeholder} />
        </li>
      </ul>
    )

    return (
      <Dropdown 
        onToggle={action.handleDropdownToggle.bind(this)}
        className={classnames('bfd-multiple-select', className)} 
        disabled={disabled} 
        {...other}>
        <DropdownToggle>
          <Fetch 
            style={{minHeight: '30px'}} 
            url={url} 
            onSuccess={action.handleLoad.bind(this)}
          >
            {Header}
          </Fetch>
        </DropdownToggle>
        <DropdownMenu>
          {
            options.length ? 
            <ul>
              {wrapperOptions}
              <li className={classnames({
                'bfd-multiple-select__option--active': index === options.length
              })}>
                <Checkbox 
                  checked={isAll} 
                  block 
                  onChange={action.handleToggleAll.bind(this)}
                >
                  全选
                </Checkbox>
              </li>
            </ul> : 
            <div className="bfd-multiple-select__empty">无匹配选项</div>
          }
        </DropdownMenu>
      </Dropdown>
    )
  }
}

MultipleSelect.propTypes = {

  // 选中的值
  values: PropTypes.array,

  // 初始化时选中的值（不可控）
  defaultValues: PropTypes.array,

  // 切换选择后的回调，参数为选中的值
  onChange: PropTypes.func,

  // 是否禁用
  disabled: PropTypes.bool,

  // 是否开启自定义标签输入功能
  tagable: PropTypes.bool,

  // Option 数据源，结合 render 使用
  data: PropTypes.array,

  // 数据源 URL，直接请求服务器，内部调用 xhr 模块
  url: PropTypes.string,

  // data / url 方式时 Option 渲染回调，参数为当前数据和索引，返回一个 Option
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