import React from 'react'
import { render } from 'react-dom'
import { RadioGroup, Radio } from 'c/RadioGroup/index.jsx'

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
      <RadioGroup value={this.state.value} onChange={this.handleChange}>
        <Radio value="apple">苹果</Radio>
        <Radio value="mi">小米</Radio>
      </RadioGroup>
    )
  }
})

export default () => {
  render(<App/>, document.getElementById('demo'))
}