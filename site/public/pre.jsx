import React from 'react'

export default React.createClass({
  render() {
    return <pre>{this.props.children}</pre>
  }
})