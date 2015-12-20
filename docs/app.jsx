import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link } from 'react-router'
import { createHistory } from 'history'

const App = React.createClass({
  render() {
    return (
      <div>
        <ul>
          <li><Link to='/'>index</Link></li>
          <li><Link to='about'>about</Link></li>
        </ul>
        {this.props.children}
      </div>
    )
  }
})

const About = React.createClass({
  render() {
    return <button>abodut</button> 
  }
})

render((
  <Router history={createHistory()}>
    <Route path='/' component={App}>
      <Route path='about' component={About}/>
    </Route>
  </Router>
), document.getElementById('app'))