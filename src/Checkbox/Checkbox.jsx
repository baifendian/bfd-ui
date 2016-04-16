import React, { PropTypes } from 'react'
import classnames from 'classnames'
import './less/checkbox.less'

const propTypes = {
  block: PropTypes.bool
}

const contextTypes = {
  checkboxGroupSelects: PropTypes.array,
  setCheckboxGroupSelects: PropTypes.func
}

const Checkbox = React.createClass({

  render() {
    const { children, block, ...other } = this.props

    if (this.context.setCheckboxGroupSelects) {

      // 复选框组的逻辑单独处理
      const selects = this.context.checkboxGroupSelects
      if (selects.length) {
        other.checked = selects.indexOf(this.props.value) > -1
      }
      
      other.onChange = e => {
        this.context.setCheckboxGroupSelects(e.target.value, e.target.checked)
      }
    }

    return (
      <div className={classnames('bfd-checkbox', {checkbox: block, 'checkbox-inline': !block, disabled: other.disabled})}>
        <label>
          <input type="checkbox" {...other} />
          <span className="status"></span>
          {children ? <span>{children}</span> : null}
        </label>
      </div>
    )
  }
})

Checkbox.propTypes = propTypes
Checkbox.contextTypes = contextTypes

export default Checkbox