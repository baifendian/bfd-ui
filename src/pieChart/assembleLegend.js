import d3 from 'd3'
import drawPie from './drawPie'
import assembleTooltip from './assembleTooltip'


export default env => {

  d3.select(env.container)
    .append('div')
    .attr('class', 'legend')
    .style('position', 'absolute')
    .style('left','80%')    
    .selectAll('div')
    .data(env.config.data)
    .enter()
    .append('div')
    .style('cursor', 'pointer')
    .style('display','block')
    .on('click', function(d, i) {

      let node = d3.select(this);

      let isDisabled = node.classed('disabled');

      node.classed('disabled', !isDisabled);

      //update env.config.data
      isDisabled ? env.config.data.push(d) :
        env.config.data = (function() {
          var arr = [];
          (env.config.data).map((_d, _i) => {
            if (_d.name !== d.name && _d.value !== d.value) {
              arr.push(_d);
            }
          });
          return arr;
        })();

      //clear pie
      env.svg.select('.slices').selectAll('path').remove();
      env.svg.select('.labels').selectAll('text').remove();
      env.svg.select('.lines').selectAll('polyline').remove();
      //draw pie repeat
      drawPie(env);
      //add tooltip
      assembleTooltip(env);

    })
    .each(function(d, i) {
      let node = d3.select(this);
      node.append('span')
        .attr('class', 'legend-rect')
        .style('background-color', d.color);
      node.append('span').text(d.name);
    });
}