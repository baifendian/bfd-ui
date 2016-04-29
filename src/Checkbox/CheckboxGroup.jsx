import React, { PropTypes } from 'react'
import Checkbox from './Checkbox'
import update from 'react-addons-update'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'
import classnames from 'classnames'
import './less/checkboxGroup.less'

const CheckboxGroup = React.createClass({

  getInitialState() {
    const state = {}
    if (!this.props.selects) {
      state.selects = []
    }
    return state
  },

  getChildContext() {
    return {
      checkboxGroup: this
    }
  },

  shouldComponentUpdate(nextProps, nextState) {
    if (!this.props.children) {
      return shouldComponentUpdate.call(this, nextProps, nextState)
    }
    return true
  },

  getSelects() {
    return this.props.selects || this.state.selects
  },

  addSelect(value) {
    let selects = this.getSelects()
    if (this.state.selects) {
      selects.push(value)
    } else {
      selects = update(selects, {
        $push: [value]
      })
    }
    this.props.onChange && this.props.onChange(selects)
  },

  removeSelect(value) {
    let selects = this.getSelects()
    const splice = [selects.indexOf(value), 1]
    if (this.state.selects) {
      selects.splice(splice[0], splice[1])
    } else {
      selects = update(selects, {
        $splice: [splice]
      })
    }
    this.props.onChange && this.props.onChange(selects)
  },

  render() {
    const { className, values, children, block, onChange, ...other } = this.props
    let checkboxes
    if (values) {
      checkboxes = values.map((value, i) => <Checkbox key={i} value={value} block={block}>{value}</Checkbox>)
    }
    return <div className={classnames('bfd-checkbox-group', className)} {...other}>{checkboxes || children}</div>
  }
})

CheckboxGroup.propTypes = {
  selects: PropTypes.array,
  values: PropTypes.array,
  onChange: PropTypes.func,
  block: PropTypes.bool,
  customProp({ selects, onChange }) {
    if (selects && !onChange) {
      return new Error('You provided a `selects` prop without an `onChange` handler')
    }
  }
}

CheckboxGroup.childContextTypes = {
  checkboxGroup: PropTypes.instanceOf(CheckboxGroup)
}

export default CheckboxGroup