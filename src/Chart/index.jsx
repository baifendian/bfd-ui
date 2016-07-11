import React, { PropTypes } from 'react'
import ReactDM from 'react-dom'
import Fetch from '../Fetch'
import classnames from 'classnames'
import warning from 'warning'
import './index.less'

const Chart = React.createClass({

  renderChart(props) {
    new this.props.type({
      container: this.container,
      ...props
    })
  },

  handleSuccess(data) {
    this.renderChart({
      ...this.props,
      data
    })
  },

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.data !== nextProps.data) {
      this.renderChart(nextProps)
      return false
    }
    return true  
  },

  componentDidMount() {
    this.container = ReactDM.findDOMNode(this)
    if (this.props.data) {
      this.renderChart(this.props)
    }
  },

  render() {
    const { className, url, type, ...other } = this.props
    return (
      <Fetch
        ref="container"
        className={classnames('bfd-chart', className)} 
        url={url} 
        onSuccess={this.handleSuccess} 
        { ...other }
      />
    )
  }
})

Chart.propTypes = {
  url: PropTypes.string,
  data: PropTypes.array,
  customProp({ url, data }) {
    if (!url && !data) {
      return new Error('No `url` or `data` property.')
    }
    if (url && data) {
      return new Error('`url` and `data` can\'t exist at the same time.')
    }
  }
}

export default Chart