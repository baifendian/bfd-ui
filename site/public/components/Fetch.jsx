import React from 'react'
import { render } from 'react-dom'
import Pre from '../Pre'
import { Props, Prop } from '../Props'
import Fetch from 'c/Fetch'

const App = React.createClass({

  getInitialState() {
    return {
      url: '/data/loading.json',
      data: []
    }
  },

  handleChange(e) {
    this.setState({url: '/data/loading.json?type=' + e.target.value})
  },

  handleSuccess(data) {
    this.setState({data})
  },

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <select onChange={this.handleChange}>
            <option value="0">昨天</option>
            <option value="1">最近7天</option>
            <option value="2">最近30天</option>
          </select>
        </div>
        <div className="panel-body">
          <Fetch style={{minHeight:100}} url={this.state.url} onSuccess={this.handleSuccess} delay={1000}>
            {this.state.data.map((item, i) => <p key={i}>{i + 1}: {item.event}</p>)}
          </Fetch>
        </div>
      </div>
    )
  }
})

export default React.createClass({
  render() {
    return (
      <div>
        <h1>AJAX加载管理</h1>
        <p>动态请求数据渲染界面的场景非常多，渲染时也需要向用户反馈数据加载的状态，如加载中、加载失败、无数据等，使用本组件会自动帮您管理这些需求。</p>
        <p>bfd-ui 各个动态渲染的组件已内部集成，无需单独调用。</p>
        <Pre>
{`import Fetch from 'bfd-ui/lib/Fetch'

const App = React.createClass({

  getInitialState() {
    return {
      url: '/data/loading.json',
      data: []
    }
  },

  handleChange(e) {
    this.setState({url: '/data/loading.json?type=' + e.target.value})
  },

  handleSuccess(data) {
    this.setState({data})
  },

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          <select onChange={this.handleChange}>
            <option value="0">昨天</option>
            <option value="1">最近7天</option>
            <option value="2">最近30天</option>
          </select>
        </div>
        <div className="panel-body">
          <Fetch style={{minHeight:100}} url={this.state.url} onSuccess={this.handleSuccess}>
            {this.state.data.map((item, i) => <p key={i}>{i + 1}: {item.event}</p>)}
          </Fetch>
        </div>
      </div>
    )
  }
})`}
        </Pre>

        <App/>
        
        <Props>
          <Prop name="url" type="String" desc="请求地址">
            <Pre>
{`{
  "code": 200,
  "message": "", // code 不是200时，给出错误信息
  "data": []
}`}
            </Pre>
          </Prop>
          <Prop name="onSuccess" type="Function" desc="获取数据后的回调"></Prop>
        </Props>
      </div>
    )
  }
})