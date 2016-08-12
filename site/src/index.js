import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, IndexRedirect } from 'react-router'
import { createHistory } from 'history'
import App from './App'

render((
  <Router onUpdate={() => window.scrollTo(0, 0)} history={createHistory()}>
    <Route path="/" component={App}>
      <IndexRoute getComponent={(location, cb) => {
        require.ensure([], require => {
          cb(null, require('./Home').default)
        })
      }}/>
      <Route path="components" getComponent={(location, cb) => {
        require.ensure([], require => {
          cb(null, require('./Components').default)
        })
      }}>
        <IndexRedirect to="/components/base/Button" />
        <Route path=":cat">
          <Route path=":component" getComponent={(location, cb) => {
            require.ensure([], require => {
              cb(null, require('./Components/components/' + location.pathname.split('/').pop()).default)
            })
          }} />
        </Route>
      </Route>
      <Route path="workflow" getComponent={(location, cb) => {
        require.ensure([], require => {
          cb(null, require('./Workflow').default)
        })
      }}/>
      <Route path="Changelog" getComponent={(location, cb) => {
        require.ensure([], require => {
          cb(null, require('./Changelog').default)
        })
      }}/>
    </Route>
  </Router>
), document.getElementById('app'))