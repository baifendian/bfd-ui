import 'bfd-bootstrap'
import './styles/app.css'
import './styles/home.css'
import './styles/component.css'
import React from 'react'
import { render } from 'react-dom'
import { Router, Route, IndexRoute, Link } from 'react-router'
import { createHistory } from 'history'
import { Nav, NavItem } from 'c/nav/index.jsx'
import model from './model'
import Pre from './pre.jsx'
import Integration from './integration.jsx'

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
              <NavItem href="/" icon="home" title="首页"/>
              <NavItem href="/bootstrap" icon="bold" title="Bootstrap"/>
              <NavItem href="/plan" icon="calendar" title="计划"/>
              <NavItem href="/integration" icon="hand-right" title="完整项目实例"/>
              <NavItem href="/components" icon="th" title="组件">
                <Nav>
                  {this.state.components.map(component => {
                    return <NavItem key={component.name} href={'/components/' + component.name} title={component.cn}/>
                  })}
                </Nav>
              </NavItem>
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
    scroll(0, 0)
    let { component } = this.props.params
    let { pathname } = this.props.location
    model.fetch(`/getTemplate?path=${pathname}`).then((res) => {
      this.refs.container.innerHTML = res
    }).then(() => {
      require.ensure([], require => {
        // try {
          require(`.${pathname}.jsx`).default()
        // } catch(e) {}
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
      <IndexRoute component={Home}/>
      <Route path="/bootstrap" component={Bootstrap}/>
      <Route path="/plan" component={Plan}/>
      <Route path="/integration" component={Integration}/>
      <Route path="components">
        <Route path=":component" component={Components}></Route>
      </Route>
    </Route>
  </Router>
), document.getElementById('app'))