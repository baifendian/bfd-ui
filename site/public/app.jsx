import 'bfd-bootstrap'
import './styles/app.css'
import React from 'react'
import { render } from 'react-dom'
import Nav from 'c/nav/index.jsx'
import Router from 'c/router'
import model from './model'
import Link from 'c/link/index.jsx'

// import router from 'react-router'

const Sidebar = React.createClass({

  getInitialState() {
    return {
      components: window.components
    }
  },

  render() {
    return (
      <Nav>
        <Nav.Item href="/" icon="home" title="首页"/>
        <Nav.Item href="/bootstrap" icon="bold" title="Bootstrap"/>
        <Nav.Item href="/components" icon="th" title="组件">
          <Nav>
            {this.state.components.map(component => {
              return <Nav.Item key={component.name} href={'/components/' + component.name} title={component.cn}/>
            })}
          </Nav>
        </Nav.Item>
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