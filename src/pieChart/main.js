/**
 * pie chart based on d3.js
 */
import './main.css'
import d3 from 'd3'
import drawPie from './drawPie'
import assembleTooltip from './assembleTooltip'
import assembleLegend from './assembleLegend'

export default class {

  constructor(config) {  

    const padding = [20, 10, 30, 10];
    
    const env = config;
  
    env.container.style.position = 'relative';
    env.width = env.container.clientWidth - padding[3] - padding[1];
    env.height = (env.container.clientHeight || env.container.clientWidth) - padding[0] - padding[2];    
    
    if (!env.config.data) return;
  
    //get color of category10
    const colors = d3.scale.category10();

    //init color
    for (var i = 0; i < env.config.data.length; i++){
      env.config.data[i].color = colors(i);
      env.config.data[i].id = i;
    }

    env.config.dataLegend = [];
    for (var k in env.config.data) env.config.dataLegend.push(env.config.data[k]);
 
    //init legend
    assembleLegend(env);

    env.svg = d3.select(env.container)
      .append('svg')
      .attr('width', env.width)
      .attr('height', env.height)
      .append('g');

    env.svg.attr('transform', 'translate(' + (env.width / 2 + 10) + ',' + (env.width / 2) + ')');

    //添加3个g标签，分别是 pie-lines pie-slices pie-labels
    env.svg.append('g')
      .attr('class', 'pie-lines');
    env.svg.append('g')
      .attr('class', 'pie-slices');
    env.svg.append('g')
      .attr('class', 'pie-labels');

    //init pie
    drawPie(env,true);    
    //init tooltip
    if (!env.config.tooltip || env.config.tooltip.enabled !== false) {
      assembleTooltip(env,true);
    }

  }
}