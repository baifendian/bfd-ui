import React from 'react'
import { Tree } from 'c/Tree'
import Pre from '../Pre'
import { Props, Prop } from '../Props'
import { Checkbox } from 'c/Checkbox'

const TreeDemo = React.createClass({

  getInitialState() {
    return {
      data: [{
        name: '数据工厂',
        children: [{
          name: 'adsdsd'
        }, {
          name: 'tutrut',
          children: [{
            name: 'dasd'
          }]
        }]
      }, {
        name: '配置中心',
      }, {
        name: '配置中心2',
        children: [{
          name: 'dsads'
        }]
      }]
    }
  },

  render() {
    return <Tree data={this.state.data}></Tree>
  }
})

export default () => {
  return (
    <div>
      <h1>树</h1>
      <TreeDemo></TreeDemo>
    </div>
  )
}