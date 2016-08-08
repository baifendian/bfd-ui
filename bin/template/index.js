import './index.less'
import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'

class <%= name %> extends Component {

  constructor() {
    super()
    this.state = {

    }
  }

  render() {
    const { className, ...other} = this.props
    return (
      <div className={classnames('bfd-<%= className %>', className)} {...other}>

      </div>
    )
  }
}

<%= name %>.propTypes = {
  test: PropTypes.string
}

export default <%= name %>