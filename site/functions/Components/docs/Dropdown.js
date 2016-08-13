import React from 'react'
import { Dropdown, DropdownToggle, DropdownMenu } from 'bfd/Dropdown'
import Pre from 'public/Pre'
import { Props, Prop } from 'public/Props'

const code = `import { Dropdown, DropdownToggle, DropdownMenu } from 'bfd-ui/lib/Dropdown'

export default React.createClass({
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
  }
})`

export default React.createClass({
  render() {
    return (
      <div>
        <h1>下拉菜单 @hai.jiang</h1>
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
          <Prop name="open" type="boolean">
            <p>是否打开，默认关闭，当使用 refs 方式不方便时，使用 props 直接控制</p>
          </Prop>
          <Prop name="disabled" type="boolean">
            <p>是否禁用</p>
          </Prop>
          <Prop name="onToggle" type="function">
            <p>toggle 回调，参数为是否打开</p>
          </Prop>
        </Props>
        <h2>Dropdown 实例接口</h2>
        <p>instance.close()，关闭</p>
        <p>instance.open()，打开</p>
      </div>
    )
  }
})