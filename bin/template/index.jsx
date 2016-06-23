import React, { PropTypes } from 'react'
import classnames from 'classnames'
import './index.less'

const <%= name %> = React.createClass({

  getInitialState() {
    return {
          
    }
  },

  render() {
    const { className, ...other} = this.props
    return (
      <div className={classnames('bfd-<%= className %>', className)} {...other}>

      </div>
    )
  }
})

<%= name %>.propTypes = {
  test: PropTypes.string
}

export default <%= name %>