import 'bfd-bootstrap'
import './less/app.less'
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link } from 'react-router'
import { createHistory } from 'history'
import { Nav, NavItem } from 'c/Nav'
import Pre from './Pre'
import Integration from './Integration'
import classnames from 'classnames'
import fastclick from 'fastclick'

fastclick.attach(document.body)

const App = React.createClass({

  getInitialState() {
    return {
      components: window.components,
      isOpen: false      
    }
  },

  handleToggle() {
    this.setState({isOpen: true})
  },

  handleClick() {
    this.setState({isOpen: false})
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
          {this.state.isOpen ? null : (
            <button className="toggle btn btn-default" type="button" onClick={this.handleToggle}>
              <span className="glyphicon glyphicon-align-justify"></span>
            </button>
          )}
          <div className={classnames('sidebar', {open: this.state.isOpen})} id="sidebar">
            <Nav onClick={this.handleClick}>
              <NavItem href="/" icon="home" title="首页"/>
              <NavItem href="/bootstrap" icon="bold" title="Bootstrap"/>
              <NavItem href="/plan" icon="calendar" title="计划"/>
              <NavItem href="/integration" icon="hand-right" title="完整项目实例"/>
              <NavItem href="/components" icon="th" title="组件">
                {this.state.components.map(component => {
                  return <NavItem key={component.name} href={'/components/' + component.name} title={component.cn}/>
                })}
              </NavItem>
            </Nav>
          </div>
          <div className="content">{this.props.children}</div>
        </div>
      </div>
    )
  }
})

const Bootstrap = React.createClass({

  render() {
    return <div className="bootstrap" ref="container">Bootstrap</div>
  }
})

const Plan = React.createClass({
  render() {
    return (
      <div className="plan">
        <h1>3月15号前</h1>
        <p>完成折线图、柱状图、饼图、雷达图、气泡图、散点图、中国地图、弦图、模态框、导航、全局提示、环比图、dataTable、分页、datePicker、tree、表单验证等18个组件的开发</p>

        <h1>3月16至3月25</h1>
        <p>完成内部测试</p>

        <h1>3月26至3月31</h1>
        <p>进行BFD-UI的推广、培训，包括前端开发整体解决方案的普及</p>

        <h1>4月1号</h1>
        <p>正式发布1.0版本</p>
      </div>
    )
  }
})

render((
  <Router history={createHistory()}>
    <Route path="/" component={App}>
      <IndexRoute getComponent={(location, cb) => {
        require.ensure([], (require) => {
          cb(null, require('./Home').default)
        })
      }}/>
      <Route path="bootstrap" component={Bootstrap}/>
      <Route path="plan" component={Plan}/>
      <Route path="integration" component={Integration}/>
      <Route path="components">
        <Route path=":component" getComponent={(location, cb) => {
          require.ensure([], (require) => {
            cb(null, require('.' + location.pathname + '').default)
          })
        }}></Route>
      </Route>
    </Route>
  </Router>
), document.getElementById('app'))