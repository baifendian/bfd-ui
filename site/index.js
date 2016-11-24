import React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory, Route, IndexRoute, IndexRedirect } from 'react-router'
import { createHistory } from 'history'
import App from './functions/App'

render((
  <Router onUpdate={() => window.scrollTo(0, 0)} history={createHistory()}>
    <Route path="/" component={App}>
      <IndexRoute getComponent={(location, cb) => {
        require.ensure([], require => {
          cb(null, require('./functions/Home').default)
        })
      }} />
      <Route path="guide" getComponent={(location, cb) => {
        require.ensure([], require => {
          cb(null, require('./functions/Guide').default)
        })
      }} />
      <Route path="components">
        <IndexRedirect to="/components/Button" />
        <Route path=":component" getComponent={(location, cb) => {
          const component = location.pathname.split('/').pop()
          require.ensure([], require => {
            cb(null, require('./functions/Components/index.doc').default)
          })
        }} />
      </Route>
      <Route path="Changelog" getComponent={(location, cb) => {
        require.ensure([], require => {
          cb(null, require('./functions/Changelog').default)
        })
      }} />
      <Route path="scaffolding" getComponent={(location, cb) => {
        require.ensure([], require => {
          cb(null, require('./functions/Scaffolding').default)
        })
      }}>
        <IndexRoute getComponent={(location, cb) => {
          require.ensure([], require => {
            cb(null, require('./functions/Scaffolding/Home').default)
          })
        }} />
        <Route path="workflow" getComponent={(location, cb) => {
          require.ensure([], require => {
            cb(null, require('./functions/Scaffolding/Workflow').default)
          })
        }} />
        <Route path="docs" getComponent={(location, cb) => {
          require.ensure([], require => {
            cb(null, require('./functions/Scaffolding/Docs').default)
          })
        }} />
        <Route path="changelog" getComponent={(location, cb) => {
          require.ensure([], require => {
            cb(null, require('./functions/Scaffolding/Changelog').default)
          })
        }} />
      </Route>
      <Route path="test" getComponent={(location, cb) => {
        require.ensure([], require => {
          cb(null, require('./functions/Test').default)
        })
      }} />
      <Route path="*" getComponent={(location, cb) => {
        require.ensure([], require => {
          cb(null, require('./functions/NotFound').default)
        })
      }} />
    </Route>
  </Router>
), document.getElementById('app'))
