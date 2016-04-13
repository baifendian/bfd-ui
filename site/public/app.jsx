import 'bfd-bootstrap'
import './less/app.less'
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link } from 'react-router'
import { createHistory } from 'history'
import { Nav, NavItem } from 'c/Nav'
import classnames from 'classnames'
import fastclick from 'fastclick'

fastclick.attach(document.body)

const App = React.createClass({

  getInitialState() {
    return {
      isOpen: false
    }
  },

  handleToggle() {
    this.setState({isOpen: true})
  },

  handleClick(props) {
    console.log(props)
    this.setState({isOpen: false})
  },

  render() {
    return (
      <div id="wrapper">
        <div id="header">
          <Link to="/" className="pull-left">
            <h2>BFD UI</h2>
          </Link>
          <div className="pull-right">
            <a href="http://git.baifendian.com/front-end/bfd-ui/issues/new">发现问题？</a>
          </div>
        </div>
        <div id="body" className="clearfix">
          {this.state.isOpen ? null : (
            <button className="toggle btn btn-default" type="button" onClick={this.handleToggle}>
              <span className="glyphicon glyphicon-align-justify"></span>
            </button>
          )}
          <div className={classnames('sidebar', {open: this.state.isOpen})} id="sidebar">
            <Nav onClick={this.handleClick}>
              <NavItem href="/" icon="home" title="首页" />
              <NavItem href="/components" icon="th" title="组件" />
              <NavItem href="/integration" icon="hand-right" title="完整项目实例" />
              <NavItem href="/changeLog" icon="random" title="更新日志" />
            </Nav>
          </div>
          <div className="content">{this.props.children}</div>
        </div>
        <div id="footer">
          <div className="pull-left">当前版本：v0.0.21</div>
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
      <Route path="changeLog" getComponent={(location, cb) => {
        require.ensure([], require => {
          cb(null, require('./ChangeLog').default)
        })
      }}/>
    </Route>
  </Router>
), document.getElementById('app'))