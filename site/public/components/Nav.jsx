import React from 'react'
import Pre from '../Pre'
import { Props, Prop } from '../Props'

export default React.createClass({
  render() {
    return (
      <div>
        <h1>导航菜单</h1>
        <p>导航菜单内部依赖 React-router，所以使用本组件后需要配置前端路由。</p>
        <Pre>
{`import { Router, Route, IndexRoute } from 'react-router'
import { createHistory } from 'history'
import { Nav, NavItem } from 'bfd-ui/lib/Nav'

const App = React.createClass({
  render() {
    return (
      <Nav>
        <NavItem href="/" icon="equalizer" title="数据概况"></NavItem>
        <NavItem href="/users" icon="send" title="人群管理">
          <NavItem href='/users/list' title="人群列表"></NavItem>
          <NavItem href='/users/task' title="任务管理"></NavItem>
        </NavItem>
      </Nav>
    )
  }
})

// 路由配置，按需加载对应的页面组件
ReactDOM.render((
  <Router history={createHistory()}>
    <Route path="/" component={App}>
      <IndexRoute getComponent={(location, cb) => {
        require.ensure([], require => {
          cb(null, require('./Home').default)
        })
      }}/>
      <Route path="users">
        <Route path="list" getComponent={(location, cb) => {
          require.ensure([], require => {
            cb(null, require('./List').default)
          })
        }}/>
        <Route path="task" getComponent={(location, cb) => {
          require.ensure([], require => {
            cb(null, require('./Task').default)
          })
        }}/>
      </Route>
    </Route>
  </Router>
), document.getElementById('app'))`}
        </Pre>
        <h2>Nav</h2>
        <Props>
          <Prop name="onItemClick" type="Function">
            <p>单条菜单点击后的回调，参数为当前点击菜单的 props</p>
          </Prop>
        </Props>
        <h2>NavItem</h2>
        <Props>
          <Prop name="href" type="String" required>
            <p>菜单 URL</p>
          </Prop>
          <Prop name="icon" type="String">
            <p>菜单图标，一级菜单配置，图标请参考 Bootstrap 图标</p>
          </Prop>
          <Prop name="title" type="String" required>
            <p>菜单名称</p>
          </Prop>
        </Props>
      </div>
    )
  }
})