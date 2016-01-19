import React from 'react'
import { render } from 'react-dom'
import BubbleChart from 'c/bubbleChart/index.jsx'

export default React.createClass({

  getInitialState() {
    return {
      post: window.post
    }
  },
  
  componentDidMount() {
    const data = [{
      x: 234,
      y: 55,
      name: 'test'
    }, {
      x: 499,
      y: 122,
    }, {
      x: 1067,
      y: 500,
      name: 'test2'
    }, {
      x: 500,
      y: 800,
    }, {
      x: 340,
      y: 201,
    }]
    render(<BubbleChart radiusMaker="x" content={d => d.name} color="#dce775" data={data} />, document.getElementById('demo'))
  },

  render() {
    return <div className="markdown" dangerouslySetInnerHTML={{__html: this.state.post}}></div>
  }
})