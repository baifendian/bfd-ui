import React, { Component } from 'react'
import Fetch from 'bfd/Fetch'
import { Select, Option } from 'bfd/Select'
import Panel from 'public/Demo'
import Pre from 'public/Pre'
import { Props, Prop } from 'public/Props'

const code = `import Fetch from 'bfd-ui/lib/Fetch'

class App extends Component {

  constructor() {
    super()
    this.state = {
      url: '/data/loading.json',
      data: []
    }
  }

  handleChange(value) {
    this.setState({url: '/data/loading.json?type=' + value})
  }

  render() {
    return (
      <div>
        <Select defaultValue="0" onChange={this.handleChange.bind(this)}>
          <Option value="0">昨天</Option>
          <Option value="1">最近7天</Option>
          <Option value="2">最近30天</Option>
        </Select>
        <Fetch 
          style={{marginTop: '10px', minHeight: '100px'}} 
          url={this.state.url} 
          onSuccess={data => {this.setState({data})}}
        >
          {this.state.data.map((item, i) => <p key={i}>{i + 1}: {item.event}</p>)}
        </Fetch>
      </div>
    )
  }
}`

class App extends Component {

  constructor() {
    super()
    this.state = {
      url: '/data/loading.json',
      data: []
    }
  }

  handleChange(value) {
    this.setState({url: '/data/loading.json?type=' + value})
  }

  render() {
    return (
      <div>
        <Select defaultValue="0" onChange={this.handleChange.bind(this)}>
          <Option value="0">昨天</Option>
          <Option value="1">最近7天</Option>
          <Option value="2">最近30天</Option>
        </Select>
        <Fetch 
          style={{marginTop: '10px', minHeight: '100px'}} 
          url={this.state.url} 
          onSuccess={data => {this.setState({data})}}
          delay={500}
        >
          {this.state.data.map((item, i) => <p key={i}>{i + 1}: {item.event}</p>)}
        </Fetch>
      </div>
    )
  }
}

export default React.createClass({
  render() {
    return (
      <div>
        <h1>AJAX加载管理 @hai.jiang</h1>
        <p>动态请求数据渲染界面的场景非常多，渲染时也需要向用户反馈数据加载的状态，如加载中、加载失败、无数据等，使用本组件会自动帮您管理这些需求。</p>
        <p>bfd-ui 各个动态渲染的组件已内部集成，无需单独调用。</p>
        
        <Panel title="切换条件" code={code}>
          <App />
        </Panel>
        
        <Props>
          <Prop name="url" type="string">
            <p>请求地址</p>
          </Prop>
          <Prop name="onSuccess" type="function">
            <p>获取数据后的回调</p>
          </Prop>
        </Props>
      </div>
    )
  }
})