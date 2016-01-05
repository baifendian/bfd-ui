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
        x: 'x数s',
        y: 'y数',
        z: 'z数'
      },
      data: (() => {
        const len = 50
        const year = new Date().getFullYear() - len
        return Array.apply(null, Array(len)).map((v, i) => {
          return {
            date: year + i,
            x: Math.ceil(Math.random() * 300),
            y: Math.ceil(Math.random() * 100),
            z: Math.ceil(Math.random() * 50)
          }
        })
      })()
    }
    render(<LineChart config={config} />, document.getElementById('demo'))
  },

  render() {
    return <div dangerouslySetInnerHTML={{__html: this.state.post}}></div>
  }
})