import 'bfd-bootstrap'
import './less/app.less'
import pace from './pace'
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link } from 'react-router'
import { createHistory } from 'history'
import { Nav, NavItem } from 'c/Nav'
import xhr from 'c/xhr'
import message from 'c/message'
import classnames from 'classnames'

xhr.success = (res, option) => {
  if (typeof res !== 'object') {
    message.danger(option.url + ': response data should be JSON')
    return
  }
  switch (res.code) {
    case 200:
      option.success && option.success(res.data)
      break
    case 401:
      // redirect to '/login'
      break
    default:
      message.danger(res.message || 'unknown error')
  }
}

pace.start()

const App = React.createClass({

  render() {
    return (
      <div id="wrapper">
        <div id="header">
          <Link to="/" className="pull-left">
            <h2>BFD UI</h2>
            <span>v0.x</span>
          </Link>
        </div>
        <div id="body" className="clearfix">
          <div className="sidebar">
            <Nav href="/">
              <NavItem icon="home" title="首页" />
              <NavItem href="components" icon="th" title="组件" />
              <NavItem href="workflow" icon="hand-right" title="工作流" />
              <NavItem href="changelog" icon="random" title="更新日志" />
            </Nav>
          </div>
          <div className="content">{this.props.children}</div>
        </div>
        <div id="footer">
          <div className="pull-left">
            <a href="http://git.baifendian.com/front-end/bfd-ui/issues/new">提交bug</a>
          </div>
          <div className="pull-right">Copyright©2016 Baifendian Corporation All Rights Reserved.</div>
        </div>
      </div>
    )
  }
})

render((
  <Router history={createHistory()}>
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
        <Route path=":component" getComponent={(location, cb) => {
          require.ensure([], require => {
            cb(null, require('./components/' + location.pathname.split('/').pop()).default)
          })
        }}></Route>
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