import React from 'react'

export default React.createClass({
  render() {
    const aa = [1,2]
    const bb = [...aa, 3]
    return <div>{this.props.data}</div>
  }
})