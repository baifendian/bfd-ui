import 'normalize.css'
import React, { Component } from 'react'
import { Link, IndexLink } from 'react-router'
import classnames from 'classnames'
import { Row, Col } from 'bfd/Layout'
import { Nav, NavItem } from 'bfd/Nav'
import { Dropdown, DropdownToggle, DropdownMenu } from 'bfd/Dropdown'
import Button from 'bfd/Button'
import Icon from 'bfd/Icon'
import './index.less'

class App extends Component {

  renderNav() {
    return (
      <ul>
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
    )
  }

  render() {
    const { children } = this.props
    return (
      <div className="wrapper">
        <Row className="header" fluid>
          <Col>
            <Link to="/" className="header__logo">
              <svg dangerouslySetInnerHTML={{__html: '<use xlink:href="#logo"></use>'}} />
              BFD UI <sub>v1.x</sub>
            </Link>
          </Col>
          <Col className="header__nav">
            {this.renderNav()}
          </Col>
          <Col right>
            <Dropdown ref="dropdown">
              <DropdownToggle className="header__nav-toggle">
                <Button icon="bars" transparent />
              </DropdownToggle>
              <DropdownMenu
                onClick={() => this.refs.dropdown.close()}
                className="header__nav-toggle-popover"
                align="middle"
              >
                {this.renderNav()}
              </DropdownMenu>
            </Dropdown>
            <a
              href="http://github.com/baifendian/bfd-ui"
              target="_blank"
              className="header__github"
            >
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
