import React from 'react'
import Percentage from './main'

export default React.createClass({
  
  renderChart() {  
    const config = {container: this.refs.container, ...this.props}  
    new Percentage(config)
  },

  componentDidMount() {
    this.renderChart()
  },

  shouldComponentUpdate(nextProps) {
    if (this.props.data !== nextProps.data) {
      this.renderChart()
    }
    return true
  },

  render() {
    return <div ref="container" style={{width:'400px',background:'#81d4fa'}} id="test"></div>
  }
})


