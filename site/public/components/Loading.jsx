import React from 'react'
import { render } from 'react-dom'
import Pre from '../Pre'
import { Props, Prop } from '../Props'
import Loading from 'c/Loading'

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
          <Loading url={this.state.url} onSuccess={this.handleSuccess} delay={1000}></Loading>
          {this.state.data.map((item, i) => <p key={i}>{i + 1}: {item.event}</p>)}
        </div>
      </div>
    )
  }
})

// export default () => {
//   render(<App/>, document.getElementById('demo'))
// }

export default React.createClass({
  render() {
    return (
      <div>
        <h1>AJAX加载管理</h1>
        <Pre>
{`import Loading from 'bfd-ui/lib/Loading'

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
              <Loading url={this.state.url} onSuccess={this.handleSuccess}></Loading>
              {this.state.data.map((item, i) => <p key={i}>{i + 1}: {item.event}</p>)}
            </div>
          </div>
        )
      }
    })

const App = React.createClass({
  render() {
    return <App/>
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