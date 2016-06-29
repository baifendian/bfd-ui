import React from 'react'
import Pre from '../Pre'
import { Props, Prop } from '../Props'
import { Steps, Step } from 'c/Steps'

const code = `import { Steps, Step } from 'bfd-ui/lib/Steps'

const App = React.createClass({
  getInitialState() {
    return {
      current: 0
    }
  },
  handleClick(e) {
    let value = this.state.current + 1
    if(value == 5) {
      value = 0;
    }
    this.setState({
      current: value
    })
  },
  handleStepClick(index, title) {
    console.log("step:", index, title)
  },
  render() {
    return 
      <Steps onStepClick={this.handleStepClick} height={70} current={this.state.current}>
        <Step title="配置推荐栏" />
        <Step title="配置推荐策略" />
        <Step title="配置算法" />
        <Step title="配置规则" />
        <Step title="配置样式" />
      </Steps>
      <button type="button" className="btn btn-primary" onClick={this.handleClick}>下一步</button>
  }
})`

export default React.createClass({
  getInitialState() {
    return {
      current: 0
    }
  },
  handleClick(e) {
    let value = this.state.current + 1
    if(value == 5) {
      value = 0;
    }
    this.setState({
      current: value
    })
  },
  handleStepClick(index, title) {
    console.log("step:", index, title)
  },
  render() {
    const arr = [{name:"step1"}, {name:"step2"}];
    return (
      <div>
        <h1>步骤条 @tenglong.jiang</h1>
        <Pre>{code}</Pre>
        
        <Steps onStepClick={this.handleStepClick} height={70} current={this.state.current} >
          <Step title="配置推荐栏" />
          <Step title="配置推荐策略" />
          <Step title="配置算法" />
          <Step title="配置规则" />
          <Step title="配置样式" />
        </Steps>
        <p className="text-right" style={{marginTop:'30px', marginRight:'30px'}}>
          <button type="button" className="btn btn-primary" onClick={this.handleClick}>下一步</button>
        </p>
        <h1>Steps</h1>
        <p>整体步骤条。</p>
        <Props>
          <Prop name="height" type="Number" optional>
            <p>步骤条高度</p>
            <p>如果不给出高度，组件高度默认100%</p>
          </Prop>
          <Prop name="current" type="Number" required>
            <p>指定当前步骤，从 0 开始记数</p>
          </Prop>
          <Prop name="onStepClick" type="Function" required>
            <p>点击事件，参数返回索引值和名称</p>
          </Prop>
        </Props>
        <h1>Step</h1>
        <p>步骤条内的每一个步骤。</p>
        <Props>
          <Prop name="title" type="String" optional>
            <p>标题</p>
            <p>如果不给出标题，默认为空</p>
          </Prop>
        </Props>
      </div>
    )
  }
})