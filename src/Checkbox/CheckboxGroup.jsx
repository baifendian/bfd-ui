import React, { PropTypes } from 'react'
import Checkbox from './Checkbox'
import './less/checkboxGroup.less'

const propTypes = {
  selects: PropTypes.array,
  onChange: PropTypes.func,
  customProp(props) {
    if (props.selects && !props.onChange) {
      return new Error('You provided a `selects` prop without an `onChange` handler')
    }
  }
}

const childContextTypes = {
  checkboxGroupSelects: PropTypes.array,
  setCheckboxGroupSelects: PropTypes.func
}

const CheckboxGroup = React.createClass({

  getInitialState() {
    return {
      selects: this.props.selects || []
    }
  },

  componentWillReceiveProps(nextProps) {
    'selects' in nextProps && this.setState({selects: nextProps.selects}) 
  },

  getChildContext() {
    return {
      checkboxGroupSelects: this.state.selects,
      setCheckboxGroupSelects: (value, isAdd) => {
        const selects = this.state.selects
        if (isAdd) {
          selects.push(value)
        } else {
          selects.splice(selects.indexOf(value), 1)
        }
        this.props.onChange && this.props.onChange(selects)
      }
    }
  },

  render() {
    let children
    if (this.props.values) {
      // 自动构建 values 与 label 相同的 Checkbox
      children = this.props.values.map((value, i) => <Checkbox key={i} value={value} block={!!this.props.block}>{value}</Checkbox>)
    } else {
      children = this.props.children
    }
    return <div className="bfd-checkbox-group">{children}</div>
  }
})

CheckboxGroup.propTypes = propTypes
CheckboxGroup.childContextTypes = childContextTypes

export default CheckboxGroup