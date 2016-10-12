import React, { Component } from 'react'
import { Nav, IndexNavItem, NavItem } from 'bfd/Nav'
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
            <IndexNavItem icon="cog" title="脚手架" />
            <NavItem icon="retweet" href="workflow" title="工作流" />
            <NavItem icon="file-word-o" href="docs" title="文档" />
            <NavItem icon="code-fork" href="changelog" title="更新日志" />
          </Nav>
        </LayoutSidebar>
        <LayoutContent>{children}</LayoutContent>
      </Layout>
    )
  }
}
