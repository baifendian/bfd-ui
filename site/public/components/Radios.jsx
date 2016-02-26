import React from 'react'
import { render } from 'react-dom'
import { Radios, Radio } from 'c/Radios/index.jsx'

const App = React.createClass({

  getInitialState() {
    return {
      value: 'mi'
    }
  },

  handleChange(e) {
    this.setState({value: e.target.value})
  },

  render() {
    return (
      <Radios value={this.state.value} onChange={this.handleChange}>
        <Radio value="apple">苹果</Radio>
        <Radio value="mi">小米</Radio>
      </Radios>
    )
  }
})

export default () => {
  render(<App/>, document.getElementById('demo'))
}