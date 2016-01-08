import React from 'react'
import { render } from 'react-dom'
import LineChart from 'c/lineChart/index.jsx'

export default React.createClass({

  getInitialState() {
    return {
      post: window.post
    }
  },
  
  componentDidMount() {
    var config = {
      category: 'date',
      cols: {
        x: 'x数',
        y: 'y数'
      },
      data: [{
        x: 234,
        y: 55,
        date: '01-01'
      }, {
        x: 499,
        y: 122,
        date: '01-02'
      }, {
        x: 1067,
        y: 500,
        date: '01-03'
      }, {
        x: 500,
        y: 800,
        date: '01-04'
      }, {
        x: 340,
        y: 201,
        date: '01-05'
      }]
    }
    render(<LineChart config={config} />, document.getElementById('demo'))
  },

  render() {
    return <div dangerouslySetInnerHTML={{__html: this.state.post}}></div>
  }
})