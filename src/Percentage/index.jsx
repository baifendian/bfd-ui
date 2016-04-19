import React, { PropTypes } from 'react'
import PercentageChart from './main'
import classnames from 'classnames'
import './main.less'

const propTypes = {
  percent: PropTypes.number.isRequired,
  foreColor: PropTypes.string,
  backColor: PropTypes.string,
  textColor: PropTypes.string,
  customProp({ percent }) {
    if (percent < 0 || percent > 100) {
      return new Error('percent 必须为 0 到 100 之间的数字')
    }
  }
}

const Percentage = React.createClass({
  
  renderChart() {
    const config = {container: this.refs.container, ...this.props}  
    new PercentageChart(config)
  },

  componentDidMount() {
    this.renderChart()
  },

  shouldComponentUpdate(nextProps) {
    if (this.props.percent !== nextProps.percent) {
      this.renderChart()
    }
    return true
  },

  render() {
    const { className, ...other } = this.props
    return <div ref="container" className={classnames('bfd-percentage', className)} {...other}></div>
  }
})

Percentage.propTypes = propTypes

export default Percentage