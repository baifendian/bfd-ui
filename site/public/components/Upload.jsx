import React from 'react'
import Pre from '../Pre'
import { Props, Prop } from '../Props'
import Upload from 'c/Upload'

export default React.createClass({
  getInitialState() {
    return {
      fileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'http://www.baidu.com/xxx.png',
      }],
    };
  },
  handleComplete(data) {
    console.log('complete', data)
  },
  render() {
    const props = {
      action: '/upload.do',
      onComplete: this.handleComplete,
      multiple: false,
    };
    return (
      <div>
        <h1>上传</h1>
        <h2>Upload</h2>
        <Pre>
        {`
import Upload from 'bfd-ui/lib/Upload'

const App = React.createClass({
  render() {    
    return <Upload {...props} fileList={this.state.fileList} />
  }
})`
        }
        </Pre>
        <Upload {...props} fileList={this.state.fileList} />
        <div className="clearfix"></div>
        <Props>
          <Prop name="action" type="String" required>
            <p>上传的地址</p>
          </Prop>
          <Prop name="fileList" type="String">
            <p>已经上传的文件列表</p>
          </Prop>
          <Prop name="multiple" type="String">
            <p>可选参数, 是否支持多选文件，ie10+ 支持。开启后按住 ctrl 可选择多个文件。</p>
          </Prop>          
          <Prop name="onChange" type="function">
            <p>上传文件改变时的状态</p>
          </Prop>       
        </Props>
      </div>
    )
  }
}) 