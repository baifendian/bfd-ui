import './main.css'
import d3 from 'd3'
import defaultColors from '../colors'

export default class {

  constructor(config) {

    config.colors || (config.colors = defaultColors)

    const {container, data, colors} = config

    const cols = []
    const matrix = []
    const tickStep = data.reduce((previous, current) => previous + current.total, 0) / 100
    data.forEach(group => {
      cols.push(group.name)
    })

    data.forEach((group, i) => {
      const row = matrix[i] = []
      ;(group.relation || []).forEach(item => {
        row[cols.indexOf(item.target)] = item.value
      })
    })

    const len = matrix.length
    for (let i = len; i--; ) {
      const row = matrix[i]
      for (let j = len; j--; ) {
        if (i === j) continue
        if (row[j] === undefined) {
          row[j] = matrix[j][i] || 0
        }
      }
    }

    matrix.forEach((row, i) => {
      row[i] = data[i].total - row.reduce((a, b) => a + b, 0)
    })

    const width = container.clientWidth
    const height = container.clientHeight || width
    const innerRadius = Math.min(width, height) * .3
    const outerRadius = innerRadius * 1.1

    // const format = d3.format('s')
    // Returns an array of tick angles and labels, given a group.
    function groupTicks(d) {
      const k = (d.endAngle - d.startAngle) / d.value
      return d3.range(0, d.value, tickStep).map((v, i) => {
        return {
          angle: v * k + d.startAngle,
          label: i % 5 ? null : `${(v / 1000).toFixed(1)}k`
        }
      })
    }

    // Returns an event handler for fading a given chord group.
    function fade(opacity) {
      return (g, i) => {
        svg.selectAll('.chord path')
          .filter(d => d.source.index != i && d.target.index != i)
          .transition()
          .style('opacity', opacity)
      }
    }

    const chord = d3.layout.chord()
      .padding(.05)
      .sortSubgroups(d3.descending)
      .matrix(matrix)

    const svg = d3.select(container).append('svg')
      .attr('class', 'bcharts chordDiagram')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', `translate(${width / 2}, ${height / 2})`)

    svg.append('g').selectAll('path')
      .data(chord.groups)
      .enter().append('path')
      .style('fill', d => colors[d.index])
      .style('stroke', d => colors[d.index])
      .attr('d', d3.svg.arc().innerRadius(innerRadius).outerRadius(outerRadius))
      .on('mouseover', fade(.1))
      .on('mouseout', fade(1))

    const groups = svg.append('g').selectAll('g')
      .data(chord.groups)
      .enter().append('g')

    // labels
    const getLabelAngle = d => (d.endAngle - d.startAngle) / 2 + d.startAngle

    svg.append('g').selectAll('g')
      .data(chord.groups)
      .enter().append('g')
      .attr('class', 'chord-label')
      .attr('transform', d => `rotate(${getLabelAngle(d) * 180 / Math.PI - 90}) translate(${+outerRadius + 30}, 0)`)
      .append('text')
      .attr('x', 8)
      .attr('dy', '.35em')
      .attr('transform', d => getLabelAngle(d) > Math.PI ? 'rotate(180)translate(-16)' : null)
      .style('text-anchor', d => getLabelAngle(d) > Math.PI ? 'end' : null)
      .text(d => cols[d.index])

    const ticks = groups
      .selectAll('g')
      .data(groupTicks)
      .enter().append('g')
      .attr('class', 'tick')
      .attr('transform', d => `rotate(${d.angle * 180 / Math.PI - 90}) translate(${outerRadius}, 0)`)

    ticks.append('line')
      .attr('x1', 1)
      .attr('y1', 0)
      .attr('x2', 5)
      .attr('y2', 0)
      .style('stroke', '#000')

    ticks.append('text')
      .attr('x', 8)
      .attr('dy', '.35em')
      .attr('transform', d => d.angle > Math.PI ? 'rotate(180)translate(-16)' : null)
      .style('text-anchor', d => d.angle > Math.PI ? 'end' : null)
      .text(d => d.label)

    svg.append('g')
      .attr('class', 'chord')
      .selectAll('path')
      .data(chord.chords)
      .enter().append('path')
      .attr('d', d3.svg.chord().radius(innerRadius))
      .style('fill', d => colors[d.target.index])
      .style('fill-opacity', .67)
  }
}