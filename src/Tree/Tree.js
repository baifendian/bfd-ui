/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component, PropTypes } from 'react'
import update from 'react-update'
import classnames from 'classnames'
import get from 'lodash/get'
import shouldComponentUpdate from '../shouldComponentUpdate'
import nodeCheckProcessor from './nodeCheckProcessor'
import getPathData from './getPathData'
import Checkbox from '../Checkbox'
import TreeNode from './TreeNode'
import './index.less'

class Tree extends Component {

  constructor(props) {
    super(props)
    this.state = {
      data: props.data || props.defaultData || []
    }
  }

  componentWillReceiveProps(nextProps) {
    nextProps.data && this.setState({data: nextProps.data})
  }

  shouldComponentUpdate = shouldComponentUpdate

  updateDataBySingleProp(key, value, path) {
    const newData = update(this.state.data, 'set', [...path, key], value)
    this.updateData(newData)
    return newData
  }

  updateData(newData) {
    this.setState({data: newData})
    this.props.onChange && this.props.onChange(newData)
  }

  handleActive(path) {
    this.activePath = path
  }

  handleNodeSelect(path) {
    let newData = this.state.data
    if (this.activePath && get(this.state.data, this.activePath)) {
      newData = update(newData, 'set', [...this.activePath, 'active'], false)
    }
    newData = update(newData, 'set', [...path, 'active'], true)
    const pathData = getPathData(path, newData)
    this.props.onActive && this.props.onActive(pathData)
    this.props.onSelect && this.props.onSelect(pathData.slice(-1)[0], pathData)
    this.updateData(newData)
  }

  handleNodeCheck(checked, item, path) {
    nodeCheckProcessor(this.state.data, checked, item, path, (newData, newItem) => {
      if (this.props.onCheck) {
        this.props.onCheck(checked, newItem, getPathData(path, newData))
      }
      this.updateData(newData)
    })
  }

  render() {
    const {
      className, defaultData, onChange, checkable, onCheck, shouldNodeCheckable, getIcon,
      getUrl, dataFilter, noChildrenContent, shouldNodeSelectable, onNodeSelect,
      onNodeChange, ...other
    } = this.props
    const { data } = this.state
    delete other.data
    delete other.render
    delete other.beforeNodeRender

    let { beforeNodeRender } = this.props
    if (checkable) {
      beforeNodeRender = (item, path) => {
        const enabled = shouldNodeCheckable ? shouldNodeCheckable(item, path) : true
        return (
          <Checkbox
            className="bfd-tree__checkbox"
            checked={item.checked}
            indeterminate={item.indeterminate}
            disabled={!enabled}
            onChange={enabled ?
              e => this.handleNodeCheck(e.target.checked, item, path) : () => {}
            }
          />
        )
      }
    }

    return (
      <div className={classnames('bfd-tree', className)} {...other}>
        <ul>
          {data.map((item, i) => (
            <TreeNode
              key={i}
              treeData={data}
              data={item}
              path={[i]}
              contentRender={this.props.render}
              onActive={::this.handleActive}
              onSelect={::this.handleNodeSelect}
              onSinglePropChange={::this.updateDataBySingleProp}
              beforeRender={beforeNodeRender}
              shouldSelectable={shouldNodeSelectable}
              getIcon={getIcon}
              getUrl={getUrl}
              dataFilter={dataFilter}
              noDataContent={noChildrenContent}
            />
          ))}
        </ul>
      </div>
    )
  }
}

Tree.defaultProps = {
  noChildrenContent: '无数据'
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
   *   indeterminate: true, // 是否半勾选
   *   active: true, // 是否选中
   *   isParent: true, // 动态加载标识，当前节点展开后会动态加载数据，配合 getUrl 使用
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

  // getUrl 方式无数据时显示内容，默认`无数据`
  noChildrenContent: PropTypes.string,

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
