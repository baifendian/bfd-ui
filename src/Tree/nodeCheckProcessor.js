import update from 'react-update'
import get from 'lodash/get'

function syncChildrenCheckedState(data, item, path, checked) {
  let newData = data
  if (item && item.children) {
    path = [...path, 'children']
    item.children.forEach((item, i) => {
      const _path = [...path, i]
      if (!!item.checked !== checked) {
        newData = update(newData, 'set', [..._path, 'checked'], checked)
        if (item.indeterminate) {
          newData = update(newData, 'set', [..._path, 'indeterminate'], false)
        }
        newData = syncChildrenCheckedState(newData, item, _path, checked)
      }
    })
  }
  return newData
}

function syncParentsCheckedState(data, path) {
  let newData = data
  if (path.length) {
    const parent = get(newData, path)
    const childrenCheckedLen = parent.children.filter(item => item.checked).length
    const checked = childrenCheckedLen === parent.children.length
    const childrenIndeterminateLen = parent.children.filter(item => item.indeterminate).length
    const indeterminate = !!childrenIndeterminateLen || (!!childrenCheckedLen && !checked)
    if (!!parent.checked !== checked) {
      newData = update(newData, 'set', [...path, 'checked'], checked)
    }
    if (!!parent.indeterminate !== indeterminate) {
      newData = update(newData, 'set', [...path, 'indeterminate'], indeterminate)
    }
    if (newData !== data) {
      newData = syncParentsCheckedState(newData, path.slice(0, -2))
    }
  }
  return newData
}

function syncRelativeNodesCheckedState(data, item, path, checked) {
  const newData = syncChildrenCheckedState(data, item, path, checked)
  return syncParentsCheckedState(newData, path.slice(0, -2))
}

export default (data, checked, item, path, callback) => {
  let newData = update(data, 'set', [...path, 'checked'], checked)
  if (item.indeterminate) {
    newData = update(newData, 'set', [...path, 'indeterminate'], false)
  }
  let newItem = get(newData, path)
  newData = syncRelativeNodesCheckedState(newData, newItem, path, checked)
  newItem = get(newData, path)
  callback(newData, newItem)
}
