/**
 * @title 左右分栏
 */
import { Component } from 'react'
import { SplitPanel, SubSplitPanel } from 'bfd/SplitPanel'

class SplitPanelVer extends Component {

  render() {
    return (
      <SplitPanel direct="ver" onSplit={::this.handleSplit} style={{border: '1px solid #000'}}>
        <SubSplitPanel width={200}>
          <p>你好</p>
          <p>世界</p>
        </SubSplitPanel>
        <SubSplitPanel>
          <p>hello</p>
          <p>world</p>
        </SubSplitPanel>
      </SplitPanel> 
    )
  }

  handleSplit(oldWidth1, oldWidth2, width1, width2) {
    console.log(oldWidth1, oldWidth2, width1, width2)
  }
}

/**
 * @title 上下分栏
 */
import { Component } from 'react'
import { SplitPanel, SubSplitPanel } from 'bfd/SplitPanel'

class SplitPanelHor extends Component {

  render() {
    return (
      <SplitPanel direct="hor" onSplit={::this.handleSplit} style={{border: '1px solid #000', height: '150px'}}>
        <SubSplitPanel>
          <p>你好</p>
          <p>世界</p>
        </SubSplitPanel>
        <SubSplitPanel>
          <p>hello</p>
          <p>world</p>
        </SubSplitPanel>
      </SplitPanel> 
    )
  }

  handleSplit(oldHeight1, oldHeight2, height1, height2) {
    console.log(oldHeight1, oldHeight2, height1, height2)
  }
}

@component SplitPanel