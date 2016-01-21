import d3 from 'd3'

export default env => {

  //添加一个提示框
  const tooltip = d3.select(env.container)
    .append('div')
    .style({
      position: 'fixed',
      opacity: 0,
      'pointer-events': 'none'
    }).attr('class', 'bcharts-tooltip');

  env.svg.select('.pie-slices').selectAll('path').on('mouseover', function(d) {   

      //计算份额的百分比
      let percent = Number(d.value) / d3.sum(env.config.data, function(d) {
        return d.value;
      }) * 100;

      tooltip.html(env.config.name + '<br/>' + d.data.name + ':' + d.data.value + '(' + percent.toFixed(1) + '%)')
        .style('left', (d3.event.pageX) + 'px')
        .style('top', (d3.event.pageY + 20) + 'px')
        .style('opacity', 1.0);

    })
    .on('mousemove', function(d) {
      
      /* left 和 top 来改变提示框的位置 */
      tooltip.style('left', (d3.event.pageX) + 'px')
        .style('top', (d3.event.pageY + 20) + 'px');
      let node = d3.select(this);
      node.style('fill',env.config.hoverColor || '#000');
    })
    .on('mouseout', function(d) {
      tooltip.style('opacity', 0.0);
      let node = d3.select(this);
      node.style('fill', '');
    });
}