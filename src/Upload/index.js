/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import xhr from '../xhr'
import Button from '../Button'
import FileList from './FileList'
import './main.less'

class Upload extends Component {

  constructor() {
    super()
    this.state = {
      list: []
    }
  }

  render() {
    const { className, action, fileName, text, multiple, onUplading, onComplete, showFileList, ...other } = this.props
    const isShowList = typeof showFileList == 'undefined' ? true : showFileList
    return (
      <div className={classnames('bfd-upload', className)} {...other}>
        <input ref="file" onChange={::this.handleChange} type="file" multiple={multiple ? true : false} style={{display: 'none'}} />
        <Button onClick={::this.handleClick}>
          {this.props.text || '文件上传'}
        </Button>
        {
          isShowList ? 
            <div className="bfd-upload__listbox">
              <FileList data={this.state.list} onRemove={::this.handleRemove}></FileList>
            </div>
          : ''
        }        
      </div>
    )
  }

  handleClick() {
    const fileEl = this.refs.file
    fileEl.value = ''
    fileEl.click()
  }

  handleChange(event) {
    const el = event.target
    const files = el.files
    const onUplading = this.props.onUplading
    const onUpload = this.props.onUpload
    onUplading && onUplading(0)
    onUpload ? onUpload(files) : this.upload(files)
  }

  upload(files) {
    const onUplading = this.props.onUplading
    const self = this
    const arr = []
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      arr.push({
        name: file.name,
        size: file.size,
        type: file.type,
        state: 0
      })

      ;(function(self, file, index) {
        const fd = new FormData()
        fd.append(self.props.fileName || 'files', file)
        xhr({
          type: 'post',
          url: self.props.action,
          data: fd,
          beforeSend(xhr) {
            // 侦查当前附件上传情况
            xhr.upload.onprogress = function(evt) {
              const loaded = evt.loaded
              const tot = evt.total
              const per = Math.floor(100 * loaded / tot) // 已经上传的百分比
              const list = self.state.list.slice(0)
              const f = list[index]
              f.percent = per
              onUplading && onUplading(per)
              self.setState({
                list
              })
            }
          },
          success(data) {
            const list = self.state.list.slice(0)
            const f = list[index]
            f.state = 1
            self.setState({
              list
            })
            if (typeof self.props.onComplete == 'function') {
              self.props.onComplete(data, list)
            }
          },
          error(msg) {
            const list = self.state.list.slice(0)
            const f = list[index]
            f.state = 2
            self.setState({
              list
            })
            if (typeof self.props.onComplete == 'function') {
              self.props.onComplete(msg, list)
            }
          },
          complete() {}
        })
      })(self, file, i)
    }

    this.setState({
      list: arr
    })
  }

  handleRemove(currItem) {
    const self = this
    const arr = this.state.list.slice(0)
    arr.map((item, index) => {
      if (item == currItem) {
        arr.splice(index, 1)
        self.setState({
          list: arr
        })
        return
      }
    })
  }
}

Upload.propTypes = {
  
  // 上传的地址
  action: PropTypes.string.isRequired,

  // 上传按钮文本内容，默认为文件上传
  text: PropTypes.string,

  // 上传文件名称，默认为files
  fileName: PropTypes.string,

  // 是否支持多选文件，ie10+ 支持。开启后按住 ctrl 可选择多个文件。
  multiple: PropTypes.bool,

  // 文件上传进行中事件
  onUplading: PropTypes.func,
  // 上传文件完成时的回调函数
  onComplete: PropTypes.func,

  // 是否显示文件上传列表
  showFileList: PropTypes.bool
}

export default Upload