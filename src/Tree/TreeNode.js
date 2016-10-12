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
import Button from '../Button'
import Icon from '../Icon'
import Checkbox from '../Checkbox'
import Fetch from '../Fetch'

class TreeNode extends Component {

  componentWillMount() {
    if (this.props.data.active) {
      this.context.tree.activePath = this.props.path
    }
  }

  shouldComponentUpdate(nextProps) {
    return this.props.data !== nextProps.data
  }

  handleToggle(e) {
    e.stopPropagation()
    this.change('open', !this.props.data.open)
  }

  handleSelect() {
    this.context.tree.handleNodeSelect(this.props.path)
  }

  change(key, value) {
    const { tree } = this.context
    tree.handleChange(tree.updateNode(key, value, this.props.path))
  }

  handleLoad(data) {
    const filter = this.context.tree.props.dataFilter
    if (filter) {
      data = filter(data)
    }
    this.change('children', data)
  }

  handleCheck(e) {
    this.context.tree.handleNodeCheck(e.target.checked, this.props.data, this.props.path)
  }

  render() {
    const {
      beforeNodeRender, checkable, getIcon, getUrl, shouldNodeSelectable,
      shouldNodeCheckable
    } = this.context.tree.props
    const { data, path } = this.props
    const { name, open, isParent, checked, indeterminate, active, children } = data
    const tree = this.context.tree
    const hasChildren = children && children.length
    const indent = Math.floor(path.length / 2) * 20 + 'px'

    let Children
    if (hasChildren) {
      Children = (
        <ul>
          {children.map((item, i) => (
            <TreeNode
              key={i}
              data={item}
              path={[...path, 'children', i]}
            />
          ))}
        </ul>
      )
    }

    if (isParent && getUrl && open && !hasChildren) {
      Children = (
        <Fetch
          defaultHeight={30}
          spinnerHeight={20}
          style={{marginLeft: indent}}
          url={getUrl(data, tree.getPathData(path))}
          onSuccess={::this.handleLoad}
        >
          <div className="bfd-tree__node--empty">无数据</div>
        </Fetch>
      )
    }

    const typeIcon = getIcon && getIcon(data)

    const nodeSelectable = shouldNodeSelectable ? shouldNodeSelectable(data, path) : true
    const nodeCheckable = shouldNodeCheckable ? shouldNodeCheckable(data, path) : true

    return (
      <li className={classnames('bfd-tree__node', {'bfd-tree__node--open': open})}>
        <Button
          className="bfd-tree__node-toggle"
          style={{
            visibility: hasChildren || isParent ? 'visible' : 'hidden',
            marginLeft: indent
          }}
          icon="caret-right"
          size="sm"
          transparent
          onClick={::this.handleToggle}
        />
        {beforeNodeRender &&
          <div className="bfd-tree__node-before">{beforeNodeRender(data, path)}</div>}
        {checkable && (
          <Checkbox
            checked={checked}
            indeterminate={indeterminate}
            disabled={!nodeCheckable}
            onChange={nodeCheckable ? ::this.handleCheck : () => {}}
          />
        )}
        {typeIcon && <Icon type={typeIcon} className="bfd-tree__node-type" />}
        <div
          className={classnames('bfd-tree__node-content', {
            'bfd-tree__node-content--active': active,
            'bfd-tree__node-content--disabled': !nodeSelectable
          })}
          onClick={nodeSelectable && ::this.handleSelect}
        >
          {tree.props.render ? tree.props.render(data, path) : name}
        </div>
        {Children}
      </li>
    )
  }
}

TreeNode.contextTypes = {
  tree: PropTypes.object
}

export default TreeNode
