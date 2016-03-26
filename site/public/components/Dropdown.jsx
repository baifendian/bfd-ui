import React from 'react'
import { Dropdown, DropdownToggle, DropdownMenu } from 'c/Dropdown'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

const code = `import { Dropdown, DropdownToggle, DropdownMenu } from 'bfd-ui/lib/Dropdown'

const App = React.createClass({
  render() {
    return (
      <Dropdown>
        <DropdownToggle>
          <button className="btn btn-primary btn-sm">展开</button>
        </DropdownToggle>
        <DropdownMenu>
          Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes
        </DropdownMenu>
      </Dropdown>
    )
})`

export default React.createClass({
  render() {
    return (
      <div>
        <h1>下拉菜单</h1>
        <p>特征：自定义触发和下拉菜单内容，点击空白区域消失。一个页面下最多只显示一个下拉的状态</p>
        <Pre>{code}</Pre>

        <Dropdown>
          <DropdownToggle>
            <button className="btn btn-primary btn-sm">展开</button>
          </DropdownToggle>
          <DropdownMenu>
            Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes
          </DropdownMenu>
        </Dropdown>

        <h2>Dropdown</h2>
        <Props>
          <Prop name="className" type="String">
            <p>自定义 className，当下拉菜单处于 open 状态，className 会增加 open 样式类，可定义展开后的样式</p>
          </Prop>
          <Prop name="disabled" type="Boolean">
            <p>是否禁用</p>
          </Prop>
        </Props>
        <h2>Dropdown 实例接口</h2>
        <p>instance.close()，关闭下拉菜单</p>
      </div>
    )
  }
})