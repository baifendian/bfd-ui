/**
 * RadarChart based on d3.js
 */
import './main.css'
import d3 from 'd3'
import radarChart from './radarChart'

export default class {

  constructor(config = {}) {

    const padding = [20, 20, 30, 40];
    const mycfg = {
      w:0,
      h:0,
      maxValue:0.6,
      levels:6,
    };

    const env = {
      config
    };

    env.container = config.container;
    env.container.style.position = 'relative';
    mycfg.w = env.width = env.container.clientWidth - padding[3] - padding[1];
    mycfg.h = env.height = (env.container.clientHeight || env.container.clientWidth) - padding[0] - padding[2];

    if (!env.config.data) return;
    console.log(mycfg);
    //get color of category20
    const colorscale = d3.scale.category20();
    radarChart.draw(env.container, env.config.data, mycfg);
    let svg = d3.select(env.container).selectAll("svg")
      .append("svg")
      .attr('width',env.width+300)
      .attr('height',env.height);
    let legend = svg.append("g")
    	.attr("class", "legend")
    	.attr("height", 100)
    	.attr("width", 200)
    	.attr('transform', 'translate(90,20)')
    	;
        console.log("s");
	//Create colour squares
	legend.selectAll('rect')
	  .data(env.config.titles)
	  .enter()
	  .append("rect")
	  .attr("x", env.width - 65)
	  .attr("y", function(d, i){ return i * 20;})
	  .attr("width", 10)
	  .attr("height", 10)
	  .style("fill", function(d, i){ return colorscale(i);})
	  ;

	//Create text next to squares
	legend.selectAll('text')
	  .data(env.config.titles)
	  .enter()
	  .append("text")
	  .attr("x", env.width  - 52)
	  .attr("y", function(d, i){ return i * 20 + 9;})
	  .attr("font-size", "11px")
	  .attr("fill", "#737373")
	  .text(function(d) { return d; })
	  ;
  }
}
