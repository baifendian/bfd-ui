/**
 * Created by tenglong.jiang on 2016-05-26.
 */

import 'bfd-bootstrap'
import './main.less'
import React from 'react'
import confirm from '../confirm'
import classnames from 'classnames'
import xhr from '../xhr'
import FileList from './FileList'

export default React.createClass({
  getInitialState() {
    return {
      width: 0,
      list : []
    }
  },
  handleClick(event) {
    const fileEl = this.refs.file;
    fileEl.click();
  },
  handleChange(event) {
    const el = event.target
    const files = el.files
    const self = this;
    const arr = []
    for(var i=0; i<files.length; i++) {
      const file = files[i];
      arr.push({
        name: file.name,
        size: file.size,
        type: file.type,
        state: 0
      });

      (function(self, file, index){
        let fd = new FormData();
        fd.append("files", file);
        xhr({
          type: 'post',
          url: self.props.action,
          data: fd,
          success(data) {
            let list = self.state.list.slice(0);
            let f = list[index];
            f.state = 1;
            self.setState({list: list})
            if(typeof self.props.onComplete == 'function') {
              self.props.onComplete(data);
            }
          },
          error() {
            let list = self.state.list.slice(0);
            let f = list[index];
            f.state = 2;
            self.setState({list: list})
          },
          complete() {
          }
        })
      })(self, file, i)
    }

    this.setState({
      list: arr
    })
  },
  handleRemove: function(currItem) {
    const self = this;
    let arr = this.state.list.slice(0)
    arr.map((item, index) => {
      if(item == currItem) {
        arr.splice(index, 1);
        self.setState({
          list: arr
        })
        return;
      }
    })
  },
  render() {
    return (
      <div className={classnames('bfd-upload', this.props.className)}>
        <input ref="file" onChange={this.handleChange} type="file" multiple={this.props.multiple ? true : false} style={{display: 'none'}} />
        <button className="btn btn-primary" type="button" onClick={this.handleClick}>
          文件上传 
        </button>
        <div className="listbox">
          <FileList data={this.state.list} onRemove={this.handleRemove}></FileList>
        </div>
      </div>
    )
  }
})

