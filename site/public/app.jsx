import 'bfd-bootstrap'
import './styles/app.css'
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, RouteContext, Link, IndexLink, IndexRoute } from 'react-router'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { createHistory } from 'history'
import Home from './home.jsx'
import Bootstrap from './bootstrap.jsx'
// import Nav from 'c/nav/index.jsx'
// import NavFirst from 'c/navFirst/index.jsx'
// import NavSecond from 'c/navFirst/index.jsx'
import model from './model'

const App = React.createClass({
  
  getInitialState() {
    return {
      components: window.components   
    }
  },
  
  render() {
    return (
      <div id="wapper">
        <div id="header">
          <h2>BFD UI</h2>
        </div>
        <div id="body">
          <div className="sidebar">
            <ul className="nav nav-pills nav-stacked">
              <li>
                <IndexLink to="/" activeClassName="active">
                  首页
                </IndexLink>
              </li>
              <li>
                <Link to="/bootstrap" activeClassName="active">
                  Bootstrap
                </Link>
              </li>
              <li>
                <span>
                  组件
                </span>
                <ul className="nav nav-pills nav-stacked">
                  {this.state.components.map((item) => {
                    return (
                      <li key={item.name}>
                        <Link to={"/components/" + item.name} activeClassName="active">{item.cn}</Link>
                      </li>
                    )
                  })}
                </ul>
              </li>
            </ul>
          </div>
          <div className="content">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
})

const routeConfig = [{
  path: '/',
  component: App,
  indexRoute: {
    component: Home
  },
  childRoutes: [{
    path: 'components',
    indexRoute: {
      component: Home
    },
    childRoutes: [{
      path: ':name',
      getComponent: function(location, callback) {
        let component = location.pathname.split('/').pop()
        model.fetch('/getComponents', { component })
          .then((res) => {
            window.post = res
            require.ensure([], function (require) {
              callback(null, require('./components/' + component + '.jsx').default)
            })
          })
      }
    }]
  }, {
    path: 'bootstrap',
    component: Bootstrap
  }]
}]

render(<Router history={createHistory()} routes={routeConfig} />, document.getElementById('app'))