import './index.less'
import React from 'react'
import classnames from 'classnames'
import warning from 'warning'
import tooltip from './tooltip'

const TextOverflow = props => {

  const { children } = props

  if (process.env.NODE_ENV !== 'production') {
    warning(!children.length, 'Children should be single, check the children of TextOverflow')
  }

  let timer

  return React.cloneElement(children, {
    onMouseEnter: ({ target }) => {
      if (target.offsetWidth < target.scrollWidth) {
        timer = setTimeout(() => {
          tooltip(children.props.children, target)
        }, 200)
      }
    },
    onMouseLeave: () => {
      tooltip.close()
      clearTimeout(timer)
    },
    className: classnames(children.props.className, 'bfd-text-overflow')
  })
}

export default TextOverflow