/**
 * Rect chart based on d3.js
 */
import d3 from 'd3'

export default class {

	/**
	 * 获取Y轴 tickValues，nice 和 ticks 无法同时使用，只能手动划分
	 */
	getTickValues(yScale) {
		const max = yScale.invert(0)
		const values = []
		const step = max / 5
		for (let i = 0; i <= 5; i++) {
			values.push(step * i)
		}
		return values
	}

	constructor(config) {
		this.container = config.container
		this.width = config.width
		this.height = config.height
		this.dataset = config.data
		this.padding = config.padding
		this.xScale = config.xScale
		this.yScale = config.yScale
		this.series = config.series
		this.categories = config.categories
		this.cols = config.cols
		this.xLen = config.xLen
	}

	create(config) {
		const container = this.container
		const height = this.height
		const width = this.width
		const dataset = this.dataset
		const padding = this.padding
		const xScale = this.xScale
		const yScale = this.yScale
		const categories = this.categories
		const _this = this

		// 在 container 里添加一个 SVG 画布   
		const svg = d3.select(container)
			.append('svg')
			.attr('width', width + padding.left + padding.right)
			.attr('height', height + padding.top + padding.bottom)

		// 添加背景
		svg.append('g')
			.append('rect')
			.attr('x', 0)
			.attr('y', 0)
			.attr('width', width + padding.left + padding.right)
			.attr('height', height + padding.top + padding.bottom)
			.style('fill', '#FFF')
			.style('stroke-width', 2)
			.style('stroke', '#E7E7E7')

		const xItemLen = width / dataset.length

		if (config.highBg) {
			const div = d3.select(container)
				.append('div')
				.attr('class', 'tooltip')
				.style({
					position: 'absolute',
					left: 0,
					top: 0,
					opacity: 0,
					'pointer-events': 'none'
				})

			dataset.map((data, index) => {
				// 添加背景
				svg.append('g')
					.append('rect')
					.attr('x', index * xItemLen + padding.left + 1)
					.attr('y', padding.top)
					.attr('width', xItemLen - 1)
					.attr('height', height)
					.style('fill', '#FFF')
					.style('stroke', '#FFF')
					.on('mousemove', function() {
						d3.select(this).attr('opacity', '0.8').style('fill', '#EBF4FF')

						div.transition()
							.duration(200)
							.style('opacity', .9)

						div.html(_this.getToolTipHtml(data, index))
							.style('left', (d3.event.offsetX + 15) + 'px')
							.style('top', (d3.event.offsetY - div[0][0].clientHeight / 2 + 10) + 'px')
					})
					.on('mouseout', function() {
						d3.select(this).attr('opacity', '1').style('fill', '#fff')
						div.transition()
							.duration(200)
							.style('opacity', 0)
					})
			})
		}
		// 定义x轴
		const xAxis = d3.svg.axis()
			.scale(xScale)
			.orient('bottom')

		// 定义y轴
		const yAxis = d3.svg.axis()
			.scale(yScale)
			.orient('left')
			.tickValues(this.getTickValues(yScale))
			.tickFormat(d => d3.format('s')(d))
			.tickSize(-width, 0)
		this.yAxis = yAxis

		// 添加x轴
		svg.append('g')
			.attr('class', 'axis-x')
			.attr('transform', 'translate(' + (padding.left) + ',' + (height + padding.top) + ')')
			.style('fill', '#747779')
			.call(xAxis)

		// 添加y轴
		svg.append('g')
			.attr('class', 'axis-y')
			.attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
			.style('fill', '#747779')
			.call(yAxis)

		// 定义横轴网格线
		const xInner = d3.svg.axis()
			.scale(xScale)
			.tickSize(-(height), 0)
			.orient('bottom')
			.ticks(dataset.length)
			.tickValues(categories)

		// 添加横轴网格线
		svg.append('g')
			.attr('class', 'inner_line')
			.attr('transform', 'translate(' + (padding.left + xItemLen / 2) + ',' + (height + padding.top) + ')')
			.call(xInner)
			.selectAll('text')
			.text('')
			.attr('width', 10)

		return this
	}

	setYScale(yScale) {
		this.yAxis.tickValues(this.getTickValues(yScale))
			// 轴、曲线、曲面、标记点重绘
		this.svg.select('.axis-y').transition().call(this.yAxis)
	}

	setSeries(series) {
		this.series = series
	}

	getToolTipHtml(data) {
		if (this.series.length == 0) {
			return ''
		}
		const tmp = '<tr><td style="color:{color};padding:0">{name}：</td><td style="padding:0"><b>{value}</b></td></tr>'
		let trs = ''

		for (const p in this.cols) {
			const name = this.cols[p]
			const value = data[p] || 0
			let color = ''

			for (let i = 0; i < this.series.length; i++) {
				const serie = this.series[i]
				if (serie.key == p) {
					color = serie.color
					break
				}
			}
			if (color == '') {
				continue
			}
			trs += tmp.replace('{name}', name).replace('{value}', value).replace('{color}', color)
		}
		return '<table>' + trs + '</table>'

	}

	getSvg() {
		return this.svg
	}
}