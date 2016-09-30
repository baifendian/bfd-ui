/**
 * Copyright 2016-present, Baifendian, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import d3 from 'd3'

export default (env, flag) => {

  const _config = {
    radius: {
      inner: 0.75
    },
    animation: {
      pie: 2500,
      lineText: 500
    }
  }

  Object.assign(_config, env.config)

  const initialAnimDelay = 100
  const arcAnimDelay = 120
  const arcAnimDur = _config.animation.pie
  const arcAnimLineText = _config.animation.lineText
  const width = env.width
  const height = env.height
  const radius = Math.min(width, height) / 2
  const arcs = []

  // for drawing slices
  const arcOut = d3.svg.arc()
    .outerRadius(0.6 * radius + 4)
    .innerRadius(0.6 * _config.radius.inner * radius - 4)
  arcs.push(arcOut)

  const arc = d3.svg.arc()
    .outerRadius(0.6 * radius)
    .innerRadius(0.6 * _config.radius.inner * radius)
  arcs.push(arc)

  const arc2 = d3.svg.arc()
    .outerRadius(0.6 * _config.radius.inner * radius - 8)
    .innerRadius(0.6 * _config.radius.inner * radius - 12)
  arcs.push(arc2)

  // for labels and polylines  设置label和line的位置。
  const outerArc = d3.svg.arc()
    .innerRadius(0.5 * radius)
    .outerRadius(0.9 * radius)

  const pie = d3.layout.pie()
    .value(function(d) {
      return d.value
    })

  /*
   *填充颜色并画圆弧，并设置动画效果。
   */
  // define slice 绑定数据
  const slice = env.svg.select('.pie-slices')
    .datum(flag ? _config.data : _config.dataLegend)
    .selectAll('path')
    .data(pie)

  for (let i = 0; i < arcs.length; i++) {

    slice
      .enter().append('path')
      .attr('fill', function(d) {
        return d.data.color
      })
      .attr('d', function(d) {
        return arcs[i](d)
      })
      .attr('transform', function() {
        return 'rotate(-180, 0, 0)'
      })
      .style('opacity', 0)
      .transition()
      .delay(function(d, i) {
        return (i * arcAnimDelay) + initialAnimDelay
      })
      .duration(arcAnimDur)
      .ease('elastic')
      .style('opacity', 1.0)
      .attr('transform', 'rotate(0,0,0)')

    if (i === 0) {
      slice.style('display', 'none')
        .attr('class', 'bfd-pie-lg')
    }
    if (i === 1) {
      slice.attr('class', 'bfd-pie-md')
    }
    if (i === 2) {
      slice.style('display', 'none')
        .attr('class', 'bfd-pie-flag')
    }
  }

  // 如果饼图的宽度太小就不显示text和line。
  if (env.width < 500) return

  // 设置text 
  let totalCount = 0
  let countText = 0
  const text = env.svg.select('.pie-labels').selectAll('text')
    .data(pie(flag ? _config.data : _config.dataLegend))
  text.enter()
    .append('text')
    .attr('dy', '0.35em')
    .style('opacity', 0)
    .style('fill', function(d) {
      return d.data.color
    })
    .text(function(d) {
      const percent = Number(d.value) / d3.sum(flag ? _config.data : _config.dataLegend, function(d) {
        return d.value
      }) * 100
      if (percent < 4) {
        totalCount++
      }
      return d.data.name + ':' + percent.toFixed(0) + '%'
    })
    .attr('transform', function(d) {
      const percent = Number(d.value) / d3.sum(flag ? _config.data : _config.dataLegend, function(d) {
        return d.value
      }) * 100
      if (percent < 4) {
        const midCount = Math.floor(totalCount / 2)
        countText = countText + 1
        if (countText <= midCount) {
          const posText = outerArc.centroid(d)
          posText[1] -= (midAngle(d) < Math.PI ? -20 * countText : 20 * countText)
          return 'translate(' + posText + ')'
        } else {
          const num = countText - midCount
          const posText = outerArc.centroid(d)
          posText[0] += 80
          posText[1] -= (midAngle(d) < Math.PI ? -20 * num : 20 * num)
          return 'translate(' + posText + ')'
        }
      } else {
        const pos = outerArc.centroid(d)
        pos[1] -= (midAngle(d) < Math.PI ? -12 : 12)
        return 'translate(' + pos + ')'
      }

    })
    .style('text-anchor', function(d) {
      return midAngle(d) < Math.PI ? 'start' : 'end'
    })
    .transition()
    .delay(function(d, i) {
      return arcAnimLineText + (i * 250)
    })
    .duration(1000)
    .style('opacity', 0.8)

  // 设置线条
  let countLine = 0
  const polyline = env.svg.select('.pie-lines').selectAll('polyline')
    .data(pie(flag ? _config.data : _config.dataLegend))
  polyline.enter()
    .append('polyline')
    .style('opacity', 0)
    .attr('points', function(d) {
      return [arc.centroid(d), arc.centroid(d), arc.centroid(d)]
    })
    .transition()
    .delay(function(d, i) {
      return i * 250
    })
    .duration(1000)
    .delay(function(d, i) {
      return arcAnimLineText + (i * 250)
    })
    .attr('points', function(d) {
      const percent = Number(d.value) / d3.sum(flag ? _config.data : _config.dataLegend, function(d) {
        return d.value
      }) * 100
      if (percent < 4) {
        const midCount = Math.floor(totalCount / 2)
        countLine = countLine + 1
        if (countLine <= midCount) {
          const posLine = outerArc.centroid(d)
          posLine[0] -= (midAngle(d) < Math.PI ? 8 : -8)
          posLine[1] -= (midAngle(d) < Math.PI ? -20 * countLine : 20 * countLine)
          return [arc.centroid(d), posLine, [midAngle(d) < Math.PI ? posLine[0] + 6 : posLine[0] - 6, posLine[1]]]
        } else {
          const num = countLine - midCount
          const posLine = outerArc.centroid(d)
          posLine[0] -= (midAngle(d) < Math.PI ? 8 : -8)
          posLine[1] -= (midAngle(d) < Math.PI ? -20 * num : 20 * num)
          return [arc.centroid(d), posLine, [midAngle(d) < Math.PI ? posLine[0] - 6 : posLine[0] + 6, posLine[1]]]
        }
      } else {
        const pos = outerArc.centroid(d)
        pos[0] += (midAngle(d) < Math.PI ? 60 : -60)
        return [arc.centroid(d), outerArc.centroid(d), pos]
      }
    })
    .style('stroke', function(d) {
      return d.data.color
    })
    .style('opacity', 1.0)


  function midAngle(d) {
    return d.startAngle + (d.endAngle - d.startAngle) / 2
  }
}