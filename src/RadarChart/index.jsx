import React from "react"
import RadarChart from "./main"
import Chart from '../chart'
import "./main.less"

export default React.createClass({
  render() {
    return <Chart type={RadarChart} className="bfd-radar-chart" {...this.props} />
  }
})
