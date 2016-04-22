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

    const padding = [100, 60];
    const { container, data, name, animation, radius, tooltip, legend } = config;
    
    let env = {};
    env.container = container;
    env.config = {};
    env.config.data = data;
    env.config.name = name;
    env.config.legend = {
      layout: legend.layout || 'vertical',
      align: legend.align || 'right',
      style: {
        x: legend.style.x || 0,
        y: legend.style.y || 0
      }
    };
    if (animation) env.config.animation = animation;
    if (radius) env.config.radius = radius;
    if (tooltip) env.config.tooltip = tooltip;

    env.container.style.position = 'relative';

    env.config.legend.layout == 'vertical' ? env.width = env.container.clientWidth - padding[0] : env.width = env.container.clientWidth;
    env.height = (env.container.clientHeight || env.container.clientWidth);

    if (!env.config.data) return;

    //获取颜色。可以有4个色系选择。  
    const colors = config.colors || color(2, env.config.data.length);
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
      .append('g');


    if (env.config.legend.align == 'left') d3.select(env.container).select('svg').style('margin-left', padding[0] + 'px');
    if (env.config.legend.align == 'top') d3.select(env.container).select('svg').style('margin-top', padding[1] + 'px');
    if (env.config.legend.align == 'bottom') d3.select(env.container).select('svg').style('margin-bottom', padding[1] + 'px');

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

    window.onresize = function() {

      env.svg.select('.pie-slices').selectAll('path').remove();
      env.svg.select('.pie-labels').selectAll('text').remove();
      env.svg.select('.pie-lines').selectAll('polyline').remove();
      env.config.legend.layout == 'vertical' ? env.width = env.container.clientWidth - padding[0] : env.width = env.container.clientWidth;
      env.svg.attr('transform', 'translate(' + (env.width / 2 + 10) + ',' + (env.width / 2 + 10) + ')');

      d3.select(env.container)
        .select('svg')
        .attr('width', env.width)
        .attr('height', env.height);
      initPie(env, true);

    }

  }
}