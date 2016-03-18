import React, { PropTypes } from 'react'
import Percentage from './main'
import './main.less'

export default React.createClass({

  propTypes: {
    percent: PropTypes.number.isRequired
  },
  
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
    return <div ref="container" className="bfd-percentage"></div>
  }
})


