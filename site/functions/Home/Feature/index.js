import React from 'react'
import { Col } from 'bfd/Layout'
import './index.less'

export default props => {
  const { icon, title, children, ...other } = props
  return (
    <Col col="md-3 sm-6" className="home__feature" {...other}>
      <image width="100" height="100" src={icon}></image>
      <h2>{title}</h2>
      <p>{children}</p>
    </Col>
  )
}