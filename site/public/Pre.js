import './pre.less'
import React, { PropTypes } from 'react'
import classnames from 'classnames'

const Pre = props => {
  const { className, transparent, children } = props
  return (
    <pre
      className={classnames('pre', {'pre--transparent': transparent}, className)}
      dangerouslySetInnerHTML={{__html: children}}
    />
  )
}

Pre.propTypes = {
  transparent: PropTypes.bool
}

export default Pre
