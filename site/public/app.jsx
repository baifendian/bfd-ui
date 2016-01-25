import 'bfd-bootstrap'
import './styles/app.css'
import React from 'react'
import { render } from 'react-dom'
import Nav from 'c/nav/index.jsx'
import NavItem from 'c/navItem/index.jsx'
import Router from 'c/router'
import model from './model'


const Sidebar = React.createClass({

  getInitialState() {
    return {
      components: window.components
    }
  },

  render() {
    return (
      <Nav>
        <NavItem href="/" icon="home" title="首页"/>
        <NavItem href="/bootstrap" icon="bold" title="Bootstrap"/>
        <NavItem href="/components" icon="th" title="组件">
          <Nav>
            {this.state.components.map(component => {
              return <NavItem key={component.name} href={'/components/' + component.name} title={component.cn}></NavItem>
            })}
          </Nav>
        </NavItem>
      </Nav>
    )
  }
})

render(<Sidebar/>, document.getElementById('sidebar'))

/**
 * Render content
 */
const content = document.getElementById('content')
const renderContent = (path, callback) => {
  model.fetch(`/getTemplate?path=${path}`).then((res) => {
    content.innerHTML = res
  }).then(callback)
}


Router.on('/', url => {
  renderContent(url)
})

Router.on('/bootstrap', url => {
  renderContent(url)
})

Router.on('/components/:component', (url, query) => {
  renderContent(url, () => {
    require.ensure([], require => {
      require(`./components/${query.component}.jsx`).default()
    })
  })
})