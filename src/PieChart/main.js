/**
 * pie chart based on d3.js
 */
import './main.less'
import d3 from 'd3'
import initPie from './pie'
import assembleTooltip from './assembleTooltip'
import assembleLegend from './assembleLegend'
import color from './color'

export default class {

  constructor(config) {   

    const padding = [20, 100, 30, 10];
    
    const {
      container, data, name, animation, radius, tooltip
    } = config

    let env = {};
    env.container = container;
    env.config = {};
    env.config.data = data;
    env.config.name = name;
    if (animation) env.config.animation = animation;
    if (radius) env.config.radius = radius;
    if (tooltip) env.config.tooltip = tooltip;

    env.container.style.position = 'relative';
    env.width = env.container.clientWidth - padding[3] - padding[1];
    env.height = (env.container.clientHeight || env.container.clientWidth) - padding[0] - padding[2];

    if (!env.config.data) return;

    //获取颜色。可以有4个色系选择。  
    const colors = color(4,env.config.data.length);
    //init color
    for (var i = 0; i < env.config.data.length; i++) {
      env.config.data[i].color = colors[i];
      env.config.data[i].id = i;
    }

    env.config.dataLegend = [];
    for (var k in env.config.data) env.config.dataLegend.push(env.config.data[k]);

    env.svg = d3.select(env.container)
      .append('svg')
      .attr('width', env.width)
      .attr('height', env.height)
      .style('margin-top', '20px')
      .append('g');

    env.svg.attr('transform', 'translate(' + (env.width / 2 + 10) + ',' + (env.width / 2 + 10) + ')');

    //添加3个g标签，分别是 pie-lines pie-slices pie-labels
    env.svg.append('g')
      .attr('class', 'pie-lines');
    env.svg.append('g')
      .attr('class', 'pie-slices');
    env.svg.append('g')
      .attr('class', 'pie-labels');

    /*
     *init legend
     */
    assembleLegend(env);
    /*
     *init pie
     */
    initPie(env, true); 
    /*
     *init tooltip
     */
    if (!env.config.tooltip || env.config.tooltip.enabled !== false) {
      assembleTooltip(env, true);
    }

  }
}