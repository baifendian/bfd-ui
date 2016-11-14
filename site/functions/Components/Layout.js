import React, { PropTypes, Component } from 'react'
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

  renderPublic() {
    const { componentName } = this.props
    return (
      <a
        className="components__edit"
        href={
          `https://github.com/baifendian/bfd-ui/blob/master/src/${componentName}/README.md`
        }
        target="_blank"
      >
        在 GitHub 上编辑
      </a>
    )
  }

  render() {
    const { open } = this.state
    const { children } = this.props
    components.sort((a, b) => {
      if (a.name < b.name) return -1
      if (a.name > b.name) return 1
      return 0
    })
    return (
      <Layout open={open} onToggle={open => this.toggle(open)}>
        <LayoutSidebar>
          <Nav href="/components" onItemClick={() => this.toggle(false)}>
            {components.map((item, i) => (
              <NavItem
                key={item.name}
                href={item.name}
                title={item.name + ' ' + item.cn}
                defaultOpen
              />
            ))}
          </Nav>
        </LayoutSidebar>
        <LayoutContent>
          {this.renderPublic()}
          {children}
        </LayoutContent>
      </Layout>
    )
  }
}

Components.propTypes = {
  componentName: PropTypes.string.isRequired
}

export default Components
