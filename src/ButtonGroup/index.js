import React, { Component, PropTypes } from 'react'
import { findAllByType } from '../util/ReactUtils'
import classnames from 'classnames'
import Button from '../Button'
import './index.less'

class ButtonGroup extends Component {

  constructor(props) {
    super(props)
    this.state = {
      value: props.defaultValue || ''
    }
  }

  handleClick(value) {
    this.setState({
      value
    })
    this.props.onClick && this.props.onClick(value)
  }

  componentWillReceiveProps(nextProps) {
    'value' in nextProps && this.setState({
      value: nextProps.value
    })
  }

  render() {
    const {
      className,
      children,
      ...other
    } = this.props
    const items = findAllByType(children, Button)
    const buttons = items.map((item, index) => {
      if (!item) return
      return React.cloneElement(item, {
        key: index,
        type: (item.props.value == this.state.value) ? '' : 'minor',
        onClick: e => {
          e.stopPropagation()
          this.handleClick(item.props.value)
        }
      })
    })
    return (
      <div className={classnames('bfd-button-group', className)} {...other}>
        {buttons}
      </div>
    )
  }
}

ButtonGroup.propTypes = {
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onClick: PropTypes.func,
  customProp(props) {
    if ('value' in props && !props.onClick) {
      return new Error('You provided a `value` prop without an `onClick` handler')
    }
  }
}

export default ButtonGroup