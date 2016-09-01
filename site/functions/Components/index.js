import React, { Component } from 'react'
import { Nav, NavItem } from 'bfd/Nav'
import { Layout, LayoutSidebar, LayoutContent } from 'public/Layout'
import components from './components.json'

class Components extends Component {

  constructor() {
    super()
    this.componentsMap = {}
    this.state = {
      open: false
    }
  }

  toggle(open) {
    this.setState({ open })
  }

  renderTitle(component) {
    const { name, cn } = this.componentsMap[component]
    return (
      <h2 className="components__title">{cn + ' ' + name}</h2>
    )
  }

  render() {
    const { open } = this.state
    const { children, params } = this.props
    return (
      <Layout open={open} onToggle={open => this.toggle(open)}>
        <LayoutSidebar>
          <Nav href="/components" onItemClick={() => this.toggle(false)}>
            {components.map((item, i) => (
              <NavItem 
                key={item.category} 
                icon={item.icon} 
                title={item.cn}
                defaultOpen
              >
                {item.components.map((component, i) => {
                  this.componentsMap[component.name] = component
                  return (
                    <NavItem
                      key={component.name}
                      href={component.name} 
                      title={component.cn + ' ' + component.name}
                    />
                  )
                })}
              </NavItem>
            ))}
          </Nav>
        </LayoutSidebar>
        <LayoutContent>
          {this.renderTitle(params.component)}
          {children}
        </LayoutContent>
      </Layout>
    )
  }
}

export default Components