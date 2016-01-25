import d3 from 'd3'

export default (env,flag) => {

  const _config = {
    radius: {
      inner: 0.75
    },
    animation: {
      pie: 2500,
      lineText: 500
    }
  };

  Object.assign(_config, env.config);

  const initialAnimDelay = 100;
  const arcAnimDelay = 120;
  const arcAnimDur = _config.animation.pie;
  const arcAnimLineText = _config.animation.lineText;
  const width = env.width;
  const height = env.height;
  const radius = Math.min(width, height) / 2;


  // for drawing slices
  var arc = d3.svg.arc()
    .outerRadius(0.6 * radius)
    .innerRadius(0.6 * _config.radius.inner * radius);

  // for labels and polylines  设置label和line的位置。
  var outerArc = d3.svg.arc()
    .innerRadius(0.5 * radius)
    .outerRadius(0.85 * radius);

  var pie = d3.layout.pie()
    .value(function(d) {
      return d.value;
    });

  /*
   *填充颜色并画圆弧，并设置动画效果。
   */
  // define slice 绑定数据
  var slice = env.svg.select('.pie-slices')
    .datum(flag ? _config.data : _config.dataLegend)
    .selectAll('path')
    .data(pie);
  slice
    .enter().append('path')
    .attr('fill', function(d, i) {
      return d.data.color;
    })
    .attr('d', function(d) {
      return arc(d);
    })
    .attr('transform', function(d, i) {
      return 'rotate(-180, 0, 0)';
    })
    .style('opacity', 0)
    .transition()
    .delay(function(d, i) {
      return (i * arcAnimDelay) + initialAnimDelay;
    })
    .duration(arcAnimDur)
    .ease('elastic')
    .style('opacity', 1)
    .attr('transform', 'rotate(0,0,0)');

  //设置text 
  var text = env.svg.select('.pie-labels').selectAll('text')
    .data(pie(flag ? _config.data : _config.dataLegend));
  text.enter()
    .append('text')
    .attr('dy', '0.35em')
    .style('opacity', 0)
    .style('fill', function(d, i) {
      return d.data.color;
    })
    .text(function(d, i) {
      return d.data.name;
    })
    .attr('transform', function(d) {
      // calculate outerArc centroid for 'this' slice
      var pos = outerArc.centroid(d);
      // define left and right alignment of text labels      
      pos[0] += (midAngle(d) < Math.PI ? 20 : -20);
      pos[1] -= (midAngle(d) < Math.PI ? -12 : 12);
      return 'translate(' + pos + ')';
    })
    .style('text-anchor', function(d) {
      return midAngle(d) < Math.PI ? 'start' : 'end';
    })
    .transition()
    .delay(function(d, i) {
      return arcAnimLineText + (i * 250);
    })
    .duration(1000)
    .style('opacity', 1);

  function midAngle(d) {
    return d.startAngle + (d.endAngle - d.startAngle) / 2;
  }

  //设置线条
  var polyline = env.svg.select('.pie-lines').selectAll('polyline')
    .data(pie(flag ? _config.data : _config.dataLegend));
  polyline.enter()
    .append('polyline')
    .style('opacity', 0)
    .attr('points', function(d) {
      return [arc.centroid(d), arc.centroid(d), arc.centroid(d)];
    })
    .transition()
    .delay(function(d, i) {
      return i * 250;
    })
    .duration(1000)
    .delay(function(d, i) {
      return arcAnimLineText + (i * 250);
    })
    .attr('points', function(d) {
      var pos = outerArc.centroid(d);
      pos[0] += (midAngle(d) < Math.PI ? 60 : -60);
      return [arc.centroid(d), outerArc.centroid(d), pos];
    })
    .style('opacity', 0.4);

}