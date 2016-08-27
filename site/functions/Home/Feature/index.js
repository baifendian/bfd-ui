import React from 'react'
import { Col } from 'bfd/Layout'
import './index.less'

export default props => {
  const { icon, title, children } = props
  return (
    <Col col="md-3 sm-3 xs-6" className="home__feature">
      <image src={icon}></image>
      <h2>{title}</h2>
      <p>{children}</p>
    </Col>
  )
}