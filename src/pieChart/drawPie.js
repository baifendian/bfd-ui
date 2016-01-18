import d3 from 'd3'

export default env => {

  const _config = {      
      radius:{     //设置饼图的半径比例大小。
        inner:0.45,
        outer:0.6
      },  
      lineLabel:{  //设置label和line的位置。
        inner:0.5,
        outer:0.75
      },    
      animation:{    //设置动画时间。
        pie:2500,    //加载饼图圆的时间。
        lineText:500 //加载线和标签文字的时间。
      }
    };

  Object.assign(_config, env.config);

  const initialAnimDelay = 100;
  const arcAnimDelay = 120;
  const arcAnimDur = _config.animation.pie;
  const arcAnimLineText = _config.animation.lineText;
  const width = env.width;
  const height = env.height;
  const minOfWH = Math.min(width, height) / 2;

  var radius;

  // calculate minimum of width and height to set chart radius
  if (minOfWH > 200) {
    radius = 200;
  } else {
    radius = minOfWH;
  }

  // for drawing slices
  var arc = d3.svg.arc()
    .outerRadius(_config.radius.outer*radius)
    .innerRadius(_config.radius.inner*radius);

  // for labels and polylines
  var outerArc = d3.svg.arc()
    .innerRadius(_config.lineLabel.inner*radius)
    .outerRadius(_config.lineLabel.outer*radius);

  var pie = d3.layout.pie()
    .value(function(d) {
      return d.value;
    });

  /*
   *填充颜色并画圆弧，并设置动画效果。
   */
  // define slice 绑定数据
  var slice = env.svg.select('.slices')
    .datum(_config.data)
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
  var text = env.svg.select('.labels').selectAll('text')
    .data(pie(_config.data));
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
      pos[0] = radius * (midAngle(d) < Math.PI ? 1 : -1) * 0.8;
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
  var polyline = env.svg.select('.lines').selectAll('polyline')
    .data(pie(_config.data));
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
      pos[0] = radius * 0.75 * (midAngle(d) < Math.PI ? 1 : -1);  
      return [arc.centroid(d), outerArc.centroid(d), pos];
    })
    .style('opacity', 0.4);

}