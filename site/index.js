import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, IndexRedirect } from 'react-router'
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
      <Route path="components" getComponent={(location, cb) => {
        require.ensure([], require => {
          cb(null, require('./functions/Components').default)
        })
      }}>
        <IndexRedirect to="/components/Button" />
        <Route path=":component" getComponent={(location, cb) => {
          const component = location.pathname.split('/').pop()
          require.ensure([], require => {
            cb(null, require(`./functions/Components/docs/${component}.doc`).default)
          })
        }} />
      </Route>
      <Route path="scaffolding" getComponent={(location, cb) => {
        require.ensure([], require => {
          cb(null, require('./functions/Scaffolding').default)
        })
      }} />
      <Route path="Changelog" getComponent={(location, cb) => {
        require.ensure([], require => {
          cb(null, require('./functions/Changelog').default)
        })
      }} />
    </Route>
  </Router>
), document.getElementById('app'))