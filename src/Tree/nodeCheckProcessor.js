/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import update from 'react-update'
import get from 'lodash/get'

function updateItemCheckState(item, data, path, checked, indeterminate) {
  let newData = data
  if (!!item.checked !== checked) {
    newData = update(newData, 'set', [...path, 'checked'], checked)
  }
  if (!!item.indeterminate !== indeterminate) {
    newData = update(newData, 'set', [...path, 'indeterminate'], indeterminate)
  }
  return newData
}

function updateChildrenCheckedState(data, item, path, checked) {
  let newData = data
  if (item && item.children) {
    path = [...path, 'children']
    item.children.forEach((item, i) => {
      const _path = [...path, i]
      newData = updateItemCheckState(item, newData, _path, checked, false)
      newData = updateChildrenCheckedState(newData, item, _path, checked)
    })
  }
  return newData
}

const updateParentsCheckedState = (() => {
  const isChecked = item => {
    const childrenCheckedLen = item.children.filter(item => item.checked).length
    return childrenCheckedLen === item.children.length
  }
  const isIndeterminate = item => {
    return item.children.some(item => item.indeterminate || item.checked)
  }
  return function updateParentCheckedState(data, path) {
    let newData = data
    if (path.length) {
      const item = get(newData, path)
      const checked = isChecked(item)
      const indeterminate = !checked && isIndeterminate(item)
      newData = updateItemCheckState(item, newData, path, checked, indeterminate)
      if (newData !== data) {
        newData = updateParentCheckedState(newData, path.slice(0, -2))
      }
    }
    return newData
  }
})()

function updateRelativeNodesCheckedState(data, item, path, checked) {
  const newData = updateChildrenCheckedState(data, item, path, checked)
  return updateParentsCheckedState(newData, path.slice(0, -2))
}

export default (data, checked, item, path, callback) => {
  let newData = updateItemCheckState(item, data, path, checked, false)
  let newItem = get(newData, path)
  newData = updateRelativeNodesCheckedState(newData, newItem, path, checked)
  newItem = get(newData, path)
  callback(newData, newItem)
}
