import React from 'react'

export default React.createClass({

  render() {
    const { children, ...other } = this.props
    return (
      <div className="checkbox">
        <label>
          <input type="checkbox" {...other}/>
          {children}
        </label>
      </div>
    )
  }
})