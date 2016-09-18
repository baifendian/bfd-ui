/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class Row extends Component {

  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <a 
        id={this.props.id}
        key={this.props.id}
        href="#"
        onClick={::this.handleClick}
        onDoubleClick={::this.handleDbClick}
        onKeyDown={::this.handleKeyDown}
        onKeyUp={::this.handleKeyUp}
        className="bfd-row">
      {this.props.label}
      </a>
    )
  }

  handleClick(e) {
    e.preventDefault()
    this.props.onClick()
  }

  handleDbClick() {
    this.props.onDoubleClick()
  }

  handleKeyDown(e) {
    e.preventDefault()    
    const code = e.keyCode  // code 17->ctrl  16->shift
    if(code == 16) {  
      this.props.onKeyDown('isShift', 1)
    } else if(code == 17) {
      this.props.onKeyDown('isCtrl', 1)
    }
  }

  handleKeyUp(e) {
    e.preventDefault()
    const code = e.keyCode
    if(code == 16) {
      this.isShift = 0
      this.props.onKeyUp('isShift', 0)
    } else if(code == 17) {
      this.isCtrl = 0
      this.props.onKeyUp('isCtrl', 0)
    }
  }
}

class SelectTable extends Component {

  constructor() {
    super()
    this.isCtrl = 0
    this.isShift = 0
    this.items = {}
  }

  render() {
    const rows = []
    this.props.data.map((item, index) => {
      rows.push(<Row
        key={index}
        id={item.id}
        label={this.props.render ? this.props.render(item) : item.label}
        ref={item.id}
        onClick={this.handleClick.bind(this, item)}
        onDoubleClick={this.handleDbClick.bind(this, item)}
        onKeyDown={::this.handleKeyDown}
        onKeyUp={::this.handleKeyUp}
      />)
    })

    return (
      <div style={{height: this.props.height + 'px'}} className="bfd-transfer__bfd-table">
        <div className="bfd-transfer__list-group bfd-transfer__bfd-table-conent">
          {rows}
        </div>
      </div>
    )
  }

  getNode(nodes, id) {
    for(let i=0; i<nodes.length; i++) {
      const node = nodes[i]
      if(node.id == id) {
        return node
      }
    }
    return null
  }

  getMaxDT(nodes, currNode) {
    const len = nodes.length
    let maxNode = { dt: 0 }
    for(let i=0; i<len; i++) {
      const node = nodes[i]
      if(node.dt > maxNode.dt 
          && node.dt != currNode.dt) {
        maxNode = node
        continue
      }
    }
    if(maxNode.dt > 0) {
      return maxNode
    } else {
      return currNode
    }
  }

  getScopeEl(lastEl, el) {
    if(lastEl == el) {
      return [el]
    }
    let scopeEl = []
    let ps = el.previousSibling
    let ns = el.nextSibling
    let isFind = 0 // 是否找到lastEl

    if(ps) {
      while(ps) {
        scopeEl.push(ps)
        if(ps.id == lastEl.id) {
          isFind = 1
          break
        }
        ps = ps.previousSibling
      }
    }
    if(!!ns && !isFind) {
      scopeEl = []
      while(ns) {
        scopeEl.push(ns)
        if(ns.id == lastEl.id) {
          isFind = 1
          break
        }
        ns = ns.nextSibling
      }
    }
    if(isFind) {
      scopeEl.push(el)
    } else {
      scopeEl = [el]
    }
    return scopeEl
  }

  resetCss(els) {
    for(let i=0; i<els.length; i++) {
      const el = els[i]
      const className = el.className || ''  
      el.className = className.replace('selected', '').trim()
    }
  }

  setElCheckedCss(els, selectedEls) {
    if(!selectedEls) {
      return
    }
    if(!(selectedEls instanceof Array)) {
      selectedEls = [selectedEls]
    }    
    this.resetCss(els) // 恢复初始状态
    for(let i=0; i<selectedEls.length; i++) {
      const selectedEl = selectedEls[i]
      for(let j=0; j<els.length; j++) {
        const el = els[j]
        if(selectedEl == el) {
          el.className += ' selected'
          break
        }
      }
    }
  }

  handleClick(item) {
    const parentNode = ReactDOM.findDOMNode(this)
    const els = parentNode.children[0].getElementsByTagName('a')
    const el = this.getNode(els, item.id)
    const dt = new Date().getTime()
    el.dt = dt //  加时间属性

    if(this.isCtrl) {
      this.items[item.id] = item
      const className = el.className || ''
      if(className.indexOf('selected') != -1) {
        el.className = className.replace('selected', '').trim()
      } else {
        el.className += ' selected'
      }
    } else if(this.isShift) {
      this.items[item.id] = item      
      const lastEl = this.getMaxDT(els, el)  //  上一次点击元素      
      const scopeEls = this.getScopeEl(lastEl, el)  //  找到区间元素
      this.setElCheckedCss(els, scopeEls)
      this.items = {}
      for(let i=0; i<scopeEls.length; i++) {
        const n = scopeEls[i]
        this.items[n.id] = { id: n.id, label: n.innerHTML}
      }
    } else {
      this.items = {}
      this.items[item.id] = item
      this.setElCheckedCss(els, el)
    }
    const ids = []
    for(const p in this.items) {
      ids.push(p)
    }
    this.props.onFoucsItem(ids)
  }

  handleDbClick(item) {
    this.props.onFoucsItem(item.id)
    this.props.onTransfer(this.props.direct)
  }

  handleKeyDown(key, value) {
    this[key] = value
  }

  handleKeyUp(key, value) {
    this[key] = value
    if(key == 'isShift') {
      const parentNode = ReactDOM.findDOMNode(this)
      const els = parentNode.children[0].getElementsByTagName('a')
      for(let i=0; i<els.length; i++) {
        const el = els[i]
        delete el.dt
      }
    }
  }
}

export default SelectTable