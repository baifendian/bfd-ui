/**
 * Created by tenglong.jiang on 2016-03-28.
 */

import 'bfd-bootstrap'
import './main.less'
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import SearchBar from './SearchBar'
import classNames from 'classnames'
import SelectTable from './SelectTable'

var SourceTable = SelectTable;
var TargetTable = SelectTable

var TransferPanel = React.createClass({
  handleS2T : function() {
    this.props.onTransfer("s2t");
  },
  handleT2S : function() {
    this.props.onTransfer("t2s");
  },
  render : function() {
    return (
      <div>
        <div style = {{ marginTop: this.props.height/2 + "px" }}>
        <a href="javascrip:" onClick={this.handleS2T}>添加 >></a>
        <br/><br/>
        <a href="javascrip:" onClick={this.handleT2S}>{'<<'} 移除</a>
        </div>
      </div>
    )
  }
})

/**
 * Transfer
 */
export default React.createClass({
  sid : [],
  tid : [],
  handleUserInput: function(filterText) {
    var arr = [];
    for (var i = 0, len = this.state.sdata.length; i < len; i++) {
      var item = this.state.sdata[i];
      if (item.label.indexOf(filterText) != -1) {
        arr.push(item);
      }
    }
    this.setState({
      filterText : filterText,
      searchData : arr
    });
  },
  handleSourceFouceItem : function(sid) {
    if(!sid) {
      return;
    }
    if(sid instanceof Array) {
      this.sid = sid;
    } else {
      this.sid = [sid];
    }
  },
  handleTargetFouceItem : function(tid) {
    if(!tid) {
      return;
    }
    if(tid instanceof Array) {
      this.tid = tid;
    } else {
      this.tid = [tid];
    }
  },
  handleTransfer : function(direct) {
    //s->t
    if (direct == "s2t") {
      if(!this.sid || this.sid.length == 0) {
        return;
      }
      this.transferData(this.sid, this.state.sdata, this.state.tdata, direct);
    }
    //t->s
    if (direct == "t2s") {
      if(!this.tid || this.tid.length == 0) {
        return;
      }
      this.transferData(this.tid, this.state.tdata, this.state.sdata, direct);
    }
  },
  transferData : function(ids, source, target, option) {
    var flag = 0;
    if(!ids || ids.length == 0) {
      this.sid = [];
      this.tid = [];
      this.setState({
        sdata : option == "s2t" ? source : target,
        tdata : option == "t2s" ? source : target
      });
      this.handleUserInput(this.state.filterText) 
      return;
    }
    var id = ids[0]; // 取第一个id
    for(var i = source.length - 1; i >= 0; i--) {
      if(id == source[i].id) {
        var item =  source.splice(i, 1);
        target.push(item[0]);
        flag = 1;
        break;
      }      
    }

    if (flag) {
      ids.shift(); //删除第一个id
      this.transferData(ids, source, target, option);
    }
  },
  getInitialState: function () {
    return {
      filterText : "",
      sdata : this.props.sdata || [],
      tdata : this.props.tdata || [],
      searchData : this.props.sdata || []
    };
  },
  componentWillReceiveProps: function(nextProps) {
    if(nextProps.sdata != this.props.sdata) {
      this.setState({
        sdata : nextProps.sdata,
        searchData : nextProps.sdata
      });
    }
    if(nextProps.tdata != this.props.tdata) {
      this.setState({
        tdata : nextProps.tdata
      });
    }
  },
  render() {
    return (
      <div className="bfd-transfer">
        <div className = "col-xs-4">
          <SearchBar onUserInput={this.handleUserInput}/>
          <SourceTable 
            onTransfer={this.handleTransfer} 
            onFoucsItem={this.handleSourceFouceItem} 
            data={this.state.searchData} 
            height={this.props.height || 200} 
            direct="s2t"
            />
        </div>
        <div className="col-xs-2 bfd-pannel">
          <TransferPanel 
            onTransfer={this.handleTransfer} 
            height={this.props.height || 200} />
        </div>
        <div className="col-xs-4">
          <div style={{height:"34px", lineHeight:"34px"}} >
            <span>{this.props.title || "已选项"}</span>
          </div>
          <TargetTable 
            onTransfer={this.handleTransfer} 
            onFoucsItem={this.handleTargetFouceItem} 
            data={this.state.tdata} 
            height={this.props.height || 200} 
            direct="t2s"
            />
        </div>
      </div>
    )
  }
})