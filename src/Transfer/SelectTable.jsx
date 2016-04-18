/**
 * Created by tenglong.jiang on 2016-03-30.
 */

import 'bfd-bootstrap'
import './main.less'
import React from 'react'
import ReactDOM from 'react-dom'


const Row = React.createClass({
  handleClick : function(e) {
    e.preventDefault();
    this.props.onClick();
  },
  handleDbClick : function() {
    this.props.onDoubleClick();
  },
  handleKeyDown : function(e) {
    e.preventDefault();
    //code 17->ctrl  16->shift
    var code = e.keyCode;
    if(code == 16) {  
      this.props.onKeyDown("isShift", 1);
    } else if(code == 17) {
      this.props.onKeyDown("isCtrl", 1);
    }
  },
  handleKeyUp : function(e) {
    e.preventDefault();
    var code = e.keyCode;

    if(code == 16) {
      this.isShift = 0;
      this.props.onKeyUp("isShift", 0);
    } else if(code == 17) {
      this.isCtrl = 0;
      this.props.onKeyUp("isCtrl", 0);
    }
  },
  render : function() {
    return (
      <a 
        id={this.props.id}
        key={this.props.id}
        href="#"
        onClick={this.handleClick}
        onDoubleClick={this.handleDbClick}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
        className="bfd-row">
      {this.props.label}
      </a>
    )
  }
})

const SelectTable = React.createClass({
  isCtrl : 0,
  isShift : 0,
  items : {},
  getNode : function(nodes, id) {
    for(var i=0; i<nodes.length; i++) {
      var node = nodes[i];
      if(node.id == id) {
        return node;
      }
    }
    return null;
  },
  getMaxDT : function(nodes, currNode) {
    var len = nodes.length;
    var maxNode = { dt : 0 };
    for(var i=0; i<len; i++) {
      var node = nodes[i];
      if(node.dt > maxNode.dt 
          && node.dt != currNode.dt) {
        maxNode = node;
        continue;
      }
    }
    if(maxNode.dt > 0) {
      return maxNode;
    } else {
      return currNode;
    }
  },
  getScopeEl : function(lastEl, el) {
    if(lastEl == el) {
      return [el];
    }
    var scopeEl = [];
    var ps = el.previousSibling;
    var ns = el.nextSibling;
    var isFind = 0; //是否找到lastEl

    if(!!ps) {
      while(ps) {
        scopeEl.push(ps);
        if(ps.id == lastEl.id) {
          isFind = 1;
          break;
        }
        ps = ps.previousSibling;
      }
    }
    if(!!ns && !isFind) {
      scopeEl = [];
      while(ns) {
        scopeEl.push(ns);
        if(ns.id == lastEl.id) {
          isFind = 1;
          break;
        }
        ns = ns.nextSibling;
      }
    }
    if(isFind) {
      scopeEl.push(el);
    } else {
      scopeEl = [el];
    }
    return scopeEl;
  },
  resetCss : function(els) {
    for(var i=0; i<els.length; i++) {
      let el = els[i];
      let className = el.className || "";      
      el.className = className.replace("selected", "").trim();
    }
  },
  setElCheckedCss : function(els, selectedEls) {

    if(!selectedEls) {
      return;
    }

    if(!(selectedEls instanceof Array)) {
      selectedEls = [selectedEls];
    }
    
    this.resetCss(els);  //恢复初始状态

    for(var i=0; i<selectedEls.length; i++) {
      var selectedEl = selectedEls[i];
      for(var j=0; j<els.length; j++) {
        let el = els[j];       
        let className = el.className || "";
        if(selectedEl == el) {
          el.className += " selected";
          break;
        }            
      }
    }    
  },
  handleClick : function(item) {
    var parentNode = ReactDOM.findDOMNode(this);
    var els = parentNode.children[0].getElementsByTagName("a");
    var el = this.getNode(els, item.id);
    var dt = new Date().getTime();
    el.dt = dt; //加时间属性

    if(this.isCtrl) {
      this.items[item.id] = item;
      var className = el.className || "";
      if(className.indexOf("selected") != -1) {
        el.className = className.replace("selected","").trim();
      } else {
        el.className += " selected";
      }
    } else if(this.isShift) {
      this.items[item.id] = item;
      //上一次点击元素
      let lastEl = this.getMaxDT(els, el);
      //找到区间元素
      let scopeEls = this.getScopeEl(lastEl, el);
      this.setElCheckedCss(els, scopeEls);
      this.items = {};
      for(var i=0; i<scopeEls.length; i++) {
        let n = scopeEls[i];
        this.items[n.id] = { id: n.id, label: n.innerHTML};
      }
    } else {
      this.items = {};
      this.items[item.id] = item;
      this.setElCheckedCss(els, el);
    }
    var ids = [];
    for(var p in this.items) {
      ids.push(p);
    }
    this.props.onFoucsItem(ids);
  },
  handleDbClick : function(item) {
    this.props.onFoucsItem(item.id);
    this.props.onTransfer(this.props.direct);
  },
  handleKeyDown : function(key, value) {
    this[key] = value;
  },
  handleKeyUp : function(key,value) {
    this[key] = value;
    if(key == "isShift") {
      var parentNode = ReactDOM.findDOMNode(this);
      var els = parentNode.children[0].getElementsByTagName("a");
      for(var i=0; i<els.length; i++) {
        var el = els[i];
        delete el.dt;
      }
    }
  },
  render : function() {
    var rows = [];
    var _this = this;
    this.props.data.map((item, index) => {
      rows.push(<Row
        key={index}
        id={item.id}
        label={item.label}
        ref={item.id}
        onClick={this.handleClick.bind(this,item)}
        onDoubleClick={this.handleDbClick.bind(this,item)}
        onKeyDown={this.handleKeyDown}
        onKeyUp={this.handleKeyUp}
      />);
    })

    return (
      <div style={{height: this.props.height + "px"}} className="bfd-table">
        <div className="list-group bfd-table-conent">
          {rows}
        </div>
      </div>
    )
  }
})

export default SelectTable