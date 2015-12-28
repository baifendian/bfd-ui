import d3 from 'd3'
import setYAxisDomain from './setYAxisDomain'
import defaultColors from '../colors'

export default env => {

  const colors = env.config.colors || defaultColors
 
  d3.select(env.container)
    .append('div')
    .attr('class', 'legend')
    .style('position', 'absolute')
    .selectAll('div')
    .data(env.series)
    .enter()
    .append('div')
    .style('cursor', 'pointer')
    .on('click', function(d, i) {

      let node = d3.select(this)
      let isDisabled = node.classed('disabled')

      if (!isDisabled && env.actives.filter(v => !!v).length === 1) return

      node.classed('disabled', !isDisabled)

      env.seriesDomainManager[isDisabled ? 'add' : 'remove'](i)
      setYAxisDomain(env)

      let serieGroups = env.svg.selectAll('.serie-group')
      serieGroups.filter('.serie-group-' + i).style('display', isDisabled ? 'block' : 'none')
      env.actives[i] = isDisabled

      env.svg.select('.axis-y').transition().duration(500).call(env.yAxis)

      serieGroups.each(function(d, i) {
        if (!env.actives[i]) return
        let el = d3.select(this).transition().duration(500)
        el.select('path.line').attr('d', env.pathBuilder('line', i))
        el.select('path.area').attr('d', env.pathBuilder('area', i))
        el.selectAll('circle.marker')
          .attr('cy', d => env.yScale(d[env.series[i].key]))
      })
    })
    .each(function(d, i) {
      let node = d3.select(this)
      
      node.append('span')
        .attr('class', 'legend-rect')
        .style('background-color', colors[i])

      node.append('span').text(d.name)
    })
}