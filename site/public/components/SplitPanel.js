import React from 'react'
import {
  SplitPanel,
  SubSplitPanel
} from 'c/SplitPanel'
import Pre from '../Pre'
import {
  Props,
  Prop
} from '../Props'

const code = `import { SplitPanel, SubSplitPanel } from 'bfd-ui/lib/SplitPanel'

export default React.createClass({
  handleSplit(oldWidth1, oldWidth2, width1, width2) {
    console.log(oldWidth1, oldWidth2, width1, width2)
  },
  render() {
    return (
      <SplitPanel direct="ver" onSplit={this.handleSplit} style={{border: '1px solid #000'}}>
        <SubSplitPanel width={200}>
          <p>你好</p>
          <p>世界</p>
        </SubSplitPanel>
        <SubSplitPanel>
          <div>hello</div>
          <div>world</div>
        </SubSplitPanel>
      </SplitPanel>
    )
  }
})`
export default React.createClass({
  handleSplit(oldWidth1, oldWidth2, width1, width2) {
    console.log(oldWidth1, oldWidth2, width1, width2)
  },
  render() {
    return (
      <div>
      <h1></h1>
      <h2>SplitPanel @tenglong.jiang</h2>
      <Pre>{code}</Pre>
      <SplitPanel direct="ver" onSplit={this.handleSplit} style={{border: '1px solid #000'}}>
        <SubSplitPanel width={200}>
          <p>你好</p>
          <p>世界</p>
        </SubSplitPanel>
        <SubSplitPanel>
          <div>hello</div>
          <div>world</div>
        </SubSplitPanel>
      </SplitPanel>
      <h1>SplitPanel</h1>
      <p>分栏容器面板</p>
      <Props>
        <Prop name="direct" type="string" required>
          <p>分栏方向，分为水平分栏（hor）和垂直分栏（ver）两种</p>
        </Prop>
        <Prop name="onSplit" type="function">
          <p>分栏拖动事件</p>
          <p>当属性direct=ver，返回四个参数为oldWidth、oldWidth1（代表两栏原宽度）和width1、width2（代表两栏当前宽度</p>
          <p>当属性direct=hor，返回四个参数为oldHeight、oldHeight2（代表两栏原高度）和height1、height2（代表两栏当前高度）</p>
        </Prop>
      </Props>
      <h1>Panel</h1>
      <p>分栏面板</p>
      <Props>
        <Prop name="width" type="number">
          <p>左栏宽度，当容器属性direct=ver时有效</p>
        </Prop>
        <Prop name="height" type="number">
          <p>上栏高度，当容器属性direct=hor时有效</p>
        </Prop>
      </Props>
    </div>
    )
  }
})