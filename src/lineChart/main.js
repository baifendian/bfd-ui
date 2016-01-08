/**
 * Line chart based on d3.js
 */
import './main.css'
import d3 from 'd3'
import dataConverter from './dataConverter'
import getSeriesDomainManager from './getSeriesDomainManager'
import setYAxisDomain from './setYAxisDomain'
import assembleAxes from './assembleAxes'
import assembleAnimation from './assembleAnimation'
import getPathBuilder from './getPathBuilder'
import assembleMain from './assembleMain'
import assembleTooltip from './assembleTooltip'
import assembleLegend from './assembleLegend'

export default class {

  constructor(config = {}) {

    if (typeof config.cols !== 'object') throw new Error('config.cols is required as object.')

    const padding = [20, 20, 30, 40]

    const env = {
      config
    }
    console.log(env)
    env.container = config.container
    env.container.style.position = 'relative'

    env.width = env.container.clientWidth - padding[3] - padding[1]
    env.height = (env.container.clientHeight || env.width * .5) - padding[0] - padding[2]

    env.xAxisPaddingScale = 0.2

    env.svg = d3.select(env.container)
      .html('')
      .append('svg')
      .attr('class', 'bcharts')
      .attr('width', env.width + padding[3] + padding[1])
      .attr('height', env.height + padding[0] + padding[2])
      .append('g')
      .attr('transform', 'translate(' + padding[3] + ', ' + padding[0] + ')')

    if (!env.config.data) return

    Object.assign(env, dataConverter(env.config))

    env.xScale = d3.scale.ordinal()
      .rangePoints([0, env.width], env.xAxisPaddingScale)
      .domain(env.categories)

    env.yScale = d3.scale.linear()
      .range([env.height, 0])
      .nice()

    env.seriesDomainManager = getSeriesDomainManager(env.series)
    setYAxisDomain(env)

    Object.assign(env, assembleAxes(env))

    assembleAnimation(env)

    env.pathBuilder = getPathBuilder(env)

    assembleMain(env)

    env.actives = Array(env.series.length + 1).join(1).split('')

    if (!config.tooltip || config.tooltip.enabled !== false) {
      assembleTooltip(env)
    }

    assembleLegend(env)
  }
}