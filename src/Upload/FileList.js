/**
 * Created by tenglong.jiang on 2016-05-30.
 */

import React from 'react'
import Icon from '../Icon'
import confirm from '../confirm'
import './main.less'

export default React.createClass({
  handleClick(item) {
    confirm('确认删除吗', () => {
      if(typeof this.props.onRemove == 'function') {
        this.props.onRemove(item)
      }
    })
  },
  render() {
    return (
      <div className="bfd-upload__filelist">
      {
        this.props.data.map((item, index) => {
          return (
            <div key={index} className="bfd-upload__filelist__row">
              <span>{item.name}</span>
              <span>{item.percent}%</span>
              <Icon type="upload" style={{display: item.state == 0 ? '' : 'none'}} />
              <Icon type="check-circle" style={{paddingRight: '10px', color: 'green', display: item.state == 1 ? '' : 'none'}} />
              <Icon title="上传失败" type="times-circle" style={{paddingRight: '10px', color: 'red', display: item.state == 2 ? '' : 'none'}} />
              <Icon type="trash" style={{color: 'gray', cursor: 'pointer'}}  onClick={this.handleClick.bind(this, item)}/>
            </div>
          )          
        })
      }
      </div>
    )
  }
})