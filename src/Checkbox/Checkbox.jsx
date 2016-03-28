import React, { PropTypes } from 'react'
import classnames from 'classnames'
import './checkbox.less'

const propTypes = {
  children: PropTypes.node.isRequired,
  block: PropTypes.bool
}

const contextTypes = {
  checkboxGroupSelects: PropTypes.array,
  setCheckboxGroupSelects: PropTypes.func
}

const Checkbox = React.createClass({

  componentWillMount() {
    this.isGroup = !!this.context.checkboxGroupSelects
  },

  render() {
    const { children, ...props } = this.props

    if (this.isGroup) {

      // 复选框组的逻辑单独处理
      const selects = this.context.checkboxGroupSelects
      if (selects.length) {
        props.checked = selects.indexOf(this.props.value) > -1
      }
      
      props.onChange = e => {
        this.context.setCheckboxGroupSelects(e.target.value, e.target.checked)
      }
    }

    return (
      <div className={classnames('bfd-checkbox', {checkbox: this.props.block, 'checkbox-inline': !this.props.block})}>
        <label>
          <input type="checkbox" {...props}/>
          <span className="status"></span>
          {children}
        </label>
      </div>
    )
  }
})

Checkbox.propTypes = propTypes
Checkbox.contextTypes = contextTypes

export default Checkbox