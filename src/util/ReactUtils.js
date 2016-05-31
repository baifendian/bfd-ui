/**
 * Created by tenglong.jiang on 2016-05-17.
 * 通用方法
 */
import React from 'react'

function isArray(v) {
  return Object.prototype.toString.call(v) === '[object Array]';
}

export const getDisplayName = (Comp) => {
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
export const findAllByType = (children, type) => {
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
  /*
   * Return the first matched child by type, return null otherwise.
   * `type` can be a React element class or string.
   */
export const findChildByType = (children, type) => {
  const result = findAllByType(children, type)

  return result && result[0]
}