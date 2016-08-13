import './index.less'
import React, { Component } from 'react'
import classnames from 'classnames'
import { Row, Col } from 'bfd/Layout'
import { Nav, NavItem } from 'bfd/Nav'
import Button from 'bfd/Button'
import components from './components.json'

class Components extends Component {

  constructor(props) {
    super()
    this.componentsMap = {}
    this.state = {
      open: false
    }
  }

  close() {
    this.setState({open: false})
  }

  handleToggle() {
    this.setState({open: !this.state.open})
  }

  handleNavItemClick() {
    this.close()
  }

  handleContentClick() {
    this.state.open && this.close()
  }

  renderTitle(component) {
    const { name, cn } = this.componentsMap[component]
    return (
      <h1 className="components__title">{cn + ' ' + name}</h1>
    )
  }

  render() {
    const { open } = this.state
    const { children, params } = this.props
    return (
      <Row fluid className={classnames('components', {'components--open': open})}>
        <Col className="components__sidebar">
          <Nav href="/components" onItemClick={::this.handleNavItemClick}>
            {components.map((item, i) => (
              <NavItem key={i} href={item.category} icon={item.icon} title={item.cn}>
                {item.components.map((component, i) => {
                  this.componentsMap[component.name] = component
                  return (
                    <NavItem
                      key={i}
                      href={item.category + '/' + component.name} 
                      title={component.cn + ' ' + component.name}
                    />
                  )
                })}
              </NavItem>
            ))}
          </Nav>
        </Col>
        <Col className="components__content" onClick={::this.handleContentClick}>
          <Button 
            icon="bars" 
            className="components__bar-toggle" 
            onClick={::this.handleToggle}
          />
          {this.renderTitle(params.component)}
          {children}
        </Col>
      </Row>
    )
  }
}

export default Components