import React from 'react'

export default React.createClass({
  render() {
    return (
      <div>
        <h2>Bootstrap</h2>
        <button type="button" className="btn btn-default">
          <span className="glyphicon glyphicon-align-left"></span>
        </button>
        <a href="" className="btn btn-default">（默认样式）Default</a>
        <button type="button" className="btn btn-primary">（首选项）Primary</button>
      </div>
    )
  }
})