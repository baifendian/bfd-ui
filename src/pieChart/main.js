/**
 * pie chart based on d3.js
 */
import './main.css'
import d3 from 'd3'
import drawPie from './drawPie'
import assembleTooltip from './assembleTooltip'
import assembleLegend from './assembleLegend'

export default class {

  constructor(config = {}) {

    const padding = [20, 20, 30, 40];

    const env = {
      config
    };

    env.container = config.container;
    env.container.style.position = 'relative';
    env.width = env.container.clientWidth - padding[3] - padding[1];
    env.height = (env.container.clientHeight || env.container.clientWidth) - padding[0] - padding[2];

    if (!env.config.data) return;

    //get color of category20
    const colors = d3.scale.category20();

    //init color
    for (var i = 0; i < env.config.data.length; i++)
      env.config.data[i].color = colors(i);

    //init legend
    assembleLegend(env);

    env.svg = d3.select(env.container)
      .append('svg')
      .attr('width', env.width)
      .attr('height', env.height)
      .append('g');

    env.svg.attr('transform', 'translate(' + (env.width / 2) + ',' + (env.width / 2) + ')');

    //添加3个g标签，分别是 lines slices labels。
    env.svg.append('g')
      .attr('class', 'lines');
    env.svg.append('g')
      .attr('class', 'slices');
    env.svg.append('g')
      .attr('class', 'labels');

    //init pie
    drawPie(env);

    //init tooltip
    if (!config.tooltip || config.tooltip.enabled !== false) {
      assembleTooltip(env);
    }

  }
}