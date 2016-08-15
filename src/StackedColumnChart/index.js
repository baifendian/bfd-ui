import React, { Component, PropTypes } from 'react'
import Chart from '../Chart'
import ColumnChart from './main'
import classnames from 'classnames'
import './main.less'

class chart extends Component {
  render() {
    const { className, ...other } = this.props
    return <Chart type={ColumnChart} className={classnames('bfd-column-chart', className)} {...other} />
  }
}

chart.propTypes = {

  // y轴字段配置
  cols: PropTypes.object.isRequired,

  // x轴字段名
  category: PropTypes.string.isRequired,

  // 数据源URL，data 格式要求数组，字段分别对应 cols 和 category
  url: PropTypes.string,

  // 数据源，格式与 url 方式返回的 data 格式一样
  data: PropTypes.array,

}

export default chart