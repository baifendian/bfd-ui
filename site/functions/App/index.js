import 'normalize.css'
import './index.less'
import './pace.less'
import React, { Component } from 'react'
import { Link, IndexLink } from 'react-router'
import { Row, Col } from 'bfd/Layout'
import { Nav, NavItem } from 'bfd/Nav'
import Icon from 'bfd/Icon'
import pace from './pace'
import fastclick from 'fastclick'

pace.start()
fastclick.attach(document.body)

class App extends Component {
  render() {
    const { children } = this.props
    return (
      <div className="wrapper">
        <Row className="header" fluid>
          <Col>
            <Link to="/" className="header__logo">
              BFD UI <sub>v1.0</sub>
            </Link>
          </Col>
          <Col>
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
                <Link to="/changelog" activeClassName="active">更新日志</Link>
              </li>
              <li>
                <Link to="/scaffolding" activeClassName="active">脚手架</Link>
              </li>
            </ul>
          </Col>
          <Col right>
            <a href="https://github.com/baifendian/bfd-ui" className="header__github">
              <Icon type="github" />
            </a>
          </Col>
        </Row>
        <div className="body">{children}</div>
        <div className="footer">百分点前端研发部及 UI 视觉部联合出品</div>
      </div>
    )
  }
}

export default App