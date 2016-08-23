import 'normalize.css'
import './index.less'
import './pace.less'
import React, { Component } from 'react'
import { Link, IndexLink } from 'react-router'
import { Row, Col } from 'bfd/Layout'
import { Nav, NavItem } from 'bfd/Nav'
import pace from './pace'
import fastclick from 'fastclick'

pace.start()
fastclick.attach(document.body)

class App extends Component {
  render() {
    const { children } = this.props
    return (
      <div className="wrapper">
        <Row className="header">
          <Col col="md-2 sm-3">
            <Link to="/" className="header__logo">
              BFD UI <sub>v0.x</sub>
            </Link>
          </Col>
          <Col col="md-3 sm-5 xs-9">
            <ul className="header__nav">
              <li>
                <IndexLink to="/" activeClassName="active">首页</IndexLink>
              </li>
              <li>
                <Link to="/guide" activeClassName="active">指南</Link>
              </li>
              <li>
                <Link to="/components" activeClassName="active">组件</Link>
              </li>
              <li>
                <Link to="/scaffolding" activeClassName="active">脚手架</Link>
              </li>
              <li>
                <Link to="/changelog" activeClassName="active">更新日志</Link>
              </li>
            </ul>
          </Col>
          <Col right>
            <a href="http://git.baifendian.com/front-end/bfd-ui">GitLab</a>
          </Col>
        </Row>
        <div className="body">{children}</div>
        <Row className="footer">
          <Col right>Copyright©2016 Baifendian Corporation All Rights Reserved.</Col>
        </Row>
      </div>
    )
  }
}

export default App