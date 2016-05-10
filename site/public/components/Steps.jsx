import React from 'react'
import Pre from '../Pre'
import { Props, Prop } from '../Props'
import { Steps, Step } from 'c/Steps'

const code = `import Steps from 'bfd-ui/lib/Steps'

const App = React.createClass({
  render() {
    return 
      <Steps height={100} current={0}>
        <Step title="配置推荐栏" />
        <Step title="配置推荐策略" />
        <Step title="配置算法" />
        <Step title="配置规则" />
        <Step title="配置样式" />
      </Steps>
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
    if(value >= 5) {
      value = 0;
    }
    this.setState({
      current: value
    })
  },
  render() {
    return (
      <div>
        <h1>步骤条</h1>
        <Pre>{code}</Pre>
        
        <Steps height={100} current={this.state.current} >
          <Step title="配置推荐栏" />
          <Step title="配置推荐策略" />
          <Step title="配置算法" />
          <Step title="配置规则" />
          <Step title="配置样式" />
        </Steps>
        <div style={{marginTop:'30px', marginRight:'30px', textAlign:'right'}}>
      
          <button style={{width:'80px', height:'30px'}} onClick={this.handleClick}>下一步</button>
    
        </div>
        <h1>Steps</h1>
        <p>整体步骤条。</p>
        <Props>
          <Prop name="height" type="Number" required>
            <p>步骤条高度</p>
          </Prop>
          <Prop name="current" type="Number" required>
            <p>指定当前步骤，从 0 开始记数</p>
          </Prop>
        </Props>
        <h1>Steps.Step</h1>
        <p>步骤条内的每一个步骤。</p>
        <Props>
          <Prop name="title" type="String" required>
            <p>标题</p>
          </Prop>
        </Props>
      </div>
    )
  }
})