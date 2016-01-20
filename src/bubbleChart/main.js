/**
 * Bubble chart based on d3.js
 */
import d3 from 'd3'

export default class {

  constructor(config) {

    const {
      container, radiusMaker, color, data, content
    } = config

    const minRadius = 15
    const maxRadius = 80
      // separation between nodes
    const padding = 6
    const width = container.clientWidth
    const height = container.clientHeight || width * .5

    const radiusDomain = d3.scale.linear()
      .range([minRadius, maxRadius])
      .domain(d3.extent(data, d => d[radiusMaker]))

    data.forEach(function(item) {
      item.radius = radiusDomain(item[radiusMaker])
      item.color = color
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
        // d3.select(this).select('circle')
        //   .transition()
        //   .duration(500)
        //   .attr("r", d.radius * 1.3);
      })
      .on('mouseleave', function(d) {
        // d3.select(this).select('circle')
        //   .transition()
        //   .duration(500)
        //   .attr("r", d.radius);
      })
      .call(forceLayout.drag)

    bubbles
      .append('circle')
      .attr('r', d => d.radius)
      .attr('stroke', d => d.color)
      .attr('fill', d => d.color)
      .attr('fill-opacity', .4)

    bubbles
      .append('text')
      .attr('text-anchor', 'middle')
      .attr('y', '.3em')
      .style('fontSize', '12px')
      .text(content)
  }
}