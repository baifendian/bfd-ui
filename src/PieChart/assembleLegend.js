import d3 from 'd3'
import repeatPie from './pie'
import assembleTooltip from './assembleTooltip'


export default env => {

  const legend = {
    layout: 'vertical',
    align: 'right',
    style: {
      x: 0,
      y: 0
    }
  }
  Object.assign(legend, env.config.legend)

  const dom = d3.select(env.container)
    .append('div')
    .attr('class', 'legend pie-legend')
    .style('position', 'absolute')
    .selectAll('div')
    .data(env.config.data)
    .enter()
    .append('div')
    .style('cursor', 'pointer')
    .style('display', 'block')

  switch (legend.align) {
  case 'left':
    d3.select(env.container)
      .select('.legend')
      .style({
        left: legend.style.x + 'px' || '0px',
        top: legend.style.y + 'px' || '0px'
      })
    break
  case 'right':
    d3.select(env.container)
      .select('.legend')
      .style({
        left: legend.style.x + env.width + 'px' || env.width,
        top: legend.style.y + 'px' || '0px'
      })
    break
  case 'top':
    d3.select(env.container)
      .select('.legend')
      .style({
        left: legend.style.x + 'px' || '0px',
        top: legend.style.y + 'px' || '0px'
      })
    if (legend.layout == 'horizontal') {
      d3.select(env.container)
        .selectAll('div')
        .style({
          display: 'inline-block'
        })
    }
    break
  case 'bottom':
    d3.select(env.container)
      .select('.legend')
      .style({
        left: legend.style.x + 'px' || '0px',
        top: legend.style.y + env.height + 'px' || '0px'
      })
    if (legend.layout == 'horizontal') {
      d3.select(env.container)
        .selectAll('div')
        .style({
          display: 'inline-block'
        })
    }
    break
  default:
    break
  }

  dom.on('click', function(d) {

    const node = d3.select(this)

    const isDisabled = node.classed('disabled')

    node.classed('disabled', !isDisabled)

    // update env.config.data
    isDisabled ? env.config.dataLegend.push(d) :
      env.config.dataLegend = (function() {
        const arr = [];
        (env.config.dataLegend).map((_d) => {
          if (_d.id !== d.id) {
            arr.push(_d)
          }
        })
        return arr
      })()

    // clear pie/tooltip
    env.svg.select('.pie-slices').selectAll('path').remove()
    env.svg.select('.pie-labels').selectAll('text').remove()
    env.svg.select('.pie-lines').selectAll('polyline').remove()

    // draw pie repeat
    repeatPie(env, false)

    assembleTooltip(env, false)
  })
  .each(function(d) {
    const node = d3.select(this)
    node.append('span')
      .attr('class', 'legend-rect')
      .style('background-color', d.color)
    node.append('span').text(d.name)
  })
}