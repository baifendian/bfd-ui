import React from 'react'
import classnames from 'classnames'
import warning from 'warning'
import './index.less'

const TextOverflow = React.createClass({
  render() {
    const { children } = this.props

    if (process.env.NODE_ENV !== 'production') {
      warning(!children.length, 'Children should be single, check the children of TextOverflow')
    }

    return React.cloneElement(children, {
      onMouseEnter: ({ target }) => {
        if (target.offsetWidth < target.scrollWidth) {
          this.timer = setTimeout(() => {
            tooltip(children.props.children, target)
          }, 100)
        }
      },
      onMouseLeave: () => {
        tooltip.close()
        this.timer && clearTimeout(this.timer)
      },
      className: classnames(children.props.className, 'bfd-text-overflow')
    })
  }
})

export default TextOverflow


/**
 * tooltip
 */
import { render } from 'react-dom'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

const Tooltip = React.createClass({
  
  getInitialState() {
    return {
      show: false     
    }
  },

  componentDidMount() {
    this.setPosition()
  },

  componentDidUpdate() {
    this.setPosition()
  },

  setPosition() {
    if (this.state.show) {
      const tooltip = this.refs.tooltip

      const tooltipRect = tooltip.getBoundingClientRect()
      const triggerRect = this.state.trigger.getBoundingClientRect()

      tooltip.style.left = triggerRect.left - tooltipRect.width / 2 + triggerRect.width / 2 + 'px'
      tooltip.style.top = triggerRect.top - tooltipRect.height - 8 + document.body.scrollTop + 'px'
    }
  },

  render() {
    return this.state.show ? <div ref="tooltip" className="bfd-tooltip">{this.state.content}</div> : null
  }
})

let instance

function tooltip(content, trigger) {

  if (!instance) {
    const container = document.createElement('div')
    document.body.appendChild(container)
    instance = render(<Tooltip />, container)
  }

  instance.setState({
    show: true,
    trigger,
    content
  })
}

tooltip.close = () => {
  instance && instance.state && instance.state.show && instance.setState({show: false})
}