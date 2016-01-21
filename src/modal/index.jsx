import 'bfd-bootstrap'
import './main.css'
import React, {PropTypes} from 'react'
import classNames from 'classnames'

export default React.createClass({

  propTypes: {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  },

  componentDidMount() {

  },
  
  handleClick(e) {
    if (e.target.className.indexOf('modal-backdrop') !== -1) {
      this.props.onClose()
    }
  },

  render() {
    return (
      <div className={classNames('modal fade', {'in': this.props.isOpen}, this.props.className)}>
        <div className={classNames('modal-backdrop fade', {'in': this.props.isOpen})} onClick={this.handleClick}></div>
        <div className="modal-dialog">
          <div className="modal-content">
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
})