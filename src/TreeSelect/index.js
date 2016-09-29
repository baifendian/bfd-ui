import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import warning from 'warning'
import update from 'react-update'
import shouldComponentUpdate from '../shouldComponentUpdate'
import SelectDropdown from '../SelectDropdown'
import Tree from '../Tree'
import TextOverflow from '../TextOverflow'
import TagList from '../TagList'
import './index.less'

class TreeSelect extends Component {

  constructor(props) {
    super()
    this.update = update.bind(this)
    this.state = {
      value: props.value || props.defaultValue,
      data: props.data || props.defaultData
    }
  }

  componentWillReceiveProps(nextProps) {
    const state = {}
    'value' in nextProps && (state.value = nextProps.value)
    'data' in nextProps && (state.data = nextProps.data)
    this.setState(state)
  }

  shouldComponentUpdate = shouldComponentUpdate

  handleLoad(data) {
    this.setState({ data })
  }

  parseData(list, newData = list, path = []) {
    const { value } = this.state
    const { render, multiple } = this.props
    list && list.forEach((item, i) => {
      warning(item.value, '`TreeSelect` data item should have a `value` property which type should to be `String`.')
      const _path = [...path, i]
      const title = !render ? item.name : render(item)
      if (multiple) {
        const checked = this.valueSet.has(item.value)
        checked && this.labels.push({
          value: item.value,
          label: title
        })
        if (!!item.checked !== checked) {
          newData = update.silent(newData, 'set', checked, [..._path, 'checked'])
        }
      } else {
        const active = item.value === value
        active && (this.title = title)
        if (!!item.active !== active) {
          newData = update.silent(newData, 'set', active, [..._path, 'active'])
        }
      }
      newData = this.parseData(item.children, newData, [..._path, 'children'])
    })
    return newData
  }

  addValue(value) {
    this.valueSet.add(value)
    this.change([...this.valueSet])
  }

  removeValue(value) {
    this.valueSet.delete(value)
    this.change([...this.valueSet])
  }

  handleCheck(checked, item) {
    this[checked ? 'addValue' : 'removeValue'](item.value)
  }

  handleSelect(item) {
    this.refs.dropdown.close()
    this.change(item.value)
  }

  change(value) {
    this.setState({ value })
    this.props.onChange && this.props.onChange(value)
  }

  render() {

    const { 
      className, placeholder, defaultValue, onChange, url, defaultData, onDataChange, 
      multiple, ...other 
    } = this.props
    const { value, data } = this.state

    const treeRender = other.render

    delete other.value
    delete other.data
    delete other.render

    if (multiple) {
      this.labels = []
      this.valueSet = new Set(value)
    }

    const treeProps = {
      data: this.parseData(data),
      render: treeRender,
      onChange: data => {
        this.setState({ data })
        onDataChange && onDataChange(data)
      }
    }
    
    if (multiple) {
      treeProps.checkable = true
      treeProps.onCheck = ::this.handleCheck
    } else {
      treeProps.onSelect = ::this.handleSelect
    }
    
    const Title = !multiple ? (
      <TextOverflow>
        <div className="bfd-tree-select__title">
          {this.title || (!value && placeholder)}
        </div>
      </TextOverflow>
    ) : (
      <TagList 
        labels={this.labels} 
        placeholder={value ? '' : placeholder} 
        onRemove={::this.removeValue} 
      />
    )

    return (
      <SelectDropdown 
        ref="dropdown"
        className={classnames('bfd-tree-select', {
          'bfd-tree-select--multiple': multiple
        }, className)} 
        title={Title}
        url={url}
        onLoad={::this.handleLoad}
        hasPropValue={'value' in this.props || 'defaultValue' in this.props}
        caret={!multiple}
        {...other}
      >
        <Tree {...treeProps} />
      </SelectDropdown>
    )
  }
}

TreeSelect.defaultProps = {
  placeholder: '请选择'
}

TreeSelect.propTypes = {

  // 值，单选为字符串，多选为数组，与数据源 value 字段对应
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),

  // 初始化值（不可控）
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),

  // 切换选择后的回调，回调参数为选中的节点（多选模式为数组）
  onChange: PropTypes.func,

  // 树结构数据源，与 Tree 组件不同的是需要 value 字段一一对应
  data: PropTypes.array,

  // 树结构数据源（不可控）
  defaultData: PropTypes.array,

  // 树结构 URL 数据源
  url: PropTypes.string,
  
  // 树结构数据源改变后的回调  
  onDataChange: PropTypes.func,

  // 无匹配时显示内容，默认｀请选择｀
  placeholder: PropTypes.string,

  // 同 Tree render
  render: PropTypes.func,

  // 是否多选，开启此属性后才会出现复选框，多选模式 value 要求数组格式
  multiple: PropTypes.bool,

  customProp(props) {
    if ('value' in props && !props.onChange) {
      return new Error('You provided a `value` prop without an `onClick` handler')
    }
    if ('data' in props && !props.onDataChange) {
      return new Error('You provided a `data` prop without an `onDataChange` handler')
    }
    if (props.multiple && !Array.isArray(props.value || props.defaultValue)) {
      return new Error('You provided a `multiple` prop without an array `value`')
    }
    if (!props.multiple && Array.isArray(props.value || props.defaultValue)) {
      return new Error('You provided an array `value` prop without a `multiple` prop')
    }
  }
}

export default TreeSelect