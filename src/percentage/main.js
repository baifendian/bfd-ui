import './main.css'
import d3 from 'd3'

export default class {

  constructor(config) {  

    const padding = [20, 20, 30, 40];
    
    const env = config;
  
    env.container.style.position = 'relative';
    env.width = env.container.clientWidth;
    env.height = (env.container.clientHeight || env.container.clientWidth);    
    env.radius = Math.min(env.width, env.height) / 2 - padding[3] - padding[1]
    if (!env.config.data) return;
    if (env.config.data > 100){
      env.config.data = 100
    }
    const svg = d3.select(env.container).append('svg')
      .attr('width',env.width)
      .attr('height',env.height)
      .attr('transform',"translate(" + (env.width/2) + "," + (env.height/2) + ")")

    const circle1 = svg.append('circle')
      .attr('r',env.radius)
      .attr('fill','none')
      .attr('stroke',env.config.outterColor)
      .attr('stroke-width',10)
      .attr('cx',env.width/2)
      .attr('cy',env.height/2)


    const circle2 = svg.append('circle')
      .attr('r',env.radius)
      .attr('fill','none')
      .attr('stroke',env.config.innerColor)
      .attr('stroke-width',10)
      .attr('cx',env.width/2)
      .attr('cy',env.height/2)
      .attr('stroke-dasharray',Math.PI*env.radius*2)
      .attr('stroke-dashoffset',Math.PI*env.radius*2)
      .transition()
      .duration(1000)
      .attr('stroke-dashoffset',Math.PI*env.radius*2 * (1-(env.config.data/100)));

    const text = svg.append('text')
      .text(0 + "%")
      .style('font-size',36)
      .attr('fill',env.config.textColor)
      .attr('x',env.width/2 - 35)
      .attr('y',env.height/2 + 15)
      .transition()
      .duration(1000)
      .tween('text',function(d){
        var i = d3.interpolateRound(0, env.config.data);
        return function(t) {
            this.textContent = i(t) + '%';
        };
      })
 
  }
}