import 'normalize.css'
import './index.less'
import './pace.less'
import React, { Component } from 'react'
import { Link } from 'react-router'
import { Row, Col } from 'bfd/Layout'
import { Nav, NavItem } from 'bfd/Nav'
import pace from './pace'

pace.start()

class App extends Component {
  render() {
    const { children } = this.props
    return (
      <div className="wrapper">
        <Row className="header" fluid>
          <Col>
            <Link to="/" className="header__logo">
              <h2>BFD UI</h2>
              <span>v0.x</span>
            </Link>
          </Col>
          <Col>
            <ul className="header__nav">
              <li>
                <Link to="/">首页</Link>
              </li>
              <li>
                <Link to="/components">组件</Link>
              </li>
            </ul>
          </Col>
          <Col right>
            <a href="http://git.baifendian.com/front-end/bfd-ui">GitLab</a>
            &nbsp;&nbsp;|&nbsp;&nbsp;
            <a href="http://git.baifendian.com/front-end/bfd-ui/issues/new">提交bug</a>
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