import 'bfd-bootstrap'
import './styles/app.css'
import './styles/home.css'
import './styles/component.css'
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link } from 'react-router'
import { createHistory } from 'history'
import Nav from 'c/nav/index.jsx'
import model from './model'

const App = React.createClass({

  getInitialState() {
    return {
      components: window.components        
    }
  },

  render() {
    return (
      <div id="wrapper">
        <div id="header">
          <Link to="/">
            <h2>BFD UI</h2>
          </Link>
        </div>
        <div id="body">
          <div className="sidebar" id="sidebar">
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
          </div>
          <div className="content">{this.props.children}</div>
        </div>
      </div>
    )
  }
})

const Components = React.createClass({

  contextTypes: {
    history: React.PropTypes.object
  },

  renderComponent() {
    let { component } = this.props.params
    let { pathname } = this.props.location
    model.fetch(`/getTemplate?path=${pathname}`).then((res) => {
      this.refs.container.innerHTML = res
    }).then(() => {
      require.ensure([], require => {
        try {
          require(`.${pathname}.jsx`).default()
        } catch(e) {}
      })
    })
  },

  componentDidMount() {
    this.renderComponent()
  },

  componentDidUpdate() {
    this.renderComponent()
  },

  render() {
    return <div className="component" ref="container"></div>
  }
})

const Pre = React.createClass({
  render() {
    return <pre>{this.props.children}</pre>
  }
})

const Home = React.createClass({

  render() {
    return (
      <div className="home">
        <h1>BFD UI</h1>
        <Pre lang="js">{`$ npm install --save bfd-ui`}</Pre>
        <Link className="btn btn-primary" to="/bootstrap">开始</Link>
      </div>
    )
  }
})

const Bootstrap = React.createClass({

  componentDidMount() {
    model.fetch('/getTemplate?path=/bootstrap').then(res => {
      this.refs.container.innerHTML = res
    })
  },


  render() {
    return <div className="bootstrap" ref="container"></div>
  }
})

render((
  <Router history={createHistory()}>
    <Route path="/" component={App}>
      <IndexRoute component={Home}/>
      <Route path="/bootstrap" component={Bootstrap}/>
      <Route path="components">
        <Route path=":component" component={Components}></Route>
      </Route>
    </Route>
  </Router>
), document.getElementById('app'))