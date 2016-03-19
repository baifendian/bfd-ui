import React from 'react'
import { Dropdown, DropdownToggle, DropdownMenu } from 'c/Dropdown'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

export default React.createClass({
  render() {
    return (
      <div>
        <h1>下拉菜单</h1>
        <p>特征：自定义触发和下拉菜单内容，点击空白区域消失。一个页面下最多只显示一个下拉的状态</p>
        <Pre>
{`import { Dropdown, DropdownToggle, DropdownMenu } from 'bfd-ui/lib/Dropdown'

const App = React.createClass({
  render() {
    return (
      <Dropdown>
        <DropdownToggle>
          <button className="btn btn-primary btn-sm">展开</button>
        </DropdownToggle>
        <DropdownMenu>
          <h1>title</h1>
          <p>content</p>
        </DropdownMenu>
      </Dropdown>
    )
})`}
        </Pre>

        <Dropdown>
          <DropdownToggle>
            <button className="btn btn-primary btn-sm">展开</button>
          </DropdownToggle>
          <DropdownMenu>
            <h1>title</h1>
            <p>content</p>
          </DropdownMenu>
        </Dropdown>

        <h2>Dropdown</h2>
        <Props>
          <Prop name="className" type="String">
            <p>自定义 className</p>
            <p>打开后，className 会增加 open，可以自定义展开后的样式</p>
          </Prop>
        </Props>
      </div>
    )
  }
})