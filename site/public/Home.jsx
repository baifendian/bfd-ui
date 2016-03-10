import React from 'react'
import { Link } from 'react-router'
import Pre from './Pre.jsx'

export default React.createClass({
  render() {
    return (
      <div className="home">
        <h1>BFD UI</h1>
        <Pre lang="sh">{`$ npm install --save bfd-ui`}</Pre>
        <Link className="btn btn-primary" to="/bootstrap">开始</Link>
      </div>
    )
  }
})