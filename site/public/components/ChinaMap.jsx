import React from 'react'
import { render } from 'react-dom'
import ChinaMap from 'c/chinaMap/index.jsx'

export default React.createClass({

  getInitialState() {
    return {
      post: window.post
    }
  },
  
  componentDidMount() {
    // const data = [{
    //   x: 234,
    //   y: 55,
    //   name: 'test'
    // }, {
    //   x: 499,
    //   y: 122,
    // }, {
    //   x: 1067,
    //   y: 500,
    //   name: 'test2'
    // }, {
    //   x: 500,
    //   y: 800,
    // }, {
    //   x: 340,
    //   y: 201,
    // }]
    render(<ChinaMap/>, document.getElementById('demo'))
  },

  render() {
    return <div className="markdown" dangerouslySetInnerHTML={{__html: this.state.post}}></div>
  }
})