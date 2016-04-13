import React from 'react'
import Confirm from 'c/Confirm'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

const code = `import Confirm from 'bfd-ui/lib/Confirm'

const App = React.createClass({
  render() {
    return <ClearableInput value="test" />
})`

const ConfirmDemo = React.createClass({

  getInitialState() {
    return {
      isOpen: false
    }
  },

  handleDelete() {
    this.setState({isOpen: true})
  },

  render() {
    return (
      <div>
        <button type="button" className="btn btn-primary" onClick={this.handleDelete}>删除</button>
        <Confirm open={this.state.isOpen}>确认删除吗？</Confirm>
      </div>
    )
  }
})

export default React.createClass({

  render() {
    return (
      <div>
        <h1>确认提示</h1>
        <Pre>{code}</Pre>
        <ConfirmDemo></ConfirmDemo>
        <Props>
          <Prop name="value" type="String">
            <p>输入框值</p>
          </Prop>
          <Prop name="size" type="String">
            <p>输入框高度尺寸，参考 Bootstrap input，可选值：lg, sm</p>
          </Prop>
          <Prop name="placeholder" type="String">
            <p>同 input placeholder</p>
          </Prop>
          <Prop name="onChange" type="Function">
            <p>输入框值改变后的回调，包括清空动作。参数为改变后的值</p>
          </Prop>
        </Props>
      </div>
    )
  }
})