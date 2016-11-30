/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react'
import classnames from 'classnames'
import Button from '../Button'
import Icon from '../Icon'
import Fetch from '../Fetch'
import TextOverflow from '../TextOverflow'
import getPathData from './getPathData'

class TreeNode extends Component {

  componentWillMount() {
    this.prepareActivePath(this.props)
  }

  componentWillReceiveProps(nextProps) {
    this.prepareActivePath(nextProps)
  }

  shouldComponentUpdate(nextProps) {
    return this.props.data !== nextProps.data
  }

  prepareActivePath(props) {
    props.data.active && props.onActive(props.path)
  }

  changeBySingleProp(key, value) {
    this.props.onSinglePropChange(key, value, this.props.path)
  }

  handleToggle(e) {
    e.stopPropagation()
    this.changeBySingleProp('open', !this.props.data.open)
  }

  handleSelect() {
    this.props.onSelect(this.props.path)
  }

  handleLoad(data) {
    const filter = this.props.dataFilter
    if (filter) {
      data = filter(data)
    }
    this.changeBySingleProp('children', data)
  }

  render() {
    const { data, path, ...other } = this.props
    const {
      treeData, contentRender, getUrl, getIcon, beforeRender, shouldSelectable
    } = this.props
    const hasChildren = data.children && data.children.length
    const typeIcon = getIcon && getIcon(data)
    const selectable = shouldSelectable ? shouldSelectable(data, path) : true

    let Children, List
    if (hasChildren) {
      List = (
        <ul className="bfd-tree__node-list">
          {data.children.map((item, i) => (
            <TreeNode
              key={i}
              data={item}
              path={[...path, 'children', i]}
              {...other}
            />
          ))}
        </ul>
      )
    }

    if (data.isParent) {
      Children = (
        <Fetch
          className="bfd-tree__fetch"
          defaultHeight={30}
          spinnerHeight={20}
          url={data.open && getUrl && getUrl(data, getPathData(path, treeData)) || ''}
          onSuccess={::this.handleLoad}
        >
          {List || <div className="bfd-tree__node--empty">无数据</div>}
        </Fetch>
      )
    } else {
      Children = List
    }

    return (
      <li className={classnames('bfd-tree__node', {'bfd-tree__node--open': data.open})}>
        <Button
          className="bfd-tree__node-toggle"
          style={{visibility: hasChildren || data.isParent ? 'visible' : 'hidden'}}
          icon="caret-right"
          size="sm"
          transparent
          onClick={::this.handleToggle}
        />
        {beforeRender && (
          <div className="bfd-tree__node-before">{beforeRender(data, path)}</div>
        )}
        {typeIcon && <Icon type={typeIcon} className="bfd-tree__node-type" />}
        <div
          className={classnames('bfd-tree__node-content', {
            'bfd-tree__node-content--active': data.active,
            'bfd-tree__node-content--disabled': !selectable
          })}
          onClick={selectable && ::this.handleSelect}
        >
          <TextOverflow>
            <div>
            {contentRender ? contentRender(data, path) : data.name}
            </div>
          </TextOverflow>
        </div>
        {Children}
      </li>
    )
  }
}

export default TreeNode
