import React from 'react'
import { render } from 'react-dom'
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
          <Loading url={this.state.url} onSuccess={this.handleSuccess} delay={1000}>
            <div>
              {this.state.data.map((item, i) => <p key={i}>{i + 1}: {item.event}</p>)}
            </div>
          </Loading>
        </div>
      </div>
    )
  }
})

export default () => {
  render(<App/>, document.getElementById('demo'))
}