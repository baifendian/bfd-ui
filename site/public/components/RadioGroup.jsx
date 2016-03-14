import React from 'react'
import { render } from 'react-dom'
import Pre from '../Pre.jsx'
import { Props, Prop } from '../Props.jsx'
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

// export default () => {
//   render(<App/>, document.getElementById('demo'))
// }

export default React.createClass({
  render() {
    return (
      <div>
        <h1>单选框</h1>
        <Pre>
{`import { RadioGroup, Radio } from 'c/RadioGroup/index.jsx'

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


const App = React.createClass({
  render() {
    return <App/>
  }
})`}
        </Pre>

        <App/>
        
        <Props>
          <Prop name="value" type="String" desc="选中的值，如果该值与 Radio 的值相同，则该 Radio 为选中状态"></Prop>
          <Prop name="onChange" type="Function" desc="选择后的回调"></Prop>
          <Prop name="value" type="String" desc="Radio 值"></Prop>
        </Props>
      </div>
    )
  }
})