import React from 'react'
import Pre from 'public/Pre'
import { Props, Prop } from 'public/Props'

export default React.createClass({
  render() {
    return (
      <div>
        <h1>导航菜单 @hai.jiang</h1>
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
          <Prop name="href" type="string">
            <p>基础 URL, 可继承给 NavItem href 属性</p>
            
            <Pre>{
`<Nav href="/">
  <NavItem href="users" icon="users" title="人群管理" />
</Nav>`}</Pre>
          </Prop>
          <Prop name="onItemClick" type="function">
            <p>单条菜单点击后的回调，参数为当前点击菜单的 props</p>
          </Prop>
        </Props>
        <h2>NavItem</h2>
        <Props>
          <Prop name="href" type="string">
            <p>菜单 URL，可继承 Nav href 属性，但是内部无法继承</p>
            <Pre>{
`<Nav href="/">
  <NavItem icon="home" title="首页" />
  <NavItem href="users" icon="send" title="人群管理">
    <NavItem href='users/list' title="人群列表" />
    <NavItem href='users/task' title="任务管理" />
  </NavItem>
</Nav>`}</Pre>
          </Prop>
          <Prop name="icon" type="string">
            <p>菜单图标，一级菜单配置，<a href="http://fontawesome.io/icons/">http://fontawesome.io/icons/</a></p>
          </Prop>
          <Prop name="title" type="string" required>
            <p>菜单名称</p>
          </Prop>
          <Prop name="defaultOpen" type="boolean">
            <p>默认是否展开</p>
          </Prop>
        </Props>
      </div>
    )
  }
})