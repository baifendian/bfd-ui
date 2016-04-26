import React from 'react'
import confirm from 'c/confirm'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

const ConfirmDemo = React.createClass({

  handleDelete() {
    confirm('确认删除吗', () => {
      console.log(1)
    })
  },

  render() {
    return <button type="button" className="btn btn-primary" onClick={this.handleDelete}>删除</button>
  }
})

const ConfirmDemoCode = `import confirm from 'bfd-ui/lib/confirm'

const App = React.createClass({

  handleDelete() {
    confirm('确认删除吗', () => {
      console.log(1)
    })
  },

  render() {
    return <button type="button" className="btn btn-primary" onClick={this.handleDelete}>删除</button>
  }
})`

export default React.createClass({

  render() {
    return (
      <div>
        <h1>确认提示</h1>
        <Pre>{ConfirmDemoCode}</Pre>
        <ConfirmDemo></ConfirmDemo>
        <Props>
          <Prop name="open" type="boolean" required>
            <p>是否打开，默认关闭</p>
          </Prop>
          <Prop name="handleClose" type="fucntion" required>
            <p>关闭动作的处理，用来同步 isOpen 的状态</p>
          </Prop>
          <Prop name="onConfirm" type="fucntion">
            <p>确定后的回调</p>
          </Prop>
        </Props>
      </div>
    )
  }
})