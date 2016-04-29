import 'bfd-bootstrap'
import './less/app.less'
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link } from 'react-router'
import { createHistory } from 'history'
import { Nav, NavItem } from 'c/Nav'
import classnames from 'classnames'
import pace from './pace'
import './less/pace.less'

pace.start()

const App = React.createClass({

  render() {
    return (
      <div id="wrapper">
        <div id="header">
          <a href="/" className="pull-left">
            <h2>BFD UI</h2>
            <span>v0.x</span>
          </a>
        </div>
        <div id="body" className="clearfix">
          <div className="sidebar">
            <Nav href="/">
              <NavItem icon="home" title="首页" />
              <NavItem href="components" icon="th" title="组件" />
              <NavItem href="integration" icon="hand-right" title="开发工作流" />
              <NavItem href="rules" icon="bullhorn" title="开发规范" />
              <NavItem href="changeLog" icon="random" title="更新日志" />
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
      <Route path="integration" getComponent={(location, cb) => {
        require.ensure([], require => {
          cb(null, require('./Integration').default)
        })
      }}/>
      <Route path="rules" getComponent={(location, cb) => {
        require.ensure([], require => {
          cb(null, require('./Rules').default)
        })
      }}/>
      <Route path="changeLog" getComponent={(location, cb) => {
        require.ensure([], require => {
          cb(null, require('./ChangeLog').default)
        })
      }}/>
    </Route>
  </Router>
), document.getElementById('app'))