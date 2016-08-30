import './index.less'
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import update from 'react-update'
import shouldComponentUpdate from '../../shouldComponentUpdate'
import TreeNode from './TreeNode'

class Tree extends Component {

  constructor(props) {
    super(props)
    this.update = update.bind(this)
    this.state = {
      data: props.defaultData || props.data  
    }
  }

  getChildContext() {
    return {
      tree: this
    }
  }

  componentWillReceiveProps(nextProps) {
    'data' in nextProps && this.setState({data: nextProps.data})
  }

  shouldComponentUpdate = shouldComponentUpdate

  updateData(...args) {
    const data = this.update(...args)
    this.props.onChange && this.props.onChange(data)
    return data
  }

  handleNodeChange(key, value, path) {
    this.updateData('set', ['data', ...path, key], value)
  }

  handleNodeActive(path) {
    if (!this.props.onActive) return
    if (this.activePath) {
      this.updateData('set', ['data', ...this.activePath, 'active'], false)
    }
    const data = this.updateData('set', ['data', ...path, 'active'], true)
    this.props.onActive && this.props.onActive(this.getPathData(path, data))
    this.activePath = path
  }

  getPathData(path, data) {
    data = data || this.state.data
    const pathData = []
    path.forEach(key => {
      data = data[key]
      if (key !== 'children') {
        pathData.push(data)
      }
    })
    return pathData
  }

  render() {
    const { className, onActive, ...other } = this.props
    const data = this.state.data || []

    delete other.data
    delete other.defaultData
    delete other.beforeNodeRender
    delete other.onChange
    delete other.render
    delete other.getIcon
    delete other.getUrl
    delete other.dataFilter

    return (
      <div 
        className={classnames('bfd-tree', {
          'bfd-tree--activeable': onActive
        }, className)} 
        {...other}
      >
        <ul>
          {data.map((item, i) => {
            return <TreeNode key={i} data={item} path={[i]} />
          })}
        </ul>
      </div>
    )
  }
}

Tree.childContextTypes = {
  tree: PropTypes.instanceOf(Tree)
}

Tree.propTypes = {

  // 数据源
  data: PropTypes.array,

  // 初始化时数据源（不可控）
  defaultData: PropTypes.array,

  // 数据改变后的回调，参数为整个数据源
  onChange: PropTypes.func,

  // 节点渲染回调，参数(item, path)，默认渲染 data.name
  render: PropTypes.func,

  // 设置图标，参数为当前节点数据，可动态判断
  getIcon: PropTypes.func,

  // 按需动态加载数据源 URL，当 isParent 为 true 时，执行请求。参数为当前节点数据以及节点路径下的数据集合
  getUrl: PropTypes.func,

  // 点中一个节点后的回调，参数为节点路径下数据集合
  onActive: PropTypes.func,
  
  // 过滤 getUrl 方式返回的数据，处理后请将数据返回
  dataFilter: PropTypes.func,

  customProp({ data, onChange }) {
    if (data && !onChange) {
      return new Error('You provided a `data` prop without an `onChange` handler')
    }
  }
}

export default Tree