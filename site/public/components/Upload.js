import React from 'react'
import Pre from '../Pre'
import { Props, Prop } from '../Props'
import Upload from 'c/Upload'

export default React.createClass({
  handleComplete(data) {
    console.log('complete', data)
  },
  render() {
    const props = {
      action: '/upload.do',
      onComplete: this.handleComplete,
      multiple: true,
      showFileList: true
    }
    return (
      <div>
        <h1>上传 @tenglong.jiang</h1>
        <h2>Upload</h2>
        <Pre>
        {`
import Upload from 'bfd-ui/lib/Upload'

const App = React.createClass({
  handleComplete(data) {
    console.log('complete', data)
  },
  render() {  
    const props = {
      action: '/upload.do',
      multiple: true,
      onComplete: this.handleComplete      
    }

    return <Upload {...props} />
  }
})`
        }
        </Pre>
        <Upload {...props} />
        <div className="clearfix"></div>
        <Props>
          <Prop name="action" type="String" required>
            <p>上传的地址</p>
          </Prop>
          <Prop name="text" type="String">
            <p>上传按钮文本内容，默认为文件上传</p>
          </Prop>
          <Prop name="multiple" type="Boolean">
            <p>是否支持多选文件，ie10+ 支持。开启后按住 ctrl 可选择多个文件。</p>
          </Prop>          
          <Prop name="onComplete" type="function">
            <p>上传文件完成时的回调函数</p>
          </Prop>
          <Prop name="showFileList" type="Boolean">
            <p>是否显示上传的文件列表，默认为true</p>
          </Prop>       
        </Props>
      </div>
    )
  }
}) 