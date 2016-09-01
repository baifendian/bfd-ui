import React, { Component } from 'react'
import { Nav, NavItem } from 'bfd/Nav'
import { Layout, LayoutSidebar, LayoutContent } from 'public/Layout'

export default class extends Component {

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

  render() {
    const { open } = this.state
    const { children, params } = this.props
    return (
      <Layout open={open} onToggle={open => this.toggle(open)}>
        <LayoutSidebar>
          <Nav href="/scaffolding" onItemClick={() => this.toggle(false)}>
            <NavItem icon="" title="生成器" />
            <NavItem href="workflow" icon="" title="工作流" />
            <NavItem href="docs" icon="" title="文档" />
            <NavItem href="changelog" icon="" title="更新日志" />
          </Nav>
        </LayoutSidebar>
        <LayoutContent>{children}</LayoutContent>
      </Layout>
    )
  }
}