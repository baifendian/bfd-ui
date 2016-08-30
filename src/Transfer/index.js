/**
 * Created by tenglong.jiang on 2016-03-28.
 */

import React, { Component, PropTypes } from 'react'
import { Row, Col } from '../Layout'
import SearchBar from './SearchBar'
import SelectTable from './SelectTable'
import './main.less'

const SourceTable = SelectTable
const TargetTable = SelectTable
class TransferPanel extends Component {

  constructor(props) {
    super()
  }
  
  render() {
    return (
      <div>
        <div style={{marginTop: this.props.height / 2 + 'px'}}>
          <a href="javascrip:" onClick={::this.handleS2T}>添加 >></a>
          <br/><br/>
          <a href="javascrip:" onClick={::this.handleT2S}>{'<<'} 移除</a>
        </div>
      </div>
    )
  }

  handleS2T() {
    this.props.onTransfer('s2t')
  }

  handleT2S() {
    this.props.onTransfer('t2s')
  }
}

/**
 * Transfer
 */
class Transfer extends Component {
  
  constructor(props) {
    super(props)
    this.sid = []
    this.tid = []
    this.state = {
      filterText: '',
      searchData: props.sdata || []
    }
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.sdata != this.props.sdata) {
      this.setState({
        sdata: nextProps.sdata,
        searchData: nextProps.sdata
      })
    }
    if(nextProps.tdata != this.props.tdata) {
      this.setState({
        tdata: nextProps.tdata
      })
    }
  }

  render() {
    return (
      <Row className="bfd-transfer">
        <Col col="md-4">
          <SearchBar onUserInput={::this.handleUserInput}/>
          <SourceTable 
            onTransfer={::this.handleTransfer} 
            onFoucsItem={::this.handleSourceFouceItem} 
            data={this.state.searchData} 
            height={this.props.height || 200} 
            direct="s2t"
            render={this.props.render}
            />
        </Col>
        <Col col="md-2" className="bfd-transfer__bfd-pannel">
          <TransferPanel 
            onTransfer={::this.handleTransfer} 
            height={this.props.height || 200} />
        </Col>
        <Col col="md-4">
          <div style={{height: '34px', lineHeight: '34px'}} >
            <span>{this.props.title || '已选项'}</span>
          </div>
          <TargetTable 
            onTransfer={::this.handleTransfer} 
            onFoucsItem={::this.handleTargetFouceItem} 
            data={this.props.tdata} 
            height={this.props.height || 200} 
            direct="t2s"
            render={this.props.render}
            />
        </Col>
      </Row>
    )
  }

  handleUserInput(filterText) {
    const arr = []
    for (let i = 0, len = this.props.sdata.length; i < len; i++) {
      const item = this.props.sdata[i]
      const label = this.props.render ? this.props.render(item) : item.label
      if(typeof this.props.onSearch == 'function') {
        if(this.props.onSearch(label, filterText)) {
          arr.push(item)
        }
      } else {
        if (label.indexOf(filterText) != -1) {
          arr.push(item)
        }
      }
    }
    this.setState({
      filterText,
      searchData: arr
    })
  }
  
  handleSourceFouceItem(sid) {
    if(!sid) {
      return
    }
    if(sid instanceof Array) {
      this.sid = sid
    } else {
      this.sid = [sid]
    }
  }

  handleTargetFouceItem(tid) {
    if(!tid) {
      return
    }
    if(tid instanceof Array) {
      this.tid = tid
    } else {
      this.tid = [tid]
    }
  }

  handleTransfer(direct) {
    if (direct == 's2t') {  //  s->t
      if(!this.sid || this.sid.length == 0) {
        return
      }
      this.transferData(this.sid, this.props.sdata, this.props.tdata, direct)
    }
    if (direct == 't2s') {  //  t->s
      if(!this.tid || this.tid.length == 0) {
        return
      }
      this.transferData(this.tid, this.props.tdata, this.props.sdata, direct)
    }
  }

  transferData(ids, source, target, option) {
    let flag = 0
    if(!ids || ids.length == 0) {
      if('s2t' == option) {
        this.sid = []
      }
      if('t2s' == option) {
        this.tid = []
      }
      this.handleUserInput(this.state.filterText)
      if(typeof this.props.onChange == 'function') {
        switch(option) {
        case 's2t': this.props.onChange(source, target); break
        case 't2s': this.props.onChange(target, source); break
        }
      }
      return
    }
    const id = ids[0] //  取第一个id
    for(let i = source.length - 1; i >= 0; i--) {
      if(id == source[i].id) {
        const item = source.splice(i, 1)
        target.push(item[0])
        flag = 1
        break
      }      
    }

    if (flag) {
      ids.shift() //  删除第一个id
      this.transferData(ids, source, target, option)
    }
  }
}

Transfer.propTypes = {

  // 两个传输框高度，默认200px
  height: PropTypes.number,

  // 右侧传输框上方标题
  title: PropTypes.string,

  // 源数据，包含id、label属性
  sdata: PropTypes.array,

  // 目标数据，包含id、label属性
  tdata: PropTypes.array,

  // 传输框值改变后的回调函数。参数为改变后的值, 第一个参数：sdata, 第二个参数：tdata
  onChange: PropTypes.func,

  // 搜索框关键词与列表数据匹配规则函数, 第一个参数为列表项数据, 第二个参数为搜索关键词
  onSearch: PropTypes.func,

  // 每行数据渲染函数
  render: PropTypes.func
}

export default Transfer