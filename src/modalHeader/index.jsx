import 'bfd-bootstrap'
import React, {PropTypes} from 'react'

export default React.createClass({

  propTypes: {
    onClose: PropTypes.func.isRequired
  },

  render() {
    return (
      <div className="modal-header">
        <button type="button" className="close" onClick={this.props.onClose}>
          <span>&times;</span>
        </button>
        {this.props.children}
      </div>
    )
  }
})