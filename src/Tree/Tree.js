/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import update from 'react-update'
import get from 'lodash/get'
import shouldComponentUpdate from '../shouldComponentUpdate'
import TreeNode from './TreeNode'

class Tree extends Component {

  constructor(props) {
    super(props)
    this.update = update.bind(this)
    this.state = {
      data: props.data || props.defaultData || []
    }
  }

  getChildContext() {
    return {
      tree: this
    }
  }

  componentWillReceiveProps(nextProps) {
    nextProps.data && this.setState({data: nextProps.data})
  }

  shouldComponentUpdate = shouldComponentUpdate

  handleChange(data) {
    this.props.onChange && this.props.onChange(data)
  }

  updateNode(key, value, path) {
    return this.update('set', ['data', ...path, key], value)
  }

  handleNodeSelect(path) {
    if (this.activePath) {
      this.updateNode('active', false, this.activePath)
    }
    const data = this.updateNode('active', true, path)
    const pathData = this.getPathData(path, data)
    this.props.onActive && this.props.onActive(pathData)
    this.props.onSelect && this.props.onSelect(pathData.slice(-1)[0], pathData)
    this.activePath = path
    this.handleChange(data)
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

  handleNodeCheck(checked, path) {
    let data = this.updateNode('checked', checked, path)
    let item = get(data, path)

    data = this.updateChildren(data, item, path, checked)
    data = this.updateParent(data, path.slice(0, -2), checked)
    item = get(data, path)

    this.props.onCheck && this.props.onCheck(checked, item, this.getPathData(path, data))
    this.handleChange(data)
  }

  updateChildren(data, item, path, checked) {
    if (item && item.children) {
      path = [...path, 'children']
      item.children.forEach((item, i) => {
        const _path = [...path, i]
        if (!!item.checked !== checked) {
          data = this.updateNode('checked', checked, _path)
          this.updateChildren(item, _path, checked)
        }
      })
    }
    return data
  }

  updateParent(data, path, checked) {
    if (path.length) {
      const parent = get(data, path)
      if (checked) {
        checked = parent.children.filter(item => !item.checked).length === 0
      }
      if (!!parent.checked !== checked) {
        data = this.updateNode('checked', checked, path)
        this.updateParent(data, path.slice(0, -2), checked)
      }
    }
    return data
  }

  render() {

    const {
      className, defaultData, beforeNodeRender, onChange, onActive, getIcon,
      getUrl, dataFilter, shouldNodeSelectable, shouldNodeCheckable, ...other
    } = this.props
    const { data } = this.state

    delete other.data
    delete other.render

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

  /**
   * 数据源，与 defaultData、url 方式格式通用
   * 格式说明
   * ```js
   * [{
   *   name: '数据工厂', // 节点显示，默认渲染 name 值，可自定义 render 渲染
   *   open: true, // 是否展开
   *   checked: true, // 是否勾选，用于可勾选模式下
   *   active: true, // 是否选中
   *   children: [{
   *     name: 'kafka'
   *   }, {
   *     name: 'HBase'
   *   }]
   * }, {
   *   name: '配置中心'
   * }]
   * ```
   */
  data: PropTypes.array,

  // 初始化时数据源（不可控）
  defaultData: PropTypes.array,

  // 数据改变后的回调，如展开／收起、选中、勾选等操作。参数为整个数据源
  onChange: PropTypes.func,

  // 节点渲染回调，参数(item, path)，默认渲染 data.name
  render: PropTypes.func,

  // 设置图标，参数为当前节点数据，可动态判断
  getIcon: PropTypes.func,

  // 按需动态加载数据源 URL，当 isParent 为 true 时，执行请求。参数为当前节点数据以及节点路径下的数据集合
  getUrl: PropTypes.func,

  // 点中一个节点后的回调，参数为节点路径下数据集合，建议使用 onSelect 代替，注意两者的回调参数不同
  onActive: PropTypes.func,

  // 节点选中后的回调，参数为 (data, pathData)
  onSelect: PropTypes.func,

  // 是否可勾选
  checkable: PropTypes.bool,

  // 勾选后的回调，参数为 (checked, data, pathData)
  onCheck: PropTypes.func,

  // 过滤 getUrl 方式返回的数据，处理后请将数据返回
  dataFilter: PropTypes.func,

  // 节点是否可选中的回调判断，参数(item, path)，返回 false 则节点不可选中
  shouldNodeSelectable: PropTypes.func,

  // 节点是否可勾选的回调判断，参数(item, path)，返回 false 则节点不可勾选
  shouldNodeCheckable: PropTypes.func,

  customProp(props) {
    if (props.data && !props.onChange) {
      return new Error('You provided a `data` prop without an `onChange` handler')
    }
    if (props.onCheck && !props.checkable) {
      return new Error('You provided a `onCheck` prop without a `checkable` prop')
    }
  }
}

export default Tree
