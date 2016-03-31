/**
 * Created by tenglong.jiang on 2016-03-28.
 */

import 'bfd-bootstrap'
import './main.less'
import React, { PropTypes } from 'react'
import SearchBar from './SearchBar'
import classNames from 'classnames'

var Row = React.createClass({
  handleClick : function() {
    this.props.onClick();
  },
  handleDbClick : function() {
    this.props.onDoubleClick();
  },
  render : function() {
    return (
      <a 
        id={this.props.id}
        key={this.props.id}
        href="javascrip:"
        onClick={this.handleClick}
        onDoubleClick={this.handleDbClick}
        className="list-group-item bfd-row">
      {this.props.label}
      </a>
    )
  }
})

var SourceTable = React.createClass({
  handleClick : function(item) {
    this.props.onFoucsItem(item.id);
  },
  handleDbClick : function(item) {
    this.props.onFoucsItem(item.id);
    this.props.onTransfer(1);
  },
  render : function() {
    var rows = [];
    var _this = this;
    this.props.data.map(item => {
      rows.push(<Row
        key={item.id}
        id={item.id}
        label={item.label}
        onClick={this.handleClick.bind(this,item)}
        onDoubleClick={this.handleDbClick.bind(this,item)} 
      />);
    })

    return (
      <div style={{height: this.props.height + "px"}} className="bfd-table">
        <div className="bfd-table-conent">
          {rows}
        </div>
      </div>
    )
  }
})

var TargetTable = React.createClass({
  handleClick : function(item) {
    this.props.onFoucsItem(item.id);
  },
  handleDbClick : function(item) {
    this.props.onFoucsItem(item.id);
    this.props.onTransfer(-1);
  },
  render : function() {
    var rows = [];
    var _this = this;
    this.props.data.map(item => {
      rows.push(<Row 
        key={item.id} 
        id={item.id} 
        label={item.label} 
        onClick={this.handleClick.bind(this, item)} 
        onDoubleClick={this.handleDbClick.bind(this, item)} 
      />);
    });

    return (
      <div style={{height:this.props.height + "px"}} className="bfd-table">
        <div className="bfd-table-conent">
          {rows}
        </div>
      </div>
    )
  }
})

var TransferPanel = React.createClass({
  handleS2T : function() {
    this.props.onTransfer(1);
  },
  handleT2S : function() {
    this.props.onTransfer(-1);
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
    this.setState({
      sid : sid
    })
  },
  handleTargetFouceItem : function(tid) {
    this.setState({
      tid : tid
    })
  },
  handleTransfer : function(sign) {
    //s->t
    if (sign == 1) {
      this.transferData(this.state.sid, this.state.sdata, this.state.tdata, "s2t");
    }
    //t->s
    if (sign == -1) {
      this.transferData(this.state.tid, this.state.tdata, this.state.sdata, "t2s");
    }
  },
  transferData : function(id, source, target, option) {
    var flag = 0;
    for(var i = 0, len = source.length; i < len; i++) {
      if(id == source[i].id) {
        var item =  source.splice(i, 1);
        target.push(item[0]);
        flag = 1;
        break;
      }
    }

    if (flag) {
      this.setState({
        sid : "",
        tid : "",
        sdata : option == "s2t" ? source : target,
        tdata : option == "t2s" ? source : target
      });
      this.handleUserInput(this.state.filterText)      
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
        sdata : nextProps.sdata
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
            height={this.props.height || 200} />
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
            height={this.props.height || 200} />
        </div>
      </div>
    )
  }
})