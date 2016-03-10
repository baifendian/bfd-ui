/**
 * Bubble chart based on d3.js
 */
import d3 from 'd3'

export default class {

  constructor(config) {

    const {
      container, radiusMaker, data, name, value
    } = config

    const color = ['#f2c3c8', '#c5cae9', '#a9d4d0', '#f2edba', '#ecb2c6', '#b2d3ef', '#bedbbf', '#f0e3b1', '#d6b5dc', '#aadaf0', '#d1e1be', '#f2d5a9', '#c7badd', '#a9dfe6', '#e4e8b9', '#f2c2b3']

    const minRadius = 15
    const maxRadius = 80
      // separation between nodes
    const padding = 6
    const width = container.parentNode.clientWidth
    const height = container.parentNode.clientHeight || width * .5

    const radiusMakerRange = d3.extent(data, d => d[radiusMaker])

    const radiusDomain = d3.scale.linear()
      .range([minRadius, maxRadius])
      .domain(radiusMakerRange)

    const fontSizeDomain = d3.scale.linear()
      .range([10, 30])
      .domain(radiusMakerRange)

    data.forEach(function(item) {
      item.radius = radiusDomain(item[radiusMaker])
      item.fontSize = fontSizeDomain(item[radiusMaker])
      item.cx = Math.floor(Math.random() * width)
      item.cy = height / 2
    })

    const svg = d3.select(container)
      .append('svg')
      .attr('width', width)
      .attr('height', height)

    // Move nodes toward cluster focus.
    const gravity = alpha => {
      return d => {
        d.x += (d.cx - d.x) * alpha
        d.y += (d.cy - d.y) * alpha
      }
    }

    // Resolve collisions between nodes.
    const collide = alpha => {
      const quadtree = d3.geom.quadtree(data);
      return d => {
        const r = d.radius + maxRadius + padding
        const nx1 = d.x - r
        const nx2 = d.x + r
        const ny1 = d.y - r
        const ny2 = d.y + r
        quadtree.visit((quad, x1, y1, x2, y2) => {
          if (quad.point && (quad.point !== d)) {
            let x = d.x - quad.point.x
            let y = d.y - quad.point.y
            let l = Math.sqrt(x * x + y * y)
            const r = d.radius + quad.point.radius + (d.color !== quad.point.color) * padding
            if (l < r) {
              l = (l - r) / l * alpha
              d.x -= x *= l
              d.y -= y *= l
              quad.point.x += x
              quad.point.y += y
            }
          }
          return x1 > nx2 || x2 < nx1 || y1 > ny2 || y2 < ny1
        })
      }
    }

    const forceLayout = d3.layout.force()
      .nodes(data)
      .size([width, height])
      .gravity(.2)
      .charge(-300)
      .on('tick', e => {
        bubbles
          .each(gravity(.2 * e.alpha))
          .each(collide(.5))
          .attr('transform', d => `translate(${d.x}, ${d.y})`)
      })
      .start()

    const bubbles = svg.selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .on('mouseenter', function(d) {
        // self.popover.triggerElement && self.popover.triggerElement.off('mouseleave');
        // self.popover.triggerElement = $(d3.event.target);
        // self.tooltip.model.reset(d);
        d3.select(this).select('circle')
          .transition()
          .duration(200)
          .attr("r", d.radius * 1.3)
      })
      .on('mouseleave', function(d) {
        d3.select(this).select('circle')
          .transition()
          .duration(200)
          .attr("r", d.radius)
      })
      .call(forceLayout.drag)

    bubbles
      .append('circle')
      .attr('r', d => d.radius)
      .attr('stroke', (d, i) => color[i % color.length])
      .attr('fill', (d, i) => color[i % color.length])
      .attr('fill-opacity', .4)

    const textContainers = bubbles
      .append('text')
      .attr('text-anchor', 'middle')
      .style('font-size', d => d.fontSize)
      .attr('fill', '#807778')

    textContainers
      .append('tspan')
      .attr('x', 0)
      .attr('y', '-.2em')
      .text(d => d[name])

    const valueFormat = d3.format(value.format || '.2s')

    textContainers
      .append('tspan')
      .attr('x', 0)
      .attr('y', '1em')
      .text(d => valueFormat(d[value.key]))
  }
}