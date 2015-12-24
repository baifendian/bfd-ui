import './styles/app.css'
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, RouteContext, Link, IndexLink, IndexRoute } from 'react-router'
// import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import { createHistory } from 'history'
import Home from './home.jsx'
import model from './model'

const App = React.createClass({
  
  getInitialState() {
    return {
      components: window.components   
    }
  },
  
  render() {
    return (
      <div>
        <ul className="sidebar">
          <li><IndexLink to='/' activeClassName="active">首页</IndexLink></li>
          <li>
            <span>组件</span>
            <ul>
              {this.state.components.map((item) => {
                return <li key={item.name}><Link to={'/components/' + item.name} activeClassName="active">{item.cn}</Link></li>
              })}
            </ul>
          </li>
        </ul>
        <div className="content">
          {this.props.children}
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
    path: 'components/:name',
    getComponent: function(location, callback) {
      let component = location.pathname.split('/').pop()
      model.fetch('/getComponents', { component })
        .then((res) => {
          window.post = res
          require.ensure([], function (require) {
            callback(null, require('./demos/' + component + '.jsx').default)
          })
        })
    }
  }]

}]

render(<Router history={createHistory()} routes={routeConfig} />, document.getElementById('app'))

// render((
//   <Router history={createHistory()}>
//     <Route path='/' component={App}>
//       <IndexRoute component={Home}/>
//       <Route path='components/:name' component={Components}/>
//     </Route>
//   </Router>
// ), document.getElementById('app'))