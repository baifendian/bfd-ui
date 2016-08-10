/**
 * Created by tenglong.jiang on 2016-08-10.
 * 通用方法
 */
import React from 'react'

function isArray(v) {
  return Object.prototype.toString.call(v) === '[object Array]'
}

const getDisplayName = (Comp) => {
  if (!Comp) {
    return ''
  }
  if (typeof Comp === 'string') {
    return Comp
  }

  return Comp.displayName || Comp.name || 'Component'
}
/*
 * Find and return all matched children by type. `type` can be a React element class or
 * string
 */
const findAllByType = (children, type) => {
  const result = []
  let types = []

  if (isArray(type)) {
    types = type.map(t => getDisplayName(t))
  } else {
    types = [getDisplayName(type)]
  }

  React.Children.forEach(children, child => {
    const childType = child && child.type && (child.type.displayName || child.type.name)
    if (types.indexOf(childType) !== -1) {
      result.push(child)
    }
  })

  return result
}

export default findAllByType